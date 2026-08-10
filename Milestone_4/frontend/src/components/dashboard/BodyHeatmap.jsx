import React from 'react';
import { FitnessCenter } from '@mui/icons-material';

export default function BodyHeatmap({ predictions = {}, anomalies = {} }) {
  const getStatusColor = (riskLevel) => {
    switch (riskLevel?.toLowerCase()) {
      case 'high':
      case 'critical':
      case 'severe knee imbalance':
        return '#f43f5e'; // Red
      case 'moderate':
      case 'average':
      case 'shoulder imbalance':
      case 'hip instability':
        return '#f59e0b'; // Yellow
      default:
        return '#10b981'; // Green
    }
  };

  const kneeRisk = predictions['ACL Risk'] || 'Low';
  const hipRisk = predictions['Hamstring Risk'] || 'Low';
  const shoulderRisk = predictions['Shoulder Risk'] || 'Low';

  const kneeColor = getStatusColor(kneeRisk);
  const hipColor = getStatusColor(hipRisk);
  const shoulderColor = getStatusColor(shoulderRisk);

  return (
    <div className="sports-card" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #1f2937', paddingBottom: '0.75rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#818cf8' }}>
          <FitnessCenter fontSize="small" />
          <h3 style={{ fontSize: '0.85rem', fontWeight: 800, margin: 0, color: '#ffffff' }}>Anatomical Joint Risk Map</h3>
        </div>
        <span style={{ fontSize: '0.65rem', color: '#94a3b8', fontWeight: 700 }}>Spatial Biomechanics</span>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '120px 1fr', gap: '1.5rem', alignItems: 'center' }}>
        {/* Anatomical Human SVG Body Avatar */}
        <div style={{ position: 'relative', width: '120px', height: '240px', margin: '0 auto' }}>
          <svg viewBox="0 0 100 200" style={{ width: '100%', height: '100%' }}>
            {/* Body Silhouette Outline */}
            <path
              d="M50,15 A8,8 0 1,0 50,31 A8,8 0 1,0 50,15 M38,36 L62,36 L68,75 L60,78 L58,110 L64,185 L52,185 L50,125 L48,185 L36,185 L42,110 L40,78 L32,75 Z"
              fill="#1e293b"
              stroke="#334155"
              strokeWidth="1.5"
            />

            {/* Glowing Anatomical Joint Nodes */}
            {/* Shoulders */}
            <circle cx="36" cy="42" r="5" fill={shoulderColor} opacity="0.9" />
            <circle cx="64" cy="42" r="5" fill={shoulderColor} opacity="0.9" />
            <circle cx="36" cy="42" r="9" fill={shoulderColor} opacity="0.35" />
            <circle cx="64" cy="42" r="9" fill={shoulderColor} opacity="0.35" />

            {/* Hips */}
            <circle cx="42" cy="100" r="5" fill={hipColor} opacity="0.9" />
            <circle cx="58" cy="100" r="5" fill={hipColor} opacity="0.9" />
            <circle cx="42" cy="100" r="9" fill={hipColor} opacity="0.35" />
            <circle cx="58" cy="100" r="9" fill={hipColor} opacity="0.35" />

            {/* Knees */}
            <circle cx="43" cy="142" r="6" fill={kneeColor} opacity="0.9" />
            <circle cx="57" cy="142" r="6" fill={kneeColor} opacity="0.9" />
            <circle cx="43" cy="142" r="11" fill={kneeColor} opacity="0.4" />
            <circle cx="57" cy="142" r="11" fill={kneeColor} opacity="0.4" />
          </svg>
        </div>

        {/* Joint Breakdown Status Indicators */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.65rem 0.85rem', backgroundColor: 'rgba(15, 23, 42, 0.6)', borderRadius: '0.75rem', border: '1px solid #1f2937' }}>
            <div>
              <div style={{ fontSize: '0.75rem', fontWeight: 800, color: '#ffffff' }}>Patellofemoral & ACL (Knees)</div>
              <div style={{ fontSize: '0.65rem', color: '#94a3b8' }}>{anomalies.Knee || 'Normal Knee Alignment'}</div>
            </div>
            <span style={{ fontSize: '0.65rem', fontWeight: 800, padding: '0.2rem 0.5rem', borderRadius: '9999px', backgroundColor: `${kneeColor}22`, color: kneeColor, border: `1px solid ${kneeColor}44` }}>
              {kneeRisk} Risk
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.65rem 0.85rem', backgroundColor: 'rgba(15, 23, 42, 0.6)', borderRadius: '0.75rem', border: '1px solid #1f2937' }}>
            <div>
              <div style={{ fontSize: '0.75rem', fontWeight: 800, color: '#ffffff' }}>Hamstring & Pelvis (Hips)</div>
              <div style={{ fontSize: '0.65rem', color: '#94a3b8' }}>{anomalies.Hip || 'Normal Hip Mechanics'}</div>
            </div>
            <span style={{ fontSize: '0.65rem', fontWeight: 800, padding: '0.2rem 0.5rem', borderRadius: '9999px', backgroundColor: `${hipColor}22`, color: hipColor, border: `1px solid ${hipColor}44` }}>
              {hipRisk} Risk
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.65rem 0.85rem', backgroundColor: 'rgba(15, 23, 42, 0.6)', borderRadius: '0.75rem', border: '1px solid #1f2937' }}>
            <div>
              <div style={{ fontSize: '0.75rem', fontWeight: 800, color: '#ffffff' }}>Scapular & Rotator Cuff (Shoulders)</div>
              <div style={{ fontSize: '0.65rem', color: '#94a3b8' }}>{anomalies.Shoulder || 'Torque Balanced'}</div>
            </div>
            <span style={{ fontSize: '0.65rem', fontWeight: 800, padding: '0.2rem 0.5rem', borderRadius: '9999px', backgroundColor: `${shoulderColor}22`, color: shoulderColor, border: `1px solid ${shoulderColor}44` }}>
              {shoulderRisk} Risk
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}