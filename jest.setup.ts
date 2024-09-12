import server from "@/mocks/node";
import "@testing-library/jest-dom";

beforeAll(() => {
  // Enable API mocking before all the tests.
  // Initialize the client that'll be used in the tests and provide the fetch function.
  server.listen({
    onUnhandledRequest: (req) => {
      console.error(`Unhandled request: ${req.method} ${req.url}`);
    },
  });
});

afterEach(() => {
  // Reset the request handlers between each test.
  // This way the handlers we add on a per-test basis
  // do not leak to other, irrelevant tests.
  server.resetHandlers();
});

afterAll(() => {
  // Finally, disable API mocking after the tests are done.
  server.close();
});
