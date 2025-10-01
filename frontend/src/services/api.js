import axios from 'axios';


const API_URL = "http://localhost:3000/api/v1";



const api = axios.create({
      baseURL: API_URL,
      headers: {
            'Content-Type': 'application/json',
      },
})


// Add token to request headers if available
api.interceptors.request.use(
      (config)=>{
            const token = localStorage.getItem('token');
            if(token){
                  config.headers.Authorization = `Bearer ${token}`;
            }

            return config;
      },
      (errors)=>{
            return Promise.reject(errors);
      }
);

// AUTH APIs
export const signup = async (userData) =>api.post('/auth/sign-up', userData);
export const signin = async (userData) =>api.post('/auth/sign-in', userData);

// User APIs
export const getUsers = async () =>api.get('/users');
export const getUserById = async (id) =>api.put(`/users/${id}`);

export default api;