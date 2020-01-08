import { useState, useEffect } from "react";
import ky from "ky";
import jwtDecode from "jwt-decode";

let root = "http://localhost:4000";

type Options = {
  body?: Blob;
  token?: string;
  credentials?: boolean;
  setToken?: any;
};

export function useKy(url: string, method: string, options?: Options) {
  let [data, setData] = useState<any>(null);
  let [loading, setLoading] = useState(true);

  if (options?.token) {
    console.log(options.token);
    let decoded = jwtDecode(options.token);
    console.log(decoded);
  }

  useEffect(() => {
    (async () => {
      let json = await ky(`${root}${url}`, {
        method,
        body: options?.body ? options.body : undefined,
        headers: options?.token
          ? { authorization: `Bearer ${options.token}` }
          : undefined,
        credentials: options?.credentials ? "include" : undefined
      }).json();
      setData(json);
      setLoading(false);
    })();
  }, []);

  return { data, loading };
}
