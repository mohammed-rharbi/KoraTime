import { create } from "zustand";
import { UserType } from "~/types/types";
import { getPlayer , getAllPlayers } from "~/api/player.api";


interface PlayerState {
    isLoading: boolean;
    error: string | null;
    players:UserType[] | null ;
    player: UserType | null ;
    getAllPlayers: ()=> Promise<void>;
    getPlayer: (id: string)=> Promise<void>;
  }
  
const usePlayerStore = create<PlayerState>((set)=>({

    isLoading: false,
    error: null,
    players: null,
    player: null,

    getAllPlayers: async ()=>{

        set({isLoading:true , error: null})
        try {

            const res = (await getAllPlayers()).sort(()=> Math.random() - 0.5);
            set({isLoading:false , players: res})
            
        } catch (err) {
            set({error:(err as Error).message , isLoading:false})                        
        }
    },

    getPlayer: async (id)=>{

        set({isLoading:true , error: null})
        try {

            const res = await getPlayer(id);
            set({isLoading:false , player   : res})
            
        } catch (err) {
            set({error:(err as Error).message , isLoading:false})                        
        }
    },

    
}))


export default usePlayerStore