import axios from 'axios'


const apiClient = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API,
});

apiClient.interceptors.request.use(
    
    async (config)=> {

        const token = localStorage.getItem('token');    
   
        config.headers['Content-Type'] = 'application/json'
        config.headers.Authorization = `Bearer ${token}`;
    
        return config;
      },

        (error)=>{

        return Promise.reject(error); 
      }

)

export default apiClient;