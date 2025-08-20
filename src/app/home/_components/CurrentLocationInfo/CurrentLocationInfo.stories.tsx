import { Meta, StoryObj } from "@storybook/nextjs-vite";
import CurrentLocationInfo from "./CurrentLocationInfo";

const meta = {
  component: CurrentLocationInfo,
  title: "Pages/HomePage/Components/CurrentLocationInfo",
  args: {
    onClose: () => {},
    city: {
      latitude: -45.899,
      longitude: -33.912,
      temperature: 34,
      max: 39.12312312,
      min: 28.123123123,
      name: "Current City",
      apparentTemperature: 35.123123123,
      country: "Brazil",
      dailyForecast: [
        {
          dayName: "Terça",
          max: 26.1231212,
          min: 18.1231212,
        },
        {
          dayName: "Quarta",
          max: 26.1231212,
          min: 18.1231212,
        },
        {
          dayName: "Quinta",
          max: 26.1231212,
          min: 18.1231212,
        },
        {
          dayName: "Sexta",
          max: 26.1231212,
          min: 18.1231212,
        },
      ],
      humidity: 95.1231212,
      state: "Current State",
      windSpeed: 18.1231212,
    },
  },
} satisfies Meta<typeof CurrentLocationInfo>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
