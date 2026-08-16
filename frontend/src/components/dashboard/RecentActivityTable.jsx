import {
  Chip,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

const chipColor = {
  Low: "success",
  Moderate: "warning",
  High: "error",
  Critical: "error",
};

export default function RecentActivityTable({ data = [] }) {
  return (
    <TableContainer component={Paper} elevation={0}>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell><strong>Athlete</strong></TableCell>
            <TableCell><strong>Sport</strong></TableCell>
            <TableCell><strong>Risk</strong></TableCell>
            <TableCell><strong>Date</strong></TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {data.map((row) => (
            <TableRow key={row.id} hover>
              <TableCell>{row.athleteName}</TableCell>

              <TableCell>{row.sport}</TableCell>

              <TableCell>
                <Chip
                  label={row.riskCategory}
                  color={chipColor[row.riskCategory] || "default"}
                  size="small"
                  variant="filled"
                />
              </TableCell>

              <TableCell>{row.date}</TableCell>
            </TableRow>
          ))}

          {data.length === 0 && (
            <TableRow>
              <TableCell
                colSpan={4}
                align="center"
                sx={{ py: 4 }}
              >
                No recent activity found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}