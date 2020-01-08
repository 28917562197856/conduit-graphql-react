import React, { useContext } from "react";
import { Link } from "@reach/router";
import { useKy } from "../../hooks/useKy";
import { UserContext } from "../../App";

export let Header: React.FC = () => {
  let userContext = useContext(UserContext);
  let { data, loading } = useKy("/user", "get", {
    credentials: true,
    token: userContext.token
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
              <i className="ion-compose"></i>&nbsp;New Article
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
              <i className="ion-gear-a"></i>&nbsp;Settings
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
};
