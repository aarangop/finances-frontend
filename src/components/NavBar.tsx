import {
  Box,
  Button,
  Container,
  Link,
  Toolbar,
  Typography,
} from "@mui/material";
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
              sm: { display: "none" },
            }}
            gap={2}
          >
            <Button href="/" component={NextLink} passHref color="inherit">
              Home
            </Button>
            <Button
              href="/finances"
              component={NextLink}
              passHref
              color="inherit"
            >
              Finances
            </Button>
            <Button
              href="/roadtrips"
              component={NextLink}
              passHref
              color="inherit"
            >
              Roadtrips
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
