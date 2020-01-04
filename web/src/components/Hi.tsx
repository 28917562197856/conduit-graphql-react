import React, { useEffect } from "react";
import { useHiQuery } from "../generated";

export let Hi: React.FC = () => {
  let { loading, data } = useHiQuery({ fetchPolicy: "network-only" });

  return (
    <div>
      {loading ? "Loading..." : data ? <div>{data.hi}</div> : "No data"}
    </div>
  );
};
