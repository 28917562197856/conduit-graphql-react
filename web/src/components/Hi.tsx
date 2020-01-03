import React, { useEffect } from "react";
import { useHiQuery } from "../generated";

export let Hi: React.FC = () => {
  let { loading, data } = useHiQuery({ fetchPolicy: "network-only" });
  useEffect(() => {
    if (!loading) console.log(data);
  }, [loading]);
  return (
    <div>
      {loading ? "Loading..." : data ? <div>{data.hi}</div> : "No data"}
    </div>
  );
};
