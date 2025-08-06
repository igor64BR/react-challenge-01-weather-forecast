import { FunctionComponent } from "react";
import BaseHint, { BaseHintProps } from "../__BaseHint/BaseHint";
 
const HintError: FunctionComponent<BaseHintProps> = (props) => {
    return <BaseHint color="var(--foreground)" backgroundColor="rgba(202, 0, 0, 1)" {...props} />;
}
 
export default HintError;