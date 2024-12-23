import { components } from "@/api/schema";
import server, { apiPath } from "@/mocks/node";
import { renderHook } from "@/utils/testing";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { waitFor } from "@testing-library/react";
import { http, HttpResponse } from "msw";
import { useCreateAccount, useDeleteAccount, useGetAccounts } from "./account";

type Account = components["schemas"]["AccountSchema"];
type AccountCreate = components["schemas"]["AccountCreateSchema"];

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
      http.get<any, Account[], any>(apiPath("/accounts/"), async () => {
        return HttpResponse.json<Account[]>([account]);
      })
    );
    const { result } = renderHook(() => useGetAccounts());
    await waitFor(() => expect(result.current.status).toBe("success"));

    expect(result.current.data).toEqual([account]);
  });
});

describe("useCreateAccount hook", () => {
  it("should return account data with id", async () => {
    server.use(
      http.post<any, AccountCreate, Account, string>(
        apiPath("/accounts/"),
        async ({ request }) => {
          const account = await request.json();
          return HttpResponse.json<Account>({ ...account, id: 2 });
        }
      )
    );
    const { result } = renderHook(
      () => useCreateAccount({ onSuccess: jest.fn(), onError: jest.fn() }),
      { wrapper }
    );
    const newAccount = await result.current.mutateAsync(account);
    expect(newAccount.id).toBe(2);
  });

  it("should call onSuccess callback when request succeeds", async () => {
    const onSuccess = jest.fn();
    server.use(
      http.post<any, AccountCreate, Account, string>(
        apiPath("/accounts/"),
        async ({ request }) => {
          const account = await request.json();
          return HttpResponse.json<Account>({ ...account, id: 2 });
        }
      )
    );
    const { result } = renderHook(
      () => useCreateAccount({ onSuccess, onError: jest.fn() }),
      { wrapper }
    );
    await result.current.mutateAsync(account);
    expect(onSuccess).toHaveBeenCalledWith(
      { ...account, id: 2 },
      account,
      undefined
    );
  });

  it("should call onError callback when request fails", async () => {
    const onError = jest.fn();
    server.use(
      http.post(apiPath("/accounts/"), () => {
        return HttpResponse.error();
      })
    );
    const { result } = renderHook(
      () => useCreateAccount({ onSuccess: jest.fn(), onError }),
      { wrapper }
    );

    await expect(result.current.mutateAsync(account)).rejects.toThrow();

    expect(onError).toHaveBeenCalledWith(expect.any(Error), account, undefined);
  });
});

describe("useDeleteAccount hook", () => {
  it("should delete the account successfully", async () => {
    server.use(
      http.delete(apiPath("/accounts/1"), () => {
        return new HttpResponse(null, { status: 204 });
      })
    );
    const { result } = renderHook(
      () => useDeleteAccount({ onSuccess: jest.fn(), onError: jest.fn() }),
      { wrapper }
    );
    await result.current.mutateAsync(account);
    await waitFor(() => expect(result.current.status).toBe("success"));
  });

  it("should call onSuccess callback when deletion succeeds", async () => {
    const onSuccess = jest.fn();
    server.use(
      http.delete(apiPath("/accounts/1"), () => {
        return new HttpResponse(null, { status: 204 });
      })
    );

    const { result } = renderHook(
      () => useDeleteAccount({ onSuccess, onError: jest.fn() }),
      { wrapper }
    );

    await result.current.mutateAsync(account);

    await waitFor(() => {
      expect(onSuccess).toHaveBeenCalled();
      // TODO: add assertion that the onSuccess callback is called with the correct arguments.
    });
  });

  it("should call onError callback when deletion fails", async () => {
    const onError = jest.fn();
    server.use(
      http.delete(apiPath("/accounts/1"), () => {
        return HttpResponse.error();
      })
    );
    const { result } = renderHook(
      () => useDeleteAccount({ onSuccess: jest.fn(), onError }),
      { wrapper }
    );

    await expect(result.current.mutateAsync(account)).rejects.toThrow();

    expect(onError).toHaveBeenCalledWith(expect.any(Error), account, undefined);
  });
});
