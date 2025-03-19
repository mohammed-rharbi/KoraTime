import { create } from "zustand";
import { ManagerType } from "../lib/types";
import { createManager , getAllManagers } from "@/api/authApi";
import { banUser } from "@/api/adminApi";



interface AuthState {
    isLoading: boolean;
    error: string | null;
    fieldManagers: ManagerType[] | null ;
    AddManager: (ManagerData: ManagerType)=> Promise<void>;
    getManagers: ()=> Promise<void>
    banAUser: (id:string , action: "ban" | "unban")=> Promise<void>
    
  }
  

const useManagerStore = create<AuthState>((set)=>({

    isLoading: false,
    error: null,
    fieldManagers: null,

    AddManager: async (ManagerData)=>{

        set({isLoading:true , error:null})

        try {

            const res = await createManager(ManagerData)
            set({isLoading:false})
            return res
            
        } catch (err) {
            set({error:(err as Error).message , isLoading:false })
            
        }

    },
    getManagers: async ()=>{

        set({isLoading:true , error:null})

       try {

            const res = await getAllManagers()
            set({fieldManagers:res , isLoading:false})
                
        } catch (err) {
            set({error:(err as Error).message , isLoading:false })
            
        }
    },
    banAUser: async (id: string, action: "ban" | "unban") => {
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


export default useManagerStore