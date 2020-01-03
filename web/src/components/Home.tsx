import React, { useEffect } from "react";
import { useGetArticlesQuery } from "../generated";

export let Home: React.FC = () => {
  let { data, loading } = useGetArticlesQuery();

  useEffect(() => {
    if (!loading) {
      console.log(data);
      console.log(data?.getArticles?.flatMap(article => article?.taglist));
    }
  }, [loading]);
  return (
    <div>
      {loading ? (
        "Loading..."
      ) : (
        <>
          <div>
            {data?.getArticles?.map(article => (
              <>
                <div>{article?.user_id}</div>
                <div>{article?.createdat}</div>
                <div>{article?.title}</div>
                <div>{article?.description}</div>
              </>
            ))}
          </div>
          <div>
            {[
              ...new Set(
                data?.getArticles?.flatMap(article => article?.taglist)
              )
            ].map(tag => (
              <div>{tag}</div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};
