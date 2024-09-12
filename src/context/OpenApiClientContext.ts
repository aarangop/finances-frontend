import { OpenApiClient } from "@/utils/openApiClient";
import { createContext } from "react";

const OpenApiClientContext = createContext<OpenApiClient | null>(null);

export default OpenApiClientContext;
