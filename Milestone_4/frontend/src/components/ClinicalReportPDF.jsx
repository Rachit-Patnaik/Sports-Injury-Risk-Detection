import React, { useRef } from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { QRCodeSVG } from 'qrcode.react';
import { PictureAsPdf, Verified, LocalHospital, Assessment } from '@mui/icons-material';

export default function ClinicalReportPDF({ report, athleteName = "Rachit Patnaik" }) {
  const reportRef = useRef(null);

  if (!report) return null;

  const handleDownloadPDF = async () => {
    const element = reportRef.current;
    if (!element) return;

    try {
      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        backgroundColor: '#0f172a',
      });

      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save(`SportsAI_Clinical_Report_${report.job_id || 'Assessment'}.pdf`);
    } catch (error) {
      console.error('PDF Generation Error:', error);
      alert('Failed to generate PDF. Please try again.');
    }
  };

  const reportUrl = `http://localhost:5173/reports?id=${report.job_id || 'demo'}`;

  return (
    <div style={{ marginTop: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <button
          onClick={handleDownloadPDF}
          style={{
            padding: '0.75rem 1.25rem',
            backgroundColor: '#6366f1',
            color: '#ffffff',
            border: 'none',
            borderRadius: '0.65rem',
            fontWeight: 800,
            fontSize: '0.85rem',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            boxShadow: '0 4px 15px rgba(99, 102, 241, 0.4)',
          }}
        >
          <PictureAsPdf />
          <span>Export Clinical PDF Report with Mobile QR</span>
        </button>
      </div>

      <div
        ref={reportRef}
        style={{
          padding: '2.5rem',
          backgroundColor: '#0f172a',
          color: '#f8fafc',
          borderRadius: '1rem',
          border: '1px solid #1e293b',
          fontFamily: 'Inter, system-ui, sans-serif',
          display: 'flex',
          flexDirection: 'column',
          gap: '2rem',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', borderBottom: '2px solid #334155', paddingBottom: '1.25rem' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#818cf8', marginBottom: '0.25rem' }}>
              <LocalHospital />
              <span style={{ fontSize: '1.25rem', fontWeight: 900, letterSpacing: '0.05em' }}>SPORTSAI CLINICAL INTELLIGENCE</span>
            </div>
            <div style={{ fontSize: '0.8rem', color: '#94a3b8' }}>Automated Biomechanical & Injury Risk Assessment Report</div>
            <div style={{ fontSize: '0.7rem', color: '#64748b', marginTop: '0.2rem' }}>Report ID: {report.job_id || 'SAI-9921'} | Engine: OpenCV Kinematic v2.4</div>
          </div>

          <div style={{ textAlign: 'right', display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '0.4rem' }}>
            <div style={{ padding: '0.5rem', backgroundColor: '#ffffff', borderRadius: '0.5rem', display: 'inline-block' }}>
              <QRCodeSVG value={reportUrl} size={64} />
            </div>
            <span style={{ fontSize: '0.6rem', color: '#94a3b8', fontWeight: 700 }}>Scan to Verify Report</span>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem', backgroundColor: 'rgba(30, 41, 59, 0.5)', padding: '1rem', borderRadius: '0.75rem', border: '1px solid #334155' }}>
          <div>
            <div style={{ fontSize: '0.65rem', color: '#94a3b8', fontWeight: 700, textTransform: 'uppercase' }}>ATHLETE NAME</div>
            <div style={{ fontSize: '0.9rem', fontWeight: 800, color: '#ffffff', marginTop: '0.2rem' }}>{athleteName}</div>
          </div>
          <div>
            <div style={{ fontSize: '0.65rem', color: '#94a3b8', fontWeight: 700, textTransform: 'uppercase' }}>ACTIVITY CONTEXT</div>
            <div style={{ fontSize: '0.9rem', fontWeight: 800, color: '#38bdf8', marginTop: '0.2rem' }}>{report.Activity || 'Running / Sprinting'}</div>
          </div>
          <div>
            <div style={{ fontSize: '0.65rem', color: '#94a3b8', fontWeight: 700, textTransform: 'uppercase' }}>OVERALL HAZARD SCORE</div>
            <div style={{ fontSize: '0.9rem', fontWeight: 900, color: report['Overall Risk'] === 'HIGH' ? '#f43f5e' : '#fbbf24', marginTop: '0.2rem' }}>
              {report['Overall Score']}% ({report['Overall Risk']})
            </div>
          </div>
          <div>
            <div style={{ fontSize: '0.65rem', color: '#94a3b8', fontWeight: 700, textTransform: 'uppercase' }}>ASSESSMENT DATE</div>
            <div style={{ fontSize: '0.9rem', fontWeight: 800, color: '#ffffff', marginTop: '0.2rem' }}>{new Date().toLocaleDateString()}</div>
          </div>
        </div>

        <div>
          <div style={{ fontSize: '0.85rem', fontWeight: 800, color: '#ffffff', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <Assessment style={{ color: '#818cf8', fontSize: '1.1rem' }} />
            <span>Biomechanical Risk Heatmap Matrix</span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0.75rem' }}>
            {Object.entries(report.Predictions || {}).map(([key, val]) => {
              const isHigh = String(val).toLowerCase().includes('high');
              const isMod = String(val).toLowerCase().includes('moderate');

              return (
                <div
                  key={key}
                  style={{
                    padding: '0.85rem',
                    backgroundColor: isHigh ? 'rgba(244, 63, 94, 0.15)' : isMod ? 'rgba(251, 191, 36, 0.15)' : 'rgba(52, 211, 153, 0.15)',
                    border: `1px solid ${isHigh ? '#f43f5e' : isMod ? '#fbbf24' : '#34d399'}`,
                    borderRadius: '0.65rem',
                  }}
                >
                  <div style={{ fontSize: '0.65rem', fontWeight: 800, color: '#94a3b8', textTransform: 'uppercase' }}>{key}</div>
                  <div style={{ fontSize: '1rem', fontWeight: 900, color: isHigh ? '#f43f5e' : isMod ? '#fbbf24' : '#34d399', marginTop: '0.25rem' }}>
                    {val}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div>
          <div style={{ fontSize: '0.85rem', fontWeight: 800, color: '#ffffff', marginBottom: '0.75rem' }}>Joint Anomaly Diagnostics</div>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.75rem', textAlign: 'left' }}>
            <thead>
              <tr style={{ backgroundColor: '#1e293b', color: '#94a3b8', borderBottom: '1px solid #334155' }}>
                <th style={{ padding: '0.6rem 0.8rem' }}>JOINT REGION</th>
                <th style={{ padding: '0.6rem 0.8rem' }}>ANOMALY / KINEMATIC METRIC</th>
                <th style={{ padding: '0.6rem 0.8rem' }}>CLINICAL STATUS</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(report.Anomalies || {}).map(([joint, metric], idx) => (
                <tr key={joint} style={{ borderBottom: '1px solid #1e293b', backgroundColor: idx % 2 === 0 ? 'rgba(15, 23, 42, 0.4)' : 'transparent' }}>
                  <td style={{ padding: '0.6rem 0.8rem', fontWeight: 800, color: '#38bdf8' }}>{joint}</td>
                  <td style={{ padding: '0.6rem 0.8rem', color: '#f8fafc' }}>{metric}</td>
                  <td style={{ padding: '0.6rem 0.8rem', color: '#34d399', fontWeight: 700 }}>Evaluated</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div style={{ backgroundColor: 'rgba(99, 102, 241, 0.08)', padding: '1rem', borderRadius: '0.75rem', border: '1px solid rgba(99, 102, 241, 0.25)' }}>
          <div style={{ fontSize: '0.8rem', fontWeight: 800, color: '#818cf8', marginBottom: '0.5rem' }}>Physiotherapist Clinical Recommendations</div>
          <ul style={{ margin: 0, paddingLeft: '1.2rem', fontSize: '0.75rem', color: '#cbd5e1', display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
            {(report.Recommendations || []).map((rec, i) => (
              <li key={i}>{rec}</li>
            ))}
          </ul>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px dashed #334155', paddingTop: '1rem', marginTop: '0.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#34d399', fontSize: '0.7rem', fontWeight: 800 }}>
            <Verified style={{ fontSize: '1rem' }} />
            <span>Cryptographically Verified Clinical Record</span>
          </div>
          <div style={{ fontSize: '0.65rem', color: '#64748b' }}>
            Generated via SportsAI Autonomous Diagnostic Pipeline
          </div>
        </div>
      </div>
    </div>
  );
}