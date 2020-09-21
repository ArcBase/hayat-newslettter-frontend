
import React from 'react';
import ReactDOM from 'react-dom';
import './assets/main.css'
//import './index.css';
import './assets/main.css'
import App from './App';
import { createStore, compose, applyMiddleware, combineReducers } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
//import Paper from "./Paper"
import authReducer from "./store/reducers/auth";
import * as actions from "./store/actions/auth";

const composeEnhances = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
  auth: authReducer,
});

const store = createStore(rootReducer, composeEnhances(applyMiddleware(thunk)));

const app = (
  <Provider store={store}>
   <App />
  </Provider>
);
ReactDOM.render(app, document.getElementById('root')
);
