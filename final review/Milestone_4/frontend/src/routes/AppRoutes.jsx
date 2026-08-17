import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import DashboardLayout from '../layouts/DashboardLayout';
import Dashboard from '../pages/dashboard/Dashboard';
import Upload from '../pages/uploads/Upload';
import Reports from '../pages/reports/Reports';
import Athletes from '../pages/athletes/Athletes';
import Insights from '../pages/insights/Insights';
import LiveScreening from '../pages/live/LiveScreening';
import Login from '../pages/auth/Login';
import Register from '../pages/auth/Register';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/" element={<DashboardLayout />}>
        <Route index element={<Navigate to="/dashboard" replace />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="upload" element={<Upload />} />
        <Route path="reports" element={<Reports />} />
        <Route path="athletes" element={<Athletes />} />
        <Route path="insights" element={<Insights />} />
        <Route path="live" element={<LiveScreening />} />
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Route>
    </Routes>
  );
}