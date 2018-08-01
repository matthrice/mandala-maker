import React, { Component } from 'react';
import { getAxisCoords, getRotatedPoints } from '../util/math';
import { paint } from '../util/canvas';

const axisColor = '#000000';
const arcColor = "#eeeeee";
const paintColor =  '#ee92c2';

class BaseCanvas extends Component {
  constructor(props) {
    super(props);
    this.onMouseDown = this.onMouseDown.bind(this);
    this.onMouseMove = this.onMouseMove.bind(this);
    this.endPaintEvent = this.endPaintEvent.bind(this);

    this.state = {
      isPainting: false,
    }
  }

  componentDidMount() {
    // set canvas context
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
    this.ctx = this.canvas.getContext('2d');
    this.ctx.lineWidth = 2;
    this.origin = {
      offsetX: this.canvas.width / 2,
      offsetY: this.canvas.height / 2
    }
    this.radius = Math.min(
      this.origin.offsetX,
      this.origin.offsetY
    ) - 25;

    const { circles, numCircles, axes } = this.props;
    if (axes) {
      this.drawAxes(this.origin);
    }
    if (circles) {
      this.drawCircles(this.origin, numCircles);
    }
  }

  drawAxes(origin) {
    const { numAxes } = this.props;

    getAxisCoords(numAxes, this.radius)
      .map(coord => ({
        offsetX: coord.offsetX + origin.offsetX,
        offsetY: coord.offsetY + origin.offsetY
      }))
      .forEach(axisEnd => {
        paint(this.ctx, origin, axisEnd, axisColor);
      });
  }

  drawCircles(origin, numCircles) {

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

  onMouseDown({ nativeEvent }) {
    const { numAxes } = this.props;

    const { offsetX, offsetY } = nativeEvent;
    this.prevPositions = getRotatedPoints(
      numAxes,
      this.origin.offsetX,
      this.origin.offsetY,
      offsetX,
      offsetY
    );
    this.setState({isPainting: true});
  }

  onMouseMove({ nativeEvent }) {
    if (this.state.isPainting) {
      const { numAxes } = this.props;

      const { offsetX, offsetY } = nativeEvent;
      const offsetData = getRotatedPoints(numAxes,
        this.origin.offsetX,
        this.origin.offsetY,
        offsetX,
        offsetY
      );

      // Set the start and stop position of the paint event.
      for (let i = 0; i < numAxes * 2; ++i) {
        // Add the position to the line array
        paint(this.ctx, this.prevPositions[i], offsetData[i], paintColor);
        this.prevPositions[i] = offsetData[i];
      }
    }
  }

  endPaintEvent() {
    if (this.state.isPainting) {
      this.setState({ isPainting: false });
    }
  }

  render() {
    return (
      <canvas
        className="base canvas"
        ref={(ref) => (this.canvas = ref)}
        onMouseDown={this.onMouseDown}
        onMouseLeave={this.endPaintEvent}
        onMouseUp={this.endPaintEvent}
        onMouseMove={this.onMouseMove}
      />
    );
  }
}
export default BaseCanvas;