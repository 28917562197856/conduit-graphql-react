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
import { Hi } from "./components/Hi";

let HomeRoute: React.FC<{ path: string }> = () => <Home />;
let RegisterRoute: React.FC<{ path: string }> = () => <Register />;
let LoginRoute: React.FC<{ path: string }> = () => <Login />;
let SettingsRoute: React.FC<{ path: string }> = () => <Settings />;
let EditorRoute: React.FC<{ path: string }> = () => <Editor />;
let EditorArticleRoute: React.FC<{ path: string }> = () => <EditorArticle />;
let ArticleRoute: React.FC<{ path: string }> = () => <Article />;
let ProfileRoute: React.FC<{ path: string }> = () => <Profile />;
let ProfileFavoritesRoute: React.FC<{ path: string }> = () => (
  <ProfileFavorites />
);
let HiRoute: React.FC<{ path: string }> = () => <Hi />;

let UnauthenticatedRouter: React.FC = () => {
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
        <HiRoute path="/hi" />
      </Router>
    </>
  );
};

export default UnauthenticatedRouter;
