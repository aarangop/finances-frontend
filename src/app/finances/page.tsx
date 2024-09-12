"use client";

import Main from "@/components/layout/Main";
import FinancesSidebar from "@/components/sidebars/FinancesSidebar";
import { useDrawerControlsContext } from "@/context/DrawerControlsContext";
import { useDrawerContext } from "@/hooks/drawers";
import { Typography } from "@mui/material";
import { useEffect } from "react";

export default function FinancesPage() {
  const drawerContext = useDrawerContext();
  const drawerControlsContext = useDrawerControlsContext();
  useEffect(() => {
    drawerControlsContext.setState({
      ...drawerControlsContext,
      left: {
        isVisible: true,
        isDisabled: false,
      },
    });
  }, []);

  return (
    <Main>
      <Typography variant="h3">Finances</Typography>
      <FinancesSidebar isOpen={drawerContext.left.isOpen} />
    </Main>
  );
}
