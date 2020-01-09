import React, { useEffect } from "react";
import useKy from "../hooks/useKy";

export default function Home() {
  let articles = useKy("/articles", "get");
  let tags = useKy("/tags", "get");

  useEffect(() => {
    if (!articles.loading) console.log(articles);
  }, [articles.loading]);

  return (
    <div className="home-page">
      <div className="banner">
        <div className="container">
          <h1 className="logo-font">conduit</h1>
          <p>A place to share your knowledge.</p>
        </div>
      </div>
      <div className="container page">
        <div className="row">
          <div className="col-md-9">
            <div className="feed-toggle">
              <ul className="nav nav-pills outline-active">
                <li className="nav-item">
                  <a className="nav-link disabled" href="">
                    Your Feed
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link active" href="">
                    Global Feed
                  </a>
                </li>
              </ul>
            </div>
            {articles.loading
              ? "Loading..."
              : articles.data.map(article => (
                  <div key={article.title} className="article-preview">
                    <div className="article-meta">
                      <a href="profile.html">
                        <img src={article.user.image} />
                      </a>
                      <div className="info">
                        <a href="" className="author">
                          {article.author}
                        </a>
                        <span className="date">{article.updatedAt}</span>
                      </div>
                      <button
                        type="button"
                        className="btn btn-outline-primary btn-sm pull-xs-right"
                      >
                        <i className="ion-heart" /> {article.favoritesCount}
                      </button>
                    </div>
                    <a href="" className="preview-link">
                      <h1>{article.title}</h1>
                      <p>{article.description}</p>
                      <span>Read more...</span>
                    </a>
                  </div>
                ))}
          </div>
          <div className="col-md-3">
            <div className="sidebar">
              <p>Popular Tags</p>
              <div className="tag-list">
                {tags.loading
                  ? "Loading..."
                  : tags.data.map(tag => (
                      <a key={tag} href="" className="tag-pill tag-default">
                        {tag}
                      </a>
                    ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
