import React, { Component } from 'react';
import { CirclePicker } from 'react-color';

import { BaseCanvas } from '../components';

class MandalaMaker extends Component {
  constructor() {
    super();
    this.state = {
      numCircles: 10,
      circlesVisible: true,
      axesVisible: true,
      numAxes: 3,
      paintColor: "#000",
    }
  }

  render() {
    const { numCircles, numAxes, circlesVisible, axesVisible, paintColor } = this.state;
    return (
      <div className="mandala">
        <h2 className="title">
          Mandala Maker
        </h2>
        <CirclePicker
          className="tool-bar"
          onChangeComplete={color => 
            this.setState({paintColor: color.hex})
          }/>
        <BaseCanvas
          numAxes={numAxes}
          numCircles={numCircles}
          circles={circlesVisible}
          axes={axesVisible}
          paintColor={paintColor}
        />
      </div>
    );
  }
}

export default MandalaMaker;