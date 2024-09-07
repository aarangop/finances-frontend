import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import DashboardIcon from "@mui/icons-material/Dashboard";
import { Button, Drawer, ListItem } from "@mui/material";
import NextLink from "next/link";
import { useToggleDrawer } from "../context/drawerContext";

interface FinancesSidebarProps {
  isOpen?: boolean;
  anchor?: "left" | "right";
}
export default function FinancesSidebar({
  isOpen = false,
  anchor = "left",
}: FinancesSidebarProps) {
  const toggleSidebar = useToggleDrawer(anchor);
  return (
    <Drawer open={isOpen} anchor={anchor} onClose={toggleSidebar}>
      <ListItem>
        <Button
          fullWidth
          startIcon={<DashboardIcon />}
          component={NextLink}
          href="/finances/dashboard"
        >
          Dashboard
        </Button>
      </ListItem>
      <ListItem>
        <Button
          fullWidth
          startIcon={<AccountBalanceWalletIcon />}
          href="/finances/accounts"
        >
          Accounts
        </Button>
      </ListItem>
    </Drawer>
  );
}
