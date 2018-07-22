import React, { Component } from 'react';
import { getAxisCoords } from '../util/math';
import { paint } from '../util/canvas';

const axisColor = '#000000';
const arcColor = "#eeeeee";

class BaseCanvas extends Component {
  componentDidMount() {
    // set canvas context
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
    this.ctx = this.canvas.getContext('2d');
    this.ctx.lineWidth = 2;

    this.radius = Math.min(this.canvas.width, this.canvas.height) / 2 - 25;


    // draw base
    this.drawCircles();
    this.drawAxes();
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

  drawCircles() {
    const { origin } = this.props;

    for (let i = 0; i < 10; ++i) {
      this.ctx.beginPath();
      this.ctx.strokeStyle = arcColor;
      this.ctx.arc(
        origin.offsetX,
        origin.offsetY,
        this.radius * i / 10,
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