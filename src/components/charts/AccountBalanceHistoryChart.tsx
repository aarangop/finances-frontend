import { components } from "@/api/schema";
import { useGetAccountBalanceHistory } from "@/hooks/account";
import { getBalanceUpdatesWithDate } from "@/utils/account";
import { Box, CircularProgress, Typography } from "@mui/material";
import { useMemo } from "react";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

type Account = components["schemas"]["AccountSchema"];

interface ResponsiveLineChartProps {
  account: Account;
  height?: number;
}

export default function AccountBalanceHistoryChart({
  account,
  height = 300,
}: ResponsiveLineChartProps) {
  const { data, isLoading, isError } = useGetAccountBalanceHistory(account.id);

  if (isLoading) {
    return (
      <Box
        sx={{
          height,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (isError) {
    return (
      <Box
        sx={{
          height,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography color="error">Error loading balance history</Typography>
      </Box>
    );
  }

  const chartData = useMemo(() => {
    return data
      ? getBalanceUpdatesWithDate(data).map((balanceUpdate) => ({
          ...balanceUpdate,
          xDate: balanceUpdate.date.toLocaleDateString(),
          name: balanceUpdate.date.toLocaleDateString(),
        }))
      : [];
  }, [data]);

  return (
    <Box sx={{ height, p: 3 }}>
      <ResponsiveContainer width={"100%"} height={"100%"}>
        <LineChart width={500} height={300} data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="xDate" />
          <YAxis
            label={{
              value: `Balance (${account.currency})`,
              angle: -90,
              position: "insideBottomLeft",
              offset: 12,
            }}
          />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="balance" stroke="#3f51b5" />
        </LineChart>
      </ResponsiveContainer>
    </Box>
  );
}
