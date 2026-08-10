import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CloudUpload, Movie, Download, Speed, Bolt, PlayCircle } from '@mui/icons-material';
import ClinicalReportPDF from '../../components/ClinicalReportPDF';

export default function Upload() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [activity, setActivity] = useState('Running');
  const [analyzing, setAnalyzing] = useState(false);
  const [report, setReport] = useState(null);

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      alert('Please select a video file first.');
      return;
    }

    setAnalyzing(true);
    setReport(null);

    const formData = new FormData();
    formData.append('file', selectedFile);
    formData.append('activity', activity);

    try {
      const response = await fetch('http://localhost:8000/api/analyze', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        setReport(data);
        localStorage.setItem('latest_report', JSON.stringify(data));
      } else {
        alert('Backend error. Ensure backend server is running on port 8000.');
      }
    } catch (err) {
      console.error('Fetch error:', err);
      alert('Could not connect to backend server. Make sure "python main.py" is running.');
    } finally {
      setAnalyzing(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      style={{ padding: '1.5rem', maxWidth: '1400px', margin: '0 auto', color: '#f8fafc', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}
    >
      <div className="sports-card" style={{ padding: '1.5rem', borderColor: 'rgba(99, 102, 241, 0.3)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div style={{ padding: '0.6rem', backgroundColor: 'rgba(99, 102, 241, 0.15)', borderRadius: '0.75rem', border: '1px solid rgba(99, 102, 241, 0.3)', color: '#818cf8', display: 'flex' }}>
            <CloudUpload fontSize="medium" />
          </div>
          <div>
            <h1 style={{ fontSize: '1.5rem', fontWeight: 900, margin: 0, color: '#ffffff' }}>
              Biomechanical Video Analysis & Clinical Report Generator
            </h1>
            <p style={{ fontSize: '0.75rem', color: '#94a3b8', margin: '0.2rem 0 0 0' }}>
              Upload movement clips to compute kinematic hazard scores and export official PDF assessment summaries with QR verification
            </p>
          </div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
        <div className="sports-card" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div style={{ borderBottom: '1px solid #1f2937', paddingBottom: '0.75rem' }}>
            <h3 style={{ fontSize: '0.9rem', fontWeight: 800, margin: 0, color: '#ffffff' }}>1. Select Movement Parameters</h3>
          </div>

          <div>
            <label style={{ fontSize: '0.7rem', fontWeight: 800, color: '#94a3b8', display: 'block', marginBottom: '0.4rem' }}>
              ATHLETIC ACTIVITY CONTEXT
            </label>
            <select
              value={activity}
              onChange={(e) => setActivity(e.target.value)}
              style={{ width: '100%', backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '0.65rem', padding: '0.65rem', color: '#ffffff', fontSize: '0.8rem', fontWeight: 700, outline: 'none' }}
            >
              <option value="Running">Running / Sprinting</option>
              <option value="Jumping">Jumping / Landing</option>
              <option value="Squatting">Bodyweight Squatting</option>
              <option value="Throwing">Throwing / Pitching</option>
            </select>
          </div>

          <div>
            <label style={{ fontSize: '0.7rem', fontWeight: 800, color: '#94a3b8', display: 'block', marginBottom: '0.4rem' }}>
              VIDEO FILE (.MP4, .MOV)
            </label>
            <div style={{ border: selectedFile ? '2px solid #818cf8' : '2px dashed #1e293b', borderRadius: '0.85rem', padding: '2rem', textAlign: 'center', backgroundColor: selectedFile ? 'rgba(99, 102, 241, 0.1)' : 'rgba(15, 23, 42, 0.4)' }}>
              <input type="file" accept="video/*" onChange={handleFileChange} id="video-input" style={{ display: 'none' }} />
              <label htmlFor="video-input" style={{ cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
                <Movie style={{ fontSize: 42, color: selectedFile ? '#34d399' : '#818cf8' }} />
                <span style={{ fontSize: '0.85rem', fontWeight: 800, color: selectedFile ? '#34d399' : '#ffffff' }}>
                  {selectedFile ? `Selected: ${selectedFile.name}` : 'Click here to select video file'}
                </span>
                <span style={{ fontSize: '0.65rem', color: '#64748b' }}>Supports 1080p / 60 FPS MP4 clips</span>
              </label>
            </div>
          </div>

          <button
            onClick={handleUpload}
            disabled={analyzing}
            style={{
              padding: '0.85rem',
              backgroundColor: analyzing ? '#1e293b' : '#4f46e5',
              color: '#ffffff',
              border: 'none',
              borderRadius: '0.75rem',
              fontWeight: 900,
              fontSize: '0.85rem',
              cursor: analyzing ? 'not-allowed' : 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem',
            }}
          >
            {analyzing ? <Speed className="animate-spin" /> : <Bolt />}
            <span>{analyzing ? 'Processing Analysis...' : 'Execute Biomechanical Analysis'}</span>
          </button>
        </div>

        <div className="sports-card" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem', justifyContent: 'space-between' }}>
          <div>
            <div style={{ borderBottom: '1px solid #1f2937', paddingBottom: '0.75rem', marginBottom: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 style={{ fontSize: '0.9rem', fontWeight: 800, margin: 0, color: '#ffffff' }}>2. Processed Video Output</h3>
              {report && (
                <span style={{ fontSize: '0.65rem', fontWeight: 800, color: '#34d399', backgroundColor: 'rgba(16, 185, 129, 0.15)', padding: '0.2rem 0.5rem', borderRadius: '0.4rem', border: '1px solid rgba(16, 185, 129, 0.3)' }}>
                  ● Analysis Complete
                </span>
              )}
            </div>

            {report ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div style={{ padding: '1rem', backgroundColor: '#0f172a', borderRadius: '0.75rem', border: '1px solid #1e293b' }}>
                  <div style={{ fontSize: '1.1rem', fontWeight: 900, color: '#ffffff', marginBottom: '0.5rem' }}>
                    Hazard Score: {report['Overall Score']}% ({report['Overall Risk']} Risk)
                  </div>
                  <div style={{ fontSize: '0.8rem', color: '#94a3b8' }}>
                    • ACL Risk: {report.Predictions['ACL Risk']}
                    <br />
                    • Gait Symmetry: {report.Predictions['Gait Symmetry']}
                  </div>
                </div>

                <a
                  href={report.annotated_video_url}
                  download={`sportsai_annotated_${report.job_id || 'clip'}.mp4`}
                  style={{
                    padding: '0.8rem',
                    backgroundColor: '#10b981',
                    color: '#ffffff',
                    borderRadius: '0.65rem',
                    textDecoration: 'none',
                    fontWeight: 800,
                    fontSize: '0.85rem',
                    textAlign: 'center',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.5rem',
                  }}
                >
                  <Download fontSize="small" />
                  <span>Download Processed Video MP4</span>
                </a>
              </div>
            ) : (
              <div style={{ height: '280px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: '#64748b' }}>
                <PlayCircle style={{ fontSize: 54, opacity: 0.3, marginBottom: '0.5rem' }} />
                <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#94a3b8' }}>No Video Processed Yet</div>
                <div style={{ fontSize: '0.7rem', marginTop: '0.2rem' }}>Select a file on the left and click Execute.</div>
              </div>
            )}
          </div>
        </div>
      </div>

      {report && <ClinicalReportPDF report={report} athleteName="Rachit Patnaik" />}
    </motion.div>
  );
}