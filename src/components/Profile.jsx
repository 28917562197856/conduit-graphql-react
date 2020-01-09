import React, { useEffect, useContext } from "react";
import useKy from "../hooks/useKy";
import { TokenContext } from "../App";

export default function Profile({ username }) {
  let tokenContext = useContext(TokenContext);
  let profile = useKy(`/profiles/${username}`, "get");
  let currentUser = useKy("/user", "get", {
    credentials: true,
    token: tokenContext.token
  });
  let articles = useKy(`/articles/?author=${username}`, "get");
  useEffect(() => {
    if (!profile.loading) console.log(profile);
  }, [profile.loading]);

  // return <div>Hi {profile.loading ? "Loading..." : profile.data.username}</div>;
  return (
    <>
      {profile.loading || currentUser.loading || articles.loading ? (
        "Loading..."
      ) : (
        <div className="profile-page">
          <div className="user-info">
            <div className="container">
              <div className="row">
                <div className="col-xs-12 col-md-10 offset-md-1">
                  <img src={profile.data.image} className="user-img" />
                  <h4>{profile.data.username}</h4>
                  <p>{profile.data.bio}</p>
                  {profile.data.username === currentUser.data.username ? (
                    <button
                      type="button"
                      className="btn btn-sm btn-outline-secondary action-btn"
                    >
                      <i className="ion-gear-a" />
                      &nbsp; Edit Profile Settings
                    </button>
                  ) : (
                    <button
                      type="button"
                      className="btn btn-sm btn-outline-secondary action-btn"
                    >
                      <i className="ion-plus-round" />
                      &nbsp; Follow Eric Simons
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="container">
            <div className="row">
              <div className="col-xs-12 col-md-10 offset-md-1">
                <div className="articles-toggle">
                  <ul className="nav nav-pills outline-active">
                    <li className="nav-item">
                      <a className="nav-link active" href="">
                        My Articles
                      </a>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link" href="">
                        Favorited Articles
                      </a>
                    </li>
                  </ul>
                </div>
                {articles.data.map(article => (
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
                        <i className="ion-heart" />
                        {article.favoritesCount}
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
            </div>
          </div>
        </div>
      )}
    </>
  );
}
