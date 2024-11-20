"use client";

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

/**
 * AccountBalanceIndicator component displays the balance and balance change trend for a given account.
 * It uses animated springs to smoothly transition the displayed balance and percentage change.
 *
 * @param {BalanceChangeIndicatorProps} props - The properties for the component.
 * @param {Account} props.account - The account object containing balance and currency information.
 *
 * @returns {JSX.Element | null} The rendered component or null if there are no balance updates.
 *
 * @example
 * <AccountBalanceIndicator account={account} />
 *
 * @remarks
 * This component fetches the account balance history using the `useGetAccountBalanceHistory` hook.
 * It displays a loading skeleton while fetching data and an error message if the fetch fails.
 * If there are no balance updates, it returns null.
 *
 * @component
 */
export default function AccountBalanceIndicator({
  account,
}: BalanceChangeIndicatorProps) {
  const {
    data: balanceUpdates,
    isLoading,
    isError,
  } = useGetAccountBalanceHistory(account.id);

  const balanceChange = balanceUpdates
    ? calculateBalanceTrend(balanceUpdates)
    : 0;

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

  return (
    <Box display="flex" alignItems="start" flexDirection="row">
      <Box>
        <Typography
          component="div"
          sx={{ fontFamily: "monospace", fontWeight: "bold" }}
        >
          {account.balance.toFixed(2)}
        </Typography>
      </Box>
      <Box display="flex">
        {balanceChange > 0 ? (
          <AddIcon sx={{ color: "success.main" }} />
        ) : (
          <RemoveIcon sx={{ color: "error.main" }} />
        )}
        <Typography
          component="div"
          sx={{
            fontFamily: "monospace",
            color: balanceChange > 0 ? "#2e7d32" : "#d32f2f",
          }}
        >
          {`${(balanceChange < 0 ? -1 * balanceChange : balanceChange).toFixed(
            1
          )}%`}
        </Typography>
      </Box>
    </Box>
  );
}
