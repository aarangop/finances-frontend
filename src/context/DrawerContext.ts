import { createContext, Dispatch, SetStateAction } from "react";

const drawerState = {
  left: {
    isOpen: false,
  },
  right: {
    isOpen: false,
  },
};

export type DrawerState = typeof drawerState;
export type DrawerStateContext = typeof drawerState & {
  setState: Dispatch<SetStateAction<DrawerState>>;
};

const drawerInitialContext = {
  ...drawerState,
  setState: () => {},
};
const DrawerContext = createContext<DrawerStateContext>(drawerInitialContext);

export default DrawerContext;
