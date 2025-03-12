import apiClient from "../../lib/apiClient";
import { ManagerType } from "../../lib/types";



export const loginUser = async (email: string , password:string) => {
  try {
    const response = await apiClient.post(`auth/login`, { email, password });

    return {
      token: response.data.token,
      user: response.data.user,
    };

  } catch (error) {
    throw new Error('Login failed. Please check your credentials.');
  }
};

export const createManager = async (ManagerData:ManagerType) => {

  try {
    const response = await apiClient.post(`auth/createManger`,  ManagerData );
    
    return response.data

  } catch (error) {
    throw new Error('failed to create a manager. Please check the credentials.');
  }
};

export const getAllManagers = async () => {

  try {
    const response = await apiClient.get(`auth/getAllManagers`);
    
    return response.data

  } catch (error) {
    throw new Error('failed to fetch the managers.');
  }
};

export const getAllPlayers = async () => {

  try {
    const response = await apiClient.get(`auth/getAllPlayers`);
    
    return response.data

  } catch (error) {
    throw new Error('failed to fetch Players.');
  }
};


