import React, { Component } from 'react';
import { getRotatedPoints } from '../util/math';
import { paint } from '../util/canvas';

const paintColor =  '#EE92C2';

class DrawCanvas extends Component {
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
    this.ctx.lineJoin = 'round';
    this.ctx.lineCap = 'round';
    this.ctx.lineWidth = 2;
  }

  onMouseDown({ nativeEvent }) {
    const { numAxes, origin } = this.props;

    const { offsetX, offsetY } = nativeEvent;
    this.prevPositions = getRotatedPoints(
      numAxes,
      origin.offsetX,
      origin.offsetY,
      offsetX,
      offsetY
    );
    this.setState({isPainting: true});
  }

  onMouseMove({ nativeEvent }) {
    if (this.state.isPainting) {
      const { numAxes, origin } = this.props;

      const { offsetX, offsetY } = nativeEvent;
      const offsetData = getRotatedPoints(numAxes,
        origin.offsetX,
        origin.offsetY,
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
        className="draw canvas"
        ref={(ref) => (this.canvas = ref)}
        onMouseDown={this.onMouseDown}
        onMouseLeave={this.endPaintEvent}
        onMouseUp={this.endPaintEvent}
        onMouseMove={this.onMouseMove}
        
      />
    );
  }
}
export default DrawCanvas;