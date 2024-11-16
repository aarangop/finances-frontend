import { usePathname } from "next/navigation";

/**
 * Checks if a given child URL path is a subpath of a parent URL path.
 *
 * This function strips the protocol and domain from both the child and parent URLs
 * before performing the comparison. It then checks if the child path starts with
 * the parent path.
 *
 * @param child - The child URL path to check.
 * @param parent - The parent URL path to compare against.
 * @returns `true` if the child path starts with the parent path, otherwise `false`.
 */
const isChildPathOf = (child: string, parent: string) => {
  // Strip protocol and domain
  let parentPath = parent.replace(/https?:\/\/[^/]+/, "");
  let childPath = child.replace(/https?:\/\/[^/]+/, "");

  if (parentPath === "/" && childPath !== "/") {
    return false;
  }

  // Remove leading slashes
  if (parentPath.startsWith("/")) {
    parentPath = parentPath.slice(1);
  }
  if (childPath.startsWith("/")) {
    childPath = childPath.slice(1);
  }

  return childPath.startsWith(parentPath);
};

/**
 * Custom hook to determine if a given pathname is active.
 *
 * @param pathname - The pathname to check against the current path.
 * @returns A function that checks if the given pathname is a child of the current path.
 */
export const useIsPathActive = (pathname: string) => {
  const currentPath = usePathname();

  return isChildPathOf.bind(undefined, pathname);
};
