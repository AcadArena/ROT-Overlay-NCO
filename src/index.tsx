import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { CssBaseline } from "@material-ui/core";

import WebsocketProvider from "./config/WebsocketProvider";
import { BrowserRouter as Router } from "react-router-dom";

import { createStore } from "redux";
import Reducers from "./config/redux/AllReducers";
import { Provider } from "react-redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { ThemeProvider } from "@material-ui/core/styles";
import Theme from "./Theme";

export let store = createStore(Reducers, composeWithDevTools());

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <WebsocketProvider>
        <ThemeProvider theme={Theme}>
          <CssBaseline />
          <Router>
            <CssBaseline />
            <App />
          </Router>
        </ThemeProvider>
      </WebsocketProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
