import React, { useState, useEffect, Suspense } from "react";
import { useInterval } from "./hooks/useInterval";
import ky from "ky";
import { useKy } from "./hooks/useKy";

export let UserContext = React.createContext<any>({});

let AuthenticatedRouter = React.lazy(() => import("./AuthenticatedRouter"));
let UnauthenticatedRouter = React.lazy(() => import("./UnauthenticatedRouter"));

export let App: React.FC = () => {
  let [token, setToken] = useState("");
  let { data, loading } = useKy("/refresh_token", "post", {
    credentials: true,
    token:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjE0LCJpYXQiOjE1Nzg0ODM4NjMsImV4cCI6MTU3OTA4ODY2M30.VVuCMXslgVIocgPTmbMTvblWgwMKan91YlchJWG667s"
  });

  useInterval(() => {
    fetchToken(setToken);
  }, 50000);
  // }, 1000 * (60 * 14 + 50));

  useEffect(() => {
    if (!loading) {
      console.log(data);
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
    <UserContext.Provider value={{ setToken }}>
      <Suspense fallback={<div>Loading...</div>}>{body}</Suspense>
    </UserContext.Provider>
  );
};

async function fetchToken(setToken: any) {
  let res: any = await ky
    .post("http://localhost:4000/refresh_token", { credentials: "include" })
    .json();
  console.log(res);
  let { accessToken } = res;
  setToken(accessToken);
}
