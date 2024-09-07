"use client";

import { useState } from "react";
import DrawerControlsContext, {
  DrawerControlsStateType,
} from "../context/drawerControlsContext";

interface DrawerControlsStateProviderProps {
  children: React.ReactNode;
  initialState?: DrawerControlsStateType;
}

const defaultState: DrawerControlsStateType = {
  left: {
    isVisible: false,
    isDisabled: true,
  },
  right: {
    isVisible: false,
    isDisabled: true,
  },
};

export default function DrawerControlsStateProvider({
  children,
  initialState = defaultState,
}: DrawerControlsStateProviderProps) {
  const [drawerControlsState, setDrawerControlsState] =
    useState<DrawerControlsStateType>(initialState);

  return (
    <DrawerControlsContext.Provider
      value={{ ...drawerControlsState, setState: setDrawerControlsState }}
    >
      {children}
    </DrawerControlsContext.Provider>
  );
}
