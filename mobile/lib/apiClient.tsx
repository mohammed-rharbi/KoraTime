import axios from 'axios'
import * as SecureStore from 'expo-secure-store';
import AsyncStorage from '@react-native-async-storage/async-storage';


const apiClient = axios.create({
    baseURL: process.env.EXPO_PUBLIC_API,
});

apiClient.interceptors.request.use(
    
    async (config)=> {

        // const token = await SecureStore.getItemAsync('token'); 
        const token = await AsyncStorage.getItem('token');    
   
        config.headers['Content-Type'] = 'application/json'
        config.headers.Authorization = `Bearer ${token}`;
    
        return config;
      },

        (error)=>{

        return Promise.reject(error); 
      }

)

export default apiClient;