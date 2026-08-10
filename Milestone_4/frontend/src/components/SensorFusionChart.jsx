import React from 'react';
import {
  ResponsiveContainer,
  ComposedChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
} from 'recharts';
import { Memory, Sensors } from '@mui/icons-material';

export default function SensorFusionChart({ data }) {
  if (!data || data.length === 0) {
    return (
      <div className="sports-card" style={{ padding: '1.5rem', textAlign: 'center', color: '#64748b' }}>
        No sensor fusion telemetry available. Execute a video analysis to render synchronized IMU + Vision curves.
      </div>
    );
  }

  return (
    <div className="sports-card" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #1e293b', paddingBottom: '0.75rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
          <div style={{ padding: '0.4rem', backgroundColor: 'rgba(56, 189, 248, 0.15)', borderRadius: '0.5rem', color: '#38bdf8', display: 'flex' }}>
            <Sensors />
          </div>
          <div>
            <h3 style={{ fontSize: '1rem', fontWeight: 900, margin: 0, color: '#ffffff' }}>
              Multi-Modal IMU Telemetry + Vision Fusion Alignment
            </h3>
            <p style={{ fontSize: '0.7rem', color: '#94a3b8', margin: '0.1rem 0 0 0' }}>
              Synchronized overlay of Joint Flexion ($\theta$), Angular Velocity ($\omega$), and Wearable Accelerometer Impact ($G$-Force)
            </p>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <span style={{ fontSize: '0.65rem', fontWeight: 800, color: '#38bdf8', backgroundColor: 'rgba(56, 189, 248, 0.1)', padding: '0.25rem 0.5rem', borderRadius: '0.4rem', border: '1px solid rgba(56, 189, 248, 0.3)' }}>
            ● Vision Sampling: {data.length} Hz
          </span>
          <span style={{ fontSize: '0.65rem', fontWeight: 800, color: '#f43f5e', backgroundColor: 'rgba(244, 63, 94, 0.1)', padding: '0.25rem 0.5rem', borderRadius: '0.4rem', border: '1px solid rgba(244, 63, 94, 0.3)' }}>
            ● IMU Telemetry Sync: Active
          </span>
        </div>
      </div>

      <div style={{ width: '100%', height: 320 }}>
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
            <XAxis dataKey="timestamp" stroke="#64748b" unit="s" style={{ fontSize: '0.7rem' }} />
            <YAxis yAxisId="left" stroke="#38bdf8" domain={[40, 180]} label={{ value: 'Angle (°)', angle: -90, position: 'insideLeft', fill: '#38bdf8', style: { fontSize: '0.7rem' } }} style={{ fontSize: '0.7rem' }} />
            <YAxis yAxisId="right" orientation="right" stroke="#f43f5e" domain={[0, 4]} label={{ value: 'Impact (G)', angle: 90, position: 'insideRight', fill: '#f43f5e', style: { fontSize: '0.7rem' } }} style={{ fontSize: '0.7rem' }} />
            <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', borderRadius: '0.5rem', fontSize: '0.75rem', color: '#f8fafc' }} />
            <Legend wrapperStyle={{ fontSize: '0.75rem', paddingTop: '0.5rem' }} />
            <Line yAxisId="left" type="monotone" dataKey="knee_angle" name="Knee Joint Angle (°)" stroke="#38bdf8" strokeWidth={2.5} dot={false} />
            <Line yAxisId="left" type="monotone" dataKey="angular_velocity" name="Angular Velocity (deg/s)" stroke="#818cf8" strokeWidth={1.5} strokeDasharray="4 4" dot={false} />
            <Line yAxisId="right" type="monotone" dataKey="imu_g_force" name="IMU Landing Impact (G)" stroke="#f43f5e" strokeWidth={2} dot={false} />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}