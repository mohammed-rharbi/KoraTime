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

