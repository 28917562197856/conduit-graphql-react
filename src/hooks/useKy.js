import { useState, useEffect } from "react";
import ky from "ky";

let root = "http://localhost:4000";

// type Options = {
//   body?: Blob;
//   token?: string;
//   credentials?: boolean;
//   setToken?: any;
// };

export function useKy(url, method, options) {
  let [data, setData] = useState(null);
  let [loading, setLoading] = useState(true);

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
