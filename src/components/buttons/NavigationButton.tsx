"use client";

import { useIsPathActive } from "@/hooks/navigation";
import { alpha, Box, Fade, useTheme } from "@mui/material";
import Button from "@mui/material/Button";
import NextLink from "next/link";
import { usePathname } from "next/navigation";
import { cloneElement, ReactElement } from "react";

interface NavigationButtonProps {
  icon?: ReactElement | null;
  text: string;
  href: string;
  selected?: boolean;
}

/**
 * A functional component that renders a circular SVG indicator.
 * The circle is filled with a secondary color from the theme if `isVisible` is true.
 *
 * @param {Object} props - The component props.
 * @param {boolean} props.isVisible - Determines if the circle should be filled with the theme's secondary color.
 * @returns {JSX.Element} The rendered SVG element.
 */
function SelectedIndicator({ isVisible }: { isVisible: boolean }) {
  const theme = useTheme();
  return (
    <Fade in={isVisible} timeout={300}>
      <svg height="10" width="10">
        <circle
          cx="5"
          cy="5"
          r="5"
          stroke="none"
          strokeWidth="3"
          fill={theme.palette.secondary.main}
        />
      </svg>
    </Fade>
  );
}

/**
 * A navigation button component that renders a button with an icon and text.
 * If the `selected` attribute is not provided, the button can be selected based on the current pathname.
 *
 * @param {Object} props - The properties object.
 * @param {ReactElement} props.icon - The icon to be displayed in the button.
 * @param {string} props.text - The text to be displayed in the button.
 * @param {string} props.href - The href link for the button.
 * @param {boolean} [props.selected] - Optional. Indicates if the button is selected.
 *
 * @returns {JSX.Element} The rendered navigation button component.
 */
export default function NavigationButton({
  icon,
  text,
  href,
  selected,
}: NavigationButtonProps) {
  const pathname = usePathname();
  const isActive = useIsPathActive(pathname);

  if (selected === undefined) {
    selected = isActive(href);
  }

  const iconColor = selected ? "action.selected" : "inherit";

  return (
    <Button
      href={href}
      component={NextLink}
      passHref
      color="inherit"
      variant={selected ? "contained" : "text"}
      sx={{
        minWidth: "auto",
        padding: "6px 16px", // Add fixed padding
        transition: (theme) =>
          theme.transitions.create(["background-color", "box-shadow"], {
            duration: theme.transitions.duration.short,
          }),
        "&:hover": {
          bgcolor: (theme) =>
            selected
              ? alpha(theme.palette.primary.main, 0.2)
              : alpha(theme.palette.primary.main, 0.04),
        },
        "& .MuiSvgIcon-root": {
          transition: (theme) =>
            theme.transitions.create("color", {
              duration: theme.transitions.duration.short,
            }),
        },
      }}
    >
      <Box display="flex" flexDirection="row" alignItems="center" gap={1}>
        {icon && cloneElement(icon as ReactElement, { color: iconColor })}
        {text}
        <SelectedIndicator isVisible={selected} />
      </Box>
    </Button>
  );
}
