import React, { useState, useEffect, Suspense } from "react";
import { useInterval } from "./hooks/useInterval";
import ky from "ky";
import { useKy } from "./hooks/useKy";

let AuthenticatedRouter = React.lazy(() => import("./AuthenticatedRouter"));
let UnauthenticatedRouter = React.lazy(() => import("./UnauthenticatedRouter"));

export let UserContext = React.createContext({});

export let App = () => {
  let [token, setToken] = useState("");
  let { data, loading } = useKy("/refresh_token", "post", {
    credentials: true
  });

  useInterval(() => {
    fetchToken(setToken);
  }, 1000 * (60 * 14 + 50));

  useEffect(() => {
    if (!loading) {
      setToken(data.accessToken);
    }
  }, [loading]);

  let body;
  if (loading) {
    body = null;
  } else if (token) {
    body = <AuthenticatedRouter />;
  } else {
    body = <UnauthenticatedRouter />;
  }

  return (
    <UserContext.Provider value={{ token, setToken }}>
      <Suspense fallback={<div>Loading...</div>}>{body}</Suspense>
    </UserContext.Provider>
  );
};

export async function fetchToken(setToken) {
  let res = await ky
    .post("http://localhost:4000/refresh_token", { credentials: "include" })
    .json();
  let { accessToken } = res;
  setToken(accessToken);
}
