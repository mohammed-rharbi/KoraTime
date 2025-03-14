import apiClient from "~/lib/apiClient";


export const sendFriendRequest = async (senderId:string , receiverId:string) => {
  try {
    const response = await apiClient.post(`friendship/send` , {sender:senderId , receiver:receiverId});

    return response.data

  } catch (error) {
    throw new Error('failed to send friend request . Please Try Again.');
  }
};



export const acceptFriendRequest = async (requestId: string) => {
  try {

    const response = await apiClient.post(`friendship/accept/${requestId}`);

    return response.data

  } catch (error) {
    throw new Error('failed to accept friend request . Please Try Again.');
  }
};


export const declineRequest = async (requestId: string) => {
  try {

    const response = await apiClient.post(`friendship/decline/${requestId}`);

    return response.data

  } catch (error) {
    throw new Error('failed to decline friend request . Please Try Again.');
  }
};


export const getUserFriendRequests = async (userId: string) => {
    try {
  
      const response = await apiClient.get(`friendship/getFriendRequests/${userId}`);
  
      return response.data
  
    } catch (error) {
      throw new Error('failed to get friend requests . Please Try Again.');
    }
  };

 
export const getUserFriends = async (userId: string) => {
    try {
  
      const response = await apiClient.get(`friendship/getFriends/${userId}`);
  
      return response.data
  
    } catch (error) {
      throw new Error('failed to get friends . Please Try Again.');
    }
  }; 
  
  



