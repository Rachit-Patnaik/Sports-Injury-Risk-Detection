import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { PersonAdd, Sports, Healing, FitnessCenter, Height, Scale, AddCircle, CheckCircle } from '@mui/icons-material';

export default function Athletes() {
  const [athletes, setAthletes] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [fullName, setFullName] = useState('');
  const [sportType, setSportType] = useState('Football / Soccer');
  const [position, setPosition] = useState('Midfielder');
  const [age, setAge] = useState(21);
  const [heightCm, setHeightCm] = useState(181);
  const [weightKg, setWeightKg] = useState(74.5);

  const fetchAthletes = async () => {
    try {
      const res = await fetch('http://localhost:8000/api/athletes');
      if (res.ok) {
        const data = await res.json();
        setAthletes(data);
      }
    } catch (e) {
      setAthletes([
        { id: 1, athlete_code: 'ATH-8842', full_name: 'Rachit Patnaik', sport_type: 'Football / Soccer', position: 'Midfielder', age: 21, height_cm: 181, weight_kg: 74.5 }
      ]);
    }
  };

  useEffect(() => {
    fetchAthletes();
  }, []);

  const handleCreateAthlete = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:8000/api/athletes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          full_name: fullName,
          sport_type: sportType,
          position: position,
          age: parseInt(age),
          height_cm: parseFloat(heightCm),
          weight_kg: parseFloat(weightKg),
        }),
      });
      if (res.ok) {
        fetchAthletes();
        setShowModal(false);
        setFullName('');
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      style={{ padding: '2rem', maxWidth: '1400px', margin: '0 auto', color: '#f8fafc', display: 'flex', flexDirection: 'column', gap: '2rem' }}
    >
      <div className="sports-card" style={{ padding: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 900, margin: 0 }}>Athlete Profiles & Injury History</h1>
          <p style={{ fontSize: '0.75rem', color: '#94a3b8', margin: '0.2rem 0 0 0' }}>Manage athlete physical metrics, sport roles, and biomechanical assessment histories</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          style={{ padding: '0.65rem 1.25rem', backgroundColor: '#4f46e5', color: '#ffffff', borderRadius: '0.75rem', fontWeight: 800, fontSize: '0.75rem', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem', boxShadow: '0 4px 12px rgba(79, 70, 229, 0.3)' }}
        >
          <PersonAdd fontSize="small" />
          <span>Register New Athlete</span>
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1.25rem' }}>
        {athletes.map((ath) => (
          <div key={ath.id} className="sports-card" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <span style={{ fontSize: '0.65rem', fontWeight: 800, color: '#818cf8', textTransform: 'uppercase' }}>{ath.athlete_code}</span>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 800, margin: '0.2rem 0 0 0', color: '#ffffff' }}>{ath.full_name}</h3>
              </div>
              <span style={{ fontSize: '0.65rem', fontWeight: 800, padding: '0.2rem 0.6rem', borderRadius: '9999px', backgroundColor: 'rgba(16, 185, 129, 0.2)', color: '#34d399', border: '1px solid rgba(16, 185, 129, 0.3)' }}>Active</span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', fontSize: '0.75rem', backgroundColor: 'rgba(15, 23, 42, 0.6)', padding: '0.85rem', borderRadius: '0.75rem', border: '1px solid #1f2937' }}>
              <div>
                <span style={{ color: '#64748b', fontSize: '0.65rem', display: 'block' }}>SPORT / POSITION</span>
                <span style={{ fontWeight: 700, color: '#e2e8f0' }}>{ath.sport_type} ({ath.position})</span>
              </div>
              <div>
                <span style={{ color: '#64748b', fontSize: '0.65rem', display: 'block' }}>AGE</span>
                <span style={{ fontWeight: 700, color: '#e2e8f0' }}>{ath.age} yrs</span>
              </div>
              <div>
                <span style={{ color: '#64748b', fontSize: '0.65rem', display: 'block' }}>HEIGHT</span>
                <span style={{ fontWeight: 700, color: '#e2e8f0' }}>{ath.height_cm} cm</span>
              </div>
              <div>
                <span style={{ color: '#64748b', fontSize: '0.65rem', display: 'block' }}>WEIGHT</span>
                <span style={{ fontWeight: 700, color: '#e2e8f0' }}>{ath.weight_kg} kg</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {showModal && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.7)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100, padding: '1rem' }}>
          <div style={{ backgroundColor: '#0f172a', padding: '2rem', borderRadius: '1rem', border: '1px solid #1f2937', width: '100%', maxWidth: '480px', color: '#ffffff' }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 800, margin: '0 0 1rem 0' }}>Register New Athlete</h3>
            <form onSubmit={handleCreateAthlete} style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
              <input type="text" placeholder="Full Name" required value={fullName} onChange={(e) => setFullName(e.target.value)} style={{ padding: '0.75rem', backgroundColor: '#070a12', border: '1px solid #1e293b', borderRadius: '0.5rem', color: '#ffffff', outline: 'none' }} />
              <input type="text" placeholder="Sport Type" required value={sportType} onChange={(e) => setSportType(e.target.value)} style={{ padding: '0.75rem', backgroundColor: '#070a12', border: '1px solid #1e293b', borderRadius: '0.5rem', color: '#ffffff', outline: 'none' }} />
              <input type="text" placeholder="Position" required value={position} onChange={(e) => setPosition(e.target.value)} style={{ padding: '0.75rem', backgroundColor: '#070a12', border: '1px solid #1e293b', borderRadius: '0.5rem', color: '#ffffff', outline: 'none' }} />
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0.5rem' }}>
                <input type="number" placeholder="Age" required value={age} onChange={(e) => setAge(e.target.value)} style={{ padding: '0.75rem', backgroundColor: '#070a12', border: '1px solid #1e293b', borderRadius: '0.5rem', color: '#ffffff', outline: 'none' }} />
                <input type="number" placeholder="Height (cm)" required value={heightCm} onChange={(e) => setHeightCm(e.target.value)} style={{ padding: '0.75rem', backgroundColor: '#070a12', border: '1px solid #1e293b', borderRadius: '0.5rem', color: '#ffffff', outline: 'none' }} />
                <input type="number" placeholder="Weight (kg)" required value={weightKg} onChange={(e) => setWeightKg(e.target.value)} style={{ padding: '0.75rem', backgroundColor: '#070a12', border: '1px solid #1e293b', borderRadius: '0.5rem', color: '#ffffff', outline: 'none' }} />
              </div>
              <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1rem' }}>
                <button type="submit" style={{ flex: 1, padding: '0.75rem', backgroundColor: '#10b981', color: '#ffffff', border: 'none', borderRadius: '0.5rem', fontWeight: 800, cursor: 'pointer' }}>Save Athlete</button>
                <button type="button" onClick={() => setShowModal(false)} style={{ flex: 1, padding: '0.75rem', backgroundColor: '#334155', color: '#ffffff', border: 'none', borderRadius: '0.5rem', fontWeight: 800, cursor: 'pointer' }}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </motion.div>
  );
}