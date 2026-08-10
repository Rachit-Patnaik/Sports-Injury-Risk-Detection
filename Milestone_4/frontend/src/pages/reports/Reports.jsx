import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Print,
  GetApp,
  Verified,
  Assessment,
  Warning,
  FitnessCenter,
  Shield,
  Person,
  Event,
  MedicalServices,
  CheckCircle,
  TableView,
} from '@mui/icons-material';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

const cardVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: 'spring', stiffness: 240, damping: 20 },
  },
};

export default function Reports() {
  const [reportData, setReportData] = useState(null);

  useEffect(() => {
    const saved = localStorage.getItem('latest_report');
    if (saved) {
      try {
        setReportData(JSON.parse(saved));
        return;
      } catch (e) {
        console.error('Error parsing localStorage report', e);
      }
    }
    // Fallback Data
    setReportData({
      'Overall Score': 72,
      'Overall Risk': 'HIGH',
      Predictions: {
        'ACL Risk': 'Moderate',
        'Hamstring Risk': 'High',
        'Shoulder Risk': 'High',
        'Gait Symmetry': 'Average',
      },
      Anomalies: {
        Knee: 'Severe Knee Imbalance',
        Hip: 'Hip Instability',
        Shoulder: 'Shoulder Imbalance',
        Gait: 'Abnormal Gait',
      },
      Recommendations: [
        'Reduce training intensity and consult a physiotherapist if symptoms persist.',
        'Increase hamstring flexibility and eccentric strengthening exercises.',
        'Improve shoulder mobility and rotator cuff strength.',
        'Improve shoulder symmetry with posture and mobility drills.',
        'Perform gait retraining to improve walking/running mechanics.',
      ],
      Activity: 'Running',
    });
  }, []);

  if (!reportData) return null;

  const predictions = reportData.Predictions || {};
  const score = reportData['Overall Score'] ?? 72;
  const overallRisk = reportData['Overall Risk'] || 'HIGH';
  const anomalies = reportData.Anomalies || {};
  const recommendations = reportData.Recommendations || [];
  const activity = reportData.Activity || 'Running';

  // 1. Native Print / PDF Save Action
  const handlePrintPDF = () => {
    window.print();
  };

  // 2. Structured CSV / Excel Export Engine
  const handleExportExcelCSV = () => {
    let csvContent = 'data:text/csv;charset=utf-8,';
    csvContent += 'SPORTS INJURY RISK EVALUATION REPORT\n';
    csvContent += `Generated Date,${new Date().toLocaleDateString()}\n`;
    csvContent += `Athlete ID,ATH-8842\n`;
    csvContent += `Movement Context,${activity}\n`;
    csvContent += `Overall Score,${score}%\n`;
    csvContent += `Overall Hazard Rating,${overallRisk}\n\n`;

    csvContent += 'PREDICTIVE INJURY CATEGORIZATION\n';
    csvContent += 'Risk Category,Evaluated Level\n';
    Object.entries(predictions).forEach(([key, val]) => {
      csvContent += `"${key}","${val}"\n`;
    });

    csvContent += '\nDETECTED MOTION ANOMALIES\n';
    csvContent += 'Body Segment,Status\n';
    Object.entries(anomalies).forEach(([joint, status]) => {
      csvContent += `"${joint}","${status}"\n`;
    });

    csvContent += '\nTARGETED CORRECTIVE RECOMMENDATIONS\n';
    csvContent += 'Index,Protocol Description\n';
    recommendations.forEach((rec, idx) => {
      csvContent += `"${idx + 1}","${rec.replace(/"/g, '""')}"\n`;
    });

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `Sports_Injury_Assessment_${activity}_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // 3. Raw JSON Export Action
  const handleDownloadJSON = () => {
    const dataStr =
      'data:text/json;charset=utf-8,' +
      encodeURIComponent(JSON.stringify(reportData, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute(
      'download',
      `sports_injury_report_${activity}_${Date.now()}.json`
    );
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

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

  return (
    <motion.div
      className="p-6 md:p-8 max-w-[1500px] mx-auto space-y-8 text-slate-100 print:p-0 print:bg-white print:text-black"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Header Bar */}
      <motion.div
        variants={cardVariants}
        className="sports-card p-6 border-indigo-500/30 flex flex-col md:flex-row md:items-center justify-between gap-6 print:border-none print:shadow-none"
      >
        <div className="space-y-1.5">
          <div className="flex items-center space-x-3" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <h1 className="text-2xl md:text-3xl font-black text-white tracking-tight m-0">
              Biomechanical Evaluation Report
            </h1>
            <Verified className="text-indigo-400" fontSize="medium" />
          </div>
          <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400 font-medium pt-1" style={{ display: 'flex', gap: '1rem' }}>
            <span className="flex items-center gap-1.5">
              <Event fontSize="inherit" className="text-indigo-400" />
              Generated: {new Date().toLocaleDateString()}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1.5">
              <Person fontSize="inherit" className="text-indigo-400" />
              Athlete ID: ATH-8842
            </span>
            <span>•</span>
            <span className="flex items-center gap-1.5">
              <MedicalServices fontSize="inherit" className="text-indigo-400" />
              Activity Context: {activity}
            </span>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center space-x-3 print:hidden" style={{ display: 'flex', gap: '0.75rem' }}>
          <button
            onClick={handlePrintPDF}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.6rem 1rem',
              backgroundColor: '#4f46e5',
              color: '#ffffff',
              borderRadius: '0.75rem',
              fontSize: '0.75rem',
              fontWeight: 700,
              border: 'none',
              cursor: 'pointer',
              boxShadow: '0 4px 12px rgba(79, 70, 229, 0.3)',
            }}
          >
            <Print fontSize="small" />
            <span>Print / Export PDF</span>
          </button>

          <button
            onClick={handleExportExcelCSV}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.6rem 1rem',
              backgroundColor: '#10b981',
              color: '#ffffff',
              borderRadius: '0.75rem',
              fontSize: '0.75rem',
              fontWeight: 700,
              border: 'none',
              cursor: 'pointer',
              boxShadow: '0 4px 12px rgba(16, 185, 129, 0.3)',
            }}
          >
            <TableView fontSize="small" />
            <span>Export Excel (CSV)</span>
          </button>

          <button
            onClick={handleDownloadJSON}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.6rem 1rem',
              backgroundColor: '#1f2937',
              color: '#e2e8f0',
              borderRadius: '0.75rem',
              fontSize: '0.75rem',
              fontWeight: 700,
              border: '1px solid #374151',
              cursor: 'pointer',
            }}
          >
            <GetApp fontSize="small" />
            <span>JSON</span>
          </button>
        </div>
      </motion.div>

      {/* Main Grid */}
      <div className="sports-grid-3">
        <motion.div variants={cardVariants} className="sports-card p-6 space-y-4">
          <div className="flex-between pb-3 border-b border-slate-800/80" style={{ borderBottom: '1px solid #1f2937', paddingBottom: '0.75rem' }}>
            <div className="flex items-center space-x-2" style={{ display: 'flex', gap: '0.5rem' }}>
              <Assessment className="text-indigo-400" fontSize="small" />
              <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider m-0">
                Risk Categorization
              </h3>
            </div>
            <span className="text-[10px] font-mono text-slate-500">ML Model Output</span>
          </div>

          <div className="space-y-3" style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {Object.entries(predictions).map(([key, val]) => (
              <div
                key={key}
                className="flex-between p-3 bg-slate-900/60 rounded-xl border border-slate-800/80"
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '0.75rem',
                  backgroundColor: 'rgba(15, 23, 42, 0.6)',
                  borderRadius: '0.75rem',
                  border: '1px solid #1f2937',
                }}
              >
                <span style={{ fontSize: '0.75rem', fontWeight: 600, color: '#cbd5e1' }}>{key}</span>
                <span className={getBadgeClass(val)}>{val}</span>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          variants={cardVariants}
          className="sports-card p-6 flex flex-col justify-between"
          style={{ gridColumn: 'span 2 / span 2' }}
        >
          <div>
            <span style={{ fontSize: '0.7rem', fontWeight: 800, color: '#94a3b8', textTransform: 'uppercase' }}>
              Composite Hazard Rating ({activity})
            </span>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '1.5rem', margin: '0.75rem 0' }}>
              <span style={{ fontSize: '3.5rem', fontWeight: 900, color: '#ffffff' }}>{score}%</span>
              <span className={getBadgeClass(overallRisk)}>{overallRisk} HAZARD</span>
            </div>
          </div>

          <p style={{ fontSize: '0.75rem', color: '#94a3b8', lineHeight: 1.5, borderTop: '1px solid #1f2937', paddingTop: '1rem', margin: 0 }}>
            The overall risk index is computed using weighted joint angle parameters extracted from video motion capture during {activity} execution. High variability or asymmetry in key joints triggers targeted preventative recommendations.
          </p>
        </motion.div>
      </div>

      {/* Anomalies & Recommendations Matrix */}
      <div className="sports-grid-2">
        <motion.div variants={cardVariants} className="sports-card p-6 space-y-4">
          <div className="flex-between pb-3 border-b border-slate-800/80" style={{ borderBottom: '1px solid #1f2937', paddingBottom: '0.75rem' }}>
            <div className="flex items-center space-x-2" style={{ display: 'flex', gap: '0.5rem' }}>
              <Warning className="text-amber-400" fontSize="small" />
              <h3 className="text-xs font-bold text-slate-200 uppercase tracking-wider m-0">
                Detected Motion Anomalies
              </h3>
            </div>
          </div>

          <div className="sports-grid-2" style={{ gap: '0.75rem' }}>
            {Object.entries(anomalies).map(([joint, status]) => (
              <div
                key={joint}
                style={{
                  padding: '0.85rem',
                  backgroundColor: 'rgba(15, 23, 42, 0.6)',
                  borderRadius: '0.75rem',
                  border: '1px solid #1f2937',
                }}
              >
                <div style={{ fontSize: '0.65rem', fontWeight: 800, color: '#94a3b8', textTransform: 'uppercase' }}>
                  {joint} Segment
                </div>
                <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#f8fafc', marginTop: '0.25rem' }}>
                  {status}
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div variants={cardVariants} className="sports-card p-6 space-y-4">
          <div className="flex-between pb-3 border-b border-slate-800/80" style={{ borderBottom: '1px solid #1f2937', paddingBottom: '0.75rem' }}>
            <div className="flex items-center space-x-2" style={{ display: 'flex', gap: '0.5rem' }}>
              <FitnessCenter className="text-emerald-400" fontSize="small" />
              <h3 className="text-xs font-bold text-slate-200 uppercase tracking-wider m-0">
                Targeted Corrective Protocols
              </h3>
            </div>
          </div>

          <div className="space-y-2.5">
            {recommendations.map((rec, idx) => (
              <div
                key={idx}
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '0.6rem',
                  fontSize: '0.7rem',
                  color: '#e2e8f0',
                  backgroundColor: 'rgba(15, 23, 42, 0.6)',
                  padding: '0.75rem',
                  borderRadius: '0.75rem',
                  border: '1px solid #1f2937',
                }}
              >
                <CheckCircle fontSize="small" style={{ color: '#10b981', flexShrink: 0, marginTop: '0.1rem' }} />
                <span style={{ lineHeight: 1.4, fontWeight: 500 }}>{rec}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Footer Notice */}
      <motion.div
        variants={cardVariants}
        className="sports-card p-6 border-slate-800 flex flex-col md:flex-row items-center justify-between gap-6"
      >
        <div className="flex items-center space-x-4" style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <Shield fontSize="medium" style={{ color: '#818cf8' }} />
          <div>
            <h4 style={{ fontSize: '0.75rem', fontWeight: 800, color: '#e2e8f0', textTransform: 'uppercase', margin: 0 }}>
              Academic & Clinical Disclaimer
            </h4>
            <p style={{ fontSize: '0.7rem', color: '#94a3b8', margin: 0, marginTop: '0.2rem' }}>
              Generated using computer-vision pose estimation models for injury screening and training load optimization.
            </p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}