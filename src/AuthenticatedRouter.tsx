import React, { useContext } from "react";
import { Router, Link, navigate } from "@reach/router";
import { Home } from "./components/Home";
import { Settings } from "./components/Settings";
import { Editor } from "./components/Editor";
import { EditorArticle } from "./components/EditorArticle";
import { Article } from "./components/Article";
import { Profile } from "./components/Profile";
import { ProfileFavorites } from "./components/ProfileFavorites";
import { UserContext } from "./App";
import ky from "ky";
import { Header } from "./components/templates/Header";
import { Footer } from "./components/templates/Footer";

let HomeRoute: React.FC<{ path: string }> = () => <Home />;
let SettingsRoute: React.FC<{ path: string }> = () => <Settings />;
let EditorRoute: React.FC<{ path: string }> = () => <Editor />;
let EditorArticleRoute: React.FC<{ path: string }> = () => <EditorArticle />;
let ArticleRoute: React.FC<{ path: string }> = () => <Article />;
let ProfileFavoritesRoute: React.FC<{ path: string }> = () => (
  <ProfileFavorites />
);

let AuthenticatedRouter: React.FC = () => {
  let user = useContext(UserContext);
  return (
    <>
      <Header />
      <Link to="/">Home</Link>
      <Link to="/hi">Hi</Link>
      <Link to="/editor">Add article</Link>
      <button
        onClick={async () => {
          await ky.post("http://localhost:4000/logout", {
            credentials: "include"
          });
          user.setToken("");
          navigate("/");
        }}
      >
        Logout
      </button>
      <Router>
        <Profile path="/:username" />
        <HomeRoute path="/" />
        <SettingsRoute path="/settings" />
        <EditorRoute path="/editor" />
        <EditorArticleRoute path="/editor/:slug" />
        <ArticleRoute path="/article/:slug" />
        <ProfileFavoritesRoute path="/profile/:username/favorites" />
      </Router>
      <Footer />
    </>
  );
};

export default AuthenticatedRouter;
