"use client";

import { FormEvent, useState } from "react";
import styles from "./page.module.css";
import TextInput from "@/components/Form/Inputs/TextInput";
import Button from "@/components/Button/Button";
import "./globals.css";

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

  const onSubmit = props.onSubmit || ((event?: FormEvent) => {
    event?.preventDefault();

    if (formValues.userName === "" || formValues.password === "") {
      window.alert("One or more fields are empty");

      return;
    }

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
          <Button onClick={() => {}} width="70%" type="submit">Log In</Button>
        </form>
      </div>
    </div>
  );
}
