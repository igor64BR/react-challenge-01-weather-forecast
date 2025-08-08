import { Meta, StoryObj } from "@storybook/nextjs-vite";
import Loading from "./Loading";

const meta = {
    component: Loading,
    title: "Components/Loading/Loading",
    args: {
        size: 1
    }
} satisfies Meta<typeof Loading>

export default meta;

type Story = StoryObj<typeof meta>

export const Default: Story = {}