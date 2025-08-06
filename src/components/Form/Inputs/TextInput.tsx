import {
  ChangeEvent,
  HTMLInputTypeAttribute,
  useEffect,
  useState,
} from "react";
import styles from "./style.module.css";

type TextInputProps = {
  label: string;
  value: string;
  onValueChange: (value: string) => void;
  type: HTMLInputTypeAttribute;
  required?: boolean;
};

export default function TextInput(props: TextInputProps) {
  const [value, setValue] = useState(props.value ?? "");
  const [labelClass, setLabelClass] = useState<string>("");

  useEffect(() => updateLabelClass(), []);

  const onValueChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setValue(value);
    props.onValueChange(value);
  };

  const updateLabelClass = () => {
    if (!value.length) {
      return setLabelClass("");
    }

    setLabelClass(styles.labelFinal);
  };

  const invalidTypes: HTMLInputTypeAttribute[] = ["button", "checkbox"];

  if (invalidTypes.includes(props.type))
    throw new Error(`Type ${props.type} cannot be ${invalidTypes.join(", ")}.`);

  return (
    <div className={styles.body}>
      <div className={styles.inputContainer}>
        <input
          type={props.type}
          value={value}
          onChange={onValueChange}
          id={props.label}
          name={props.label}
          onFocus={() => setLabelClass(styles.labelFinal)}
          onBlur={() => updateLabelClass()}
          required={props.required}
        />
        <label htmlFor={props.label} className={labelClass}>
          {props.label}
        </label>
      </div>
    </div>
  );
}
