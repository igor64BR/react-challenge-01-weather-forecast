import { Meta, StoryObj } from "@storybook/nextjs-vite";
import SearchBar from "./SearchBar";
import { City } from "@/utils/constants/capitals";
import Option, { OptionProps } from "./_components/Option";

const meta = {
  component: SearchBar,
  title: "Components/SearchBar/WeatherForecastSearchBar",
  args: {
    value: "",
    options: [],
  },
} satisfies Meta<typeof SearchBar>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    onSearch: console.log,
    setValue: console.log,  
  },
};

const generateDefaultOptions = (quantity: number): OptionProps[] => {
  const output = new Array<OptionProps>();

  for (let i = 1; i <= quantity; i++)
    output.push({
      id: i,
      onClick: console.log,
      value: {
        country: "Country Name " + i,
        name: "City Name " + i,
        state: "State Name " + i,
        latitude: 123,
        longitude: -123,
      },
    });

  return output;
};

export const WithSearch: Story = {
  args: {
    ...Default.args,
    value: "City",
    options: generateDefaultOptions(8),
  },
};
