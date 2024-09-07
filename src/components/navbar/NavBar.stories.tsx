import { Meta, StoryObj } from "@storybook/react";
import { DrawerControlsStateType } from "../context/drawerControlsContext";
import DrawerControlsStateProvider from "../providers/DrawerControlsStateProvider";
import NavBar from "./NavBar";

const meta = {
  title: "navbar/NavBar",
  component: NavBar,
  tags: ["autodocs"],
  decorators: [
    (Story) => {
      return (
        <DrawerControlsStateProvider>
          <Story />
        </DrawerControlsStateProvider>
      );
    },
  ],
} satisfies Meta<typeof NavBar>;

export default meta;

type Story = StoryObj<typeof meta>;

const initialState: DrawerControlsStateType = {
  left: {
    isVisible: false,
    isDisabled: false,
  },
  right: {
    isVisible: false,
    isDisabled: false,
  },
};
export const Default: Story = {};

export const LeftDrawerHidden: Story = {
  render: () => (
    <DrawerControlsStateProvider initialState={initialState}>
      <NavBar />
    </DrawerControlsStateProvider>
  ),
};

export const LeftDrawerVisibleEnabled: Story = {
  render: () => (
    <DrawerControlsStateProvider
      initialState={{
        ...initialState,
        left: {
          isVisible: true,
          isDisabled: false,
        },
      }}
    >
      <NavBar />
    </DrawerControlsStateProvider>
  ),
};

export const LeftDrawerVisibleDisabled: Story = {
  render: () => (
    <DrawerControlsStateProvider
      initialState={{
        ...initialState,
        left: {
          isVisible: true,
          isDisabled: true,
        },
      }}
    >
      <NavBar />
    </DrawerControlsStateProvider>
  ),
};
