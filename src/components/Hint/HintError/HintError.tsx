import { FunctionComponent } from "react";
import BaseHint, { BaseHintProps } from "../__BaseHint/BaseHint";

interface HintErrorProps extends BaseHintProps {}
 
const HintError: FunctionComponent<HintErrorProps> = (props) => {
    return <BaseHint color="var(--foreground)" backgroundColor="red" {...props} />;
}
 
export default HintError;