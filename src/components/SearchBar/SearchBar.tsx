import { FunctionComponent } from "react";
import styles from "./style.module.css";
import LensIcon from "@/icon/LensIcon";

interface SearchBarProps {
  value: string;
  setValue: (value: string) => void;
  onSearch: (value: string) => void;
}

const SearchBar: FunctionComponent<SearchBarProps> = (props) => {
  return (
    <div className={styles.searchBar}>
      <input
        type="text"
        id="search"
        name="search"
        placeholder="Search for your city"
        value={props.value}
        onChange={(e) => props.setValue(e.target.value)}
      />
      <label htmlFor="search" id={styles.lensIconContainer}>
        <button onClick={() => props.onSearch(props.value)}>
          <LensIcon />
        </button>
      </label>
    </div>
  );
};

export default SearchBar;
