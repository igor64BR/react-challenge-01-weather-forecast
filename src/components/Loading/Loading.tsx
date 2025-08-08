import { FunctionComponent } from "react";
import styles from "./style.module.css";

/**
 * @param {size} number component size in rem
 */
interface LoadingProps {
  size?: number;
}

const Loading: FunctionComponent<LoadingProps> = (props) => {
  return <div className={styles.body} style={{ scale: props.size ?? 1 }}></div>;
};
export default Loading;
