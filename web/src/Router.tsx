import React from "react";
import { Router } from "@reach/router";
import { Home, Register, Login } from "./components";

let HomeRoute: React.FC<{ path: string }> = () => <Home />;
let RegisterRoute: React.FC<{ path: string }> = () => <Register />;
let LoginRoute: React.FC<{ path: string }> = () => <Login />;

export const App: React.FC = () => {
  return (
    <Router>
      <HomeRoute path="/" />
      <RegisterRoute path="/register" />
      <LoginRoute path="/login" />
    </Router>
  );
};
