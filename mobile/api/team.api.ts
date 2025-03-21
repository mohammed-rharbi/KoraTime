import apiClient from "~/lib/apiClient";
import { TeamType } from "~/types/types";


export const createTeam = async (teamData: TeamType) => {
  try {
    const response = await apiClient.post(`team/createTeam` , teamData);

    return response.data

  } catch (error) {
    throw new Error('Error failed create a team. Please check the team credentials.');
  }
};


export const getAllTeams = async () => {
  try {
    const response = await apiClient.get(`team/getAll/Teams`);

    return response.data

  } catch (error) {
    throw new Error('Error failed to get teams . Please try again');
  }
};


export const updateTeam = async (id: string , data:TeamType) => {
  try {
    const response = await apiClient.patch(`team/editeTeam/${id}` , data);

    return response.data

  } catch (error) {
    throw new Error('Error . failed to update the team . Please try again');
  }
};


export const deleteTeam = async (id: string) => {
  try {

    const response = await apiClient.delete(`team/deleteTeam/${id}`);

    return response.data

  } catch (error) {
    throw new Error('Error . failed to delete the team . Please try again');
  }
};


export const getTeam = async (id: string) => {
  try {

    const response = await apiClient.get(`team/getTeam/${id}`);

    return response.data

  } catch (error) {
    throw new Error('Error . failed to fetch the team . Please try again');
  }
};


export const getUserTeam = async (id: string) => {
  try {

    const response = await apiClient.get(`team/getTeamByCapitanId/${id}`);

    return response.data

  } catch (error) {
    throw new Error('Error . failed to fetch User team . Please try again');
  }
};


export const sendTeamInvition = async (team: string , player:string) => {
  try {

    const response = await apiClient.post(`team/invitePlayer/${team}/${player}`);

    return response.data

  } catch (error) {
    throw new Error('Error . failed to send the invition . Please try again');
  }
};


export const acceptTeamInvition = async (req: string) => {
  try {

    const response = await apiClient.post(`team/acceptInvition/${req}`);

    return response.data

  } catch (error) {
    throw new Error('Error . failed to accept the invition . Please try again');
  }
};


export const getUserTeamRequests = async (player: string) => {
  try {

    const response = await apiClient.get(`team/getTeamRequests/${player}`);

    return response.data

  } catch (error) {
    throw new Error('Error .faild to fetch user team requests ');
  }
};

export const declineInvitionRequest = async (player: string) => {
  try {

    const response = await apiClient.post(`team/declineInvition/${player}`);

    return response.data

  } catch (error) {
    throw new Error('Error .faild to fetch user team requests ');
  }
};




