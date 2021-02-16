import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

import { ApolloClient, ApolloProvider, HttpLink, InMemoryCache, gql, split } from "@apollo/client";
import { setContext } from "apollo-link-context";

import { getMainDefinition } from "@apollo/client/utilities";
import { WebSocketLink } from "@apollo/link-ws";

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("library-user-token");
  return {
    headers: {
      ...headers,
      authorization: token ? `bearer ${token}` : null,
    },
  };
});

//Info: HHTP connection to the GraphQL server
const httpLink = new HttpLink({
  uri: "http://localhost:4001",
});

// sockets and subscription helper 1.
//Info: WebSocket connection to the GraphQL server
const wsLink = new WebSocketLink({
  uri: "ws://localhost:4001/graphql",
  options: {
    reconnect: true,
  },
});

// sockets and subscription helper 2.
const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return definition.kind === "OperationDefinition" && definition.operation === "subscription";
  },
  wsLink, // # wsLink is used here.
  authLink.concat(httpLink) // # Old coder's style--> httpLink was linked to link property client object earlier.
);

const client = new ApolloClient({
  cache: new InMemoryCache(),
  // link: new HttpLink({
  //   uri: "http://localhost:4001",
  // }),
  // Old coder's style above.
  // link: authLink.concat(httpLink), //#THIS Line is redundant when using the newer subscriptions.
  link: splitLink,
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById("root")
);
