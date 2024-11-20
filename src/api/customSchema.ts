import { components } from "./schema";

type BalanceUpdate = components["schemas"]["BalanceUpdateSchema"];
export type BalanceUpdateWithDate = BalanceUpdate & { date: Date };
