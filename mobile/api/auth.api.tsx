import apiClient from "~/lib/apiClient";


// type AuthResponse = {
//   token: string;
//   user:{};
// };


export const loginUser = async (email: string, password: string) => {
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

export const registerUser = async (userName: string, email: string, password: string) => {
  try {

    const response = await apiClient.post(`/auth/register`, {userName, email, password });

    return {
        user: response.data.user,
    };
  } catch (error) {
    throw new Error('Registration failed. Email may already exist.');
  }
};