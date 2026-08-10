import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SmartToy, Close, Send, Bolt, Verified } from '@mui/icons-material';

export default function CopilotDrawer() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      sender: 'bot',
      text: 'Hello Rachit! I am your AI Sports Scientist Copilot. How can I assist with your biomechanical risk assessment today?',
    },
  ]);
  const [input, setInput] = useState('');

  const quickPrompts = [
    "Why is Rachit's ACL risk score elevated?",
    "Generate a 4-week hamstring recovery protocol.",
    "Explain the 5-Factor Weighted Risk Score formula.",
  ];

  const handleSend = (textToSend) => {
    const query = textToSend || input;
    if (!query.trim()) return;

    const userMsg = { sender: 'user', text: query };
    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInput('');

    setTimeout(() => {
      let botResponse = "I have analyzed the latest kinematic session. The athlete's parameters remain within optimal bounds.";

      if (query.includes("ACL") || query.includes("elevated")) {
        botResponse = "Rachit's ACL vulnerability is rated Moderate due to an 11.4% bilateral knee asymmetry index detected during landing deceleration. Recommended action: Gluteus medius strengthening and landing re-education.";
      } else if (query.includes("hamstring") || query.includes("recovery")) {
        botResponse = "4-Week Hamstring Protocol:\n1. Week 1: Eccentric isometric holds (3x30s).\n2. Week 2: Nordic hamstring curls (3x5 reps).\n3. Week 3: Dynamic hip flexor mobility & high-velocity accelerations.\n4. Week 4: Full sport-specific sprint integration.";
      } else if (query.includes("formula") || query.includes("Weighted")) {
        botResponse = "The Module 8 formula calculates:\nScore = 35%(Biomechanical Deviations) + 20%(Injury History) + 20%(Movement Asymmetry) + 15%(Training Load) + 10%(Fatigue Indicators).";
      }

      setMessages((prev) => [...prev, { sender: 'bot', text: botResponse }]);
    }, 600);
  };

  return (
    <>
      {/* Floating Launcher Button */}
      <button
        onClick={() => setOpen(!open)}
        style={{
          position: 'fixed',
          bottom: '24px',
          right: '24px',
          width: '56px',
          height: '56px',
          borderRadius: '50%',
          background: 'linear-gradient(135deg, #4f46e5 0%, #06b6d4 100%)',
          color: '#ffffff',
          border: 'none',
          boxShadow: '0 8px 25px rgba(79, 70, 229, 0.5)',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 999,
        }}
      >
        <SmartToy style={{ fontSize: 28 }} />
      </button>

      {/* Slide-In Copilot Drawer */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.95 }}
            style={{
              position: 'fixed',
              bottom: '90px',
              right: '24px',
              width: '380px',
              height: '520px',
              backgroundColor: '#0f172a',
              border: '1px solid #1e293b',
              borderRadius: '1.25rem',
              boxShadow: '0 20px 40px rgba(0,0,0,0.7)',
              zIndex: 999,
              display: 'flex',
              flexDirection: 'column',
              overflow: 'hidden',
            }}
          >
            {/* Drawer Header */}
            <div style={{ padding: '1rem', backgroundColor: '#070a12', borderBottom: '1px solid #1e293b', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                <div style={{ padding: '0.4rem', backgroundColor: 'rgba(99, 102, 241, 0.2)', borderRadius: '0.5rem', color: '#818cf8', display: 'flex' }}>
                  <SmartToy fontSize="small" />
                </div>
                <div>
                  <div style={{ fontSize: '0.85rem', fontWeight: 900, color: '#ffffff', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                    SportsAI Copilot <Verified style={{ fontSize: 14, color: '#818cf8' }} />
                  </div>
                  <span style={{ fontSize: '0.6rem', color: '#10b981', fontWeight: 700 }}>● Clinical Intelligence Active</span>
                </div>
              </div>
              <button onClick={() => setOpen(false)} style={{ backgroundColor: 'transparent', border: 'none', color: '#64748b', cursor: 'pointer' }}>
                <Close fontSize="small" />
              </button>
            </div>

            {/* Chat Body */}
            <div style={{ flex: 1, padding: '1rem', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {messages.map((m, idx) => (
                <div
                  key={idx}
                  style={{
                    alignSelf: m.sender === 'user' ? 'flex-end' : 'flex-start',
                    maxWidth: '85%',
                    padding: '0.75rem 0.9rem',
                    borderRadius: '0.85rem',
                    backgroundColor: m.sender === 'user' ? '#4f46e5' : 'rgba(15, 23, 42, 0.8)',
                    border: m.sender === 'user' ? 'none' : '1px solid #1f2937',
                    color: '#ffffff',
                    fontSize: '0.75rem',
                    lineHeight: 1.4,
                    whiteSpace: 'pre-line',
                  }}
                >
                  {m.text}
                </div>
              ))}
            </div>

            {/* Quick Prompts Chips */}
            <div style={{ padding: '0.5rem 0.75rem', display: 'flex', flexDirection: 'column', gap: '0.35rem', borderTop: '1px solid #1e293b', backgroundColor: '#070a12' }}>
              <span style={{ fontSize: '0.6rem', fontWeight: 800, color: '#64748b', textTransform: 'uppercase' }}>Quick Clinical Queries:</span>
              {quickPrompts.map((p, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSend(p)}
                  style={{
                    textAlign: 'left',
                    backgroundColor: 'rgba(15, 23, 42, 0.8)',
                    border: '1px solid #1e293b',
                    borderRadius: '0.5rem',
                    padding: '0.35rem 0.6rem',
                    color: '#94a3b8',
                    fontSize: '0.65rem',
                    cursor: 'pointer',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                  }}
                >
                  {p}
                </button>
              ))}
            </div>

            {/* Input Bar */}
            <div style={{ padding: '0.75rem', borderTop: '1px solid #1e293b', display: 'flex', gap: '0.5rem', backgroundColor: '#070a12' }}>
              <input
                type="text"
                placeholder="Ask clinical question..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                style={{ flex: 1, backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '0.5rem', padding: '0.5rem 0.75rem', color: '#ffffff', fontSize: '0.75rem', outline: 'none' }}
              />
              <button onClick={() => handleSend()} style={{ backgroundColor: '#4f46e5', color: '#ffffff', border: 'none', borderRadius: '0.5rem', padding: '0.5rem 0.75rem', cursor: 'pointer', display: 'flex' }}>
                <Send fontSize="small" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}