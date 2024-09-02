import getClient from "@/api/apiClient";
import { components } from "@/api/schema";
import { useQuery } from "@tanstack/react-query";

type Account = components["schemas"]["AccountSchema"];

export const useGetAccounts = () =>
  useQuery({
    queryKey: ["accounts"],
    queryFn: async () => {
      const client = getClient();
      const response = await client.GET("/accounts/");
      return response.data as Account[];
    },
  });
