import React, { Component } from 'react';

import './App.css';
import PhoneList from './containers/PhoneList';


class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
        </header>
        <PhoneList />
      </div>
    );
  }
}

export default App;
