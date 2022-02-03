import React from "react";
// import { connect } from 'react-redux'
import ReactDOM from "react-dom";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { Provider } from 'react-redux'
import configureStore from "./store";

const store = configureStore();

if (process.env.NODE_ENV !== 'production')  {
    window.store = store;
}

function Root() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>
    );
  }

  ReactDOM.render(
    <React.StrictMode>
      <Root />
    </React.StrictMode>,
    document.getElementById('root'),
  );