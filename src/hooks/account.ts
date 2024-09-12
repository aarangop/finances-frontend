import { components } from "@/api/schema";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useApi, useOpenApiClient } from "./api";

type Account = components["schemas"]["AccountSchema"];
type AccountCreate = components["schemas"]["AccountCreateSchema"];

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

interface UseCreateAccountProps {
  onSuccess?: (data: Account, variables: AccountCreate, context: any) => void;
  onError?: (error: Error, variables: AccountCreate, context: any) => void;
}
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
