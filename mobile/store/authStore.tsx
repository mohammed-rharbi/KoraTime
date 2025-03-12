import { create } from "zustand";
import { LoginType, RegisterType, UserType , StartType } from "~/types/types";
import { login , register , getStarted  } from "~/api/auth.api";
import AsyncStorage from '@react-native-async-storage/async-storage';



interface AuthState {
    user: UserType | null;
    token: string | null;
    isLoading: boolean;
    error: string | null;
    role: string | null;
    loginUser: (loginData: LoginType) => Promise<void>;
    registerUser: (registerData: RegisterType) => Promise<void>
    getStarted: (startData: StartType) => Promise<void>
    logout: () => void;
  }
  

const useAuthStore = create<AuthState>((set)=>({


    user: null ,
    token: null ,
    isLoading: false,
    error: null,
    role: null,


    loginUser: async (loginData) => {
        set({ isLoading: true, error: null });
      
        try {
          const res = await login(loginData);
          set({
            user: res.user,
            token: res.token,
            isLoading: false,
            role: res.user.role,
          });
          await AsyncStorage.setItem('AdminToken', res.token);
          await AsyncStorage.setItem('AdminRole', res.user.role);
          await AsyncStorage.setItem('user', JSON.stringify(res.user));

        } catch (err) {
          set({ error: (err as Error).message, isLoading: false });
        }
      },


    registerUser: async (registerData)=>{

        set({isLoading:true , error:null });

        try{

            const res = await register(registerData);  

            set({user: res.user , isLoading:false})
            await AsyncStorage.setItem('userId', res.user._id);
            
        }catch(err){
            set({error:(err as Error).message , isLoading:false})
        }

    },

    getStarted: async (startData)=>{

      set({isLoading:true , error:null });

      try{

          const res = await getStarted(startData);  

          set({user: res.user , isLoading:false})
          await AsyncStorage.setItem('userId', res.user._id);
          
      }catch(err){
          set({error:(err as Error).message , isLoading:false})
      }

  },


    logout: async () => {
        set({ user: null, token: null, role: null });
        await AsyncStorage.removeItem('AdminToken');
        await AsyncStorage.removeItem('AdminRole');
        await AsyncStorage.removeItem('user');
    },

}))


export default useAuthStore