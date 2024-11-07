"use client";

import { Box, Container, Toolbar, Typography } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import NavigationButton from "../buttons/NavigationButton";
import ThemeToggleSwitch from "../buttons/ThemeToggleSwitch";

/**
 * NavBar component renders the top navigation bar of the application.
 * It includes the application title, navigation buttons, and a theme toggle switch.
 *
 * @returns {JSX.Element} The rendered NavBar component.
 */
export default function NavBar() {
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
            <NavigationButton href="/" text="Home" />
            <NavigationButton href="/finances" text="Finances" />
            <NavigationButton href="/trips" text="Trips" />
            <NavigationButton href="/vehicles" text="Vehicles" />
          </Box>
          <ThemeToggleSwitch />
        </Toolbar>
      </Container>
    </AppBar>
  );
}
