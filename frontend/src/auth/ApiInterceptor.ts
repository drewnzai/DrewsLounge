import axios from 'axios';
import { RefreshTokenRequest } from '../models/RefreshTokenRequest';
import { useNavigate } from 'react-router-dom';

const navigate = useNavigate();

const ApiInterceptor = axios.create({
  baseURL: 'http://localhost:8080/api/',
});


ApiInterceptor.interceptors.request.use(
  
    (config) => {
        const userStr = localStorage.getItem("user");
        
        if(userStr){
        const user = JSON.parse(userStr);

        const token = user.authenticationToken;
        
        if (token) {
        config.headers.Authorization = `Bearer ${token}`;
        }
    }

        return config;
  },
  (error) => Promise.reject(error)
);

ApiInterceptor.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;
  
      if (error.response.status === 403 && !originalRequest._retry) {
        originalRequest._retry = true;
  
        try {

            const userStr = localStorage.getItem("user");
            if(userStr){
                const user = JSON.parse(userStr);

                const refreshTokenRequest: RefreshTokenRequest = {
                    username: user.username,
                    refreshToken: user.refreshToken
                }

                const response = await axios.post("http://localhost:8080/api/auth/refresh", refreshTokenRequest);
                
                if(response.data.data){
                    throw new Error("Cannot refresh JWT, refreshToken is expired");
                  }
                  else{
                    const refreshedUser = response.data;
                    
                    localStorage.setItem("user", JSON.stringify(refreshedUser));
                    
                    originalRequest.headers.Authorization = `Bearer ${refreshedUser.authenticationToken}`;
                    return axios(originalRequest);
                  }
                }
                
                
                // Retry the original request with the new token
              } catch (error) {
                console.log(error);
                navigate("/login");
        }
      }
  
      return Promise.reject(error);
    }
  );
  

export default ApiInterceptor;
