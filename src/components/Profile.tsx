import React from "react";
import { useUsersQuery } from "../generated";

export let Profile: React.FC = () => {
  let { data, loading } = useUsersQuery();
  return <div>{loading ? "Loading..." : JSON.stringify(data)}</div>;
};
