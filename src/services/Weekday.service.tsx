import { createContext } from "react";

type WeekdayContextProviderProps = {
  children: React.ReactNode;
};

type WeekdayContextType = {
  getWeekday: (date: Date) => string;
  getDaysFromToday: (days: number) => string[];
};

export const WeekdayContext = createContext({} as WeekdayContextType);

export const WeekdayContextProvider = ({
  children,
}: WeekdayContextProviderProps) => {
  const getWeekday = (date: Date) => {
    const weekday = date.toLocaleString("default", { weekday: "long" });

    return weekday;
  };

  const getDaysFromToday = (days: number) => {
    const today = new Date();

    const output = new Array<Date>();

    for (let i = 0; i < days; i++) {
      const day = new Date(today);

      day.setDate(today.getDate() + i + 1);

      output.push(day);
    }

    return output.map(getWeekday);
  };

  return (
    <WeekdayContext.Provider
      value={{
        getDaysFromToday,
        getWeekday,
      }}
    >
      {children}
    </WeekdayContext.Provider>
  );
};
