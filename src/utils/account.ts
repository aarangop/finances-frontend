import { BalanceUpdateWithDate } from "@/api/customSchema";
import { components } from "@/api/schema";

type BalanceUpdate = components["schemas"]["BalanceUpdateSchema"];

/**
 * Converts an array of balance updates to include a date object.
 *
 * @param balanceUpdates - An array of balance updates.
 * @returns An array of balance updates with an added date property.
 */
export function getBalanceUpdatesWithDate(
  balanceUpdates: BalanceUpdate[]
): BalanceUpdateWithDate[] {
  return balanceUpdates.map((update) => ({
    ...update,
    date: new Date(update.timestamp),
  }));
}

/**
 * Calculates the trend of balance updates over time.
 *
 * This function takes an array of balance updates, sorts them by date,
 * and calculates the trend as the percentage change from the first balance
 * to the last balance in the sorted array.
 *
 * @param {BalanceUpdate[]} balanceUpdates - An array of balance updates.
 * @returns {number} The percentage change in balance from the first to the last update.
 * If there are no balance updates, the function returns 0.
 */
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

/**
 * Masks an account number by replacing all but the last four characters with asterisks.
 *
 * @param accountNumber - The account number to be masked.
 * @returns The masked account number with only the last four characters visible.
 */
export const maskAccountNumber = (
  accountNumber: string,
  numberOfAsterisks: number = 6,
  numberOfVisibleDigits: number = 4
) => {
  if (numberOfAsterisks === -1) {
    return accountNumber
      .slice(-numberOfVisibleDigits)
      .padStart(accountNumber.length, "*");
  }
  return (
    "*".repeat(numberOfAsterisks) + accountNumber.slice(-numberOfVisibleDigits)
  );
};
