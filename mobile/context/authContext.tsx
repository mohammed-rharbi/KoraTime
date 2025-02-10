import React ,{useContext , useEffect , createContext, useState} from "react";
import * as SecureStore from 'expo-secure-store';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { loginUser , registerUser } from "~/api/auth.api";


type AuthContextType = {
    isAuthenticated: boolean;
    isLoading: boolean;
    login: (email: string, password: string) => Promise<void>;
    register: (userName:string , email: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
  };

  const AuthContext = createContext<AuthContextType | null>(null)


  export const AuthProvider = ({ children }: { children: React.ReactNode }) => {

    const [isAuthenticated , setIsAuthenticated] = useState(false)
    const [isLoading, setIsLoading] = useState(true);
    const [user , setUser]=useState(null)


    useEffect(()=>{

        const checkAuth = async () => {
            try {
              // const token = await SecureStore.getItemAsync('token');
              const token = await AsyncStorage.getItem('token');    


              setIsAuthenticated(!!token);
            } finally {
              setIsLoading(false);
            }
          };

        checkAuth()

    },[])

    

    const login = async (email: string, password: string) => {
        setIsLoading(true);
        try {
          const { token } = await loginUser(email, password);
          // await SecureStore.setItemAsync('token', token);
          await AsyncStorage.setItem('token',token);
        
          setIsAuthenticated(true);
        } finally {
          setIsLoading(false);
        }
      };
    
      const register = async (usertName:string ,email: string, password: string) => {
        setIsLoading(true);
        try {
          const { user } = await registerUser( usertName, email, password);

          // await SecureStore.setItemAsync('userId', user._id);
          await AsyncStorage.setItem('userId',user._id);

          setUser(user)

          setIsAuthenticated(true);
        } finally {
          setIsLoading(false);
        }
      };
    
      const logout = async () => {
        // await SecureStore.deleteItemAsync('token');
        // await SecureStore.deleteItemAsync('userId');
        await AsyncStorage.clear()
        setIsAuthenticated(false);
      };

  return (
    <AuthContext.Provider value={{isLoading, isAuthenticated,  login , register , logout }}>
      {children}
    </AuthContext.Provider>
  );

}

export const useAuth = () => useContext(AuthContext)!;