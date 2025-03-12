import apiClient from "~/lib/apiClient";
import { TeamType } from "~/types/types";


export const getAllPlayers = async () => {
  try {
    const response = await apiClient.get(`auth/getAllPlayers`);

    return response.data

  } catch (error) {
    throw new Error('Error failed to get players  . Please try again');
  }
};



export const getPlayer = async (id: string) => {
  try {

    const response = await apiClient.get(`auth/getPlayer/${id}`);

    return response.data

  } catch (error) {
    throw new Error('Error . failed to fetch user player . Please try again');
  }
};



