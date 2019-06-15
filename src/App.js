import React from 'react';
import logo from './logo.svg';

// Components
import Header from './components/Header.jsx';
import Game from './components/Game.jsx';
import Footer from './components/Footer.jsx';

function App() {
  return (
    <div className="container">
      <Header />
      <Game />
      <Footer />
    </div>
  );
}

export default App;
