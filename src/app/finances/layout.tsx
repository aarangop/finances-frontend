"use client";

import FinancesSidebar from "@/components/sidebars/FinancesSidebar";
import { Box } from "@mui/material";
import { useState } from "react";

const drawerWidth = 240;

export default function FinancesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(true);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleDrawerOpen = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <Box sx={{ display: "flex" }}>
        <FinancesSidebar
          drawerWidth={drawerWidth}
          mobileOpen={mobileOpen}
          isOpen={isOpen}
          handleDrawerToggle={handleDrawerToggle}
          handleDrawerOpen={handleDrawerOpen}
        />
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 3,
            width: { sm: `calc(100% - ${drawerWidth}px)` },
            transition: (theme) =>
              theme.transitions.create("margin", {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
              }),
          }}
        >
          {children}
        </Box>
      </Box>
    </>
  );
}
