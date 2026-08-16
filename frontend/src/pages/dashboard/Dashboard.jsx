import {
  Box,
  Grid,
  Typography,
  Stack,
} from "@mui/material";

import DashboardCard from "../../components/dashboard/DashboardCard";
import RiskGauge from "../../components/dashboard/RiskGauge";
import RiskTrendChart from "../../components/dashboard/RiskTrendChart";
import RiskDistributionChart from "../../components/dashboard/RiskDistributionChart";
import RecentActivityTable from "../../components/dashboard/RecentActivityTable";

import { mockDashboardData } from "../../mock/dashboardData";

export default function Dashboard() {
  const { stats, riskTrend, riskDistribution, recentActivity } =
    mockDashboardData;

  return (
    <Box>
      <Typography
        variant="h4"
        sx={{
          mb: 4,
          fontWeight: 700,
        }}
      >
        Sports Injury Risk Dashboard
      </Typography>

      {/* Statistics */}
      <Grid container spacing={3}>
        <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
          <DashboardCard title="Total Athletes">
            <Typography variant="h3" fontWeight={700}>
              {stats.totalAthletes}
            </Typography>
          </DashboardCard>
        </Grid>

        <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
          <DashboardCard title="High Risk Athletes">
            <Typography
              variant="h3"
              fontWeight={700}
              color="error.main"
            >
              {stats.highRiskAthletes}
            </Typography>
          </DashboardCard>
        </Grid>

        <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
          <DashboardCard title="Reports This Week">
            <Typography variant="h3" fontWeight={700}>
              {stats.reportsThisWeek}
            </Typography>
          </DashboardCard>
        </Grid>

        <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
          <DashboardCard title="Average Risk">
            <Typography
              variant="h3"
              fontWeight={700}
              color="primary.main"
            >
              {stats.averageRiskScore}%
            </Typography>
          </DashboardCard>
        </Grid>
      </Grid>

      <Grid container spacing={3} sx={{ mt: 1 }}>
        <Grid size={{ xs: 12, md: 4 }}>
          <DashboardCard title="Current Risk">
            <RiskGauge value={stats.averageRiskScore} />
          </DashboardCard>
        </Grid>

        <Grid size={{ xs: 12, md: 8 }}>
          <DashboardCard title="Weekly Risk Trend">
            <RiskTrendChart data={riskTrend} />
          </DashboardCard>
        </Grid>
      </Grid>

      <Grid container spacing={3} sx={{ mt: 1 }}>
        <Grid size={{ xs: 12, lg: 5 }}>
          <DashboardCard title="Risk Distribution">
            <RiskDistributionChart data={riskDistribution} />
          </DashboardCard>
        </Grid>

        <Grid size={{ xs: 12, lg: 7 }}>
          <DashboardCard title="Recent Activity">
            <RecentActivityTable data={recentActivity} />
          </DashboardCard>
        </Grid>
      </Grid>
    </Box>
  );
}