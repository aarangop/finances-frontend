import OpenApiClientContext from "@/context/OpenApiClientContext";
import { useQueryClient } from "@tanstack/react-query";
import { useContext } from "react";

export const useApi = () => {
  return { openApiClient: useOpenApiClient(), queryClient: useQueryClient() };
};

export const useOpenApiClient = () => {
  let client = useContext(OpenApiClientContext);
  if (!client) {
    throw new Error(
      "useOpenApiClient must be used within an ApiClientsProvider"
    );
  }
  return client;
};
