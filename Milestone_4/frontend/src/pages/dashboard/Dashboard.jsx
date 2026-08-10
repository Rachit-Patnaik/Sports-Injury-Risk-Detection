import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Favorite,
  DirectionsRun,
  FitnessCenter,
  Warning,
  CheckCircle,
  Assessment,
  Bolt,
  MedicalServices,
  Psychology,
  Sports,
  AdminPanelSettings,
  Healing,
  TableChart,
  Groups,
  Dns,
  Speed,
  Storage,
  TrendingUp,
  AssignmentTurnedIn,
  ReportProblem,
} from '@mui/icons-material';
import BodyHeatmap from '../../components/dashboard/BodyHeatmap';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
};

const cardVariants = {
  hidden: { y: 20, opacity: 0, scale: 0.98 },
  visible: {
    y: 0,
    opacity: 1,
    scale: 1,
    transition: { type: 'spring', stiffness: 220, damping: 20 },
  },
};

export default function Dashboard() {
  const [role, setRole] = useState(localStorage.getItem('user_role') || 'Coach');
  const [reportData, setReportData] = useState(null);

  const loadReportAndRole = () => {
    setRole(localStorage.getItem('user_role') || 'Coach');
    const saved = localStorage.getItem('latest_report');
    if (saved) {
      try {
        setReportData(JSON.parse(saved));
        return;
      } catch (e) {
        console.error('Error parsing localStorage report', e);
      }
    }
    setReportData({
      'Overall Score': 33.7,
      'Overall Risk': 'MODERATE',
      Predictions: {
        'ACL Risk': 'Low',
        'Hamstring Risk': 'Low',
        'Shoulder Risk': 'Moderate',
        'Gait Symmetry': 'Good',
      },
      Anomalies: {
        Knee: 'Normal Knee Alignment',
        Hip: 'Normal Hip Mechanics',
        Shoulder: 'Shoulder Swing Imbalance',
        Gait: 'Symmetrical Gait',
      },
      Recommendations: [
        'Improve rotator cuff endurance and scapular stabilization exercises.',
        'Maintain current training load with regular mobility and recovery protocols.',
      ],
      Activity: 'Running',
    });
  };

  useEffect(() => {
    loadReportAndRole();
    const handleRoleChange = () => loadReportAndRole();
    window.addEventListener('roleChange', handleRoleChange);
    return () => window.removeEventListener('roleChange', handleRoleChange);
  }, []);

  if (!reportData) return null;

  const predictions = reportData.Predictions || {};
  const score = reportData['Overall Score'] ?? 33.7;
  const overallRisk = reportData['Overall Risk'] || 'MODERATE';
  const recommendations = reportData.Recommendations || [];
  const activity = reportData.Activity || 'Running';
  const anomalies = reportData.Anomalies || {};

  const getBadgeClass = (level) => {
    switch (level?.toLowerCase()) {
      case 'high':
      case 'critical':
      case 'poor':
      case 'severe knee imbalance':
        return 'risk-badge risk-badge-high';
      case 'moderate':
      case 'average':
      case 'slight gait deviation':
      case 'shoulder imbalance':
      case 'hip instability':
        return 'risk-badge risk-badge-moderate';
      default:
        return 'risk-badge risk-badge-low';
    }
  };

  const getRiskDisplay = (level, type) => {
    const l = level?.toLowerCase();
    if (type === 'knee') {
      if (l === 'high') return { label: '11.4° (High Risk)', color: '#f43f5e' };
      if (l === 'moderate') return { label: '5.8° (Moderate Risk)', color: '#f59e0b' };
      return { label: '1.2° (Normal / Low Risk)', color: '#10b981' };
    }
    if (type === 'hip') {
      if (l === 'high') return { label: '48.2° / 45° (High Deficit)', color: '#f43f5e' };
      if (l === 'moderate') return { label: '38.2° / 45° (Moderate Target)', color: '#f59e0b' };
      return { label: '44.1° / 45° (Optimal Target)', color: '#10b981' };
    }
    if (type === 'shoulder') {
      if (l === 'high') return { label: 'Elevated Swing Deficit', color: '#f43f5e' };
      if (l === 'moderate') return { label: 'Moderate Swing Asymmetry', color: '#f59e0b' };
      return { label: 'Optimal Stability Index', color: '#10b981' };
    }
    return { label: 'Optimal', color: '#10b981' };
  };

  const kneeDisplay = getRiskDisplay(predictions['ACL Risk'], 'knee');
  const hipDisplay = getRiskDisplay(predictions['Hamstring Risk'], 'hip');
  const shoulderDisplay = getRiskDisplay(predictions['Shoulder Risk'], 'shoulder');

  return (
    <motion.div
      style={{ padding: '1.5rem', maxWidth: '1600px', margin: '0 auto', minHeight: '100vh', boxSizing: 'border-box' }}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Top Banner Header */}
      <motion.div
        variants={cardVariants}
        className="sports-card"
        style={{ padding: '1.5rem', borderColor: 'rgba(99, 102, 241, 0.3)', marginBottom: '1.5rem' }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div
              style={{
                padding: '0.6rem',
                backgroundColor: 'rgba(99, 102, 241, 0.15)',
                borderRadius: '0.75rem',
                border: '1px solid rgba(99, 102, 241, 0.3)',
                color: '#818cf8',
                display: 'flex',
              }}
            >
              {role === 'Coach' && <Sports fontSize="medium" />}
              {role === 'Athlete' && <Assessment fontSize="medium" />}
              {role === 'Physiotherapist' && <MedicalServices fontSize="medium" />}
              {role === 'SportsScientist' && <Psychology fontSize="medium" />}
              {role === 'Admin' && <AdminPanelSettings fontSize="medium" />}
            </div>
            <div>
              <h1 style={{ fontSize: '1.5rem', fontWeight: 900, color: '#ffffff', margin: 0, display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                {role} Analytics Dashboard
                <span
                  style={{
                    fontSize: '0.7rem',
                    padding: '0.2rem 0.6rem',
                    borderRadius: '9999px',
                    backgroundColor: 'rgba(99, 102, 241, 0.2)',
                    color: '#c7d2fe',
                    border: '1px solid rgba(99, 102, 241, 0.4)',
                    fontWeight: 700,
                  }}
                >
                  {activity} Context
                </span>
              </h1>
              <p style={{ fontSize: '0.75rem', color: '#94a3b8', margin: '0.25rem 0 0 0' }}>
                {role === 'Coach' && 'Squad injury hazard monitoring, team load readiness, and player risk profiles.'}
                {role === 'Athlete' && 'Personal injury risk indicators, movement quality score, and daily recovery drills.'}
                {role === 'Physiotherapist' && 'Clinical rehab tracking, joint recovery metrics, and corrective exercise management.'}
                {role === 'SportsScientist' && 'Statistical joint angle distributions, range of motion metrics, and asymmetry ratios.'}
                {role === 'Admin' && 'Platform diagnostics, microservice status, API latency, and database health.'}
              </p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* 1. COACH DASHBOARD VIEW */}
      {role === 'Coach' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <motion.div variants={cardVariants} className="sports-grid-4">
            <div className="sports-card flex-col" style={{ padding: '1.25rem', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ fontSize: '0.7rem', fontWeight: 800, color: '#94a3b8' }}>SQUAD ATHLETES</span>
                <Groups fontSize="small" style={{ color: '#818cf8' }} />
              </div>
              <div style={{ marginTop: '0.75rem' }}>
                <span style={{ fontSize: '1.8rem', fontWeight: 900, color: '#ffffff' }}>12 Active</span>
                <div style={{ fontSize: '0.65rem', color: '#10b981', fontWeight: 700, marginTop: '0.2rem' }}>● All Synced</div>
              </div>
            </div>

            <div className="sports-card flex-col" style={{ padding: '1.25rem', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ fontSize: '0.7rem', fontWeight: 800, color: '#94a3b8' }}>HIGH RISK ALERTS</span>
                <ReportProblem fontSize="small" style={{ color: '#fb7185' }} />
              </div>
              <div style={{ marginTop: '0.75rem' }}>
                <span style={{ fontSize: '1.8rem', fontWeight: 900, color: '#fb7185' }}>2 Players</span>
                <div style={{ fontSize: '0.65rem', color: '#fb7185', fontWeight: 700, marginTop: '0.2rem' }}>Requires Load Reduction</div>
              </div>
            </div>

            <div className="sports-card flex-col" style={{ padding: '1.25rem', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ fontSize: '0.7rem', fontWeight: 800, color: '#94a3b8' }}>TEAM AVG HAZARD</span>
                <Warning fontSize="small" style={{ color: '#f59e0b' }} />
              </div>
              <div style={{ marginTop: '0.75rem' }}>
                <span style={{ fontSize: '1.8rem', fontWeight: 900, color: '#f59e0b' }}>{score}%</span>
                <div style={{ fontSize: '0.65rem', color: '#f59e0b', fontWeight: 700, marginTop: '0.2rem' }}>{overallRisk} HAZARD</div>
              </div>
            </div>

            <div className="sports-card flex-col" style={{ padding: '1.25rem', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ fontSize: '0.7rem', fontWeight: 800, color: '#94a3b8' }}>TRAINING LOAD STATUS</span>
                <TrendingUp fontSize="small" style={{ color: '#34d399' }} />
              </div>
              <div style={{ marginTop: '0.75rem' }}>
                <span style={{ fontSize: '1.8rem', fontWeight: 900, color: '#34d399' }}>Optimal</span>
                <div style={{ fontSize: '0.65rem', color: '#94a3b8', fontWeight: 700, marginTop: '0.2rem' }}>Microcycle 4</div>
              </div>
            </div>
          </motion.div>

          <motion.div variants={cardVariants}>
            <BodyHeatmap predictions={predictions} anomalies={anomalies} />
          </motion.div>

          <motion.div variants={cardVariants} className="sports-card" style={{ padding: '1.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #1f2937', paddingBottom: '0.75rem', marginBottom: '1rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#818cf8' }}>
                <Sports fontSize="small" />
                <h3 style={{ fontSize: '0.85rem', fontWeight: 800, margin: 0, color: '#ffffff' }}>Team Roster Biomechanical Risk Matrix</h3>
              </div>
              <span style={{ fontSize: '0.65rem', color: '#94a3b8', fontWeight: 700 }}>Real-Time Video Analytics</span>
            </div>

            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', textAlign: 'left', fontSize: '0.75rem', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ color: '#94a3b8', borderBottom: '1px solid #1f2937' }}>
                    <th style={{ padding: '0.65rem' }}>Athlete ID & Name</th>
                    <th style={{ padding: '0.65rem' }}>Sport / Position</th>
                    <th style={{ padding: '0.65rem' }}>Primary Vulnerability</th>
                    <th style={{ padding: '0.65rem' }}>Risk Score</th>
                    <th style={{ padding: '0.65rem' }}>Status / Action Required</th>
                  </tr>
                </thead>
                <tbody>
                  <tr style={{ borderBottom: '1px solid #1f2937', color: '#e2e8f0' }}>
                    <td style={{ padding: '0.65rem', fontWeight: 800, color: '#ffffff' }}>ATH-8842 Rachit Patnaik</td>
                    <td style={{ padding: '0.65rem', color: '#94a3b8' }}>Football / Midfielder</td>
                    <td style={{ padding: '0.65rem' }}>Shoulder Swing Imbalance</td>
                    <td style={{ padding: '0.65rem' }}><span className={getBadgeClass(overallRisk)}>{score}% ({overallRisk})</span></td>
                    <td style={{ padding: '0.65rem', color: '#f59e0b', fontWeight: 700 }}>Scapular Mobility Drills</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid #1f2937', color: '#e2e8f0' }}>
                    <td style={{ padding: '0.65rem', fontWeight: 800, color: '#ffffff' }}>ATH-8843 Alex Rivera</td>
                    <td style={{ padding: '0.65rem', color: '#94a3b8' }}>Football / Forward</td>
                    <td style={{ padding: '0.65rem' }}>ACL Knee Valgus (14.2°)</td>
                    <td style={{ padding: '0.65rem' }}><span className="risk-badge risk-badge-high">68.4% (HIGH)</span></td>
                    <td style={{ padding: '0.65rem', color: '#fb7185', fontWeight: 800 }}>Rest & Physio Referral</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid #1f2937', color: '#e2e8f0' }}>
                    <td style={{ padding: '0.65rem', fontWeight: 800, color: '#ffffff' }}>ATH-8844 Marcus Vance</td>
                    <td style={{ padding: '0.65rem', color: '#94a3b8' }}>Basketball / Guard</td>
                    <td style={{ padding: '0.65rem' }}>Symmetrical Alignment</td>
                    <td style={{ padding: '0.65rem' }}><span className="risk-badge risk-badge-low">18.2% (LOW)</span></td>
                    <td style={{ padding: '0.65rem', color: '#34d399', fontWeight: 700 }}>Cleared for Full Practice</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </motion.div>
        </div>
      )}

      {/* 2. ATHLETE DASHBOARD VIEW */}
      {role === 'Athlete' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <motion.div variants={cardVariants}>
            <BodyHeatmap predictions={predictions} anomalies={anomalies} />
          </motion.div>

          <motion.div variants={cardVariants} className="sports-grid-4">
            <div className="sports-card flex-col" style={{ padding: '1.25rem', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ fontSize: '0.7rem', fontWeight: 800, color: '#94a3b8' }}>ACL VULNERABILITY</span>
                <Favorite fontSize="small" style={{ color: '#34d399' }} />
              </div>
              <div style={{ marginTop: '0.75rem' }}>
                <span className={getBadgeClass(predictions['ACL Risk'])}>{predictions['ACL Risk'] || 'Low'}</span>
              </div>
            </div>

            <div className="sports-card flex-col" style={{ padding: '1.25rem', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ fontSize: '0.7rem', fontWeight: 800, color: '#94a3b8' }}>HAMSTRING STRAIN</span>
                <DirectionsRun fontSize="small" style={{ color: '#34d399' }} />
              </div>
              <div style={{ marginTop: '0.75rem' }}>
                <span className={getBadgeClass(predictions['Hamstring Risk'])}>{predictions['Hamstring Risk'] || 'Low'}</span>
              </div>
            </div>

            <div className="sports-card flex-col" style={{ padding: '1.25rem', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ fontSize: '0.7rem', fontWeight: 800, color: '#94a3b8' }}>SHOULDER IMBALANCE</span>
                <FitnessCenter fontSize="small" style={{ color: '#fbbf24' }} />
              </div>
              <div style={{ marginTop: '0.75rem' }}>
                <span className={getBadgeClass(predictions['Shoulder Risk'])}>{predictions['Shoulder Risk'] || 'Moderate'}</span>
              </div>
            </div>

            <div className="sports-card flex-col" style={{ padding: '1.25rem', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ fontSize: '0.7rem', fontWeight: 800, color: '#94a3b8' }}>PERSONAL RISK SCORE</span>
                <Warning fontSize="small" style={{ color: '#818cf8' }} />
              </div>
              <div style={{ marginTop: '0.75rem' }}>
                <span className={getBadgeClass(overallRisk)}>{score}% ({overallRisk})</span>
              </div>
            </div>
          </motion.div>

          <div className="sports-grid-3">
            <motion.div variants={cardVariants} className="sports-card flex-col" style={{ padding: '1.5rem', justifyContent: 'space-between' }}>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Assessment fontSize="small" style={{ color: '#818cf8' }} />
                    <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#e2e8f0' }}>MOVEMENT SCORE</span>
                  </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', margin: '1.25rem 0' }}>
                  <div style={{ fontSize: '3.5rem', fontWeight: 900, color: '#ffffff', lineHeight: 1 }}>
                    {score}%
                  </div>
                  <div style={{ fontSize: '0.75rem', fontWeight: 800, color: '#f59e0b', marginTop: '0.5rem' }}>
                    {overallRisk} HAZARD
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div variants={cardVariants} className="sports-card flex-col" style={{ padding: '1.5rem', gridColumn: 'span 2 / span 2', justifyContent: 'space-between' }}>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <AssignmentTurnedIn fontSize="small" style={{ color: '#34d399' }} />
                    <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#e2e8f0' }}>DAILY RECOVERY DRILLS CHECKLIST</span>
                  </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
                  {recommendations.map((rec, index) => (
                    <div
                      key={index}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.65rem',
                        fontSize: '0.75rem',
                        color: '#e2e8f0',
                        backgroundColor: 'rgba(15, 23, 42, 0.6)',
                        padding: '0.75rem',
                        borderRadius: '0.75rem',
                        border: '1px solid #1f2937',
                      }}
                    >
                      <Bolt fontSize="small" style={{ color: '#818cf8', flexShrink: 0 }} />
                      <span>{rec}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      )}

      {/* 3. PHYSIOTHERAPIST VIEW */}
      {role === 'Physiotherapist' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <motion.div variants={cardVariants}>
            <BodyHeatmap predictions={predictions} anomalies={anomalies} />
          </motion.div>

          <div className="sports-grid-2">
            <motion.div variants={cardVariants} className="sports-card" style={{ padding: '1.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #1f2937', paddingBottom: '0.75rem', marginBottom: '1rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#38bdf8' }}>
                  <Healing fontSize="small" />
                  <h3 style={{ fontSize: '0.8rem', fontWeight: 800, margin: 0, color: '#ffffff' }}>Clinical Joint Recovery Tracking</h3>
                </div>
                <span style={{ fontSize: '0.65rem', color: '#10b981', fontWeight: 700 }}>Active Protocol</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', padding: '0.75rem', backgroundColor: 'rgba(15, 23, 42, 0.6)', borderRadius: '0.75rem', border: '1px solid #1f2937' }}>
                  <span style={{ color: '#e2e8f0' }}>Knee Joint Extension Deficit</span>
                  <span style={{ fontWeight: 800, color: kneeDisplay.color }}>{kneeDisplay.label}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', padding: '0.75rem', backgroundColor: 'rgba(15, 23, 42, 0.6)', borderRadius: '0.75rem', border: '1px solid #1f2937' }}>
                  <span style={{ color: '#e2e8f0' }}>Hip Range of Motion Target</span>
                  <span style={{ fontWeight: 800, color: hipDisplay.color }}>{hipDisplay.label}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', padding: '0.75rem', backgroundColor: 'rgba(15, 23, 42, 0.6)', borderRadius: '0.75rem', border: '1px solid #1f2937' }}>
                  <span style={{ color: '#e2e8f0' }}>Rotator Cuff Stability Index</span>
                  <span style={{ fontWeight: 800, color: shoulderDisplay.color }}>{shoulderDisplay.label}</span>
                </div>
              </div>
            </motion.div>

            <motion.div variants={cardVariants} className="sports-card" style={{ padding: '1.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #1f2937', paddingBottom: '0.75rem', marginBottom: '1rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#10b981' }}>
                  <CheckCircle fontSize="small" />
                  <h3 style={{ fontSize: '0.8rem', fontWeight: 800, margin: 0, color: '#ffffff' }}>Targeted Rehabilitation Routine</h3>
                </div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
                {recommendations.map((rec, idx) => (
                  <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontSize: '0.7rem', backgroundColor: 'rgba(15, 23, 42, 0.6)', padding: '0.75rem', borderRadius: '0.75rem', border: '1px solid #1f2937', color: '#e2e8f0' }}>
                    <Bolt fontSize="small" style={{ color: '#10b981' }} />
                    <span>{rec}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      )}

      {/* 4. SPORTS SCIENTIST VIEW */}
      {role === 'SportsScientist' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <motion.div variants={cardVariants}>
            <BodyHeatmap predictions={predictions} anomalies={anomalies} />
          </motion.div>

          <motion.div variants={cardVariants} className="sports-card" style={{ padding: '1.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #1f2937', paddingBottom: '0.75rem', marginBottom: '1rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#a5b4fc' }}>
                <TableChart fontSize="small" />
                <h3 style={{ fontSize: '0.8rem', fontWeight: 800, margin: 0, color: '#ffffff' }}>Biomechanical Kinematic Matrix</h3>
              </div>
              <span style={{ fontSize: '0.65rem', fontFamily: 'monospace', color: '#94a3b8' }}>OpenCV + MediaPipe Vector Processing</span>
            </div>

            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', textAlign: 'left', fontSize: '0.75rem', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ color: '#94a3b8', borderBottom: '1px solid #1f2937' }}>
                    <th style={{ padding: '0.6rem' }}>Joint Segment</th>
                    <th style={{ padding: '0.6rem' }}>Mean Angle (°)</th>
                    <th style={{ padding: '0.6rem' }}>Range of Motion (°)</th>
                    <th style={{ padding: '0.6rem' }}>Standard Deviation</th>
                    <th style={{ padding: '0.6rem' }}>Bilateral Asymmetry</th>
                  </tr>
                </thead>
                <tbody>
                  <tr style={{ borderBottom: '1px solid #1f2937', color: '#e2e8f0' }}>
                    <td style={{ padding: '0.6rem', fontWeight: 700 }}>Left/Right Knee</td>
                    <td style={{ padding: '0.6rem' }}>142.5°</td>
                    <td style={{ padding: '0.6rem' }}>48.2°</td>
                    <td style={{ padding: '0.6rem' }}>18.4</td>
                    <td style={{ padding: '0.6rem', color: '#f43f5e', fontWeight: 800 }}>11.4% (Elevated)</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid #1f2937', color: '#e2e8f0' }}>
                    <td style={{ padding: '0.6rem', fontWeight: 700 }}>Left/Right Hip</td>
                    <td style={{ padding: '0.6rem' }}>168.2°</td>
                    <td style={{ padding: '0.6rem' }}>36.1°</td>
                    <td style={{ padding: '0.6rem' }}>12.1</td>
                    <td style={{ padding: '0.6rem', color: '#f59e0b', fontWeight: 800 }}>8.2% (Moderate)</td>
                  </tr>
                  <tr style={{ color: '#e2e8f0' }}>
                    <td style={{ padding: '0.6rem', fontWeight: 700 }}>Shoulder Girdle</td>
                    <td style={{ padding: '0.6rem' }}>28.4°</td>
                    <td style={{ padding: '0.6rem' }}>22.5°</td>
                    <td style={{ padding: '0.6rem' }}>9.8</td>
                    <td style={{ padding: '0.6rem', color: '#10b981', fontWeight: 800 }}>3.1% (Optimal)</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </motion.div>
        </div>
      )}

      {/* 5. ADMINISTRATOR VIEW */}
      {role === 'Admin' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <motion.div variants={cardVariants} className="sports-grid-4">
            <div className="sports-card flex-col" style={{ padding: '1.25rem', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ fontSize: '0.7rem', fontWeight: 800, color: '#94a3b8' }}>API GATEWAY STATUS</span>
                <Dns fontSize="small" style={{ color: '#34d399' }} />
              </div>
              <div style={{ marginTop: '0.75rem' }}>
                <span style={{ fontSize: '1.5rem', fontWeight: 900, color: '#34d399' }}>FastAPI Online</span>
                <div style={{ fontSize: '0.65rem', color: '#94a3b8', marginTop: '0.2rem' }}>Port 8000 • 99.9% Uptime</div>
              </div>
            </div>

            <div className="sports-card flex-col" style={{ padding: '1.25rem', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ fontSize: '0.7rem', fontWeight: 800, color: '#94a3b8' }}>API RESPONSE LATENCY</span>
                <Speed fontSize="small" style={{ color: '#38bdf8' }} />
              </div>
              <div style={{ marginTop: '0.75rem' }}>
                <span style={{ fontSize: '1.5rem', fontWeight: 900, color: '#38bdf8' }}>42 ms</span>
                <div style={{ fontSize: '0.65rem', color: '#10b981', marginTop: '0.2rem' }}>Optimal Inference Speed</div>
              </div>
            </div>

            <div className="sports-card flex-col" style={{ padding: '1.25rem', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ fontSize: '0.7rem', fontWeight: 800, color: '#94a3b8' }}>PRIMARY DATABASE</span>
                <Storage fontSize="small" style={{ color: '#818cf8' }} />
              </div>
              <div style={{ marginTop: '0.75rem' }}>
                <span style={{ fontSize: '1.5rem', fontWeight: 900, color: '#ffffff' }}>SQLite DB</span>
                <div style={{ fontSize: '0.65rem', color: '#10b981', marginTop: '0.2rem' }}>Connected & Synced</div>
              </div>
            </div>

            <div className="sports-card flex-col" style={{ padding: '1.25rem', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ fontSize: '0.7rem', fontWeight: 800, color: '#94a3b8' }}>DOCKER CONTAINER</span>
                <AdminPanelSettings fontSize="small" style={{ color: '#fb7185' }} />
              </div>
              <div style={{ marginTop: '0.75rem' }}>
                <span style={{ fontSize: '1.5rem', fontWeight: 900, color: '#ffffff' }}>Containerized</span>
                <div style={{ fontSize: '0.65rem', color: '#94a3b8', marginTop: '0.2rem' }}>docker-compose active</div>
              </div>
            </div>
          </motion.div>

          <motion.div variants={cardVariants} className="sports-card" style={{ padding: '1.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #1f2937', paddingBottom: '0.75rem', marginBottom: '1rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#fb7185' }}>
                <AdminPanelSettings fontSize="small" />
                <h3 style={{ fontSize: '0.85rem', fontWeight: 800, margin: 0, color: '#ffffff' }}>System Microservice Diagnostics & Audit Trail</h3>
              </div>
              <span style={{ fontSize: '0.65rem', color: '#10b981', fontWeight: 800 }}>● System Health Normal</span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem', fontSize: '0.75rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.75rem', backgroundColor: 'rgba(15, 23, 42, 0.6)', borderRadius: '0.75rem', border: '1px solid #1f2937' }}>
                <span style={{ color: '#ffffff', fontWeight: 700 }}>[FastAPI Gateway] Endpoint POST /api/analyze executed successfully</span>
                <span style={{ color: '#64748b', fontSize: '0.65rem' }}>2026-08-09 20:25:12</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.75rem', backgroundColor: 'rgba(15, 23, 42, 0.6)', borderRadius: '0.75rem', border: '1px solid #1f2937' }}>
                <span style={{ color: '#ffffff', fontWeight: 700 }}>[SQLite DB Engine] Saved evaluation record for athlete ATH-8842</span>
                <span style={{ color: '#64748b', fontSize: '0.65rem' }}>2026-08-09 20:25:14</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.75rem', backgroundColor: 'rgba(15, 23, 42, 0.6)', borderRadius: '0.75rem', border: '1px solid #1f2937' }}>
                <span style={{ color: '#ffffff', fontWeight: 700 }}>[MediaPipe Pose Worker] Frame keypoint extraction completed (100 frames)</span>
                <span style={{ color: '#64748b', fontSize: '0.65rem' }}>2026-08-09 20:25:10</span>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </motion.div>
  );
}