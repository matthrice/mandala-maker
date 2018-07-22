// App.js

import React, { Component } from 'react';
import Mandala from './components/mandala';

import './App.css';
class App extends Component {
  render() {
    return (
      <div>
        <h3 className="title">
          Mandala
        </h3>
        <div className="mandala-canvas">
          <Mandala />
        </div>
      </div>
    );
  }
}
export default App;
