import apiClient from "../../lib/apiClient";



export const banUser = async (id: string , action:string) => {
    try {

      const response = await apiClient.patch(`auth/ban/${action}/${id}`,);
  
     return response.data
  
    } catch (error) {
      throw new Error('failed to ban the user. Please Try Again' + error);
    }
  };
  