import { Meta, StoryObj } from "@storybook/nextjs-vite";
import Button from "./Button";

const meta = {
  component: Button,
  title: "Components/Buttons/Button",
  args: {
    onClick: () => console.log("I was clicked!"),
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: <>Hello World!</>,
    width: "50%",
    type: "button"
  },
};

export const LongText: Story = {
  args: {
    ...Default.args,
    children: (
      <>
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ut, enim
        veritatis! Quis, ullam, amet reprehenderit doloremque odit cupiditate
        quam expedita corrupti eos quidem nam a quos hic suscipit saepe harum!
      </>
    ),
    width: "fit-content",
  },
};

export const ShortButton: Story = {
  args: {
    ...Default.args,
    width: "150px",
  },
};
