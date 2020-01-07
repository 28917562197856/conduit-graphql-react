import React from "react";
import { useKy } from "../hooks/useKy";

export let Home: React.FC = () => {
  let { data, loading } = useKy("/articles", "get");

  return (
    <div>
      {loading
        ? "Loading..."
        : data.map((article: any) => <div>{article.slug}</div>)}
    </div>
  );
};
