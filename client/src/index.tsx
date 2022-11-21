import App from "app";
import * as ReactDOM from "react-dom/client";
import { ApolloProvider } from "@apollo/client";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";

import "./styles/tailwind.css";
// import "./styles/grid.mermaid.css";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";

import apolloClient from "./apollo";
import { store } from "./store";
import { ActionMenuProvider } from "contexts/actionMenu.provider";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <ApolloProvider client={apolloClient}>
    <Provider store={store}>
      <BrowserRouter>
        <ActionMenuProvider>
          <App />
        </ActionMenuProvider>
      </BrowserRouter>
    </Provider>
  </ApolloProvider>
);
