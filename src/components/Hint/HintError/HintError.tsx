import { FunctionComponent } from "react";
import BaseHint, { BaseHintProps } from "../__BaseHint/BaseHint";
import { color } from "storybook/internal/theming";

interface HintErrorProps extends BaseHintProps {}
 
const HintError: FunctionComponent<HintErrorProps> = (props) => {
    return <BaseHint color="var(--foreground)" backgroundColor="rgba(202, 0, 0, 1)" {...props} />;
}
 
export default HintError;