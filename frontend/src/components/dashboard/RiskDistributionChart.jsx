import { Box } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { PieChart, Pie, Cell, Legend, Tooltip, ResponsiveContainer } from "recharts";

const CATEGORY_COLOR_KEYS = {
  Low: "success",
  Moderate: "warning",
  High: "error",
  Critical: "errorDark",
};

export default function RiskDistributionChart({ data, height = 260 }) {
  const theme = useTheme();

  const colorMap = {
    success: theme.palette.success.main,
    warning: theme.palette.warning.main,
    error: theme.palette.error.main,
    errorDark: theme.palette.error.dark,
  };

  return (
    <Box sx={{ width: "100%", height }}>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="45%"
            innerRadius="55%"
            outerRadius="80%"
            paddingAngle={2}
          >
            {data.map((entry) => (
              <Cell
                key={entry.name}
                fill={colorMap[CATEGORY_COLOR_KEYS[entry.name]] || theme.palette.text.secondary}
              />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{
              borderRadius: 12,
              border: `1px solid ${theme.palette.divider}`,
              boxShadow: theme.shadows[3],
              fontSize: 13,
            }}
          />
          <Legend
            verticalAlign="bottom"
            iconType="circle"
            wrapperStyle={{ fontSize: 13, color: theme.palette.text.secondary }}
          />
        </PieChart>
      </ResponsiveContainer>
    </Box>
  );
}