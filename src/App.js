// App.js

import React, { Component } from 'react';
import MandalaMaker from './components/mandala';

import './App.css';
class App extends Component {
  render() {
    return (
      <div>
        <h3 className="title">
          Mandala Maker
        </h3>
        <div className="mandala-canvas">
          <MandalaMaker />
        </div>
      </div>
    );
  }
}
export default App;
