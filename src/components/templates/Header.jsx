import React, { useContext } from "react";
import { Link } from "@reach/router";
import useKy from "../../hooks/useKy";
import { TokenContext } from "../../App";

export default function Header() {
  let tokenContext = useContext(TokenContext);
  let { data, loading } = useKy("/user", "get", {
    credentials: true,
    token: tokenContext.token
  });
  return (
    <nav className="navbar navbar-light">
      <div className="container">
        <Link to="/" className="navbar-brand">
          conduit
        </Link>
        <ul className="nav navbar-nav pull-xs-right">
          <li className="nav-item">
            <Link
              to="/"
              className={
                window.location.pathname === "/"
                  ? "nav-link active"
                  : "nav-link"
              }
            >
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link
              to="/"
              className={
                window.location.pathname === "/"
                  ? "nav-link active"
                  : "nav-link"
              }
            >
              <i className="ion-compose" />
              &nbsp;New Article
            </Link>
          </li>
          <li className="nav-item">
            <Link
              to="/"
              className={
                window.location.pathname === "/"
                  ? "nav-link active"
                  : "nav-link"
              }
            >
              <i className="ion-gear-a" />
              &nbsp;Settings
            </Link>
          </li>
          <li className="nav-item">
            {loading ? (
              "Loading..."
            ) : (
              <Link
                to="/"
                className={
                  window.location.pathname === `/${data.username}`
                    ? "nav-link active"
                    : "nav-link"
                }
              >
                {data.username}
              </Link>
            )}
          </li>
        </ul>
      </div>
    </nav>
  );
}
