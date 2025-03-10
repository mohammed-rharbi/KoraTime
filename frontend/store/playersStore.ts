import { create } from "zustand";
import { PlayerType } from "../lib/types";
import { getAllPlayers } from "@/api/authApi";
import { banUser } from "@/api/adminApi";



interface AuthState {
    isLoading: boolean;
    error: string | null;
    Players: PlayerType[] | null ;
    getPlayers: ()=> Promise<void>
    banAPlayer: (id:string , action: "ban" | "unban")=> Promise<void>
    
  }
  

const usePlayersStore = create<AuthState>((set)=>({

    isLoading: false,
    error: null,
    Players: null,


    getPlayers: async ()=>{

        set({isLoading:true , error:null})

       try {
            const res = await getAllPlayers()
            set({Players:res , isLoading:false})
                
        } catch (err) {
            set({error:(err as Error).message , isLoading:false })
            
        }
    },

    banAPlayer: async (id: string, action: "ban" | "unban") => {
        set((state) => ({ ...state, isLoading: true, error: null }));
      
        try {
          await banUser(id, action);
          set((state) => ({ ...state, isLoading: false }));
        } catch (err) {
          set((state) => ({
            ...state,
            error: err instanceof Error ? err.message : "An unknown error occurred",
            isLoading: false,
          }));
        }
      }
      
}))


export default usePlayersStore