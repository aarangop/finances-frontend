import { createContext, Dispatch, SetStateAction, useContext } from "react";

const drawerState = {
  left: {
    isOpen: false,
  },
  right: {
    isOpen: false,
  },
};

type DrawerState = typeof drawerState;
type DrawerStateContext = typeof drawerState & {
  setState: Dispatch<SetStateAction<DrawerState>>;
};

const drawerInitialContext = {
  ...drawerState,
  setState: () => {},
};
const DrawerContext = createContext<DrawerStateContext>(drawerInitialContext);

export default DrawerContext;

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
