import { components } from "@/api/schema";
import {
  useMutation,
  useQuery,
  useQueryClient,
  UseQueryResult,
} from "@tanstack/react-query";
import { useApi, useOpenApiClient } from "./api";

type Account = components["schemas"]["AccountSchema"];
type AccountCreate = components["schemas"]["AccountCreateSchema"];

/**
 * Custom hook to fetch accounts data using the OpenAPI client.
 *
 * This hook uses the `useQuery` hook from `react-query` to fetch the accounts data
 * from the API endpoint `/accounts/`. The query key used is `["accounts"]`.
 *
 * @returns {QueryObserverResult<Account[], unknown>} The result of the query, which includes
 * the accounts data and the query status.
 */
export const useGetAccounts = () => {
  const client = useOpenApiClient();
  return useQuery({
    queryKey: ["accounts"],
    queryFn: async () => {
      const response = await client.GET("/accounts/");
      return response.data as Account[];
    },
  });
};

/**
 * Custom hook to fetch account details by account ID.
 *
 * This hook uses the `useQuery` hook from React Query to fetch account data
 * from the API. It utilizes the `useOpenApiClient` hook to get the API client.
 *
 * @param {number} id - The ID of the account to fetch.
 * @returns {UseQueryResult<Account, Error>} The result of the query, including
 * the account data or an error if the query fails.
 *
 * @example
 * const { data, error, isLoading } = useGetAccountById(1);
 *
 * if (isLoading) {
 *   return <div>Loading...</div>;
 * }
 *
 * if (error) {
 *   return <div>Error: {error.message}</div>;
 * }
 *
 * return <div>Account Name: {data.name}</div>;
 */
export function useGetAccountById(id: number): UseQueryResult<Account, Error> {
  const client = useOpenApiClient();

  return useQuery({
    queryKey: ["accounts", id],
    queryFn: async () => {
      try {
        const response = await client.GET(`/accounts/{account_id}`, {
          params: { path: { account_id: id } },
        });
        return response.data as Account;
      } catch (error) {
        throw error;
      }
    },
  });
}

interface UpdateAccountBalanceProps {
  account: Account;
  newBalance: number;
  onSuccess?: () => void;
  onError?: (error: Error) => void;
}
export function useUpdateAccountBalance({
  account,
  newBalance,
  onSuccess,
  onError,
}: UpdateAccountBalanceProps) {
  const client = useOpenApiClient();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: { amount: number }) => {
      return client.PUT("/accounts/{account_id}/balance", {
        params: { path: { account_id: account.id } },
        body: { amount: data.amount },
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["accounts"] });
      if (onSuccess) {
        onSuccess();
      }
    },
    onError: (error: Error) => {
      if (onError) {
        onError(error);
      }
    },
  });
}

interface UseCreateAccountProps {
  onSuccess?: (data: Account, variables: AccountCreate, context: any) => void;
  onError?: (error: Error, variables: AccountCreate, context: any) => void;
}
/**
 * Custom hook to create a new account using a mutation.
 *
 * @param {Object} props - The properties for the hook.
 * @param {Function} [props.onSuccess] - Callback function to be called on successful account creation.
 * @param {Function} [props.onError] - Callback function to be called on account creation error.
 * @returns {Object} - The mutation object returned by useMutation.
 *
 * @example
 * const { mutate: createAccount } = useCreateAccount({
 *   onSuccess: () => {
 *     console.log('Account created successfully');
 *   },
 *   onError: (error) => {
 *     console.error('Error creating account', error);
 *   },
 * });
 *
 * createAccount({ name: 'New Account', balance: 1000 });
 */
export const useCreateAccount = ({
  onSuccess = () => {},
  onError = () => {},
}: UseCreateAccountProps) => {
  const { openApiClient, queryClient } = useApi();

  return useMutation({
    mutationKey: ["accounts"],
    mutationFn: async (account: AccountCreate) => {
      try {
        const response = await openApiClient.POST("/accounts/", {
          body: account,
        });
        queryClient.invalidateQueries({ queryKey: ["accounts"] });
        return response.data as Account;
      } catch (error: any) {
        throw error;
      }
    },
    onSuccess,
    onError,
  });
};

interface UseDeleteAccountProps {
  onSuccess?: (data: Account, variables: Account, context: any) => void;
  onError?: (error: Error, variables: Account, context: any) => void;
}

/**
 * Custom hook to delete an account.
 *
 * @param {Object} props - The properties for the hook.
 * @param {Function} [props.onSuccess] - Callback function to be called on successful deletion.
 * @param {Function} [props.onError] - Callback function to be called on error during deletion.
 * @returns {Object} - The mutation object returned by `useMutation`.
 *
 * @example
 * const { mutate: deleteAccount } = useDeleteAccount({
 *   onSuccess: () => {
 *     console.log('Account deleted successfully');
 *   },
 *   onError: (error) => {
 *     console.error('Error deleting account', error);
 *   },
 * });
 *
 * deleteAccount(account);
 */
export const useDeleteAccount = ({
  onSuccess = () => {},
  onError = () => {},
}: UseDeleteAccountProps) => {
  const { openApiClient, queryClient } = useApi();

  return useMutation({
    mutationKey: ["accounts"],
    mutationFn: async (account: Account) => {
      try {
        const response = await openApiClient.DELETE("/accounts/{account_id}", {
          params: { path: { account_id: account.id } },
        });
        queryClient.invalidateQueries({ queryKey: ["accounts"] });
        return response.data as Account;
      } catch (error: any) {
        throw error;
      }
    },
    onSuccess,
    onError,
  });
};
