import { LoginCredentials, RegisterCredetials, User } from "@/types";
import api from "../api";

interface AuthResponse {
    user: User;
    token: string;
}

interface VerifyOtpPayload {
    otp: string;
    email: string;
}

export const getAuthUser = async () => {
  const { data } = await api.get('/user');
  return data;
}


export const getAuthLogin = async (credential: LoginCredentials): Promise<AuthResponse> => {
  const  response  = await api.post('/auth/login', credential);
  return response.data;
} 

export const getAuthLogout = async () => {
  const  response  = await api.post('/auth/logout');
  return response.data;
}

export const getAuthRegister = async (credential: RegisterCredetials) => {
  const  response  = await api.post('/auth/register', credential);
  return response.data;
}

export const verifyOtp = async (credential: VerifyOtpPayload): Promise<AuthResponse> => {
  const  response  = await api.post('/auth/verify-otp', credential);
  return response.data;
}




