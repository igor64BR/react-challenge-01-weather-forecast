import BaseHint, { BaseHintProps } from "../__BaseHint/BaseHint";

export default function HintInfo(props: BaseHintProps) {
  return <BaseHint color="var(--background)" backgroundColor="var(--foreground)" {...props} />;
}
