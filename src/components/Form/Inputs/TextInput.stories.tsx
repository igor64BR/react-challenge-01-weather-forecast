import { Meta, StoryObj } from "@storybook/nextjs-vite";
import TextInput from "./TextInput";

const meta: Meta<typeof TextInput> = {
    component: TextInput,
    title: "Components/Form/Inputs/TextInput",
    args: {}
}

export default meta;

type Stories = StoryObj<typeof meta>;

export const Default: Stories = {
    args: {
        label: "Default Field",
        onValueChange: (value: string) => console.log("Value has changed:", value),
        value: ""
    }
}

export const Filled: Stories = {
    args: {
        ...Default.args,
        value: "Default Value",
        label: "Filled Input"
    }
}