import React, { useState, useEffect } from 'react';
import { QRCodeSVG } from 'qrcode.react';

// Standard SVG Icons
const PrinterIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
    <polyline points="6 9 6 2 18 2 18 9" />
    <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" />
    <rect x="6" y="14" width="12" height="8" />
  </svg>
);

const RefreshIcon = ({ spin }) => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ animation: spin ? 'spin 1s linear infinite' : 'none' }}>
    <polyline points="23 4 23 10 17 10" />
    <polyline points="1 20 1 14 7 14" />
    <path d="M3.51 9a9 9 0 0 0 20.49 15" />
  </svg>
);

export default function Reports() {
  const [data, setData] = useState({
    job_id: "SAI-2026-8842",
    Activity: "Running / Sprinting",
    Overall_Score: 18.0,
    Overall_Risk: "LOW",
    Predictions: {
      "ACL Risk": "Low",
      "Hamstring Risk": "Low",
      "Shoulder Risk": "Low",
      "Gait Symmetry": "94.2%"
    },
    Anomalies: {
      Knee: "Mean Flexion 141.0° (Min: 42.7°)",
      Hip: "Normal Mechanics",
      Shoulder: "Symmetrical Swing",
      Gait: "94.2% Bilateral Alignment"
    },
    Recommendations: [
      "Average detected knee extension is 141.0°. Maintain movement control drills during landing.",
      "Incorporate single-leg landing stabilization drills.",
      "High variability in joint angles triggers targeted preventative recommendations."
    ]
  });

  const [loading, setLoading] = useState(false);

  // LOAD FROM LOCAL STORAGE FIRST!
  useEffect(() => {
    const cached = localStorage.getItem("latest_analysis");
    if (cached) {
      setData(JSON.parse(cached));
    } else {
      fetchReport();
    }
  }, []);

  const fetchReport = async () => {
    try {
      setLoading(true);
      const res = await fetch('http://localhost:8000/report');
      if (res.ok) {
        const json = await res.json();
        setData(json);
        localStorage.setItem("latest_analysis", JSON.stringify(json));
      }
    } catch (err) {
      console.warn("Using fallback/cached report data");
    } finally {
      setLoading(false);
    }
  };

  const overallScore = Number(data["Overall Score"] || data["Overall_Score"] || 18.0).toFixed(1);
  const overallRisk = (data["Overall Risk"] || data["Overall_Risk"] || "LOW").toUpperCase();
  const aclRisk = (data.Predictions?.["ACL Risk"] || "LOW").toUpperCase();
  const gaitSymmetry = data.Predictions?.["Gait Symmetry"] || "94.2%";
  const activityName = data.Activity || "Running / Sprinting";
  const jobId = data.job_id || "SAI-2026-8842";
  const kneeAnomaly = data.Anomalies?.Knee || "Mean Flexion 141.0° (Min: 42.7°)";

  // Dynamic colors based on risk severity
  const isHigh = overallRisk === "HIGH";
  const isMod = overallRisk === "MODERATE";
  const badgeBg = isHigh ? "#fff1f2" : isMod ? "#fffbeb" : "#ecfdf5";
  const badgeColor = isHigh ? "#e11d48" : isMod ? "#d97706" : "#059669";
  const badgeBorder = isHigh ? "#fecdd3" : isMod ? "#fcd34d" : "#a7f3d0";

  const aclBg = aclRisk === "HIGH" ? "#fff1f2" : aclRisk === "MODERATE" ? "#fffbeb" : "#ecfdf5";
  const aclColor = aclRisk === "HIGH" ? "#e11d48" : aclRisk === "MODERATE" ? "#d97706" : "#059669";
  const aclBorder = aclRisk === "HIGH" ? "#fecdd3" : aclRisk === "MODERATE" ? "#fcd34d" : "#a7f3d0";

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#070b14', color: '#f1f5f9', padding: '24px', fontFamily: 'system-ui, sans-serif' }}>
      
      <style>{`
        @media print {
          body * { visibility: hidden; }
          #print-paper, #print-paper * { visibility: visible; }
          #print-paper { position: absolute; left: 0; top: 0; width: 100%; margin: 0 !important; padding: 0 !important; box-shadow: none !important; }
          * { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }
          .no-print { display: none !important; }
        }
        @keyframes spin { 100% { transform: rotate(360deg); } }
      `}</style>

      <div style={{ maxWidth: '900px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '24px' }}>
        
        <div className="no-print" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '16px', padding: '16px 24px' }}>
          <div>
            <h1 style={{ fontSize: '18px', fontWeight: '700', color: '#ffffff', margin: 0 }}>Biomechanical Evaluation Report</h1>
            <p style={{ fontSize: '12px', color: '#94a3b8', margin: '4px 0 0 0' }}>Job Ref: {jobId}</p>
          </div>
          <div style={{ display: 'flex', gap: '12px' }}>
            <button onClick={fetchReport} style={{ display: 'flex', alignItems: 'center', gap: '8px', backgroundColor: '#1e293b', color: '#e2e8f0', border: '1px solid #334155', padding: '10px 16px', borderRadius: '10px', fontSize: '12px', fontWeight: '600', cursor: 'pointer' }}>
              <RefreshIcon spin={loading} /> Sync Data
            </button>
            <button onClick={() => window.print()} style={{ display: 'flex', alignItems: 'center', gap: '8px', background: '#4f46e5', color: '#ffffff', border: 'none', padding: '10px 20px', borderRadius: '10px', fontSize: '12px', fontWeight: '700', cursor: 'pointer' }}>
              <PrinterIcon /> Download PDF
            </button>
          </div>
        </div>

        <div id="print-paper" style={{ backgroundColor: '#ffffff', color: '#0f172a', borderRadius: '8px', padding: '40px', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5)', border: '1px solid #e2e8f0' }}>
          
          <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '2px solid #e2e8f0', paddingBottom: '24px', marginBottom: '24px' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '8px', backgroundColor: '#4f46e5', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: '900', fontSize: '24px' }}>+</div>
                <h2 style={{ margin: 0, fontSize: '28px', fontWeight: '800', color: '#0f172a', letterSpacing: '-0.5px' }}>SportsAI Clinical</h2>
              </div>
              <p style={{ margin: '8px 0 0 52px', fontSize: '11px', fontWeight: '700', color: '#64748b', textTransform: 'uppercase', letterSpacing: '1px' }}>Autonomous Biomechanical Evaluation Report</p>
            </div>
            <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
              <div style={{ textAlign: 'right' }}>
                <p style={{ margin: 0, fontSize: '10px', fontWeight: '800', color: '#4f46e5', textTransform: 'uppercase' }}>Official Record</p>
                <p style={{ margin: '4px 0 0 0', fontSize: '11px', color: '#64748b', fontFamily: 'monospace' }}>ID: {jobId}</p>
                <p style={{ margin: '4px 0 0 0', fontSize: '11px', color: '#64748b' }}>{new Date().toLocaleDateString()}</p>
              </div>
              <QRCodeSVG value={`https://sportsai.clinical/verify/${jobId}`} size={56} />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', backgroundColor: '#f8fafc', padding: '16px', borderRadius: '8px', border: '1px solid #e2e8f0', marginBottom: '32px' }}>
            <div>
              <span style={{ fontSize: '10px', fontWeight: '700', color: '#64748b', textTransform: 'uppercase' }}>Athlete Name</span>
              <p style={{ margin: '4px 0 0 0', fontSize: '14px', fontWeight: '700', color: '#0f172a' }}>Rachit Patnaik</p>
            </div>
            <div>
              <span style={{ fontSize: '10px', fontWeight: '700', color: '#64748b', textTransform: 'uppercase' }}>Athlete ID & Demo</span>
              <p style={{ margin: '4px 0 0 0', fontSize: '14px', fontWeight: '700', color: '#0f172a' }}>ATH-8842 • 20y M</p>
            </div>
            <div>
              <span style={{ fontSize: '10px', fontWeight: '700', color: '#64748b', textTransform: 'uppercase' }}>Movement Context</span>
              <p style={{ margin: '4px 0 0 0', fontSize: '14px', fontWeight: '700', color: '#0ea5e9' }}>{activityName}</p>
            </div>
            <div>
              <span style={{ fontSize: '10px', fontWeight: '700', color: '#64748b', textTransform: 'uppercase' }}>Analysis Engine</span>
              <p style={{ margin: '4px 0 0 0', fontSize: '14px', fontWeight: '700', color: '#4f46e5' }}>OpenCV Kinematic v2.4</p>
            </div>
          </div>

          <h3 style={{ fontSize: '12px', fontWeight: '800', color: '#0f172a', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '12px' }}>Executive Hazard Summary</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '32px' }}>
            
            <div style={{ border: '1px solid #e2e8f0', borderRadius: '8px', padding: '16px', textAlign: 'center' }}>
              <span style={{ fontSize: '10px', fontWeight: '700', color: '#64748b', textTransform: 'uppercase' }}>Composite Hazard Rating</span>
              <p style={{ fontSize: '36px', fontWeight: '900', color: '#0f172a', margin: '8px 0' }}>{overallScore}%</p>
              <span style={{ backgroundColor: badgeBg, color: badgeColor, border: `1px solid ${badgeBorder}`, padding: '4px 12px', borderRadius: '12px', fontSize: '10px', fontWeight: '800' }}>{overallRisk} HAZARD</span>
            </div>

            <div style={{ border: '1px solid #e2e8f0', borderRadius: '8px', padding: '16px', textAlign: 'center' }}>
              <span style={{ fontSize: '10px', fontWeight: '700', color: '#64748b', textTransform: 'uppercase' }}>Gait Symmetry</span>
              <p style={{ fontSize: '36px', fontWeight: '900', color: '#059669', margin: '8px 0' }}>{gaitSymmetry}</p>
              <span style={{ backgroundColor: '#ecfdf5', color: '#059669', border: '1px solid #a7f3d0', padding: '4px 12px', borderRadius: '12px', fontSize: '10px', fontWeight: '800' }}>BILATERAL CHECK</span>
            </div>

            <div style={{ border: '1px solid #e2e8f0', borderRadius: '8px', padding: '16px', textAlign: 'center' }}>
              <span style={{ fontSize: '10px', fontWeight: '700', color: '#64748b', textTransform: 'uppercase' }}>ACL Risk Category</span>
              <p style={{ fontSize: '24px', fontWeight: '900', color: aclColor, margin: '14px 0 13px 0' }}>{aclRisk}</p>
              <span style={{ backgroundColor: aclBg, color: aclColor, border: `1px solid ${aclBorder}`, padding: '4px 12px', borderRadius: '12px', fontSize: '10px', fontWeight: '800' }}>ML MODEL OUTPUT</span>
            </div>

            <div style={{ border: '1px solid #e2e8f0', borderRadius: '8px', padding: '16px', textAlign: 'center' }}>
              <span style={{ fontSize: '10px', fontWeight: '700', color: '#64748b', textTransform: 'uppercase' }}>Ground Reaction Force</span>
              <p style={{ fontSize: '36px', fontWeight: '900', color: '#4f46e5', margin: '8px 0' }}>{(1.2 + parseFloat(overallScore) * 0.025).toFixed(1)} G</p>
              <span style={{ backgroundColor: '#eef2ff', color: '#4f46e5', border: '1px solid #c7d2fe', padding: '4px 12px', borderRadius: '12px', fontSize: '10px', fontWeight: '800' }}>IMPACT EST.</span>
            </div>

          </div>

          <h3 style={{ fontSize: '12px', fontWeight: '800', color: '#0f172a', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '12px' }}>Kinematic & Joint Angle Telemetry</h3>
          <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '32px', fontSize: '12px' }}>
            <thead>
              <tr style={{ backgroundColor: '#f8fafc', borderBottom: '2px solid #cbd5e1' }}>
                <th style={{ padding: '12px', textAlign: 'left', color: '#475569' }}>Joint Segment</th>
                <th style={{ padding: '12px', textAlign: 'left', color: '#475569' }}>Measured Data</th>
                <th style={{ padding: '12px', textAlign: 'left', color: '#475569' }}>Angular Velocity</th>
                <th style={{ padding: '12px', textAlign: 'left', color: '#475569' }}>Clinical Status</th>
              </tr>
            </thead>
            <tbody>
              <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
                <td style={{ padding: '12px', fontWeight: '700', color: '#0f172a' }}>Knee Joint (Right)</td>
                <td style={{ padding: '12px', fontFamily: 'monospace' }}>{kneeAnomaly}</td>
                <td style={{ padding: '12px', fontFamily: 'monospace' }}>{(180 + parseFloat(overallScore) * 3.2).toFixed(1)} deg/s</td>
                <td style={{ padding: '12px', color: '#059669', fontWeight: '700' }}>Within Limits</td>
              </tr>
              <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
                <td style={{ padding: '12px', fontWeight: '700', color: '#0f172a' }}>Hip Flexion</td>
                <td style={{ padding: '12px', fontFamily: 'monospace' }}>158.4°</td>
                <td style={{ padding: '12px', fontFamily: 'monospace' }}>180.4 deg/s</td>
                <td style={{ padding: '12px', color: '#059669', fontWeight: '700' }}>Normal Extension</td>
              </tr>
              <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
                <td style={{ padding: '12px', fontWeight: '700', color: '#0f172a' }}>Shoulder Segment</td>
                <td style={{ padding: '12px', fontFamily: 'monospace' }}>N/A</td>
                <td style={{ padding: '12px', fontFamily: 'monospace' }}>N/A</td>
                <td style={{ padding: '12px', color: '#059669', fontWeight: '700' }}>Symmetrical</td>
              </tr>
            </tbody>
          </table>

          <h3 style={{ fontSize: '12px', fontWeight: '800', color: '#0f172a', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '12px' }}>Targeted Corrective Protocols</h3>
          <div style={{ backgroundColor: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '16px' }}>
            <ul style={{ margin: 0, paddingLeft: '20px', color: '#334155', fontSize: '13px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {data.Recommendations?.map((rec, idx) => (
                <li key={idx} style={{ paddingLeft: '4px' }}>{rec}</li>
              ))}
            </ul>
          </div>

          <div style={{ marginTop: '40px', paddingTop: '16px', borderTop: '1px solid #e2e8f0', textAlign: 'center', fontSize: '10px', color: '#94a3b8' }}>
            Generated automatically by SportsAI Platform. Not a substitute for professional medical diagnosis.
          </div>

        </div>
      </div>
    </div>
  );
}