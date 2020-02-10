import React from 'react';
import './App.css';
import MyRoute from './components/route.component';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  return (
    <div className="App">
      <header className="App-header">
        <MyRoute />
      </header>
    </div>
  );
}

export default App;
