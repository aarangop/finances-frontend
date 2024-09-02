import { components } from "@/api/schema";
import server, { apiPath } from "@/mocks/node";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { renderHook, waitFor } from "@testing-library/react";
import { http, HttpResponse } from "msw";
import { useGetAccounts } from "./account";

type Account = components["schemas"]["AccountSchema"];

const account: Account = {
  id: 1,
  bank: "Test bank",
  holder: "My Self",
  balance: 100000,
  currency: "COP",
  account_number: "1234567890",
  account_alias: "Test Account",
  expenses: [],
};

const queryClient = new QueryClient();

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

describe("useGetAccount hook", () => {
  it("should return the account data", async () => {
    server.use(
      http.get<any, Account[], any, string>(apiPath("/accounts/"), async () => {
        return HttpResponse.json<Account[]>([account]);
      })
    );
    const { result } = renderHook(() => useGetAccounts(), { wrapper });
    await waitFor(() => expect(result.current.status).toBe("success"));

    expect(result.current.data).toEqual([account]);
  });
});
