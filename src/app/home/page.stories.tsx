import { Meta, StoryObj } from "@storybook/nextjs-vite";
import Home from "./page";

const meta = {
  component: Home,
  title: "Pages/HomePage",
} satisfies Meta<typeof Home>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
