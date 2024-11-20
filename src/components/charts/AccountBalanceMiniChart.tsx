import { components } from "@/api/schema";
import { useGetAccountBalanceHistory } from "@/hooks/account";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import { Box, Skeleton, Tooltip } from "@mui/material";
import { Line, LineChart, ResponsiveContainer } from "recharts";

type BalanceUpdate = components["schemas"]["BalanceUpdateSchema"];

interface AccountBalanceMiniChartProps {
  accountId: number;
  onClick?: () => void;
  onDoubleClick?: () => void;
  tooltipText?: string;
}

export default function AccountBalanceMiniChart({
  accountId,
  onClick,
  onDoubleClick,
  tooltipText = "Click to expand chart",
}: AccountBalanceMiniChartProps) {
  const {
    data: balanceUpdates = [],
    isLoading,
    isError,
  } = useGetAccountBalanceHistory(accountId);

  const data = balanceUpdates.map((update: BalanceUpdate) => {
    return {
      balance: update.balance,
      date: update.timestamp ? new Date(update.timestamp) : new Date(),
    };
  });

  if (isLoading) {
    return (
      <Box height={50} width={120}>
        <Skeleton variant="rectangular" width="100%" height="100%" />
      </Box>
    );
  }

  if (isError) {
    return (
      <Box
        height={50}
        width={120}
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Tooltip title="Failed to load chart data">
          <ErrorOutlineIcon color="error" />
        </Tooltip>
      </Box>
    );
  }

  return (
    <Tooltip title={tooltipText}>
      <Box
        height={50}
        width={120}
        sx={{
          cursor: onClick ? "pointer" : "default",
          "&:hover": onClick
            ? {
                backgroundColor: "action.hover",
                borderRadius: 1,
              }
            : {},
        }}
        onClick={onClick}
        onDoubleClick={onDoubleClick}
      >
        <ResponsiveContainer>
          <LineChart data={data}>
            <Line
              type="monotone"
              dataKey="balance"
              stroke="#8884d8"
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </Box>
    </Tooltip>
  );
}
