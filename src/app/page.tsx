"use client";

import { FormEvent, useState } from "react";
import styles from "./page.module.css";
import TextInput from "@/components/Form/Inputs/TextInput";
import Button from "@/components/Button/Button";
import "./globals.css";
import HintError from "@/components/Hint/HintError/HintError";

type FormProps = {
  userName: string;
  password: string;
};

type LoginProps = {
  onSubmit?: (event?: FormEvent) => void;
};

export default function Login(props: LoginProps = {}) {
  const [formValues, setFormValues] = useState<FormProps>({
    userName: "",
    password: "",
  });

  const [showHint, setShowHint] = useState(false);

  const onSubmit =
    props.onSubmit ||
    ((event?: FormEvent) => {
      event?.preventDefault();

      if (formValues.userName === "" || formValues.password === "")
        return setShowHint(true);

      window.location.href = "/home";
    });

  return (
    <div className={styles.body}>
      <div className={styles.loginContainer}>
        <form onSubmit={onSubmit}>
          <TextInput
            type="text"
            label="Username"
            value={formValues.userName}
            onValueChange={(value) =>
              setFormValues({ ...formValues, userName: value })
            }
          />
          <TextInput
            type="password"
            label="Password"
            value={formValues.password}
            onValueChange={(value) =>
              setFormValues({ ...formValues, password: value })
            }
          />
          <Button onClick={() => {}} width="80%" type="submit">
            Log In
          </Button>
        </form>
      </div>
      {showHint && (
        <HintError
          text="Um ou mais campos estão vazios"
          onDismiss={() => setShowHint(false)}
        />
      )}
    </div>
  );
}
