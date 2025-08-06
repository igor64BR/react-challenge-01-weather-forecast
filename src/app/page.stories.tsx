import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { FormEvent } from "react";
import Home from "./page";

const meta = {
  component: Home,
  title: "Pages/Login",
} satisfies Meta<typeof Home>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    onSubmit: (event?: FormEvent) => {
      event?.preventDefault();
      console.log("I was clicked");
    },
  },
};

export const ShowHintOnEmptyLoginField: Story = {
  args: {
    ...Default.args,
    onSubmit: undefined
  }
}
