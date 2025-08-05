import { ReactNode } from "react";
import styles from "./style.module.css";
import "../../app/globals.css";

type ButtonProps = {
  children: string | ReactNode;
  onClick: () => void;
  width?: string;
  height?: string;
  type: "submit" | "reset" | "button";
};

export default function Button(props: ButtonProps) {
  return (
    <div
      className={styles.body}
      style={{ width: props.width ?? "auto", height: props.height ?? "auto" }}
    >
      <button
        className={styles.button}
        onClick={() => props.onClick()}
        type={props.type}
      >
        <div className={styles.reflex}></div>
        {props.children}
      </button>
    </div>
  );
}
