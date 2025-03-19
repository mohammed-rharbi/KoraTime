import { create } from "zustand";
import { TeamType } from "../lib/types";
import { getAllTeams } from "@/api/teamApi";

interface TeamState {
    isLoading: boolean;
    error: string | null;
    teams: TeamType[] | null ;
    getAllTeams: ()=> Promise<void>
}
  

const useTeamStore = create<TeamState>((set)=>({

    isLoading: false,
    error: null,
    teams: null,


    getAllTeams: async ()=>{

        set({isLoading:true , error:null})

       try {
            const res = await getAllTeams()
            set({isLoading:false , teams:res})
                
        } catch (err) {
            set({error:(err as Error).message , isLoading:false })
            
        }
    },
      
}))


export default useTeamStore