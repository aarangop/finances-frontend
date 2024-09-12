import createClient from "openapi-fetch";
import getOpenApiClient, { OpenApiClient } from "./openApiClient";

// Mock the `createClient` function from `openapi-fetch`
jest.mock("openapi-fetch");

describe("getOpenApiClient", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should return a new client when no options or fetch function are provided", () => {
    // Arrange
    const mockClient = {} as OpenApiClient;
    (createClient as jest.Mock).mockReturnValue(mockClient);

    // Act
    const client = getOpenApiClient();

    // Assert
    expect(createClient).toHaveBeenCalledWith({});
    expect(client).toBe(mockClient);
  });

  it("should pass custom client options to createClient", () => {
    // Arrange
    const mockClientOptions = { baseUrl: "https://example.com" };
    const mockClient = {} as OpenApiClient;
    (createClient as jest.Mock).mockReturnValue(mockClient);

    // Act
    const client = getOpenApiClient(mockClientOptions);

    // Assert
    expect(createClient).toHaveBeenCalledWith(mockClientOptions);
    expect(client).toBe(mockClient);
  });

  it("should include custom fetch function in the options", () => {
    // Arrange
    const mockFetch = jest.fn();
    const mockClientOptions = { baseUrl: "https://example.com" };
    const mockClient = {} as OpenApiClient;
    (createClient as jest.Mock).mockReturnValue(mockClient);

    // Act
    const client = getOpenApiClient(mockClientOptions, mockFetch);

    // Assert
    expect(createClient).toHaveBeenCalledWith({
      ...mockClientOptions,
      fetch: mockFetch,
    });
    expect(client).toBe(mockClient);
  });

  it("should use default client options if only fetch function is provided", () => {
    // Arrange
    const mockFetch = jest.fn();
    const mockClient = {} as OpenApiClient;
    (createClient as jest.Mock).mockReturnValue(mockClient);

    // Act
    const client = getOpenApiClient(undefined, mockFetch);

    // Assert
    expect(createClient).toHaveBeenCalledWith({ fetch: mockFetch });
    expect(client).toBe(mockClient);
  });
});
