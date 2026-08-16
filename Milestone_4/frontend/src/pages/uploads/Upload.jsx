import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

// Minimal Inline Icons
const UploadCloudIcon = () => (
  <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#6366f1" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242" />
    <path d="M12 12v9" />
    <path d="m16 16-4-4-4 4" />
  </svg>
);

const FilmIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#38bdf8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="20" x="2" y="2" rx="2.18" ry="2.18" />
    <line x1="7" x2="7" y1="2" y2="22" />
    <line x1="17" x2="17" y1="2" y2="22" />
    <line x1="2" x2="22" y1="12" y2="12" />
    <line x1="2" x2="7" y1="7" y2="7" />
    <line x1="2" x2="7" y1="17" y2="17" />
    <line x1="17" x2="22" y1="17" y2="17" />
    <line x1="17" x2="22" y1="7" y2="7" />
  </svg>
);

const SpinnerIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ animation: 'spin 1s linear infinite' }}>
    <path d="M21 12a9 9 0 1 1-6.219-8.56" />
    <style>{`@keyframes spin { 100% { transform: rotate(360deg); } }`}</style>
  </svg>
);

const CheckCircleIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#34d399" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
    <polyline points="22 4 12 14.01 9 11.01" />
  </svg>
);

export default function UploadVideo() {
  const [file, setFile] = useState(null);
  const [activity, setActivity] = useState("Running / Sprinting");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  
  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  // Drag and Drop Handlers
  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const droppedFile = e.dataTransfer.files[0];
      if (droppedFile.type.startsWith('video/')) {
        setFile(droppedFile);
        setResult(null);
        setError(null);
      } else {
        setError("Please upload a valid video file (MP4, MOV, AVI).");
      }
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setResult(null);
      setError(null);
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) {
      setError("Please select or drop a video file first.");
      return;
    }

    setLoading(true);
    setError(null);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("activity", activity);

    try {
      const res = await fetch("http://localhost:8000/api/analyze", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error(`Server returned status ${res.status}`);

      const data = await res.json();
      setResult(data);
      localStorage.setItem("latest_analysis", JSON.stringify(data));
      
      // Give the user 1.5 seconds to see the success state before redirecting
      setTimeout(() => {
        navigate("/reports");
      }, 1500);

    } catch (err) {
      console.error("Upload error:", err);
      setError("Failed to process video. Please ensure the backend server is running.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#070b14', color: '#f1f5f9', padding: '32px 24px', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      <div style={{ maxWidth: '760px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '24px' }}>
        
        {/* Header Section */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
            <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#4f46e5', boxShadow: '0 0 14px #4f46e5' }} />
            <h1 style={{ fontSize: '24px', fontWeight: '800', color: '#ffffff', margin: 0, letterSpacing: '-0.5px' }}>
              Motion Capture Ingest
            </h1>
          </div>
          <p style={{ fontSize: '13px', color: '#94a3b8', margin: '0 0 0 24px', lineHeight: '1.5' }}>
            Upload raw athlete footage to extract 33-point pose kinematics. The AI engine will compute dynamic joint angles, valgus limits, and bilateral symmetry.
          </p>
        </div>

        {/* Main Card */}
        <div style={{ backgroundColor: '#0b1120', border: '1px solid #1e293b', borderRadius: '24px', padding: '32px', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5)' }}>
          
          <form onSubmit={handleUpload} style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
            
            {/* Drag & Drop Zone */}
            <div 
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current.click()}
              style={{ 
                border: `2px dashed ${isDragging ? '#6366f1' : '#334155'}`, 
                backgroundColor: isDragging ? 'rgba(99, 102, 241, 0.05)' : '#10182b',
                borderRadius: '16px', 
                padding: '48px 24px', 
                textAlign: 'center', 
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '16px'
              }}
            >
              <input 
                type="file" 
                accept="video/*" 
                ref={fileInputRef}
                onChange={handleFileChange}
                style={{ display: 'none' }} 
              />
              
              {!file ? (
                <>
                  <div style={{ padding: '16px', backgroundColor: '#1e293b', borderRadius: '50%' }}>
                    <UploadCloudIcon />
                  </div>
                  <div>
                    <p style={{ margin: '0 0 8px 0', fontSize: '15px', fontWeight: '600', color: '#e2e8f0' }}>
                      Click to upload or drag and drop
                    </p>
                    <p style={{ margin: 0, fontSize: '12px', color: '#64748b' }}>
                      MP4, MOV, or AVI (Max 50MB)
                    </p>
                  </div>
                </>
              ) : (
                <>
                  <div style={{ padding: '16px', backgroundColor: 'rgba(56, 189, 248, 0.1)', borderRadius: '50%' }}>
                    <FilmIcon />
                  </div>
                  <div>
                    <p style={{ margin: '0 0 4px 0', fontSize: '15px', fontWeight: '700', color: '#38bdf8' }}>
                      {file.name}
                    </p>
                    <p style={{ margin: 0, fontSize: '12px', color: '#64748b' }}>
                      {(file.size / (1024 * 1024)).toFixed(2)} MB • Ready for analysis
                    </p>
                  </div>
                  <p style={{ margin: 0, fontSize: '11px', color: '#6366f1', textDecoration: 'underline' }}>Click to change file</p>
                </>
              )}
            </div>

            {/* Context Selector */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <label style={{ fontSize: '11px', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.5px', color: '#64748b', paddingLeft: '4px' }}>
                Activity Context
              </label>
              <select 
                value={activity} 
                onChange={(e) => setActivity(e.target.value)}
                disabled={loading || result}
                style={{ 
                  width: '100%', padding: '14px 16px', borderRadius: '12px', 
                  backgroundColor: '#131d33', border: '1px solid #1e293b', 
                  color: '#f1f5f9', fontSize: '14px', outline: 'none',
                  cursor: loading || result ? 'not-allowed' : 'pointer',
                  opacity: loading || result ? 0.6 : 1
                }}
              >
                <option value="Running / Sprinting">Running / Sprinting Pipeline</option>
                <option value="Jump Landing / Squat">Jump Landing / Squat Pipeline</option>
                <option value="Agility Cutting">Agility Cutting / Deceleration</option>
                <option value="Baseball Pitch / Swing">Baseball Pitch / Swing</option>
              </select>
            </div>

            {/* Error Message */}
            {error && (
              <div style={{ backgroundColor: 'rgba(244, 63, 94, 0.1)', border: '1px solid rgba(244, 63, 94, 0.3)', color: '#fb7185', padding: '14px 16px', borderRadius: '12px', fontSize: '13px', fontWeight: '500' }}>
                {error}
              </div>
            )}

            {/* Success Message */}
            {result && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', backgroundColor: 'rgba(52, 211, 153, 0.1)', border: '1px solid rgba(52, 211, 153, 0.3)', color: '#34d399', padding: '16px', borderRadius: '12px' }}>
                <CheckCircleIcon />
                <div>
                  <p style={{ margin: 0, fontSize: '14px', fontWeight: '700' }}>Analysis Complete!</p>
                  <p style={{ margin: '2px 0 0 0', fontSize: '12px', opacity: 0.9 }}>Generating clinical report and redirecting...</p>
                </div>
              </div>
            )}

            {/* Submit Button */}
            {!result && (
              <button 
                type="submit" 
                disabled={loading || !file}
                style={{ 
                  width: '100%', padding: '16px', borderRadius: '12px', 
                  background: loading || !file ? '#1e293b' : 'linear-gradient(135deg, #4f46e5 0%, #3b82f6 100%)', 
                  color: loading || !file ? '#64748b' : '#ffffff', 
                  border: 'none', fontSize: '14px', fontWeight: '700', 
                  cursor: loading || !file ? 'not-allowed' : 'pointer', 
                  boxShadow: loading || !file ? 'none' : '0 10px 20px -10px rgba(79, 70, 229, 0.6)',
                  display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px',
                  transition: 'all 0.2s'
                }}
              >
                {loading ? (
                  <>
                    <SpinnerIcon />
                    Computing Biomechanics...
                  </>
                ) : (
                  "Execute Autonomous Analysis"
                )}
              </button>
            )}
            
          </form>
        </div>
      </div>
    </div>
  );
}