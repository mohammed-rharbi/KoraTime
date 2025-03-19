import apiClient from "../../lib/apiClient";
import { TeamType } from "../../lib/types";



export const createTeam = async (teamData: TeamType) => {
  try {
    const response = await apiClient.post(`team/createTeam` , teamData);

    return response.data.newField

  } catch (error) {
    throw new Error('Error failed create a team. Please check the team credentials.'+ error);
  }
};


export const getAllTeams = async () => {
  try {
    const response = await apiClient.get(`team/getAll/Teams`);

    return response.data

  } catch (error) {
    throw new Error('Error failed to get teams . Please try again'+ error);
  }
};


export const updateTeam = async (id: string , data:TeamType) => {
  try {
    const response = await apiClient.patch(`team/editeTeam/${id}` , data);

    return response.data

  } catch (error) {
    throw new Error('Error . failed to update the team . Please try again'+ error);
  }
};


export const deleteTeam = async (id: string) => {
  try {

    const response = await apiClient.delete(`team/deleteTeam/${id}`);

    return response.data

  } catch (error) {
    throw new Error('Error . failed to delete the team . Please try again'+ error);
  }
};


export const getTeam = async (id: string) => {
  try {

    const response = await apiClient.get(`team/getTeam/${id}`);

    return response.data

  } catch (error) {
    throw new Error('Error . failed to fetch the team . Please try again'+ error);
  }
};



