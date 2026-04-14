import { axiosInstance } from "../../../axiosConfig/axiosInstance";
import type {
  TInputForgotPasswordForm,
  TInputLoginForm,
  TInputRegisterForm,
  TInputResetPasswordForm,
  VerifyResetCodeType,
} from "../types/types";

export const registerServices = async (data: TInputRegisterForm) => {
  const { data: responseData } = await axiosInstance.post(
    "api/v1/auth/signup",
    data,
  );

  return responseData;
};
export const loginServices = async (data: TInputLoginForm) => {
  const { data: responseData } = await axiosInstance.post(
    "api/v1/auth/signin",
    data,
  );

  return responseData;
};

export const forgotPasswordServices = async (
  data: TInputForgotPasswordForm,
) => {
  const { data: responseData } = await axiosInstance.post(
    "api/v1/auth/forgotPasswords",
    data,
  );

  return responseData;
};
export const resetPasswordServices = async (data: TInputResetPasswordForm) => {
  return await axiosInstance.put("api/v1/auth/resetPassword", data);
};

export const verifyResetCode = async (data: VerifyResetCodeType) => {
  return axiosInstance.post("api/v1/auth/verifyResetCode", data);
};
