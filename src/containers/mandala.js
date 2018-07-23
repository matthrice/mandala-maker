import React, { Component } from 'react';

import { DrawCanvas, BaseCanvas } from '../components';

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
          circles={false}
          axes={false}
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