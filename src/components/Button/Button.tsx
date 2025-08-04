import { ReactNode } from "react";
import styles from "./style.module.css";

type ButtonProps = {
  children: string | ReactNode;
  onClick: () => void;
};

export default function Button(props: ButtonProps) {
  return (
    <button className={styles.button} onClick={() => props.onClick()}>
      {props.children}
    </button>
  );
}
