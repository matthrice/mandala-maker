import React, { Component } from 'react';
import { getAxisCoords } from '../util/math';
import { paint } from '../util/canvas';

const axisColor = '#000000';

class BaseCanvas extends Component {
  componentDidMount() {
    // set canvas context
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
    this.ctx = this.canvas.getContext('2d');
    this.ctx.lineWidth = 2;

    // draw base
    this.drawAxes();
  }

  drawAxes() {
    const { width, height } = this.canvas;
    const { numAxes, origin } = this.props;

    // TODO: incorporate into state
    const radius = Math.min(width, height) / 2 - 25;

    getAxisCoords(numAxes, radius)
      .map(coord => ({
        offsetX: coord.offsetX + origin.offsetX,
        offsetY: coord.offsetY + origin.offsetY
      }))
      .forEach(axisEnd => {
        paint(this.ctx, origin, axisEnd, axisColor);
      });
  }

  render() {
    return (
      <canvas
        className="base canvas"
        ref={(ref) => (this.canvas = ref)}
      />
    );
  }
}
export default BaseCanvas;