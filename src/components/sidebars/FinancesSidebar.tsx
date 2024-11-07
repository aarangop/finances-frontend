import { AttachMoney, ExpandMore, Menu } from "@mui/icons-material";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PaymentsIcon from "@mui/icons-material/Payments";
import ShowChartIcon from "@mui/icons-material/ShowChart";
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  useMediaQuery,
  useTheme,
  Zoom,
} from "@mui/material";
import { usePathname, useRouter } from "next/navigation";

interface FinancesSidebarProps {
  drawerWidth: number;
  mobileOpen: boolean;
  isOpen: boolean;
  handleDrawerToggle: () => void;
  handleDrawerOpen: () => void;
}

export default function FinancesSidebar({
  drawerWidth,
  mobileOpen,
  isOpen,
  handleDrawerToggle,
  handleDrawerOpen,
}: FinancesSidebarProps) {
  const router = useRouter();
  const pathname = usePathname();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const menuItems = [
    {
      title: "Finances",
      icon: <AttachMoney />,
      path: "/finances",
    },
    {
      title: "Accounts",
      icon: <AccountBalanceIcon />,
      path: "/finances/accounts",
    },
    { title: "Expenses", icon: <PaymentsIcon />, path: "/finances/expenses" },
    {
      title: "Portfolio",
      icon: <ShowChartIcon />,
      path: "/finances/portfolio",
    },
    {
      title: "Dashboard",
      icon: <DashboardIcon />,
      path: "/finances/dashboard",
    },
  ];

  const drawer = (
    <Box>
      <List>
        <ListItem disablePadding>
          <ListItemButton onClick={handleDrawerOpen}>
            <ListItemIcon sx={{ position: "relative", width: 24, height: 24 }}>
              <Zoom
                in={!isOpen}
                style={{ transitionDelay: !isOpen ? "100ms" : "0ms" }}
              >
                <Menu sx={{ position: "absolute" }} />
              </Zoom>
              <Zoom
                in={isOpen}
                style={{ transitionDelay: isOpen ? "100ms" : "0ms" }}
              >
                <ExpandMore sx={{ position: "absolute" }} />
              </Zoom>
            </ListItemIcon>
          </ListItemButton>
        </ListItem>

        {menuItems.map((item) => (
          <ListItem key={item.title} disablePadding>
            <ListItemButton
              selected={pathname === item.path}
              onClick={() => router.push(item.path)}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.title} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <Box
      component="nav"
      sx={{
        width: isOpen ? drawerWidth : theme.spacing(7),
        flexShrink: 0,
        whiteSpace: "nowrap",
      }}
    >
      <Drawer
        variant="permanent"
        anchor="left"
        open={isOpen}
        sx={{
          width: isOpen ? drawerWidth : theme.spacing(7),
          "& .MuiDrawer-paper": {
            position: "fixed",
            top: "64px", // Position right below NavBar
            height: "calc(100vh - 64px)",
            backgroundColor: "background.default",
            width: isOpen ? drawerWidth : theme.spacing(7),
            transition: theme.transitions.create("width", {
              easing: theme.transitions.easing.sharp,
              duration: theme.transitions.duration.enteringScreen,
            }),
            overflowX: "hidden",
            borderRight: `1px solid ${theme.palette.divider}`,
          },
        }}
      >
        {drawer}
      </Drawer>
    </Box>
  );
}
