import React, { Component } from 'react';

import DrawCanvas from './draw-canvas';
import BaseCanvas from './base-canvas';

class MandalaMaker extends Component {
  constructor() {
    super();
    this.state = {
      origin: {
        offsetX: window.innerWidth / 2,
        offsetY: window.innerHeight / 2
      },
      numAxes: 3,
    }
  }

  render() {
    const { numAxes, origin } = this.state;
    return (
      <div className="mandala">
        <BaseCanvas
          numAxes={numAxes}
          origin={origin}
        />
        <DrawCanvas
          numAxes={numAxes}
          origin={origin}
        />
      </div>
    );
  }
}

export default MandalaMaker;