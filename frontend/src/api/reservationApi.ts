import apiClient from "../../lib/apiClient";



export const getReservations = async () => {
    try {

      const response = await apiClient.get(`reservation/findAllReservations`,);
  
     return response.data
  
    } catch (error) {
      throw new Error('failed to fetch reservations. Please Try Again' + error);
    }
  };


  export const deleteReservation = async (id: string) => {
    try {

      const response = await apiClient.delete(`reservation/deleteReservation/${id}`,);
  
     return response.data
  
    } catch (error) {
      throw new Error('failed to fetch reservations. Please Try Again' + error);
    }
  };
    
  