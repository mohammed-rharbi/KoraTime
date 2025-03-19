import apiClient from "~/lib/apiClient";


export const createChat = async (startUser:string , endUser:string) => {
  try {
    const response = await apiClient.post(`friendship/${startUser}/createChat/${endUser}`);

    return response.data

  } catch (error) {
    throw new Error('failed to create chat . Please Try Again.');
  }
};



export const sendMessage = async (chatId: string , sender:string , message:string) => {
  try {

    await apiClient.post(`friendship/sendMessage/${chatId}` , {sender:sender ,message:message});

  } catch (error) {
    throw new Error('failed to send message . Please Try Again.');
  }
};


export const getChat = async (chatId: string) => {
  try {

    const response = await apiClient.get(`friendship/getChat/${chatId}`);

    return response.data

  } catch (error) {
    throw new Error('failed to get chat . Please Try Again.');
  }
};


export const getUserChats = async (UserId: string) => {
    try {
  
      const response = await apiClient.get(`friendship/getUserChats/${UserId}`);
  
      return response.data
  
    } catch (error) {
      throw new Error('failed to get user chats . Please Try Again.');
    }
  };
