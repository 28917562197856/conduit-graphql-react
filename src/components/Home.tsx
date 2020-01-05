import React, { useEffect } from "react";
import { useGetArticlesQuery } from "../generated";

export let Home: React.FC = () => {
  let { data, loading } = useGetArticlesQuery({ fetchPolicy: "network-only" });

  return (
    <div>
      {loading ? (
        "Loading..."
      ) : (
        <>
          <div>
            {data?.getArticles?.map(article => (
              <div key={article?.slug!}>
                <div>{article?.title}</div>
                <div>{article?.description}</div>
              </div>
            ))}
          </div>
          {/* <div>
            {[
              ...new Set(
                data?.getArticles?.flatMap(article => article?.taglist)
              )
            ].map(tag => (
              <div key={tag!}>{tag}</div>
            ))}
          </div> */}
        </>
      )}
    </div>
  );
};
