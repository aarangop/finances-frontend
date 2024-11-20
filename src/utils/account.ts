import { BalanceUpdateWithDate } from "@/api/customSchema";
import { components } from "@/api/schema";

type BalanceUpdate = components["schemas"]["BalanceUpdateSchema"];

export function getBalanceUpdatesWithDate(
  balanceUpdates: BalanceUpdate[]
): BalanceUpdateWithDate[] {
  return balanceUpdates.map((update) => ({
    ...update,
    date: new Date(update.timestamp),
  }));
}

export function calculateBalanceTrend(balanceUpdates: BalanceUpdate[]) {
  if (balanceUpdates.length === 0) {
    return 0;
  }
  const balanceUpdateWithDates = getBalanceUpdatesWithDate(balanceUpdates);

  // Sort balance updates by timestamp.
  balanceUpdateWithDates.sort((a, b) => a.date.getTime() - b.date.getTime());
  const firstBalance = balanceUpdates[0]?.balance ?? 0;
  const lastBalance = balanceUpdates[balanceUpdates.length - 1]?.balance ?? 0;

  return (lastBalance - firstBalance) / firstBalance;
}
