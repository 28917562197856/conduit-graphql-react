import React from "react";
import { useUsersQuery } from "../generated";

export let Article: React.FC = () => {
  let { data, loading } = useUsersQuery();
  return <div>{loading ? "Loading..." : JSON.stringify(data)}</div>;
};
