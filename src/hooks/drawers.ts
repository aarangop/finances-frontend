import DrawerContext, { DrawerState } from "@/context/DrawerContext";
import { useContext } from "react";

export const useDrawerContext = () => useContext(DrawerContext);

export const useToggleDrawer = (anchor: "left" | "right") => {
  const drawerContext = useDrawerContext();
  return () => {
    drawerContext.setState((prevState: DrawerState) => {
      const anchorState = prevState[anchor];
      return {
        ...prevState,
        [anchor]: {
          ...anchorState,
          isOpen: !anchorState.isOpen,
        },
      };
    });
  };
};
