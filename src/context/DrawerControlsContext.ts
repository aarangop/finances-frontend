import { createContext, Dispatch, SetStateAction, useContext } from "react";

const drawerControlsInitialState = {
  left: {
    isVisible: true,
    isDisabled: false,
  },
  right: {
    isVisible: false,
    isDisabled: false,
  },
};

export type DrawerControlsStateType = typeof drawerControlsInitialState;
export type DrawerControlsContextType = DrawerControlsStateType & {
  setState: Dispatch<SetStateAction<DrawerControlsStateType>>;
};

const drawerControlsInitialContext: DrawerControlsContextType = {
  ...drawerControlsInitialState,
  setState: () => {},
};

const DrawerControlsContext = createContext<DrawerControlsContextType>(
  drawerControlsInitialContext
);

export default DrawerControlsContext;
export const useDrawerControlsContext = () => useContext(DrawerControlsContext);
