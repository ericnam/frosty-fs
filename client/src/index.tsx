import App from "app";
import { render } from "react-dom";
import { ApolloProvider } from "@apollo/client";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";

import "./styles/tailwind.css";
import "./styles/grid.mermaid.css";
import apolloClient from "./apollo";
import { store } from "./store";

render(
  <ApolloProvider client={apolloClient}>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </ApolloProvider>,
  document.getElementById("root")
);
