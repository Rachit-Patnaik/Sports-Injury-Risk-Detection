import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Videocam, VideocamOff, Warning, Bolt, CheckCircle, Refresh } from '@mui/icons-material';

export default function LiveScreening() {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [streaming, setStreaming] = useState(false);
  const [modelLoaded, setModelLoaded] = useState(false);
  const [kneeAngle, setKneeAngle] = useState(0);
  const [hipAngle, setHipAngle] = useState(0);
  const [valgusWarning, setValgusWarning] = useState(false);
  const [cameraError, setCameraError] = useState('');
  const cameraInstanceRef = useRef(null);
  const poseInstanceRef = useRef(null);

  // Load MediaPipe scripts dynamically into the browser DOM
  useEffect(() => {
    const loadScript = (src) => {
      return new Promise((resolve, reject) => {
        if (document.querySelector(`script[src="${src}"]`)) {
          resolve();
          return;
        }
        const script = document.createElement('script');
        script.src = src;
        script.crossOrigin = 'anonymous';
        script.onload = () => resolve();
        script.onerror = () => reject(new Error(`Failed to load script ${src}`));
        document.head.appendChild(script);
      });
    };

    Promise.all([
      loadScript('https://cdn.jsdelivr.net/npm/@mediapipe/camera_utils/camera_utils.js'),
      loadScript('https://cdn.jsdelivr.net/npm/@mediapipe/pose/pose.js'),
    ])
      .then(() => {
        setModelLoaded(true);
      })
      .catch((err) => {
        console.error(err);
        setCameraError('Failed to load MediaPipe pose recognition dependencies.');
      });

    return () => {
      stopCamera();
    };
  }, []);

  // 2D Vector Angle Calculator
  const calculateAngle = (a, b, c) => {
    const radians = Math.atan2(c.y - b.y, c.x - b.x) - Math.atan2(a.y - b.y, a.x - b.x);
    let angle = Math.abs((radians * 180.0) / Math.PI);
    if (angle > 180.0) {
      angle = 360.0 - angle;
    }
    return Math.round(angle);
  };

  const onResults = (results) => {
    const canvas = canvasRef.current;
    if (!canvas || !videoRef.current) return;

    const ctx = canvas.getContext('2d');
    canvas.width = videoRef.current.videoWidth || 1280;
    canvas.height = videoRef.current.videoHeight || 720;

    ctx.save();
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (results.poseLandmarks) {
      const lm = results.poseLandmarks;

      // Extract key points
      const leftHip = lm[23];
      const rightHip = lm[24];
      const leftKnee = lm[25];
      const rightKnee = lm[26];
      const leftAnkle = lm[27];
      const rightAnkle = lm[28];
      const leftShoulder = lm[11];
      const rightShoulder = lm[12];

      // Calculate real angles
      let lKneeDeg = 0;
      let rKneeDeg = 0;
      let lHipDeg = 0;

      if (leftHip && leftKnee && leftAnkle) {
        lKneeDeg = calculateAngle(leftHip, leftKnee, leftAnkle);
      }
      if (rightHip && rightKnee && rightAnkle) {
        rKneeDeg = calculateAngle(rightHip, rightKnee, rightAnkle);
      }
      if (leftShoulder && leftHip && leftKnee) {
        lHipDeg = calculateAngle(leftShoulder, leftHip, leftKnee);
      }

      const currentKnee = lKneeDeg || rKneeDeg || 180;
      setKneeAngle(currentKnee);
      setHipAngle(lHipDeg || 170);

      // Check for inward knee valgus collapse or deep squat compression
      const isValgus = (currentKnee < 125 && currentKnee > 40) || (leftKnee && rightKnee && Math.abs(leftKnee.x - rightKnee.x) < 0.12);
      setValgusWarning(isValgus);

      // Draw Pose Connections
      const connections = [
        [11, 12], [11, 13], [13, 15], [12, 14], [14, 16], // Arms & Shoulders
        [11, 23], [12, 24], [23, 24],                   // Torso & Pelvis
        [23, 25], [24, 26], [25, 27], [26, 28],          // Legs
      ];

      ctx.lineWidth = 4;
      ctx.strokeStyle = isValgus ? '#f43f5e' : '#38bdf8';

      connections.forEach(([i, j]) => {
        if (lm[i] && lm[j] && lm[i].visibility > 0.4 && lm[j].visibility > 0.4) {
          ctx.beginPath();
          ctx.moveTo(lm[i].x * canvas.width, lm[i].y * canvas.height);
          ctx.lineTo(lm[j].x * canvas.width, lm[j].y * canvas.height);
          ctx.stroke();
        }
      });

      // Draw Keypoint Nodes
      lm.forEach((pt, index) => {
        if (pt.visibility > 0.4 && index >= 11) {
          ctx.beginPath();
          ctx.arc(pt.x * canvas.width, pt.y * canvas.height, 6, 0, 2 * Math.PI);
          ctx.fillStyle = isValgus && (index === 25 || index === 26) ? '#f43f5e' : '#34d399';
          ctx.fill();
          ctx.lineWidth = 2;
          ctx.strokeStyle = '#ffffff';
          ctx.stroke();
        }
      });

      // Render Angle Text near detected knee joint
      if (leftKnee && leftKnee.visibility > 0.4) {
        ctx.font = 'bold 16px sans-serif';
        ctx.fillStyle = '#ffffff';
        ctx.fillText(`${lKneeDeg}°`, leftKnee.x * canvas.width + 12, leftKnee.y * canvas.height);
      }
    }

    ctx.restore();
  };

  const startCamera = async () => {
    setCameraError('');
    if (!window.Pose || !window.Camera) {
      setCameraError('Pose estimation modules are initializing. Please try again in a moment.');
      return;
    }

    try {
      const pose = new window.Pose({
        locateFile: (file) => `https://cdn.jsdelivr.net/npm/@mediapipe/pose/${file}`,
      });

      pose.setOptions({
        modelComplexity: 1,
        smoothLandmarks: true,
        enableSegmentation: false,
        minDetectionConfidence: 0.5,
        minTrackingConfidence: 0.5,
      });

      pose.onResults(onResults);
      poseInstanceRef.current = pose;

      if (videoRef.current) {
        const camera = new window.Camera(videoRef.current, {
          onFrame: async () => {
            if (videoRef.current && poseInstanceRef.current) {
              await poseInstanceRef.current.send({ image: videoRef.current });
            }
          },
          width: 1280,
          height: 720,
        });

        cameraInstanceRef.current = camera;
        await camera.start();
        setStreaming(true);
      }
    } catch (err) {
      console.error(err);
      setCameraError('Webcam access error or camera permission denied.');
    }
  };

  const stopCamera = () => {
    if (cameraInstanceRef.current) {
      try {
        cameraInstanceRef.current.stop();
      } catch (e) {
        console.error(e);
      }
      cameraInstanceRef.current = null;
    }
    if (poseInstanceRef.current) {
      try {
        poseInstanceRef.current.close();
      } catch (e) {
        console.error(e);
      }
      poseInstanceRef.current = null;
    }
    setStreaming(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      style={{ padding: '1.5rem', maxWidth: '1400px', margin: '0 auto', color: '#f8fafc', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}
    >
      {/* Header Banner */}
      <div className="sports-card" style={{ padding: '1.5rem', borderColor: 'rgba(99, 102, 241, 0.3)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div style={{ padding: '0.6rem', backgroundColor: 'rgba(99, 102, 241, 0.15)', borderRadius: '0.75rem', border: '1px solid rgba(99, 102, 241, 0.3)', color: '#818cf8', display: 'flex' }}>
              <Videocam fontSize="medium" />
            </div>
            <div>
              <h1 style={{ fontSize: '1.5rem', fontWeight: 900, margin: 0, color: '#ffffff' }}>
                Real-Time Live WebCam Pose Screening
              </h1>
              <p style={{ fontSize: '0.75rem', color: '#94a3b8', margin: '0.2rem 0 0 0' }}>
                Live MediaPipe landmark detection overlaying body keypoints and calculating dynamic joint angles at 30 FPS
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '0.75rem' }}>
            {!streaming ? (
              <button
                onClick={startCamera}
                disabled={!modelLoaded}
                style={{
                  padding: '0.65rem 1.25rem',
                  backgroundColor: modelLoaded ? '#4f46e5' : '#334155',
                  color: '#ffffff',
                  border: 'none',
                  borderRadius: '0.75rem',
                  fontWeight: 800,
                  fontSize: '0.8rem',
                  cursor: modelLoaded ? 'pointer' : 'not-allowed',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  boxShadow: modelLoaded ? '0 4px 15px rgba(79, 70, 229, 0.4)' : 'none',
                }}
              >
                <Videocam fontSize="small" />
                <span>{modelLoaded ? 'Start Live Screening' : 'Loading AI Engine...'}</span>
              </button>
            ) : (
              <button
                onClick={stopCamera}
                style={{
                  padding: '0.65rem 1.25rem',
                  backgroundColor: '#f43f5e',
                  color: '#ffffff',
                  border: 'none',
                  borderRadius: '0.75rem',
                  fontWeight: 800,
                  fontSize: '0.8rem',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                }}
              >
                <VideocamOff fontSize="small" />
                <span>Stop Camera</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {cameraError && (
        <div style={{ padding: '1rem', backgroundColor: 'rgba(244, 63, 94, 0.15)', border: '1px solid rgba(244, 63, 94, 0.4)', borderRadius: '0.75rem', color: '#fb7185', fontSize: '0.8rem' }}>
          {cameraError}
        </div>
      )}

      {/* Main Screen Content */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: '1.5rem' }}>
        <div style={{ position: 'relative', width: '100%', height: '520px', backgroundColor: '#070a12', borderRadius: '1rem', border: '1px solid #1e293b', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <video
            ref={videoRef}
            playsInline
            muted
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: streaming ? 'block' : 'none' }}
          />
          <canvas
            ref={canvasRef}
            style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', display: streaming ? 'block' : 'none' }}
          />

          {!streaming && (
            <div style={{ textAlign: 'center', color: '#64748b' }}>
              <Videocam style={{ fontSize: 64, opacity: 0.4, marginBottom: '0.5rem' }} />
              <div style={{ fontSize: '0.9rem', fontWeight: 700, color: '#94a3b8' }}>Camera Feed Inactive</div>
              <div style={{ fontSize: '0.75rem', marginTop: '0.25rem' }}>
                {modelLoaded ? 'Click "Start Live Screening" to run live pose keypoint detection.' : 'Loading MediaPipe pose model...'}
              </div>
            </div>
          )}

          {/* Live HUD Overlay Tags */}
          {streaming && (
            <div style={{ position: 'absolute', top: '1rem', left: '1rem', right: '1rem', pointerEvents: 'none', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '0.7rem', fontWeight: 900, padding: '0.3rem 0.75rem', borderRadius: '0.5rem', backgroundColor: 'rgba(16, 185, 129, 0.25)', color: '#34d399', border: '1px solid rgba(16, 185, 129, 0.4)' }}>
                ● LIVE MEDIAPIPE POSE RECOGNITION
              </span>

              {valgusWarning && (
                <motion.div
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ repeat: Infinity, duration: 0.6 }}
                  style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.4rem 0.85rem', borderRadius: '0.5rem', backgroundColor: 'rgba(244, 63, 94, 0.9)', color: '#ffffff', fontWeight: 900, fontSize: '0.75rem', boxShadow: '0 0 20px rgba(244, 63, 94, 0.6)' }}
                >
                  <Warning fontSize="small" />
                  <span>KNEE VALGUS DEVIATION ({kneeAngle}°)</span>
                </motion.div>
              )}
            </div>
          )}
        </div>

        {/* Real-time Side Metrics Panel */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div className="sports-card" style={{ padding: '1.25rem' }}>
            <span style={{ fontSize: '0.65rem', fontWeight: 800, color: '#64748b', textTransform: 'uppercase' }}>REAL KNEE FLEXION ANGLE</span>
            <div style={{ fontSize: '2.2rem', fontWeight: 900, color: valgusWarning ? '#f43f5e' : '#34d399', marginTop: '0.2rem' }}>
              {streaming ? `${kneeAngle}°` : '--°'}
            </div>
            <div style={{ fontSize: '0.7rem', color: valgusWarning ? '#fb7185' : '#10b981', fontWeight: 700, marginTop: '0.2rem' }}>
              {streaming ? (valgusWarning ? '● Knee Inward Strain' : '● Normal Joint Range') : '● Awaiting Video Stream'}
            </div>
          </div>

          <div className="sports-card" style={{ padding: '1.25rem' }}>
            <span style={{ fontSize: '0.65rem', fontWeight: 800, color: '#64748b', textTransform: 'uppercase' }}>HIP EXTENSION ANGLE</span>
            <div style={{ fontSize: '2.2rem', fontWeight: 900, color: '#ffffff', marginTop: '0.2rem' }}>
              {streaming ? `${hipAngle}°` : '--°'}
            </div>
            <div style={{ fontSize: '0.7rem', color: '#818cf8', fontWeight: 700, marginTop: '0.2rem' }}>
              {streaming ? '● Live Pelvic Tracking' : '● Inactive'}
            </div>
          </div>

          <div className="sports-card" style={{ padding: '1.25rem', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <span style={{ fontSize: '0.7rem', fontWeight: 800, color: '#ffffff', textTransform: 'uppercase' }}>Instructions</span>
              <p style={{ fontSize: '0.75rem', color: '#94a3b8', marginTop: '0.5rem', lineHeight: 1.4 }}>
                Stand approximately 2 meters back from the webcam so your shoulders, hips, knees, and ankles are clearly visible in the frame. Perform bodyweight squats or single-leg extensions to test joint angle calculations live.
              </p>
            </div>

            <div style={{ padding: '0.75rem', backgroundColor: 'rgba(15, 23, 42, 0.8)', borderRadius: '0.75rem', border: '1px solid #1f2937', fontSize: '0.7rem', color: '#cbd5e1' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', color: '#38bdf8', fontWeight: 800 }}>
                <Bolt fontSize="small" /> MediaPipe Pose Engine
              </div>
              <div style={{ marginTop: '0.25rem' }}>33 Body Landmark Vector Tracking</div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}