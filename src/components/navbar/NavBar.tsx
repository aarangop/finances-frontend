"use client";

import { useDrawerControlsContext } from "@/context/DrawerControlsContext";
import { useToggleDrawer } from "@/hooks/drawers";
import {
  Box,
  Button,
  Container,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import AppBar from "@mui/material/AppBar";
import { GridMenuIcon } from "@mui/x-data-grid";
import NextLink from "next/link";
import NavigationButton from "../buttons/NavigationButton";
import ThemeToggleSwitch from "../buttons/ThemeToggleSwitch";

export default function NavBar() {
  const drawerControlsContext = useDrawerControlsContext();
  const toggleLeftDrawer = useToggleDrawer("left");

  return (
    <AppBar position="static">
      <Container>
        <Toolbar sx={{ width: "100%" }}>
          {drawerControlsContext.left.isVisible && (
            <IconButton
              disabled={drawerControlsContext.left.isDisabled}
              color="inherit"
              sx={{ mr: 1 }}
              onClick={toggleLeftDrawer}
            >
              <GridMenuIcon />
            </IconButton>
          )}
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
            <NavigationButton href="/" text="Home" selected={true} />
            <Button
              href="/finances"
              component={NextLink}
              passHref
              color="inherit"
            >
              Finances
            </Button>
            <Button href="/trips" component={NextLink} passHref color="inherit">
              Trips
            </Button>
            <Button
              href="/vehicles"
              component={NextLink}
              passHref
              color="inherit"
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
