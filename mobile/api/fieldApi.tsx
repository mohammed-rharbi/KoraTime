import apiClient from "~/lib/apiClient";


export const getAllFields = async () => {
  try {
    const response = await apiClient.get(`/fields/getAll`);

    return response.data

  } catch (error) {
    throw new Error('failed to fetch fields Please Try Again.');
  }
};

export const getField = async (id: string) => {
    try {
      const response = await apiClient.get(`/fields/getField/${id}`);
  
      return response.data
  
    } catch (error) {
        throw new Error('failed to fetch fields Please Try Again.');
    }
  };
  