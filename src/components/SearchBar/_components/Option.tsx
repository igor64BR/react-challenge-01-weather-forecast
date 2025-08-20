import "@/app/globals.css";
import { FunctionComponent } from "react";
import styles from "./style.module.css";
import { City } from "@/utils/constants/capitals";

export interface OptionProps {
  id: number;
  value: City;
  onClick: (value: City) => void;
}

const Option: FunctionComponent<OptionProps> = (props) => {
  const formatLabel = () => {
    const { value } = props;
    return [value.name, value.state, value.country].join(", ");
  };
  return (
    <button className={styles.body} onClick={() => props.onClick(props.value)}>
      <p>{formatLabel()}</p>
    </button>
  );
};

export default Option;
