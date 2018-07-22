// App.js

import React, { Component } from 'react';
import MandalaMaker from './components/mandala';

import './App.css';
class App extends Component {
  render() {
    return (
      <div>
        <h2 className="title">
          Mandala Maker
        </h2>
        <div className="mandala-canvas">
          <MandalaMaker />
        </div>
      </div>
    );
  }
}
export default App;
