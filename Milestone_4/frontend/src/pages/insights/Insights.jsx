import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  ShowChart,
  DirectionsRun,
  FitnessCenter,
  BarChart,
  Analytics,
  CheckCircle,
  Tune,
} from '@mui/icons-material';

export default function Insights() {
  const [activeJoint, setActiveJoint] = useState('knee'); // 'knee', 'hip', 'shoulder', 'all'
  const [reportData, setReportData] = useState(null);
  const [hoverFrame, setHoverFrame] = useState(null);

  useEffect(() => {
    const saved = localStorage.getItem('latest_report');
    if (saved) {
      try {
        setReportData(JSON.parse(saved));
      } catch (e) {
        console.error('Error parsing stored report', e);
      }
    }
  }, []);

  const activity = reportData?.Activity || 'Running';

  // Generate smooth frame-by-frame kinematic wave curves (100 keyframes)
  const generateFrameData = () => {
    const frames = [];
    const totalFrames = 100;
    
    for (let i = 0; i < totalFrames; i++) {
      const t = (i / totalFrames) * 4 * Math.PI;
      const kneeLeft = 135 + 22 * Math.sin(t) + (i % 3 === 0 ? 1.5 : -1.5);
      const kneeRight = 142 + 20 * Math.sin(t + 0.3) + (i % 2 === 0 ? 2 : -1);
      const hipLeft = 155 + 16 * Math.cos(t);
      const hipRight = 158 + 15 * Math.cos(t + 0.2);
      const shoulderLeft = 25 + 14 * Math.sin(2 * t);
      const shoulderRight = 28 + 12 * Math.sin(2 * t + 0.4);

      frames.push({
        frame: i + 1,
        kneeLeft: Math.round(kneeLeft * 10) / 10,
        kneeRight: Math.round(kneeRight * 10) / 10,
        hipLeft: Math.round(hipLeft * 10) / 10,
        hipRight: Math.round(hipRight * 10) / 10,
        shoulderLeft: Math.round(shoulderLeft * 10) / 10,
        shoulderRight: Math.round(shoulderRight * 10) / 10,
      });
    }
    return frames;
  };

  const frameData = generateFrameData();
  const activeFrame = hoverFrame !== null ? frameData[hoverFrame] : frameData[frameData.length - 1];

  // SVG Chart Helper Parameters
  const svgWidth = 1100;
  const svgHeight = 320;
  const padding = 40;

  const getX = (index) => padding + (index / (frameData.length - 1)) * (svgWidth - 2 * padding);
  const getY = (value, minVal = 0, maxVal = 200) => svgHeight - padding - ((value - minVal) / (maxVal - minVal)) * (svgHeight - 2 * padding);

  const makePath = (key, minVal = 0, maxVal = 200) => {
    return frameData
      .map((d, i) => `${i === 0 ? 'M' : 'L'} ${getX(i)} ${getY(d[key], minVal, maxVal)}`)
      .join(' ');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      style={{ padding: '2rem', maxWidth: '1400px', margin: '0 auto', color: '#f8fafc', display: 'flex', flexDirection: 'column', gap: '2rem' }}
    >
      {/* Header Banner */}
      <div className="sports-card" style={{ padding: '1.5rem', borderColor: 'rgba(99, 102, 241, 0.3)' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div style={{ padding: '0.6rem', backgroundColor: 'rgba(99, 102, 241, 0.15)', borderRadius: '0.75rem', border: '1px solid rgba(99, 102, 241, 0.3)', color: '#818cf8', display: 'flex' }}>
              <ShowChart fontSize="medium" />
            </div>
            <div>
              <h1 style={{ fontSize: '1.5rem', fontWeight: 900, margin: 0, color: '#ffffff' }}>
                Kinematic Time-Series Insights
              </h1>
              <p style={{ fontSize: '0.75rem', color: '#94a3b8', margin: '0.2rem 0 0 0' }}>
                Frame-by-frame joint angle trajectories, flexion velocity curves, and bilateral symmetry tracking
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', backgroundColor: '#0f172a', padding: '0.35rem 0.75rem', borderRadius: '0.75rem', border: '1px solid #1f2937' }}>
            <Tune style={{ fontSize: 16, color: '#818cf8' }} />
            <span style={{ fontSize: '0.7rem', fontWeight: 800, color: '#94a3b8', textTransform: 'uppercase' }}>Focus Joint:</span>
            <select
              value={activeJoint}
              onChange={(e) => setActiveJoint(e.target.value)}
              style={{ backgroundColor: 'transparent', color: '#ffffff', fontSize: '0.75rem', fontWeight: 800, border: 'none', outline: 'none', cursor: 'pointer' }}
            >
              <option value="knee" style={{ backgroundColor: '#0f172a' }}>Knee Flexion (Left vs Right)</option>
              <option value="hip" style={{ backgroundColor: '#0f172a' }}>Hip Extension (Left vs Right)</option>
              <option value="shoulder" style={{ backgroundColor: '#0f172a' }}>Shoulder Swing (Left vs Right)</option>
              <option value="all" style={{ backgroundColor: '#0f172a' }}>All Combined Kinematics</option>
            </select>
          </div>
        </div>
      </div>

      {/* Main Interactive Chart Box */}
      <div className="sports-card" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.75rem', fontWeight: 800, color: '#94a3b8' }}>
          <span style={{ textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            100 Keyframe Kinematic Trajectory ({activity} Context)
          </span>
          <div style={{ display: 'flex', gap: '1.25rem', alignItems: 'center' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#fb7185' }}>
              <span style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#fb7185' }}></span> Left Joint Angle
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#38bdf8' }}>
              <span style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#38bdf8' }}></span> Right Joint Angle
            </span>
          </div>
        </div>

        {/* SVG Curve Container */}
        <div style={{ position: 'relative', overflowX: 'auto', backgroundColor: 'rgba(15, 23, 42, 0.6)', borderRadius: '0.75rem', border: '1px solid #1f2937', padding: '1rem 0' }}>
          <svg
            viewBox={`0 0 ${svgWidth} ${svgHeight}`}
            style={{ width: '100%', height: 'auto', minWidth: '700px', display: 'block' }}
            onMouseMove={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              const mouseX = e.clientX - rect.left;
              const ratio = Math.max(0, Math.min(1, (mouseX - padding) / (svgWidth - 2 * padding)));
              const frameIdx = Math.round(ratio * (frameData.length - 1));
              setHoverFrame(frameIdx);
            }}
            onMouseLeave={() => setHoverFrame(null)}
          >
            {/* Grid Horizontal Reference Lines */}
            {[40, 80, 120, 160].map((val) => (
              <g key={val}>
                <line x1={padding} y1={getY(val)} x2={svgWidth - padding} y2={getY(val)} stroke="#1e293b" strokeDasharray="4 4" strokeWidth="1" />
                <text x={padding - 8} y={getY(val) + 4} fill="#64748b" fontSize="10" textAnchor="end">{val}°</text>
              </g>
            ))}

            {/* Render Selected Kinematic Lines */}
            {(activeJoint === 'knee' || activeJoint === 'all') && (
              <>
                <path d={makePath('kneeLeft')} fill="none" stroke="#fb7185" strokeWidth="2.5" />
                <path d={makePath('kneeRight')} fill="none" stroke="#38bdf8" strokeWidth="2.5" />
              </>
            )}

            {(activeJoint === 'hip' || activeJoint === 'all') && (
              <>
                <path d={makePath('hipLeft')} fill="none" stroke="#f59e0b" strokeWidth="2.5" strokeDasharray={activeJoint === 'all' ? '6 3' : 'none'} />
                <path d={makePath('hipRight')} fill="none" stroke="#34d399" strokeWidth="2.5" strokeDasharray={activeJoint === 'all' ? '6 3' : 'none'} />
              </>
            )}

            {(activeJoint === 'shoulder' || activeJoint === 'all') && (
              <>
                <path d={makePath('shoulderLeft')} fill="none" stroke="#c084fc" strokeWidth="2.5" />
                <path d={makePath('shoulderRight')} fill="none" stroke="#818cf8" strokeWidth="2.5" />
              </>
            )}

            {/* Hover Cursor Vertical Bar */}
            {hoverFrame !== null && (
              <g>
                <line x1={getX(hoverFrame)} y1={padding} x2={getX(hoverFrame)} y2={svgHeight - padding} stroke="#818cf8" strokeWidth="1.5" />
                <circle cx={getX(hoverFrame)} cy={getY(activeFrame.kneeLeft)} r="4" fill="#fb7185" />
                <circle cx={getX(hoverFrame)} cy={getY(activeFrame.kneeRight)} r="4" fill="#38bdf8" />
              </g>
            )}
          </svg>
        </div>

        {/* Live Keyframe Inspector Bar */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '0.85rem', marginTop: '0.5rem' }}>
          <div style={{ padding: '0.85rem', backgroundColor: 'rgba(15, 23, 42, 0.6)', borderRadius: '0.75rem', border: '1px solid #1f2937' }}>
            <span style={{ fontSize: '0.65rem', fontWeight: 800, color: '#64748b', textTransform: 'uppercase' }}>INSPECTED FRAME</span>
            <div style={{ fontSize: '1.2rem', fontWeight: 900, color: '#ffffff', marginTop: '0.2rem' }}>Frame #{activeFrame.frame} / 100</div>
          </div>
          <div style={{ padding: '0.85rem', backgroundColor: 'rgba(15, 23, 42, 0.6)', borderRadius: '0.75rem', border: '1px solid #1f2937' }}>
            <span style={{ fontSize: '0.65rem', fontWeight: 800, color: '#fb7185', textTransform: 'uppercase' }}>LEFT KNEE FLEXION</span>
            <div style={{ fontSize: '1.2rem', fontWeight: 900, color: '#ffffff', marginTop: '0.2rem' }}>{activeFrame.kneeLeft}°</div>
          </div>
          <div style={{ padding: '0.85rem', backgroundColor: 'rgba(15, 23, 42, 0.6)', borderRadius: '0.75rem', border: '1px solid #1f2937' }}>
            <span style={{ fontSize: '0.65rem', fontWeight: 800, color: '#38bdf8', textTransform: 'uppercase' }}>RIGHT KNEE FLEXION</span>
            <div style={{ fontSize: '1.2rem', fontWeight: 900, color: '#ffffff', marginTop: '0.2rem' }}>{activeFrame.kneeRight}°</div>
          </div>
          <div style={{ padding: '0.85rem', backgroundColor: 'rgba(15, 23, 42, 0.6)', borderRadius: '0.75rem', border: '1px solid #1f2937' }}>
            <span style={{ fontSize: '0.65rem', fontWeight: 800, color: '#f59e0b', textTransform: 'uppercase' }}>INSTANT ASYMMETRY</span>
            <div style={{ fontSize: '1.2rem', fontWeight: 900, color: '#34d399', marginTop: '0.2rem' }}>
              {Math.abs(Math.round((activeFrame.kneeLeft - activeFrame.kneeRight) * 10) / 10)}°
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}