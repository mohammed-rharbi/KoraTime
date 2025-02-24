import apiClient from "~/lib/apiClient";
import { LoginType , RegisterType , StartType } from "~/types/types";



export const login = async ({email , password}: LoginType) => {
  try {
    const response = await apiClient.post(`/auth/login`, { email, password });

    return {
      token: response.data.token,
      user: response.data.user,
    };

  } catch (error) {
    throw new Error('Login failed. Please check your credentials.');
  }
};

export const register = async ({userName, email, password}:RegisterType) => {
  
  try {

    const response = await apiClient.post(`/auth/register`, {userName, email, password });

    return {
        user: response.data.user,
    };
  } catch (error) {
    throw new Error('Registration failed. Email may already exist.');
  }
};

export const getStarted = async ({id, image, phoneNumber}: StartType) => {
  
  try {

    const response = await apiClient.put(`/auth/start`, {id, image, phoneNumber });

    return {
        user: response.data.updatedUser,
    };
  } catch (error) {
    throw new Error('Registration failed');
  }
};