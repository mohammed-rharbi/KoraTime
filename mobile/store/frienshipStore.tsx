import { create } from "zustand";
import { acceptFriendRequest , sendFriendRequest , getUserFriendRequests , declineRequest , getUserFriends } from "~/api/friendship.api";
import { UserType } from "~/types/types";


interface FriendshipState {
    isLoading: boolean;
    error: string | null;
    requests: any[] | null;
    friends: UserType[] | null;
    sendFriendRequest: (senderId:string , receiverId:string)=> Promise<void>;
    acceptFriendRequest: (requestId: string)=> Promise<void>;
    getFriendRequests: (userId: string)=> Promise<void>;
    declineRequest: (requestId: string)=> Promise<void>;
    getUserFriends: (userId: string)=> Promise<void>;
  }

  
const useFriendshipStore = create<FriendshipState>((set)=>({

    isLoading: false,
    error: null,
    requests: null,
    friends: null,



    sendFriendRequest: async (senderId , receiverId)=>{

        set({isLoading:true , error: null})
        try {

            const res = await sendFriendRequest(senderId , receiverId);
            set({isLoading:false})
            
        } catch (err) {
            set({error:(err as Error).message , isLoading:false})                        
        }
    },

    acceptFriendRequest: async (id)=>{

        set({isLoading:true , error: null})
        try {

            await acceptFriendRequest(id);
            set({isLoading:false})
            
        } catch (err) {
            set({error:(err as Error).message , isLoading:false})                        
        }
    },

    getFriendRequests: async (id)=>{

        set({isLoading:true , error: null})
        try {

            const res = await getUserFriendRequests(id);
            set({isLoading:false , requests: res})
            
        } catch (err) {
            set({error:(err as Error).message , isLoading:false})                        
        }
    },

    
    declineRequest: async (id)=>{

        set({isLoading:true , error: null})
        try {

            const res = await declineRequest(id);
            set({isLoading:false})
            
        } catch (err) {
            set({error:(err as Error).message , isLoading:false})                        
        }
    },

    getUserFriends: async (id)=>{

        set({isLoading:true , error: null})
        try {

            const res = await getUserFriends(id);
            set({isLoading:false , friends: res})
            
        } catch (err) {
            set({error:(err as Error).message , isLoading:false})                        
        }
    },



    
}))


export default useFriendshipStore