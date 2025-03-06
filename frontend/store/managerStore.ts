import { create } from "zustand";
import { ManagerType } from "../lib/types";
import { createManager , getAllManagers } from "@/api/authApi";



interface AuthState {
    isLoading: boolean;
    error: string | null;
    fieldManagers: ManagerType[] | null ;
    AddManager: (ManagerData: ManagerType)=> Promise<ManagerType>;
    getManagers: ()=> Promise<void>
    
  }
  

const useManagerStore = create<AuthState>((set)=>({

    isLoading: false,
    error: null,
    fieldManagers: null,

    AddManager: async (ManagerData: ManagerType)=>{

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
            set({fieldManagers:res})
                
        } catch (err) {
            set({error:(err as Error).message , isLoading:false })
            
        }finally{

            set({isLoading:false})
        }
    }

}))


export default useManagerStore