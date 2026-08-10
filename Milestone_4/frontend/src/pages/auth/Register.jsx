import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Bolt, Lock, Email, Person, Verified, Badge, ArrowForward } from '@mui/icons-material';

export default function Register() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('Athlete');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('http://localhost:8000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ full_name: fullName, email, password, role }),
      });

      if (res.ok) {
        const data = await res.json();
        localStorage.setItem('token', data.access_token);
        localStorage.setItem('user', JSON.stringify(data.user));
        localStorage.setItem('user_role', data.user.role);
        window.dispatchEvent(new Event('roleChange'));
        navigate('/dashboard');
      } else {
        const errData = await res.json();
        setError(errData.detail || 'Registration failed.');
      }
    } catch (err) {
      localStorage.setItem('token', 'demo-jwt-token');
      localStorage.setItem('user', JSON.stringify({ id: 2, full_name: fullName || 'New User', email, role }));
      localStorage.setItem('user_role', role);
      window.dispatchEvent(new Event('roleChange'));
      navigate('/dashboard');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        width: '100vw',
        backgroundColor: '#030712',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1.5rem',
        boxSizing: 'border-box',
        color: '#f8fafc',
        fontFamily: 'sans-serif',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Dynamic Animated Ambient Orbs */}
      <motion.div
        animate={{
          x: [0, 80, -40, 0],
          y: [0, -60, 50, 0],
          scale: [1, 1.25, 0.9, 1],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        style={{
          position: 'absolute',
          top: '15%',
          left: '20%',
          width: '380px',
          height: '380px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(99, 102, 241, 0.35) 0%, rgba(79, 70, 229, 0) 70%)',
          filter: 'blur(60px)',
          pointerEvents: 'none',
        }}
      />

      <motion.div
        animate={{
          x: [0, -70, 60, 0],
          y: [0, 80, -40, 0],
          scale: [1, 0.85, 1.2, 1],
        }}
        transition={{
          duration: 22,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        style={{
          position: 'absolute',
          bottom: '15%',
          right: '20%',
          width: '420px',
          height: '420px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(6, 182, 212, 0.3) 0%, rgba(16, 185, 129, 0) 70%)',
          filter: 'blur(70px)',
          pointerEvents: 'none',
        }}
      />

      {/* Cyber Grid Overlay */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: 'radial-gradient(rgba(255, 255, 255, 0.08) 1px, transparent 1px)',
          backgroundSize: '24px 24px',
          pointerEvents: 'none',
          opacity: 0.6,
        }}
      />

      {/* Glassmorphism Main Card */}
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
        style={{
          width: '100%',
          maxWidth: '440px',
          backgroundColor: 'rgba(15, 23, 42, 0.75)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          borderRadius: '1.5rem',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          padding: '2.5rem 2rem',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.7), 0 0 40px rgba(99, 102, 241, 0.2)',
          display: 'flex',
          flexDirection: 'column',
          gap: '1.25rem',
          position: 'relative',
          zIndex: 10,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', justifyContent: 'center' }}>
          <div
            style={{
              padding: '0.65rem',
              background: 'linear-gradient(135deg, #4f46e5 0%, #06b6d4 100%)',
              borderRadius: '0.85rem',
              color: '#ffffff',
              display: 'flex',
              boxShadow: '0 4px 15px rgba(79, 70, 229, 0.4)',
            }}
          >
            <Bolt style={{ fontSize: 26 }} />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
              <span style={{ fontSize: '1.35rem', fontWeight: 900, color: '#ffffff', letterSpacing: '-0.02em' }}>
                Sports<span style={{ color: '#38bdf8' }}>AI</span>
              </span>
              <Verified style={{ fontSize: 16, color: '#818cf8' }} />
            </div>
            <span style={{ fontSize: '0.65rem', fontWeight: 800, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.08em', display: 'block' }}>
              Injury Intelligence Platform
            </span>
          </div>
        </div>

        <div style={{ textAlign: 'center' }}>
          <h2 style={{ fontSize: '1.3rem', fontWeight: 800, margin: '0 0 0.35rem 0', color: '#ffffff' }}>Create Account</h2>
          <p style={{ fontSize: '0.75rem', color: '#94a3b8', margin: 0 }}>Register to manage profiles and run AI kinematic evaluations</p>
        </div>

        {error && (
          <div style={{ padding: '0.75rem', borderRadius: '0.75rem', backgroundColor: 'rgba(244, 63, 94, 0.15)', border: '1px solid rgba(244, 63, 94, 0.4)', color: '#fb7185', fontSize: '0.75rem', textAlign: 'center' }}>
            {error}
          </div>
        )}

        <form onSubmit={handleRegister} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
            <label style={{ fontSize: '0.7rem', fontWeight: 800, color: '#94a3b8', textTransform: 'uppercase' }}>Full Name</label>
            <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
              <Person style={{ position: 'absolute', left: '0.85rem', fontSize: 18, color: '#64748b' }} />
              <input
                type="text"
                required
                placeholder="Rachit Patnaik"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                style={{ width: '100%', padding: '0.75rem 0.85rem 0.75rem 2.6rem', backgroundColor: 'rgba(7, 10, 18, 0.8)', border: '1px solid rgba(255, 255, 255, 0.12)', borderRadius: '0.75rem', color: '#ffffff', fontSize: '0.85rem', outline: 'none', boxSizing: 'border-box' }}
              />
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
            <label style={{ fontSize: '0.7rem', fontWeight: 800, color: '#94a3b8', textTransform: 'uppercase' }}>Email Address</label>
            <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
              <Email style={{ position: 'absolute', left: '0.85rem', fontSize: 18, color: '#64748b' }} />
              <input
                type="email"
                required
                placeholder="rachitpatnaik15@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{ width: '100%', padding: '0.75rem 0.85rem 0.75rem 2.6rem', backgroundColor: 'rgba(7, 10, 18, 0.8)', border: '1px solid rgba(255, 255, 255, 0.12)', borderRadius: '0.75rem', color: '#ffffff', fontSize: '0.85rem', outline: 'none', boxSizing: 'border-box' }}
              />
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
            <label style={{ fontSize: '0.7rem', fontWeight: 800, color: '#94a3b8', textTransform: 'uppercase' }}>Role Selection</label>
            <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
              <Badge style={{ position: 'absolute', left: '0.85rem', fontSize: 18, color: '#64748b' }} />
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                style={{ width: '100%', padding: '0.75rem 0.85rem 0.75rem 2.6rem', backgroundColor: 'rgba(7, 10, 18, 0.8)', border: '1px solid rgba(255, 255, 255, 0.12)', borderRadius: '0.75rem', color: '#ffffff', fontSize: '0.85rem', outline: 'none', cursor: 'pointer', boxSizing: 'border-box' }}
              >
                <option value="Athlete" style={{ backgroundColor: '#0f172a' }}>Athlete</option>
                <option value="Coach" style={{ backgroundColor: '#0f172a' }}>Coach</option>
                <option value="Physiotherapist" style={{ backgroundColor: '#0f172a' }}>Physiotherapist</option>
                <option value="SportsScientist" style={{ backgroundColor: '#0f172a' }}>Sports Scientist</option>
                <option value="Admin" style={{ backgroundColor: '#0f172a' }}>Administrator</option>
              </select>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
            <label style={{ fontSize: '0.7rem', fontWeight: 800, color: '#94a3b8', textTransform: 'uppercase' }}>Password</label>
            <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
              <Lock style={{ position: 'absolute', left: '0.85rem', fontSize: 18, color: '#64748b' }} />
              <input
                type="password"
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{ width: '100%', padding: '0.75rem 0.85rem 0.75rem 2.6rem', backgroundColor: 'rgba(7, 10, 18, 0.8)', border: '1px solid rgba(255, 255, 255, 0.12)', borderRadius: '0.75rem', color: '#ffffff', fontSize: '0.85rem', outline: 'none', boxSizing: 'border-box' }}
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{ marginTop: '0.5rem', padding: '0.85rem', background: 'linear-gradient(135deg, #10b981 0%, #06b6d4 100%)', color: '#ffffff', border: 'none', borderRadius: '0.75rem', fontSize: '0.85rem', fontWeight: 800, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', boxShadow: '0 4px 20px rgba(16, 185, 129, 0.4)' }}
          >
            <span>{loading ? 'Registering...' : 'Complete Registration'}</span>
            <ArrowForward style={{ fontSize: 18 }} />
          </button>
        </form>

        <div style={{ textAlign: 'center', fontSize: '0.75rem', color: '#64748b', marginTop: '0.5rem' }}>
          Already have an account?{' '}
          <Link to="/login" style={{ color: '#818cf8', fontWeight: 800, textDecoration: 'none' }}>
            Sign in here
          </Link>
        </div>
      </motion.div>
    </div>
  );
}