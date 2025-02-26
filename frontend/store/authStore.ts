import { create } from "zustand";
import { loginUser } from "@/api/authApi";
import { UserType } from "../lib/types";





interface AuthState {
    user: UserType | null;
    token: string | null;
    isLoading: boolean;
    error: string | null;
    role: string | null;
    login: (email: string, password: string) => Promise<void>;
    logout: () => void;
  }
  

const useAuthStore = create<AuthState>((set)=>({

    user: null ,
    token: null ,
    isLoading: false,
    error: null,
    role: null,


    login: async (email, password)=>{

        set({isLoading:true , error:null });

        try{

            const res = await loginUser(email , password);  
            set({user: res.user , token: res.token , isLoading:false , role:res.user.role})
            localStorage.setItem('AdminToken' , res.token)
            
            
        }catch(err){
            set({error:(err as Error).message , isLoading:false})
        }
    },


    logout: async ()=>{
     set({user:null , token: null })
     localStorage.removeItem('AdminToken')
    }

}))


export default useAuthStore