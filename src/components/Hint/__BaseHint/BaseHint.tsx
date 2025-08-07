import { FunctionComponent, useEffect } from "react";
import styles from "./style.module.css";
import "../../../app/globals.css";

export interface BaseHintProps {
  text: string;
  onDismiss?: () => void;
}

const BaseHint: FunctionComponent<
  BaseHintProps & { color?: string; backgroundColor?: string }
> = (props) => {
  const animationDuration = 5; // seconds

  useEffect(() => {
    setTimeout(() => props.onDismiss?.(), animationDuration * 1.1 * 1000);
  }, []);

  return (
    <div
      className={styles.body}
      style={
        { ...props, ["--animation-duration"]: `${animationDuration}s` } as never
      }
    >
      <p>{props.text}</p>
    </div>
  );
};

export default BaseHint;
