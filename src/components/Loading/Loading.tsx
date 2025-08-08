import { FunctionComponent } from "react";
import styles from "./style.module.css";
import RainyGif from "../../../public/media/img/gifs/raining-loading.gif";

/**
 * @param {size} number component size in rem
 */
interface LoadingProps {
  size?: number;
}

const Loading: FunctionComponent<LoadingProps> = (props) => {
  return <div className={styles.body} style={{ scale: props.size ?? 1 }}>
    <img src={RainyGif.src} width={"100%"} />
  </div>;
};
export default Loading;
