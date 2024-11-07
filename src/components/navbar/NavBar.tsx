"use client";

import { useIsPathActive } from "@/hooks/navigation";
import { Box, Button, Container, Toolbar, Typography } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import NextLink from "next/link";
import { usePathname } from "next/navigation";
import NavigationButton from "../buttons/NavigationButton";
import ThemeToggleSwitch from "../buttons/ThemeToggleSwitch";

export default function NavBar() {
  const pathname = usePathname();

  const isActive = useIsPathActive(pathname);

  return (
    <AppBar position="static">
      <Container>
        <Toolbar sx={{ width: "100%" }}>
          <Typography variant="h6" sx={{ mr: "1rem" }}>
            My Finances
          </Typography>
          <Box
            sx={{
              flexGrow: 1,
              display: "flex",
              ml: 2,
              justifyContent: "flex-start",
              sm: { display: "none" },
            }}
            gap={2}
          >
            <NavigationButton href="/" text="Home" selected={isActive("/")} />
            <Button
              href="/finances"
              component={NextLink}
              passHref
              color="inherit"
              sx={{
                backgroundColor: isActive("/finances")
                  ? "action.selected"
                  : "transparent",
              }}
            >
              Finances
            </Button>
            <Button
              href="/trips"
              component={NextLink}
              passHref
              color="inherit"
              sx={{
                backgroundColor: isActive("/trips")
                  ? "action.selected"
                  : "transparent",
              }}
            >
              Trips
            </Button>
            <Button
              href="/vehicles"
              component={NextLink}
              passHref
              color="inherit"
              sx={{
                backgroundColor: isActive("/vehicles")
                  ? "action.selected"
                  : "transparent",
              }}
            >
              Vehicles
            </Button>
          </Box>
          <ThemeToggleSwitch />
        </Toolbar>
      </Container>
    </AppBar>
  );
}
