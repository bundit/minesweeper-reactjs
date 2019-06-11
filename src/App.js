import React from 'react';
import { createStore } from "redux";
import { Provider } from "react-redux";
import logo from './logo.svg';

// Components
import Header from './components/Header.jsx';

const initialState = {
  rows: 8,
  columns: 10,
}

function reducer(state = initialState, action) {}
// Create Redux store
const store = createStore(reducer);

function App() {
  return (
    <Provider store={store}>
      <Header />
      
    </Provider>
  );
}

export default App;
