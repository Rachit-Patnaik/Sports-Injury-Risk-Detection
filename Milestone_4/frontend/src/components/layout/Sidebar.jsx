import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  GridView,
  CloudUpload,
  ShowChart,
  Assessment,
  Groups,
  Logout,
  Bolt,
  Verified,
  Dns,
  Videocam,
} from '@mui/icons-material';

export default function Sidebar() {
  const navigate = useNavigate();
  const [user, setUser] = useState({ full_name: 'Rachit Patnaik', role: 'Coach' });

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const storedRole = localStorage.getItem('user_role');
    if (storedUser) {
      try {
        const parsed = JSON.parse(storedUser);
        setUser({
          full_name: parsed.full_name || 'Rachit Patnaik',
          role: storedRole || parsed.role || 'Coach',
        });
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

  const handleSignOut = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  const navItems = [
    { label: 'Dashboard', path: '/dashboard', icon: <GridView fontSize="small" /> },
    { label: 'Live Screening', path: '/live', icon: <Videocam fontSize="small" />, badge: 'CAM' },
    { label: 'Upload Video', path: '/upload', icon: <CloudUpload fontSize="small" />, badge: 'ANALYZE' },
    { label: 'AI Insights', path: '/insights', icon: <ShowChart fontSize="small" />, badge: 'V2.4' },
    { label: 'Reports', path: '/reports', icon: <Assessment fontSize="small" /> },
    { label: 'Athletes', path: '/athletes', icon: <Groups fontSize="small" /> },
  ];

  return (
    <aside
      style={{
        width: '260px',
        backgroundColor: '#070a12',
        borderRight: '1px solid #1e293b',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '1.25rem 1rem',
        minHeight: '100vh',
        boxSizing: 'border-box',
        color: '#f8fafc',
      }}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.25rem 0.5rem' }}>
          <div
            style={{
              padding: '0.5rem',
              background: 'linear-gradient(135deg, #4f46e5 0%, #06b6d4 100%)',
              borderRadius: '0.75rem',
              color: '#ffffff',
              display: 'flex',
            }}
          >
            <Bolt fontSize="small" />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
              <span style={{ fontSize: '1.15rem', fontWeight: 900, color: '#ffffff' }}>
                Sports<span style={{ color: '#38bdf8' }}>AI</span>
              </span>
              <Verified style={{ fontSize: 14, color: '#818cf8' }} />
            </div>
            <span style={{ fontSize: '0.6rem', fontWeight: 800, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em', display: 'block' }}>
              Injury Intelligence
            </span>
          </div>
        </div>

        <div
          style={{
            backgroundColor: '#0f172a',
            border: '1px solid #1e293b',
            borderRadius: '0.85rem',
            padding: '0.85rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
          }}
        >
          <div
            style={{
              width: '36px',
              height: '36px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #4f46e5 0%, #06b6d4 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#ffffff',
              fontWeight: 900,
              fontSize: '0.8rem',
            }}
          >
            RP
          </div>
          <div style={{ overflow: 'hidden' }}>
            <div style={{ fontSize: '0.8rem', fontWeight: 800, color: '#ffffff', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
              {user.full_name}
            </div>
            <div style={{ fontSize: '0.65rem', color: '#94a3b8', fontWeight: 700 }}>
              Lead Researcher
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
          <span style={{ fontSize: '0.65rem', fontWeight: 800, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.08em', padding: '0 0.5rem 0.25rem' }}>
            Main Navigation
          </span>

          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              style={({ isActive }) => ({
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '0.7rem 0.85rem',
                borderRadius: '0.75rem',
                fontSize: '0.8rem',
                fontWeight: 800,
                textDecoration: 'none',
                color: isActive ? '#ffffff' : '#94a3b8',
                backgroundColor: isActive ? 'rgba(79, 70, 229, 0.25)' : 'transparent',
                border: isActive ? '1px solid rgba(99, 102, 241, 0.4)' : '1px solid transparent',
                transition: 'all 0.2s ease',
              })}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                {item.icon}
                <span>{item.label}</span>
              </div>
              {item.badge && (
                <span
                  style={{
                    fontSize: '0.55rem',
                    fontWeight: 900,
                    padding: '0.15rem 0.45rem',
                    borderRadius: '9999px',
                    backgroundColor: 'rgba(56, 189, 248, 0.15)',
                    color: '#38bdf8',
                    border: '1px solid rgba(56, 189, 248, 0.3)',
                  }}
                >
                  {item.badge}
                </span>
              )}
            </NavLink>
          ))}
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        <div
          style={{
            backgroundColor: '#0f172a',
            border: '1px solid #1e293b',
            borderRadius: '0.85rem',
            padding: '0.75rem 0.85rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.65rem',
          }}
        >
          <Dns style={{ fontSize: 18, color: '#34d399' }} />
          <div>
            <div style={{ fontSize: '0.7rem', fontWeight: 800, color: '#ffffff' }}>System Engine v2.4</div>
            <div style={{ fontSize: '0.6rem', color: '#10b981', fontWeight: 700 }}>● All Systems Operational</div>
          </div>
        </div>

        <button
          onClick={handleSignOut}
          style={{
            width: '100%',
            padding: '0.65rem',
            backgroundColor: 'rgba(244, 63, 94, 0.1)',
            border: '1px solid rgba(244, 63, 94, 0.25)',
            borderRadius: '0.75rem',
            color: '#fb7185',
            fontSize: '0.75rem',
            fontWeight: 800,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.5rem',
          }}
        >
          <Logout fontSize="small" />
          <span>Sign Out</span>
        </button>
      </div>
    </aside>
  );
}