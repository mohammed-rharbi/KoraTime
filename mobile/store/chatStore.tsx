import { create } from "zustand";
import { createChat , sendMessage , getChat , getUserChats } from "~/api/chat.api";
import { ChatType , MessageType } from "~/types/types";


interface ChatState {
    isLoading: boolean;
    error: string | null;
    UserChats: ChatType[];
    currentChat: MessageType[] | null;
    createChat: (startUser:string , endUser:string)=> Promise<void>;
    sendMessages: (chatId: string , sender:string , message:string)=> Promise<void>;
    getChat: (chatId: string)=> Promise<void>;
    getUserChats: (userId: string)=> Promise<void>;

  }
  
const useChatStore = create<ChatState>((set)=>({

    isLoading: false,
    error: null,
    UserChats: [],
    currentChat: null,
    

    createChat: async (startUser , endUser)=>{

        set({isLoading:true , error: null})
        try {

            const res = await createChat(startUser , endUser);
            set({isLoading:false})
            
        } catch (err) {
            set({error:(err as Error).message , isLoading:false})                        
        }
    },

    sendMessages: async (chatId, sender, message) => {
        try {
        await sendMessage(chatId, sender, message);
        set({isLoading:false})
        getChat
        } catch (err) {
            set({error:(err as Error).message , isLoading:false})                        
        }
      },

    getChat: async (id)=>{

        set({isLoading:true , error: null})
        try {

            const res = await getChat(id);
            set({isLoading:false , currentChat: res})
            getUserChats
        } catch (err) {
            set({error:(err as Error).message , isLoading:false})                        
        }
    },

    getUserChats: async (userId)=>{

        set({isLoading:true , error: null})
        try {

            const res = await getUserChats(userId);
            set({UserChats: res , isLoading:false})
            
        } catch (err) {
            set({error:(err as Error).message , isLoading:false})                        
        }
    }

    
}))


export default useChatStore