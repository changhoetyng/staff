import axios from 'axios';
import Cookies from "js-cookie";

export const apiUrl = 'http://localhost:5000/api'

export const api = axios.create({
    baseURL: apiUrl,
    timeout: 100000,
});

export const apiWithoutHeader = axios.create({
    baseURL: apiUrl,
    timeout: 100000,
});

api.interceptors.request.use( async function (config) {
    const accessTokenBefore = Cookies.get("accessToken")
    const refreshToken = Cookies.get("refreshToken")
    if (accessTokenBefore) {
        await apiWithoutHeader
          .get("/auth/verifyUser", {
            headers: {
              Authorization: `Bearer ${accessTokenBefore}`,
            },
          })
          .catch(async (err) => {
              var status 
              if(err.response){
                  status = err.response.status
              }
            if (status === 401) {
              await apiWithoutHeader
                .get("/auth/token", {
                  params: {
                    refreshToken: refreshToken,
                  },
                })
                .then((res) => {
                  Cookies.set("accessToken", res.data.accessToken);
                })
                .catch((err) => {
                  Cookies.remove("accessToken");
                  Cookies.remove("refreshToken");
                });
            }
          })
          const accessToken = Cookies.get("accessToken")
          config.headers.Authorization =  `Bearer ${accessToken}`;
    }
    return config;
}, function (error) {
    return Promise.reject(error)
})