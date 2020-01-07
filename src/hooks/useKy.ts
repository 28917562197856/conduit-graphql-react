import { useState, useEffect } from "react";
import ky from "ky";

let root = "http://localhost:4000";

export function useKy(
  url: string,
  method: string,
  body?: Blob,
  token?: string,
  credentials?: boolean
) {
  let [data, setData] = useState<any>(null);
  let [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      let json = await ky(`${root}${url}`, {
        method,
        body: body ? body : undefined,
        headers: token ? { authorization: `Bearer ${token}` } : undefined,
        credentials: credentials ? "include" : undefined
      }).json();
      setData(json);
      setLoading(false);
    })();
  }, []);

  return { data, loading };
}
