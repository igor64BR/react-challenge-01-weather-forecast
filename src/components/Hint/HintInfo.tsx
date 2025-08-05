import "../../app/globals.css";
import styles from "./style.module.css";

type HintInfoProps = {
    text: string;
};

export default function HintInfo(props: HintInfoProps) {
    return <div className={styles.body}>
        <p>{props.text}</p>
    </div>;
}
