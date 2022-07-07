import App from "app";
import { render } from "react-dom";
import { ApolloProvider } from "@apollo/client";

import "./styles/tailwind.css";
import apolloClient from "./apollo";

render(
  <ApolloProvider client={apolloClient}>
    <App />
  </ApolloProvider>,
  document.getElementById("root")
);
