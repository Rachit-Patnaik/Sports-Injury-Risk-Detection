import React, { useState, useEffect } from 'react';

// --- Inline Icons ---
const PlusIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="12" y1="5" x2="12" y2="19"></line>
    <line x1="5" y1="12" x2="19" y2="12"></line>
  </svg>
);

const UserIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#6366f1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
    <circle cx="12" cy="7" r="4"></circle>
  </svg>
);

const CloseIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18"></line>
    <line x1="6" y1="6" x2="18" y2="18"></line>
  </svg>
);

// --- Default Data ---
const DEFAULT_ATHLETES = [
  { id: "ATH-8842", name: "Rachit Patnaik", role: "Lead Researcher", sport: "Sprinting", riskLevel: "MODERATE", riskScore: 18, lastAssessment: "2026-08-16" },
  { id: "ATH-9102", name: "Marcus Vance", role: "Forward", sport: "Basketball", riskLevel: "HIGH", riskScore: 64, lastAssessment: "2026-08-08" },
  { id: "ATH-7431", name: "Sophia Chen", role: "Midfielder", sport: "Soccer", riskLevel: "LOW", riskScore: 8, lastAssessment: "2026-08-05" }
];

export default function Athletes() {
  const [athletes, setAthletes] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  
  // Form State
  const [formData, setFormData] = useState({
    name: "", role: "", sport: "", age: "", weight: "", height: ""
  });

  // Load athletes from local storage on mount
  useEffect(() => {
    const saved = localStorage.getItem("sportsai_athletes");
    if (saved) {
      setAthletes(JSON.parse(saved));
    } else {
      setAthletes(DEFAULT_ATHLETES);
      localStorage.setItem("sportsai_athletes", JSON.stringify(DEFAULT_ATHLETES));
    }
  }, []);

  // Handle Form Inputs
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Register New Athlete
  const handleRegister = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.sport) return;

    const newAthlete = {
      id: `ATH-${Math.floor(Math.random() * 9000 + 1000)}`,
      name: formData.name,
      role: formData.role || "Athlete",
      sport: formData.sport,
      riskLevel: "PENDING",
      riskScore: 0,
      lastAssessment: "N/A"
    };

    const updatedAthletes = [newAthlete, ...athletes];
    setAthletes(updatedAthletes);
    localStorage.setItem("sportsai_athletes", JSON.stringify(updatedAthletes));
    
    // Reset and Close
    setFormData({ name: "", role: "", sport: "", age: "", weight: "", height: "" });
    setIsModalOpen(false);
  };

  // Filter athletes based on search
  const filteredAthletes = athletes.filter(a => 
    a.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    a.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    a.sport.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#070b14', color: '#f1f5f9', padding: '32px 24px', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ maxWidth: '1000px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '24px' }}>
        
        {/* Header Bar */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '16px', padding: '20px 24px' }}>
          <div>
            <h1 style={{ fontSize: '20px', fontWeight: '800', color: '#ffffff', margin: 0 }}>Athlete Profiles & Injury History</h1>
            <p style={{ fontSize: '12px', color: '#94a3b8', margin: '6px 0 0 0' }}>Manage physical metrics, sport roles, and biomechanical assessment histories.</p>
          </div>
          <button 
            onClick={() => setIsModalOpen(true)}
            style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'linear-gradient(135deg, #4f46e5 0%, #3b82f6 100%)', color: '#fff', border: 'none', padding: '12px 20px', borderRadius: '10px', fontSize: '13px', fontWeight: '700', cursor: 'pointer', boxShadow: '0 4px 14px rgba(79, 70, 229, 0.4)' }}
          >
            <PlusIcon /> Register New Athlete
          </button>
        </div>

        {/* Search Bar */}
        <div>
          <input 
            type="text" 
            placeholder="Search by name, ID, or sport..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{ width: '100%', backgroundColor: '#0b1120', border: '1px solid #1e293b', padding: '14px 20px', borderRadius: '12px', color: '#fff', fontSize: '14px', outline: 'none' }}
          />
        </div>

        {/* Athlete Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '16px' }}>
          {filteredAthletes.map(athlete => {
            const isHigh = athlete.riskLevel === "HIGH";
            const isMod = athlete.riskLevel === "MODERATE";
            const isPending = athlete.riskLevel === "PENDING";
            
            const badgeBg = isHigh ? 'rgba(244,63,94,0.15)' : isMod ? 'rgba(245,158,11,0.15)' : isPending ? 'rgba(148,163,184,0.15)' : 'rgba(16,185,129,0.15)';
            const badgeColor = isHigh ? '#fb7185' : isMod ? '#fbbf24' : isPending ? '#94a3b8' : '#34d399';
            const badgeBorder = isHigh ? 'rgba(244,63,94,0.3)' : isMod ? 'rgba(245,158,11,0.3)' : isPending ? 'rgba(148,163,184,0.3)' : 'rgba(16,185,129,0.3)';

            return (
              <div key={athlete.id} style={{ backgroundColor: '#10182b', border: '1px solid #1e293b', borderRadius: '16px', padding: '20px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                    <div style={{ padding: '10px', backgroundColor: 'rgba(99, 102, 241, 0.1)', borderRadius: '12px' }}>
                      <UserIcon />
                    </div>
                    <div>
                      <h3 style={{ margin: 0, fontSize: '16px', fontWeight: '700', color: '#fff' }}>{athlete.name}</h3>
                      <p style={{ margin: '2px 0 0 0', fontSize: '11px', color: '#64748b', fontFamily: 'monospace' }}>{athlete.id}</p>
                    </div>
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', backgroundColor: '#0b1120', padding: '12px', borderRadius: '10px', border: '1px solid #1e293b' }}>
                  <div>
                    <span style={{ fontSize: '10px', color: '#64748b', textTransform: 'uppercase', fontWeight: '700' }}>Sport / Role</span>
                    <p style={{ margin: '4px 0 0 0', fontSize: '13px', color: '#e2e8f0', fontWeight: '600' }}>{athlete.sport}</p>
                  </div>
                  <div>
                    <span style={{ fontSize: '10px', color: '#64748b', textTransform: 'uppercase', fontWeight: '700' }}>Last Scanned</span>
                    <p style={{ margin: '4px 0 0 0', fontSize: '13px', color: '#e2e8f0', fontWeight: '600' }}>{athlete.lastAssessment}</p>
                  </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '11px', color: '#94a3b8', fontWeight: '600' }}>Biomechanical Risk:</span>
                  <span style={{ backgroundColor: badgeBg, color: badgeColor, border: `1px solid ${badgeBorder}`, padding: '4px 10px', borderRadius: '8px', fontSize: '10px', fontWeight: '800' }}>
                    {athlete.riskLevel} {athlete.riskScore > 0 ? `(${athlete.riskScore}%)` : ""}
                  </span>
                </div>
              </div>
            );
          })}
          
          {filteredAthletes.length === 0 && (
            <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '40px', color: '#64748b', fontSize: '14px' }}>
              No athletes found. Register a new athlete to get started.
            </div>
          )}
        </div>

      </div>

      {/* REGISTRATION MODAL */}
      {isModalOpen && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(4px)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 50 }}>
          <div style={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '20px', width: '100%', maxWidth: '500px', padding: '28px', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.7)' }}>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
              <h2 style={{ margin: 0, fontSize: '18px', fontWeight: '800', color: '#fff' }}>Register New Athlete</h2>
              <button onClick={() => setIsModalOpen(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px' }}><CloseIcon /></button>
            </div>

            <form onSubmit={handleRegister} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              
              <div>
                <label style={{ display: 'block', fontSize: '11px', fontWeight: '700', color: '#94a3b8', marginBottom: '6px', textTransform: 'uppercase' }}>Full Name *</label>
                <input required name="name" value={formData.name} onChange={handleInputChange} type="text" placeholder="e.g. Rachit Patnaik" style={{ width: '100%', backgroundColor: '#131d33', border: '1px solid #1e293b', padding: '12px 16px', borderRadius: '10px', color: '#fff', fontSize: '14px', outline: 'none' }} />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '11px', fontWeight: '700', color: '#94a3b8', marginBottom: '6px', textTransform: 'uppercase' }}>Sport *</label>
                  <input required name="sport" value={formData.sport} onChange={handleInputChange} type="text" placeholder="e.g. Sprinting" style={{ width: '100%', backgroundColor: '#131d33', border: '1px solid #1e293b', padding: '12px 16px', borderRadius: '10px', color: '#fff', fontSize: '14px', outline: 'none' }} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '11px', fontWeight: '700', color: '#94a3b8', marginBottom: '6px', textTransform: 'uppercase' }}>Role / Position</label>
                  <input name="role" value={formData.role} onChange={handleInputChange} type="text" placeholder="e.g. Lead Researcher" style={{ width: '100%', backgroundColor: '#131d33', border: '1px solid #1e293b', padding: '12px 16px', borderRadius: '10px', color: '#fff', fontSize: '14px', outline: 'none' }} />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '11px', fontWeight: '700', color: '#94a3b8', marginBottom: '6px', textTransform: 'uppercase' }}>Age</label>
                  <input name="age" value={formData.age} onChange={handleInputChange} type="number" placeholder="20" style={{ width: '100%', backgroundColor: '#131d33', border: '1px solid #1e293b', padding: '12px', borderRadius: '10px', color: '#fff', fontSize: '14px', outline: 'none' }} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '11px', fontWeight: '700', color: '#94a3b8', marginBottom: '6px', textTransform: 'uppercase' }}>Weight (kg)</label>
                  <input name="weight" value={formData.weight} onChange={handleInputChange} type="number" placeholder="72" style={{ width: '100%', backgroundColor: '#131d33', border: '1px solid #1e293b', padding: '12px', borderRadius: '10px', color: '#fff', fontSize: '14px', outline: 'none' }} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '11px', fontWeight: '700', color: '#94a3b8', marginBottom: '6px', textTransform: 'uppercase' }}>Height (cm)</label>
                  <input name="height" value={formData.height} onChange={handleInputChange} type="number" placeholder="178" style={{ width: '100%', backgroundColor: '#131d33', border: '1px solid #1e293b', padding: '12px', borderRadius: '10px', color: '#fff', fontSize: '14px', outline: 'none' }} />
                </div>
              </div>

              <div style={{ display: 'flex', gap: '12px', marginTop: '16px' }}>
                <button type="button" onClick={() => setIsModalOpen(false)} style={{ flex: 1, padding: '14px', borderRadius: '10px', background: '#1e293b', color: '#e2e8f0', border: 'none', fontSize: '14px', fontWeight: '600', cursor: 'pointer' }}>
                  Cancel
                </button>
                <button type="submit" style={{ flex: 2, padding: '14px', borderRadius: '10px', background: 'linear-gradient(135deg, #4f46e5 0%, #3b82f6 100%)', color: '#fff', border: 'none', fontSize: '14px', fontWeight: '700', cursor: 'pointer', boxShadow: '0 4px 14px rgba(79, 70, 229, 0.4)' }}>
                  Save Athlete Profile
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

    </div>
  );
}