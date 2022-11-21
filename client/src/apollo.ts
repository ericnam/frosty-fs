import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";
import { onError } from "apollo-link-error";
import { ApolloLink } from "apollo-link";

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    console.log("graphQLErrors", graphQLErrors);
  }
  if (networkError) {
    console.log("networkError", networkError);
  }
});

const httpLink = new HttpLink({
  uri: "http://localhost:4000/graphql/",
});

const link = ApolloLink.from([errorLink, httpLink as any]);

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: link as any,
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
  },
  connectToDevTools: true,
});

export default client;
