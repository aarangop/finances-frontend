import getClient from "@/api/apiClient";
import { components } from "@/api/schema";
import { useMutation, useQuery } from "@tanstack/react-query";

type Account = components["schemas"]["AccountSchema"];
type AccountCreate = components["schemas"]["AccountCreateSchema"];

export const useGetAccounts = () =>
  useQuery({
    queryKey: ["accounts"],
    queryFn: async () => {
      const client = getClient();
      const response = await client.GET("/accounts/");
      return response.data as Account[];
    },
  });

interface UseCreateAccountProps {
  onSuccess?: (data: Account, variables: AccountCreate, context: any) => void;
  onError?: (error: Error, variables: AccountCreate, context: any) => void;
}
export const useCreateAccount = ({
  onSuccess = () => {},
  onError = () => {},
}: UseCreateAccountProps) =>
  useMutation({
    mutationKey: ["accounts"],
    mutationFn: async (account: AccountCreate) => {
      const client = getClient();
      try {
        const response = await client.POST("/accounts/", { body: account });
        return response.data as Account;
      } catch (error: any) {
        throw error;
      }
    },
    onSuccess,
    onError,
  });
