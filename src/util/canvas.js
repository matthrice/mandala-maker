import { withinBoundary } from './math';

export const paint = (ctx, prevPos, currPos, strokeStyle) => {
  const { offsetX, offsetY } = currPos;
  const { offsetX: x, offsetY: y } = prevPos;

  ctx.beginPath();
  ctx.strokeStyle = strokeStyle;
  // Move the the prevPosition of the mouse
  ctx.moveTo(x, y);
  // Draw a line to the current position of the mouse
  ctx.lineTo(offsetX, offsetY);
  // Visualize the line using the strokeStyle
  ctx.stroke();
  ctx.closePath();
}

export const paintConstrain = (ctx, prevPos, currPos, strokeStyle, origin, radius) => {
  if (!withinBoundary(currPos, origin, radius)) {
    return;
  }
  paint(ctx, prevPos, currPos, strokeStyle);
}