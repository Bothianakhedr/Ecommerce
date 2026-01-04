export type InputAttributeRegister = {
  type: string;
  name: "name" | "email" | "password" | "rePassword" | "phone";
  label: string;
};
export type InputAttributeLogin = {
  type: string;
  name: "email" | "password";
  label: string;
};

export type TInputRegisterForm = {
  name: string;
  email: string;
  password: string;
  rePassword: string;
  phone: string;
};
export type TInputLoginForm = {
  email: string;
  password: string;
};
export type TInputForgotPasswordForm = {
  email: string;
};

export type ErrorResponseType = {
 
        message: string;
      };
 
