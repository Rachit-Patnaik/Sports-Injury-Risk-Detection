import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { PlayArrow, Pause, Sync, Speed, MovieFilter, Bolt, CheckCircle } from '@mui/icons-material';

export default function DualAngle() {
  const videoRefFrontal = useRef(null);
  const videoRefSagittal = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);

  // Synchronized Play / Pause controls
  const togglePlay = () => {
    if (!videoRefFrontal.current || !videoRefSagittal.current) return;

    if (isPlaying) {
      videoRefFrontal.current.pause();
      videoRefSagittal.current.pause();
      setIsPlaying(false);
    } else {
      videoRefFrontal.current.play();
      videoRefSagittal.current.play();
      setIsPlaying(true);
    }
  };

  // Synchronized Scrubbing
  const handleSeek = (e) => {
    const newProgress = parseFloat(e.target.value);
    setProgress(newProgress);

    if (videoRefFrontal.current && videoRefSagittal.current) {
      const duration = videoRefFrontal.current.duration || 10;
      const targetTime = (newProgress / 100) * duration;
      videoRefFrontal.current.currentTime = targetTime;
      videoRefSagittal.current.currentTime = targetTime;
    }
  };

  // Synchronized Playback Rate
  const handleSpeedChange = (speed) => {
    setPlaybackSpeed(speed);
    if (videoRefFrontal.current && videoRefSagittal.current) {
      videoRefFrontal.current.playbackRate = speed;
      videoRefSagittal.current.playbackRate = speed;
    }
  };

  // Sync Progress Slider with Video Time
  const handleTimeUpdate = () => {
    if (videoRefFrontal.current) {
      const current = videoRefFrontal.current.currentTime;
      const duration = videoRefFrontal.current.duration || 10;
      setProgress((current / duration) * 100);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      style={{ padding: '1.5rem', maxWidth: '1600px', margin: '0 auto', color: '#f8fafc', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}
    >
      {/* Header Banner */}
      <div className="sports-card" style={{ padding: '1.5rem', borderColor: 'rgba(99, 102, 241, 0.3)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div style={{ padding: '0.6rem', backgroundColor: 'rgba(99, 102, 241, 0.15)', borderRadius: '0.75rem', border: '1px solid rgba(99, 102, 241, 0.3)', color: '#818cf8', display: 'flex' }}>
              <MovieFilter fontSize="medium" />
            </div>
            <div>
              <h1 style={{ fontSize: '1.5rem', fontWeight: 900, margin: 0, color: '#ffffff' }}>
                Multi-Plane Dual-Angle Synchronized Analysis
              </h1>
              <p style={{ fontSize: '0.75rem', color: '#94a3b8', margin: '0.2rem 0 0 0' }}>
                Synchronized Frontal (Valgus/Asymmetry) and Sagittal (Flexion/Depth) view processing to eliminate single-plane camera depth distortion
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', backgroundColor: 'rgba(15, 23, 42, 0.8)', padding: '0.4rem 0.8rem', borderRadius: '0.75rem', border: '1px solid #1e293b' }}>
            <Sync fontSize="small" style={{ color: '#34d399' }} />
            <span style={{ fontSize: '0.7rem', fontWeight: 800, color: '#34d399' }}>Dual-Clock Lock Enabled</span>
          </div>
        </div>
      </div>

      {/* Dual Video Player Viewport */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
        {/* Plane 1: Frontal View */}
        <div className="sports-card" style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #1f2937', paddingBottom: '0.5rem' }}>
            <span style={{ fontSize: '0.8rem', fontWeight: 800, color: '#38bdf8' }}>FRONTAL PLANE (VALGUS & ASYMMETRY)</span>
            <span style={{ fontSize: '0.65rem', padding: '0.2rem 0.5rem', borderRadius: '0.4rem', backgroundColor: 'rgba(56, 189, 248, 0.15)', color: '#38bdf8', border: '1px solid rgba(56, 189, 248, 0.3)' }}>
              Camera A (0° Azimuth)
            </span>
          </div>

          <div style={{ position: 'relative', width: '100%', height: '360px', backgroundColor: '#070a12', borderRadius: '0.75rem', overflow: 'hidden', border: '1px solid #1e2937' }}>
            <video
              ref={videoRefFrontal}
              onTimeUpdate={handleTimeUpdate}
              src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4"
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
            <div style={{ position: 'absolute', top: '0.75rem', left: '0.75rem', backgroundColor: 'rgba(7, 10, 18, 0.8)', padding: '0.3rem 0.6rem', borderRadius: '0.5rem', border: '1px solid #1e2937', fontSize: '0.65rem', fontWeight: 800, color: '#f8fafc' }}>
              Dynamic Valgus: <span style={{ color: '#fb7185' }}>11.4° (Elevated)</span>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
            <div style={{ padding: '0.65rem', backgroundColor: 'rgba(15, 23, 42, 0.6)', borderRadius: '0.5rem', border: '1px solid #1f2937' }}>
              <div style={{ fontSize: '0.6rem', color: '#94a3b8', textTransform: 'uppercase' }}>Bilateral Asymmetry</div>
              <div style={{ fontSize: '1rem', fontWeight: 800, color: '#ffffff' }}>12.4% Deviation</div>
            </div>
            <div style={{ padding: '0.65rem', backgroundColor: 'rgba(15, 23, 42, 0.6)', borderRadius: '0.5rem', border: '1px solid #1f2937' }}>
              <div style={{ fontSize: '0.6rem', color: '#94a3b8', textTransform: 'uppercase' }}>Pelvic Lateral Tilt</div>
              <div style={{ fontSize: '1rem', fontWeight: 800, color: '#34d399' }}>2.1° (Optimal)</div>
            </div>
          </div>
        </div>

        {/* Plane 2: Sagittal View */}
        <div className="sports-card" style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #1f2937', paddingBottom: '0.5rem' }}>
            <span style={{ fontSize: '0.8rem', fontWeight: 800, color: '#818cf8' }}>SAGITTAL PLANE (FLEXION & DEPTH)</span>
            <span style={{ fontSize: '0.65rem', padding: '0.2rem 0.5rem', borderRadius: '0.4rem', backgroundColor: 'rgba(129, 140, 248, 0.15)', color: '#818cf8', border: '1px solid rgba(129, 140, 248, 0.3)' }}>
              Camera B (90° Azimuth)
            </span>
          </div>

          <div style={{ position: 'relative', width: '100%', height: '360px', backgroundColor: '#070a12', borderRadius: '0.75rem', overflow: 'hidden', border: '1px solid #1e2937' }}>
            <video
              ref={videoRefSagittal}
              src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4"
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
            <div style={{ position: 'absolute', top: '0.75rem', left: '0.75rem', backgroundColor: 'rgba(7, 10, 18, 0.8)', padding: '0.3rem 0.6rem', borderRadius: '0.5rem', border: '1px solid #1e2937', fontSize: '0.65rem', fontWeight: 800, color: '#f8fafc' }}>
              Max Knee Flexion: <span style={{ color: '#34d399' }}>124.8°</span>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
            <div style={{ padding: '0.65rem', backgroundColor: 'rgba(15, 23, 42, 0.6)', borderRadius: '0.5rem', border: '1px solid #1f2937' }}>
              <div style={{ fontSize: '0.6rem', color: '#94a3b8', textTransform: 'uppercase' }}>Squat Depth Clearance</div>
              <div style={{ fontSize: '1rem', fontWeight: 800, color: '#34d399' }}>Below Parallel</div>
            </div>
            <div style={{ padding: '0.65rem', backgroundColor: 'rgba(15, 23, 42, 0.6)', borderRadius: '0.5rem', border: '1px solid #1f2937' }}>
              <div style={{ fontSize: '0.6rem', color: '#94a3b8', textTransform: 'uppercase' }}>Ankle Dorsiflexion</div>
              <div style={{ fontSize: '1rem', fontWeight: 800, color: '#f59e0b' }}>32.1° (Slight Deficit)</div>
            </div>
          </div>
        </div>
      </div>

      {/* Synchronized Control Toolbar */}
      <div className="sports-card" style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <button
            onClick={togglePlay}
            style={{
              padding: '0.6rem 1.25rem',
              backgroundColor: '#4f46e5',
              color: '#ffffff',
              border: 'none',
              borderRadius: '0.65rem',
              fontWeight: 800,
              fontSize: '0.8rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
            }}
          >
            {isPlaying ? <Pause fontSize="small" /> : <PlayArrow fontSize="small" />}
            <span>{isPlaying ? 'Pause Dual Feeds' : 'Play Dual Feeds'}</span>
          </button>

          {/* Sync Time Slider */}
          <input
            type="range"
            min="0"
            max="100"
            value={progress}
            onChange={handleSeek}
            style={{ flex: 1, accentColor: '#4f46e5', cursor: 'pointer', height: '6px' }}
          />

          {/* Playback Rate Buttons */}
          <div style={{ display: 'flex', gap: '0.35rem', alignItems: 'center' }}>
            <Speed fontSize="small" style={{ color: '#94a3b8', marginRight: '0.2rem' }} />
            {[0.25, 0.5, 1.0].map((speed) => (
              <button
                key={speed}
                onClick={() => handleSpeedChange(speed)}
                style={{
                  padding: '0.35rem 0.65rem',
                  backgroundColor: playbackSpeed === speed ? 'rgba(99, 102, 241, 0.3)' : 'rgba(15, 23, 42, 0.8)',
                  border: playbackSpeed === speed ? '1px solid #6366f1' : '1px solid #1e293b',
                  borderRadius: '0.4rem',
                  color: playbackSpeed === speed ? '#ffffff' : '#94a3b8',
                  fontSize: '0.7rem',
                  fontWeight: 800,
                  cursor: 'pointer',
                }}
              >
                {speed}x
              </button>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}