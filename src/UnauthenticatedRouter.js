import React from "react";
import { Router, Link } from "@reach/router";
import { Home } from "./components/Home";
import { Register } from "./components/Register";
import { Login } from "./components/Login";
import { Settings } from "./components/Settings";
import { Editor } from "./components/Editor";
import { EditorArticle } from "./components/EditorArticle";
import { Article } from "./components/Article";
import { Profile } from "./components/Profile";
import { ProfileFavorites } from "./components/ProfileFavorites";

let HomeRoute = () => <Home />;
let RegisterRoute = () => <Register />;
let LoginRoute = () => <Login />;
let SettingsRoute = () => <Settings />;
let EditorRoute = () => <Editor />;
let EditorArticleRoute = () => <EditorArticle />;
let ArticleRoute = () => <Article />;
let ProfileRoute = () => <Profile />;
let ProfileFavoritesRoute = () => <ProfileFavorites />;

let UnauthenticatedRouter = () => {
  return (
    <>
      <Link to="/">Home</Link>
      <Link to="/register">Register</Link>
      <Link to="/login">Login</Link>
      <Router>
        <HomeRoute path="/" />
        <RegisterRoute path="/register" />
        <LoginRoute path="/login" />
        <SettingsRoute path="/settings" />
        <EditorRoute path="/editor" />
        <EditorArticleRoute path="/editor/:slug" />
        <ArticleRoute path="/article/:slug" />
        <ProfileRoute path="/profile/:username" />
        <ProfileFavoritesRoute path="/profile/:username/favorites" />
      </Router>
    </>
  );
};

export default UnauthenticatedRouter;
