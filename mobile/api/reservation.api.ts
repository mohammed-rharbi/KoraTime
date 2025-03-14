import apiClient from "~/lib/apiClient";
import { ReservationType } from "~/types/types";


export const BookField = async (data:ReservationType) => {
  try {
    const response = await apiClient.post(`/reservation/createReservation`, data);

    return response.data

  } catch (error) {
    throw new Error('failed to book the field Please Try Again.');
  }
};


export const getAllUserReservations = async (id:string) => {
  try {
    const response = await apiClient.get(`/reservation/findUsersReservations/${id}`);

    return response.data

  } catch (error) {
    throw new Error('failed to fetch User Reservations Please Try Again.');
  }
};

export const getTeamReservations = async (id:string) => {
  try {
    const response = await apiClient.get(`/reservation/findUsersReservations/${id}`);

    return response.data

  } catch (error) {
    throw new Error('failed to fetch User Reservations Please Try Again.');
  }
};



  