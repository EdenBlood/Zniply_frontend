import { isAxiosError } from 'axios';
import {
  msgResponseSchema,
  type CreateAccountFormData,
  type LoginFormData,
  type ForgotPasswordFormData,
  type ResendCodeFormData,
  type ConfirmTokenFormData,
  type ChangePasswordFormData,
  userAuthSchema,
  userLoginSchema,
} from '@/types/index';
import api from '@/lib/api';

class AuthService {
  static createAccount = async ({ formData }: { formData: CreateAccountFormData }) => {
    const url = `/auth/create-account`;
    try {
      const { data } = await api.post(url, formData);

      const response = msgResponseSchema.safeParse(data);
      if (response.success) return response.data.msg;
    } catch (error) {
      if (isAxiosError(error) && error.response) {
        throw new Error(error.response.data.error);
      }
    }
  };

  static login = async ({ formData }: { formData: LoginFormData }) => {
    const url = `/auth/login`;
    try {
      const { data } = await api.post(url, formData);
      const response = userLoginSchema.safeParse(data);
      if (response.success) return response.data;
    } catch (error) {
      if (isAxiosError(error) && error.response) {
        throw new Error(error.response.data.error);
      }
    }
  };

  static forgotPassword = async ({ formData }: { formData: ForgotPasswordFormData }) => {
    const url = `/auth/forgot-password`;
    try {
      const { data } = await api.post(url, formData);

      const response = msgResponseSchema.safeParse(data);
      if (response.success) return response.data.msg;
    } catch (error) {
      if (isAxiosError(error) && error.response) {
        throw new Error(error.response.data.error);
      }
    }
  };

  static resendCode = async ({ formData }: { formData: ResendCodeFormData }) => {
    const url = `/auth/resend-code`;
    try {
      const { data } = await api.post(url, formData);

      const response = msgResponseSchema.safeParse(data);
      if (response.success) return response.data.msg;
    } catch (error) {
      if (isAxiosError(error) && error.response) {
        throw new Error(error.response.data.error);
      }
    }
  };

  static confirmAccount = async ({ token }: ConfirmTokenFormData) => {
    const url = `/auth/confirm-account`;
    try {
      const { data } = await api.post(url, { token });

      const response = msgResponseSchema.safeParse(data);
      if (response.success) return response.data.msg;
    } catch (error) {
      if (isAxiosError(error) && error.response) {
        throw new Error(error.response.data.error);
      }
    }
  };

  static confirmChangePasswordCode = async ({ token }: ConfirmTokenFormData) => {
    const url = `/auth/forgot-password/confirm-code`;
    try {
      const { data } = await api.post(url, { token: token });

      const response = msgResponseSchema.safeParse(data);
      if (response.success) return response.data.msg;
    } catch (error) {
      if (isAxiosError(error) && error.response) {
        throw new Error(error.response.data.error);
      }
    }
  };

  static changePassword = async ({
    formData,
    token,
  }: {
    formData: ChangePasswordFormData;
    token: ConfirmTokenFormData['token'];
  }) => {
    const url = `/auth/forgot-password/change-password/${token}`;
    try {
      const { data } = await api.patch(url, formData);

      const response = userLoginSchema.safeParse(data);
      if (response.success) return response.data;
    } catch (error) {
      if (isAxiosError(error) && error.response) {
        throw new Error(error.response.data.error);
      }
    }
  };

  static auth = async () => {
    const url = `/auth/authorization`;
    try {
      const { data } = await api.get(url);

      const response = userAuthSchema.safeParse(data);
      if (response.success) return response.data;
    } catch (error) {
      if (isAxiosError(error) && error.response) {
        throw new Error(error.response.data.error);
      }
    }
  };

  static logout = async () => {
    const url = `/auth/logout`;
    try {
      const { data } = await api.post(url);

      const response = msgResponseSchema.safeParse(data);
      if (response.success) return response.data.msg;
    } catch (error) {
      if (isAxiosError(error) && error.response) {
        throw new Error(error.response.data.error);
      }
    }
  };
}

export default AuthService;
