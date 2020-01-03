import React from "react";
import ReactDOM from "react-dom";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "@apollo/react-hooks";
import { Global } from "./global";
import { AuthorizedApp } from "./App";

const client = new ApolloClient({
  uri: "http://localhost:4000/graphql",
  credentials: "include",
  request: operation => {
    if (Global.token) {
      operation.setContext({
        headers: {
          authorization: `bearer ${Global.token}`
        }
      });
    }
  }
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <AuthorizedApp />
  </ApolloProvider>,
  document.getElementById("root")
);
