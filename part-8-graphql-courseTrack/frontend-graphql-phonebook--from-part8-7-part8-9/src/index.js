import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

import { ApolloClient, ApolloProvider, HttpLink, InMemoryCache } from "@apollo/client";
import { setContext } from "apollo-link-context";

//Below imports are used to make use of subscriptions.
import { split } from "@apollo/client";
import { getMainDefinition } from "@apollo/client/utilities";
import { WebSocketLink } from "@apollo/link-ws";

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("phonenumbers-user-token");
  return {
    headers: {
      ...headers,
      authorization: token ? `bearer ${token}` : null,
    },
  };
});

const httpLink = new HttpLink({
  uri: "http://localhost:4000",
});

// sockets and subscription helper 1.
const wsLink = new WebSocketLink({
  uri: "ws://localhost:4000/graphql",
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
  link: splitLink, // # splitLink is used here.
});

ReactDOM.render(
  <ApolloProvider client={client}>
    {/* # client object is passed here. */}
    <App />
  </ApolloProvider>,
  document.getElementById("root")
);
