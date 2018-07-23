import React, { Component } from 'react';
import { getAxisCoords } from '../util/math';
import { paint } from '../util/canvas';

const axisColor = '#000000';
const arcColor = "#eeeeee";
const numCircles = 10;

class BaseCanvas extends Component {
  componentDidMount() {
    // set canvas context
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
    this.ctx = this.canvas.getContext('2d');
    this.ctx.lineWidth = 2;

    this.radius = Math.min(this.canvas.width, this.canvas.height) / 2 - 25;

    const { circles, axes } = this.props;
    if (axes) {
      this.drawAxes();
    }
    if (circles) {
      this.drawCircles(numCircles);
    }
  }

  drawAxes() {
    const { numAxes, origin } = this.props;

    getAxisCoords(numAxes, this.radius)
      .map(coord => ({
        offsetX: coord.offsetX + origin.offsetX,
        offsetY: coord.offsetY + origin.offsetY
      }))
      .forEach(axisEnd => {
        paint(this.ctx, origin, axisEnd, axisColor);
      });
  }

  drawCircles(numCircles) {
    const { origin } = this.props;

    for (let i = 1; i < numCircles + 1; ++i) {
      this.ctx.beginPath();
      this.ctx.strokeStyle = arcColor;
      this.ctx.arc(
        origin.offsetX,
        origin.offsetY,
        this.radius * i / numCircles,
        0, 
        Math.PI * 2,
        
      );
      this.ctx.stroke();
      this.ctx.closePath();
    }
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