import { Meta, StoryObj } from "@storybook/nextjs-vite";
import HintError from "./HintError";

const meta = {
  component: HintError,
  title: "Components/Hint/HintError",
  args: { onDismiss: () => {} },
} satisfies Meta<typeof HintError>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { text: "This is a base hint for error" },
};
