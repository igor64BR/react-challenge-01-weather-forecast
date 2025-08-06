import BaseHint, { BaseHintProps } from "../__BaseHint/BaseHint";

interface HintInfoProps extends BaseHintProps {}

export default function HintInfo(props: HintInfoProps) {
  return <BaseHint color="var(--background)" backgroundColor="var(--foreground)" {...props} />;
}
