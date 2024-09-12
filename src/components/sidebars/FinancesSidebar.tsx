import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import DashboardIcon from "@mui/icons-material/Dashboard";
import { Button, Drawer, ListItem } from "@mui/material";
import { useToggleDrawer } from "../../context/DrawerContext";
import NavigationButton from "../buttons/NavigationButton";

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
    <Drawer
      open={isOpen}
      anchor={anchor}
      onClose={toggleSidebar}
      variant="persistent"
    >
      <ListItem>
        <NavigationButton
          text="Dashboard"
          icon={<DashboardIcon />}
          href="/finances/dashboard"
          selected={true}
        />
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
