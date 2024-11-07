import { renderHook } from "@testing-library/react";
import { usePathname } from "next/navigation";
import { useIsPathActive } from "./navigation";

// Mock next/navigation
jest.mock("next/navigation", () => ({
  usePathname: jest.fn(),
}));

describe("navigation hooks", () => {
  describe("isChildPathOf function (via useIsPathActive)", () => {
    beforeEach(() => {
      (usePathname as jest.Mock).mockReturnValue("/finances/dashboard");
    });

    it("should return true when checking if current path is child of parent path", () => {
      const { result } = renderHook(() =>
        useIsPathActive("/finances/dashboard")
      );
      const isActive = result.current;

      expect(isActive("/finances")).toBe(true);
    });

    it("should return true when paths are exactly the same", () => {
      const { result } = renderHook(() =>
        useIsPathActive("/finances/dashboard")
      );
      const isActive = result.current;

      expect(isActive("/finances/dashboard")).toBe(true);
    });

    it("should return false when paths are different", () => {
      const { result } = renderHook(() =>
        useIsPathActive("/finances/dashboard")
      );
      const isActive = result.current;

      expect(isActive("/trips")).toBe(false);
    });

    it("should return false when parent path is longer than child path", () => {
      const { result } = renderHook(() => useIsPathActive("/finances"));
      const isActive = result.current;

      expect(isActive("/finances/dashboard")).toBe(false);
    });

    it("should handle paths with trailing slashes", () => {
      const { result } = renderHook(() =>
        useIsPathActive("/finances/dashboard/")
      );
      const isActive = result.current;

      expect(isActive("/finances/")).toBe(true);
    });

    it("should ignore protocol and domain if present", () => {
      const { result } = renderHook(() =>
        useIsPathActive("/finances/dashboard")
      );
      const isActive = result.current;

      expect(isActive("https://example.com/finances")).toBe(true);
    });
  });

  describe("useIsPathActive hook", () => {
    it("should update when pathname changes", () => {
      (usePathname as jest.Mock).mockReturnValue("/finances/dashboard");
      const { result, rerender } = renderHook(() =>
        useIsPathActive("/finances/dashboard")
      );

      expect(result.current("/finances")).toBe(true);

      // Simulate navigation to different path
      (usePathname as jest.Mock).mockReturnValue("/trips");
      rerender();

      expect(result.current("/finances")).toBe(false);
    });
  });
});
