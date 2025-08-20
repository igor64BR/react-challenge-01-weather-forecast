import { FunctionComponent, useState } from "react";
import styles from "./style.module.css";
import LensIcon from "@/icon/LensIcon";
import Option, { OptionProps } from "./_components/Option";

export interface SearchBarProps {
  value: string;
  setValue: (value: string) => void;
  options: OptionProps[];
}

const SearchBar: FunctionComponent<SearchBarProps> = (props) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className={styles.body}>
      <div
        className={styles.searchBar}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setTimeout(() => setIsFocused(false), 100)}
      >
        <input
          type="text"
          id="search"
          name="search"
          placeholder="Search for your city"
          value={props.value}
          onChange={(e) => props.setValue(e.target.value)}
        />
        <label htmlFor="search" id={styles.lensIconContainer}>
          <button>
            <LensIcon />
          </button>
        </label>
        {!!props.options?.length && isFocused && (
          <div className={styles.optionsContainer}>
            {props.options.map((x, i) => (
              <Option key={i} {...x} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchBar;
