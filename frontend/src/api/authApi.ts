import apiClient from "../../lib/apiClient";



export const login = async ({email , password}:any) => {
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
