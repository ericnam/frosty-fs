import {
  ApolloClient,
  InMemoryCache,
  HttpLink,
} from "@apollo/client";

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: new HttpLink({
    uri: "http://localhost:4000/graphql/",
  }),
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
  },
  connectToDevTools: true,
});

export default client;