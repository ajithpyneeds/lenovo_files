import React from 'react';
import Com from './components/comp';
import Cl from './components/clss'
import './App.css';

function App() {
  return (
    <div className="App">
      <Com name='Ajith' likes='Games'/>
      <Cl food='Coffee'/>
    </div>
  );
}

export default App;
