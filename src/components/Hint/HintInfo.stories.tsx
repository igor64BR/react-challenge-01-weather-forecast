import { Meta, StoryObj } from "@storybook/nextjs-vite";
import HintInfo from "./HintInfo";

const meta = {
    component: HintInfo,
    title: "Components/Hint/HintInfo",
    args: {}
} satisfies Meta<typeof HintInfo>

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        text: "This is a base hint for show"
    }
}