import React, { useEffect } from "react";
import { useKy } from "../hooks/useKy";

type Props = {
  path: string;
  username?: string;
};

export let Profile: React.FC<Props> = ({ username }) => {
  let { data, loading } = useKy(`/profiles/${username}`, "get");

  useEffect(() => {
    if (!loading) {
      console.log(data);
    }
  }, [loading]);
  return <div>Hi {loading ? "Loading..." : data.username}</div>;
};
