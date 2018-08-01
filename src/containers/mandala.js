import React, { Component } from 'react';

import { DrawCanvas, BaseCanvas } from '../components';

class MandalaMaker extends Component {
  constructor() {
    super();
    this.state = {
      numCircles: 10,
      circlesVisible: true,
      axesVisible: true,
      numAxes: 3,
    }
  }

  render() {
    const { numCircles, numAxes, circlesVisible, axesVisible } = this.state;
    return (
      <div className="mandala">
        <BaseCanvas
          numAxes={numAxes}
          numCircles={numCircles}
          circles={circlesVisible}
          axes={axesVisible}
        />
      </div>
    );
  }
}

export default MandalaMaker;