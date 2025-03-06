import apiClient from "../../lib/apiClient";
import { FieldType } from "../../lib/types";



export const createField = async (fieldData: FieldType) => {
  try {
    const response = await apiClient.post(`fields/create` , fieldData);

    return response.data.newField

  } catch (error) {
    throw new Error('Error failed create a field. Please check the field credentials.');
  }
};


export const getAllFields = async () => {
  try {
    const response = await apiClient.get(`fields/getAll`);

    return response

  } catch (error) {
    throw new Error('Error failed to get fields . Please try again');
  }
};


export const updateField = async (id: string , data:FieldType) => {
  try {
    const response = await apiClient.patch(`fields/updateField/${id}` , data);

    return response.data

  } catch (error) {
    throw new Error('Error . failed to update the field . Please try again');
  }
};


export const deleteField = async (id: string) => {
  try {

    const response = await apiClient.delete(`fields/deleteField/${id}`);

    return response.data

  } catch (error) {
    throw new Error('Error . failed to delete the field . Please try again');
  }
};


export const getField = async (id: string) => {
  try {

    const response = await apiClient.get(`fields/getField/${id}`);

    return response.data

  } catch (error) {
    throw new Error('Error . failed to fetch the field . Please try again');
  }
};



