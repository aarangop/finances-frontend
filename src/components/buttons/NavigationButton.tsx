"use client";

import { Box, useTheme } from "@mui/material";
import Button from "@mui/material/Button";
import NextLink from "next/link";
import { cloneElement, ReactElement } from "react";

interface NavigationButtonProps {
  icon?: ReactElement | null;
  text: string;
  href: string;
  selected: boolean;
}

function SelectedIndicator({ isVisible }: { isVisible: boolean }) {
  const theme = useTheme();
  return (
    <svg height="10" width="10">
      <circle
        cx="5"
        cy="5"
        r="5"
        stroke="none"
        strokeWidth="3"
        fill={isVisible ? theme.palette.secondary.main : "none"}
      />
    </svg>
  );
}

export default function NavigationButton({
  icon,
  text,
  href,
  selected,
}: NavigationButtonProps) {
  const iconColor = selected ? "secondary" : "inherit";
  return (
    <Button
      href={href}
      component={NextLink}
      passHref
      color="inherit"
      variant={selected ? "contained" : "text"}
    >
      <Box display="flex" flexDirection="row" alignItems="center" gap={1}>
        {icon && cloneElement(icon as ReactElement, { color: iconColor })}
        {text}
        <SelectedIndicator isVisible={selected} />
      </Box>
    </Button>
  );
}
