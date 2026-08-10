import React, { useState, useEffect } from 'react';
import {
  Notifications,
  NotificationsActive,
  Close,
  Warning,
  CheckCircle,
  Verified,
  Sports,
  MedicalServices,
  Psychology,
  SupervisorAccount,
  AdminPanelSettings,
} from '@mui/icons-material';

export default function Topbar() {
  const [role, setRole] = useState(localStorage.getItem('user_role') || 'Coach');
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: 'Critical ACL Valgus Alert',
      message: 'Elevated knee asymmetry (11.4%) detected during Landing analysis for ATH-8842.',
      time: '10 mins ago',
      type: 'critical',
      read: false,
    },
    {
      id: 2,
      title: 'Training Load Warning',
      message: 'Weekly high-intensity load exceeded safe threshold by 15% for Sprinting drills.',
      time: '1 hour ago',
      type: 'warning',
      read: false,
    },
    {
      id: 3,
      title: 'Assessment Complete',
      message: 'Biomechanical kinematic matrix successfully calculated for running session.',
      time: '2 hours ago',
      type: 'info',
      read: true,
    },
  ]);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const handleRoleChange = (e) => {
    const newRole = e.target.value;
    setRole(newRole);
    localStorage.setItem('user_role', newRole);
    window.dispatchEvent(new Event('roleChange'));
  };

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const removeNotification = (id) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  return (
    <header
      style={{
        height: '64px',
        backgroundColor: '#070a12',
        borderBottom: '1px solid #1e293b',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 2rem',
        color: '#f8fafc',
        position: 'relative',
        zIndex: 50,
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
        <h2 style={{ fontSize: '1.1rem', fontWeight: 800, margin: 0, color: '#ffffff' }}>
          Sports Injury Risk Detection
        </h2>
        <span
          style={{
            fontSize: '0.65rem',
            fontWeight: 800,
            padding: '0.2rem 0.6rem',
            borderRadius: '9999px',
            backgroundColor: 'rgba(99, 102, 241, 0.2)',
            color: '#c7d2fe',
            border: '1px solid rgba(99, 102, 241, 0.4)',
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
          }}
        >
          AI Biomechanics
        </span>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
        {/* Role Switcher */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            backgroundColor: '#0f172a',
            padding: '0.35rem 0.75rem',
            borderRadius: '0.75rem',
            border: '1px solid #1e293b',
          }}
        >
          <span
            style={{
              fontSize: '0.7rem',
              fontWeight: 800,
              color: '#818cf8',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
            }}
          >
            Demo Role:
          </span>
          <select
            value={role}
            onChange={handleRoleChange}
            style={{
              backgroundColor: 'transparent',
              color: '#ffffff',
              fontSize: '0.75rem',
              fontWeight: 700,
              border: 'none',
              outline: 'none',
              cursor: 'pointer',
            }}
          >
            <option value="Coach" style={{ backgroundColor: '#0f172a' }}>Coach View</option>
            <option value="Physiotherapist" style={{ backgroundColor: '#0f172a' }}>Physiotherapist View</option>
            <option value="SportsScientist" style={{ backgroundColor: '#0f172a' }}>Sports Scientist View</option>
            <option value="Athlete" style={{ backgroundColor: '#0f172a' }}>Athlete View</option>
            <option value="Admin" style={{ backgroundColor: '#0f172a' }}>Administrator View</option>
          </select>
        </div>

        {/* Notification Bell Icon & Popover */}
        <div style={{ position: 'relative' }}>
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            style={{
              backgroundColor: '#0f172a',
              border: '1px solid #1e293b',
              borderRadius: '0.75rem',
              width: '40px',
              height: '40px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: unreadCount > 0 ? '#fb7185' : '#94a3b8',
              cursor: 'pointer',
              position: 'relative',
              transition: 'all 0.2s ease',
            }}
          >
            {unreadCount > 0 ? (
              <NotificationsActive fontSize="small" />
            ) : (
              <Notifications fontSize="small" />
            )}

            {unreadCount > 0 && (
              <span
                style={{
                  position: 'absolute',
                  top: '-4px',
                  right: '-4px',
                  backgroundColor: '#f43f5e',
                  color: '#ffffff',
                  fontSize: '0.6rem',
                  fontWeight: 900,
                  width: '18px',
                  height: '18px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: '2px solid #070a12',
                }}
              >
                {unreadCount}
              </span>
            )}
          </button>

          {/* Notifications Dropdown Popover */}
          {showNotifications && (
            <div
              style={{
                position: 'absolute',
                top: '50px',
                right: 0,
                width: '360px',
                backgroundColor: '#0f172a',
                border: '1px solid #1e293b',
                borderRadius: '1rem',
                boxShadow: '0 20px 30px rgba(0,0,0,0.6)',
                zIndex: 100,
                overflow: 'hidden',
              }}
            >
              <div
                style={{
                  padding: '0.85rem 1rem',
                  borderBottom: '1px solid #1e293b',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  backgroundColor: '#070a12',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <span style={{ fontSize: '0.8rem', fontWeight: 800, color: '#ffffff' }}>
                    Notifications & Risk Alerts
                  </span>
                  {unreadCount > 0 && (
                    <span
                      style={{
                        fontSize: '0.6rem',
                        padding: '0.15rem 0.5rem',
                        borderRadius: '9999px',
                        backgroundColor: 'rgba(244, 63, 94, 0.2)',
                        color: '#fb7185',
                        fontWeight: 800,
                      }}
                    >
                      {unreadCount} new
                    </span>
                  )}
                </div>
                <button
                  onClick={markAllAsRead}
                  style={{
                    backgroundColor: 'transparent',
                    border: 'none',
                    color: '#818cf8',
                    fontSize: '0.65rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                  }}
                >
                  Mark all read
                </button>
              </div>

              <div style={{ maxHeight: '320px', overflowY: 'auto' }}>
                {notifications.length === 0 ? (
                  <div style={{ padding: '2rem', textAlign: 'center', color: '#64748b', fontSize: '0.75rem' }}>
                    No alerts or notifications
                  </div>
                ) : (
                  notifications.map((n) => (
                    <div
                      key={n.id}
                      style={{
                        padding: '0.85rem 1rem',
                        borderBottom: '1px solid #1f2937',
                        backgroundColor: n.read ? 'transparent' : 'rgba(99, 102, 241, 0.08)',
                        display: 'flex',
                        gap: '0.75rem',
                        alignItems: 'flex-start',
                        position: 'relative',
                      }}
                    >
                      <div style={{ marginTop: '0.1rem' }}>
                        {n.type === 'critical' && <Warning style={{ fontSize: 18, color: '#f43f5e' }} />}
                        {n.type === 'warning' && <Warning style={{ fontSize: 18, color: '#f59e0b' }} />}
                        {n.type === 'info' && <CheckCircle style={{ fontSize: 18, color: '#10b981' }} />}
                      </div>

                      <div style={{ flex: 1 }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#ffffff' }}>
                            {n.title}
                          </span>
                          <span style={{ fontSize: '0.6rem', color: '#64748b' }}>{n.time}</span>
                        </div>
                        <p style={{ fontSize: '0.7rem', color: '#94a3b8', margin: '0.25rem 0 0 0', lineHeight: 1.3 }}>
                          {n.message}
                        </p>
                      </div>

                      <button
                        onClick={() => removeNotification(n.id)}
                        style={{
                          backgroundColor: 'transparent',
                          border: 'none',
                          color: '#64748b',
                          cursor: 'pointer',
                          padding: 0,
                          display: 'flex',
                        }}
                      >
                        <Close style={{ fontSize: 14 }} />
                      </button>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>

        {/* User Info */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div style={{ textAlign: 'right' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', justifyContent: 'flex-end' }}>
              <span style={{ fontSize: '0.8rem', fontWeight: 800, color: '#ffffff' }}>
                Rachit Patnaik
              </span>
              <Verified style={{ fontSize: 14, color: '#818cf8' }} />
            </div>
            <span style={{ fontSize: '0.65rem', color: '#10b981', fontWeight: 700 }}>● {role}</span>
          </div>

          <div
            style={{
              width: '38px',
              height: '38px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #4f46e5 0%, #06b6d4 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#ffffff',
              fontWeight: 900,
              fontSize: '0.85rem',
              boxShadow: '0 4px 12px rgba(79, 70, 229, 0.3)',
            }}
          >
            RP
          </div>
        </div>
      </div>
    </header>
  );
}