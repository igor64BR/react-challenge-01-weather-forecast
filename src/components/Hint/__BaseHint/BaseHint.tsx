import { FunctionComponent } from "react";
import styles from "./style.module.css";
import "../../../app/globals.css";

export interface BaseHintProps {
  text: string;
}

const BaseHint: FunctionComponent<
  BaseHintProps & { color?: string; backgroundColor?: string }
> = (props) => {
  return (
    <div className={styles.body} style={{ ...props }}>
      <p>{props.text}</p>
    </div>
  );
};

export default BaseHint;
