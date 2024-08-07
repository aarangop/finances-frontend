import { Box, Container, Link, Toolbar, Typography } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import NextLink from "next/link";
import ThemeToggleSwitch from "./ThemeToggleSwitch";

export default function NavBar() {
  return (
    <AppBar position="static">
      <Container>
        <Toolbar disableGutters>
          <Typography variant="h6" sx={{ mr: "1rem" }}>
            My Finances
          </Typography>
          <Box
            sx={{
              flexGrow: 1,
              display: "flex",
              ml: 2,
              justifyContent: "flex-start",
            }}
            gap={2}
          >
            <Link href="/" component={NextLink} passHref color="inherit">
              Home
            </Link>
            <Link
              href="/finances"
              component={NextLink}
              passHref
              color="inherit"
            >
              Finances
            </Link>
            <Link
              href="/roadtrips"
              component={NextLink}
              passHref
              color="inherit"
            >
              Roadtrips
            </Link>
            <Link
              href="/vehicles"
              component={NextLink}
              passHref
              color="inherit"
            >
              Vehicles
            </Link>
          </Box>
          <ThemeToggleSwitch />
        </Toolbar>
      </Container>
    </AppBar>
  );
}
