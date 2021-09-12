import { ColorModeScript, ChakraProvider } from "@chakra-ui/react";
import "./styles.css";
import React, { StrictMode } from "react";
import ReactDOM from "react-dom";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import * as serviceWorker from "./serviceWorker";
import theme from "./theme";
import { SearchProvider } from "./Providers/search.provider";

ReactDOM.render(
  <StrictMode>
    <ChakraProvider theme={theme}>
      <SearchProvider>
        <ColorModeScript />
        <App />
      </SearchProvider>
    </ChakraProvider>
  </StrictMode>,
  document.getElementById("root")
);

// Don't Remove these comments, if later we need to use them, then we can read this

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorker.unregister();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
