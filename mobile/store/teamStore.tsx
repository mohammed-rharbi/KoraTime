import { create } from "zustand";
import { TeamType } from "~/types/types";
import { getAllTeams , createTeam , getTeam , updateTeam , deleteTeam } from "~/api/team.api";


interface TeamState {
    isLoading: boolean;
    error: string | null;
    teams:TeamType[] | null ;
    team: TeamType | null ;
    createTeam: (teamData:TeamType)=> Promise<void>;
    getAllTeams: ()=> Promise<void>;
    getTeam: (id: string)=> Promise<void>;
  }
  
const useTeamStore = create<TeamState>((set)=>({

    isLoading: false,
    error: null,
    teams: null,
    team: null,

  
    createTeam: async (data)=>{

        set({isLoading:true , error:null}); 
        try {
            const res = await createTeam(data);
            set({isLoading:false})
            
        } catch (err){
            set({error:(err as Error).message , isLoading:false})            
        }
    },

    getAllTeams: async ()=>{

        set({isLoading:true , error: null})
        try {

            const res = await getAllTeams();
            set({isLoading:false , teams: res})
            
        } catch (err) {
            set({error:(err as Error).message , isLoading:false})                        
        }
    },

    getTeam: async (id)=>{

        set({isLoading:true , error: null})
        try {

            const res = await getTeam(id);
            set({isLoading:false , team: res})
            
        } catch (err) {
            set({error:(err as Error).message , isLoading:false})                        
        }
    },

    
}))


export default useTeamStore