// React Stuff
import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';

// Redux Stuff
import { createStore } from "redux";
import { Provider } from "react-redux";
import reducer from './reducers/reducer.js'

// App Stuff
import './index.css';
import App from './App';

// Create Redux store
const store = createStore(reducer);

// Render
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>, document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
