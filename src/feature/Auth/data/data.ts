import type {
  InputAttributeLogin,
  InputAttributeRegister,
} from "../types/types";

export const RegisterInput: InputAttributeRegister[] = [
  {
    type: "text",
    name: "name",
    label: "Name",
  },
  {
    type: "email",
    name: "email",
    label: "Email",
  },
  {
    type: "password",
    name: "password",
    label: "Password",
  },
  {
    type: "password",
    name: "rePassword",
    label: "RePassword",
  },
  {
    type: "text",
    name: "phone",
    label: "Phone",
  },
];
export const loginInput: InputAttributeLogin[] = [
  {
    type: "email",
    name: "email",
    label: "Email",
  },
  {
    type: "password",
    name: "password",
    label: "Password",
  },
];
