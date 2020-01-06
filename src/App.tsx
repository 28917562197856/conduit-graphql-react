import React, { useState, useEffect, Suspense } from "react";
import { useInterval } from "./hooks/useInterval";
import ky from "ky";

export let UserContext = React.createContext<any>({});

export class tokenIndex {
  public static value: string;
}

let AuthenticatedRouter = React.lazy(() => import("./AuthenticatedRouter"));
let UnauthenticatedRouter = React.lazy(() => import("./UnauthenticatedRouter"));

export let App: React.FC = () => {
  let [loading, setLoading] = useState(false);
  let [token, setToken] = useState("");

  useEffect(() => {
    (async () => {
      let res = await ky
        .get("http://localhost:4000/user", {
          hooks: {
            beforeRequest: [
              req => {
                req.headers.set(
                  "Authorization",
                  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjE0LCJpYXQiOjE1NzgzMzg3MjcsImV4cCI6MTU3ODk0MzUyN30.DQ4gpjXhbdlxsZsh6snJrFet41jIMCSiRTGqKC7ig_s"
                );
              }
            ]
          }
        })
        .json();
      console.log(res);
    })();
    // fetchToken(setToken, setLoading);
  }, []);

  // useInterval(() => {
  // fetchToken(setToken);
  // }, 1000 * (60 * 14 + 50));

  useEffect(() => {
    tokenIndex.value = token;
  }, [token]);

  let body;
  if (loading) {
    body = null;
  } else if (token) {
    body = <AuthenticatedRouter />;
  } else {
    body = <UnauthenticatedRouter />;
  }

  return (
    <UserContext.Provider value={{ setToken }}>
      <Suspense fallback={<div>Loading...</div>}>{body}</Suspense>
    </UserContext.Provider>
  );
};

async function fetchToken(setToken: any, setLoading?: any) {
  console.log("FETCH");
  let res = await fetch("http://localhost:4000/refresh_token", {
    method: "POST",
    credentials: "include"
  });
  let { accessToken } = await res.json();
  setToken(accessToken);
  if (setLoading) {
    setLoading(false);
  }
}
