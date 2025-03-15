import { create } from "zustand";
import { TeamType } from "~/types/types";
import { getAllTeams , createTeam , getTeam , getUserTeamRequests , getUserTeam , sendTeamInvition , acceptTeamInvition } from "~/api/team.api";


interface TeamState {
    isLoading: boolean;
    error: string | null;
    teams:TeamType[] | null ;
    team: TeamType | null ;
    teamRequests: any;
    UserTeam:TeamType | null;
    createTeam: (teamData:TeamType)=> Promise<void>;
    getAllTeams: ()=> Promise<void>;
    getTeam: (id: string)=> Promise<void>;
    getUserTeam: (id: string)=> Promise<void>;
    send:(team: string , player: string)=> Promise<void>;
    accept:(req:string)=> Promise<void>;
    getUserRequests:(player: string)=> Promise<void>;
  }
  
const useTeamStore = create<TeamState>((set)=>({

    isLoading: false,
    error: null,
    teams: null,
    team: null,
    UserTeam:null,

    teamRequests:null,

  
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

    send: async (team , player)=>{

        set({isLoading:true , error: null})
        try {

            await sendTeamInvition(team , player);
            set({isLoading:false})
            
        } catch (err) {
            set({error:(err as Error).message , isLoading:false})                        
        }
    } ,

    accept: async (req)=>{

        set({isLoading:true , error: null})
        try {

            await acceptTeamInvition(req);
            set({isLoading:false})
            
        } catch (err) {
            set({error:(err as Error).message , isLoading:false})                        
        }


    },

    getUserRequests: async (player)=>{
        set({isLoading:true , error: null})
        try {

            const res = await getUserTeamRequests(player);
            set({isLoading:false , teamRequests: res})
            
        } catch (err) {
            set({error:(err as Error).message , isLoading:false})                        
        }
    } , 

    getUserTeam: async (id)=>{

        set({isLoading:true , error: null})
        try {

            const res = await getUserTeam(id);
            set({isLoading:false , UserTeam: res})
            
        } catch (err) {
            set({error:(err as Error).message , isLoading:false})                        
        }
    }



    
}))


export default useTeamStore