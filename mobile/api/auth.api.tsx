import apiClient from "~/lib/apiClient";
import { LoginType , RegisterType , StartType } from "~/types/types";
import { useRouter } from "expo-router";


const router = useRouter()


export const login = async (loginData: LoginType) => {
  try {
    const response = await apiClient.post(`/auth/login`, loginData);

    return {
      token: response.data.token,
      user: response.data.user,
    };

  } catch (error) {
    throw new Error('Login failed. Please check your credentials.');
  }
};

export const register = async (registerData:RegisterType) => {
  
  try {

    const response = await apiClient.post(`/auth/register`, registerData);

    return {
        user: response.data.user,
    };
  } catch (error) {
    throw new Error('Registration failed. Email may already exist.');
  }
};

export const getStarted = async (startData: StartType) => {
  
  try {

    const response = await apiClient.put(`/auth/start`, startData);

    return response.data
  } catch (error) {
    throw new Error('Registration failed');
  }
};