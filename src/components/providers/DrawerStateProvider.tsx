import { useState } from "react";
import DrawerContext from "../context/drawerContext";

export default function DrawerStateProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [drawerState, setDrawerState] = useState({
    left: {
      isOpen: false,
    },
    right: {
      isOpen: false,
    },
  });

  return (
    <DrawerContext.Provider
      value={{ ...drawerState, setState: setDrawerState }}
    >
      {children}
    </DrawerContext.Provider>
  );
}
