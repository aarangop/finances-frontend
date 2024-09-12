import OpenApiClientContext from "@/context/OpenApiClientContext";
import { OpenApiClient } from "@/utils/openApiClient";
import { ReactNode } from "react";

interface OpenApiClientProviderProps {
  client: OpenApiClient;
  children: ReactNode;
}

export default function OpenApiClientProvider({
  client,
  children,
}: OpenApiClientProviderProps) {
  return (
    <OpenApiClientContext.Provider value={client}>
      {children}
    </OpenApiClientContext.Provider>
  );
}
