import React, { useState, useEffect } from "react";
import { App } from "./Router";
import { Global } from "./global";

export const AuthorizedApp: React.FC = () => {
  let [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:4000/refresh_token", {
      method: "POST",
      credentials: "include"
    }).then(async res => {
      let { accessToken } = await res.json();
      Global.token = accessToken;
      setLoading(false);
    });
  }, []);

  return <div>{loading ? "Loading..." : <App />} </div>;
};
