export const mockDashboardData = {
  stats: {
    totalAthletes: 48,
    highRiskAthletes: 6,
    reportsThisWeek: 14,
    averageRiskScore: 34,
  },

  riskTrend: [
    { label: "Mon", value: 28 },
    { label: "Tue", value: 30 },
    { label: "Wed", value: 27 },
    { label: "Thu", value: 35 },
    { label: "Fri", value: 33 },
    { label: "Sat", value: 38 },
    { label: "Sun", value: 34 },
  ],

  riskDistribution: [
    { name: "Low", value: 22 },
    { name: "Moderate", value: 14 },
    { name: "High", value: 8 },
    { name: "Critical", value: 4 },
  ],

  recentActivity: [
    {
      id: "a1",
      athleteName: "Meera Iyer",
      sport: "Sprinting",
      riskCategory: "High",
      date: "2026-07-18",
    },
    {
      id: "a2",
      athleteName: "Arjun Rao",
      sport: "Football",
      riskCategory: "Low",
      date: "2026-07-18",
    },
    {
      id: "a3",
      athleteName: "Kabir Singh",
      sport: "Basketball",
      riskCategory: "Moderate",
      date: "2026-07-17",
    },
    {
      id: "a4",
      athleteName: "Priya Nair",
      sport: "Running",
      riskCategory: "Critical",
      date: "2026-07-17",
    },
    {
      id: "a5",
      athleteName: "Dev Malhotra",
      sport: "Jumping",
      riskCategory: "Low",
      date: "2026-07-16",
    },
  ],
};