import AdbIcon from "@mui/icons-material/Adb";
import { Meta, StoryObj } from "@storybook/react";
import Providers, { ThemeProviderWrapper } from "../providers/Providers";
import NavigationButton from "./NavigationButton";

const meta: Meta<typeof NavigationButton> = {
  title: "components/buttons/NavigationButton",
  component: NavigationButton,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <ThemeProviderWrapper>
        <Providers>
          <Story />
        </Providers>
      </ThemeProviderWrapper>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    text: "Default",
    href: "/",
    selected: false,
  },
};

export const WithIcon: Story = {
  args: {
    icon: <AdbIcon />,
    text: "With Icon",
    href: "/",
    selected: false,
  },
};

export const Selected: Story = {
  args: {
    selected: true,
    text: "Selected",
    href: "/",
  },
};

export const SelectedWithIcon: Story = {
  args: {
    icon: <AdbIcon />,
    text: "Selected With Icon",
    href: "/",
    selected: true,
  },
};
