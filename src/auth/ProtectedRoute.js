import React, { useState, useEffect } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Cookies from "js-cookie";
import {api} from "../api/api";

function ProtectedRoute({ component: Component, authed, ...rest }) {
  const [auth, setAuth] = useState(false);
  const [isTokenValidated, setIsTokenValidated] = useState(false);

  useEffect(() => {
    let accessToken = Cookies.get("accessToken");
    let refreshToken = Cookies.get("refreshToken");
    if (accessToken) {
      api
        .get("/auth/verifyUser", {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })
        .then((res) => {
          if (res.status === 200) {
            console.log(res.data)
            setAuth(true);
          }
        })
        .catch((err) => {
            var status 
            if(err.response){
                status = err.response.status
            }
          if (status === 401) {
            api
              .get("/auth/token", {
                params: {
                  refreshToken: refreshToken,
                },
              })
              .then((res) => {
                Cookies.set("accessToken", res.data.accessToken);
                setAuth(true);
              })
              .catch((err) => {
                Cookies.remove("accessToken");
                Cookies.remove("refreshToken");
                setAuth(false);
              });
          } else {
            setAuth(false);
          }
        })
        .then(() => setIsTokenValidated(true));
    } else {
      setIsTokenValidated(true); // in case there is no token
    }
  }, []);

  if (!isTokenValidated) return <div />;

  return (
    <Route
      {...rest}
      render={(props) =>
        auth ? <Component {...props} /> : <Redirect to="/login" />
      }
    />
  );
}

export default ProtectedRoute;
