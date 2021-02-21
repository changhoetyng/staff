import React, { useState, useEffect } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Cookies from "js-cookie";
import {api} from "../api/api";

function ProtectedRoute({ component: Component, authed, checkAdmin, ...rest }) {
  const [auth, setAuth] = useState(false);
  const [isTokenValidated, setIsTokenValidated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [fetched, setFetched] = useState(false);

  useEffect(() => {
    let accessToken = Cookies.get("accessToken");
    let refreshToken = Cookies.get("refreshToken");
    if (accessToken) {
      Promise.all([
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
        }),
        
      api
      .get("/user")
      .then((res) => {
        const role = res.data.user.role
        console.log(res.data)
        if(role === "admin"){
          setIsAdmin(true)
        } else {
          setIsAdmin(false)
        }
      }).then(() => setFetched(true))
      .catch((err) => console.log(err))
      ]).then(() => setIsTokenValidated(true))
    } else {
      setIsTokenValidated(true); // in case there is no token
    }
  }, []);

  if (!isTokenValidated) return <div />;
  console.log(checkAdmin)
  console.log(isAdmin)
  if(checkAdmin){
    return (
      <Route
        {...rest}
        render={(props) =>
          !auth ? <Redirect to="/login" /> : isAdmin ? <Component {...props} /> : <Redirect to="/notAuthorized" />
        }
      />
    );
  } else {
    return (
      <Route
        {...rest}
        render={(props) =>
          auth ? <Component {...props} /> : <Redirect to="/login" />
        }
      />
    )
  }
  
}

export default ProtectedRoute;
