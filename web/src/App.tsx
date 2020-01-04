import React, { useState, useEffect, Suspense } from "react";
import { useInterval } from "./hooks/useInterval";

export let UserContext = React.createContext<any>({});

export class tokenIndex {
  public static value: string;
}

let AuthenticatedRouter = React.lazy(() => import("./AuthenticatedRouter"));
let UnauthenticatedRouter = React.lazy(() => import("./UnauthenticatedRouter"));

export let App: React.FC = () => {
  let [loading, setLoading] = useState(true);
  let [token, setToken] = useState("");

  useEffect(() => {
    fetchToken(setToken, setLoading);
  }, []);

  useInterval(() => {
    fetchToken(setToken);
  }, 1000 * (60 * 14 + 50));

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
