import { components } from "@/api/schema";
import { useGetAccountBalanceHistory } from "@/hooks/account";
import { calculateBalanceTrend } from "@/utils/account";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { Box, Skeleton, Typography } from "@mui/material";

type Account = components["schemas"]["AccountSchema"];

interface BalanceChangeIndicatorProps {
  account: Account;
}

export default function AccountBalanceIndicator({
  account,
}: BalanceChangeIndicatorProps) {
  const {
    data: balanceUpdates,
    isLoading,
    isError,
  } = useGetAccountBalanceHistory(account.id);

  if (isLoading) {
    return (
      <Box display="flex" alignItems="center" ml={1}>
        <Skeleton variant="rectangular" width={20} height={20} sx={{ mr: 1 }} />
        <Skeleton variant="text" width={40} />
      </Box>
    );
  }

  if (isError) {
    return (
      <Typography color="error.main" variant="body2">
        Failed to load balance change
      </Typography>
    );
  }

  if (!balanceUpdates || balanceUpdates.length === 0) {
    return null;
  }

  const balanceChange = calculateBalanceTrend(balanceUpdates);

  return (
    <Box display="flex" alignItems="start" flexDirection="row" ml={1}>
      <Box>
        <Typography
          variant="body1"
          style={{ fontFamily: "monospace", fontWeight: "bold" }}
        >
          {account.currency} {account.balance}
        </Typography>
      </Box>
      <Box display="flex">
        {balanceChange > 0 ? (
          <AddIcon sx={{ color: "success.main" }} />
        ) : (
          <RemoveIcon sx={{ color: "error.main" }} />
        )}
        <Typography
          variant="body1"
          fontFamily="monospace"
          color={balanceChange > 0 ? "success.main" : "error.main"}
        >
          {Math.abs(balanceChange * 100).toFixed(1)}%
        </Typography>
      </Box>
    </Box>
  );
}
