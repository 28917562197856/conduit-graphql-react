import React from "react";
import { useUsersQuery } from "../generated";

export let Register: React.FC = () => {
  let { data, loading, error } = useUsersQuery();
  return <div>{loading ? "Loading..." : JSON.stringify(data)}</div>;
};
