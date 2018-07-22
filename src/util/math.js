// get coordinates for drawing axes, origin normalized to (0, 0)
export const getAxisCoords = (numAxes, radius) => {
  const coords = [];
  let angle = Math.PI / numAxes;
  for (let i = 0; i < numAxes * 2; ++i) {
    let newCoord = {
      offsetX: Math.round(Math.cos(angle * i) * radius),
      offsetY: Math.round(Math.sin(angle * i) * radius)
    }
    coords.push(newCoord);
  }
  return coords;
}

export const determineRegion = (numAxes, x, y) => {
  const inverseTan = Math.atan(y / x);
  const angle = x > 0
    ? y < 0
    ? inverseTan + (Math.PI * 2)
    : inverseTan
    : inverseTan + (Math.PI)
  const regionAngle = Math.PI / numAxes
  console.log(Math.floor(angle / regionAngle));
}

export const rotate = (angle, cX, cY, x, y) => {
  const cos = Math.cos(angle);
  const sin = Math.sin(angle);
  return {
    offsetX: Math.round((cos * (x - cX)) + (sin * (y - cY)) + cX),
    offsetY: Math.round((cos * (y - cY)) - (sin * (x - cX)) + cY),
  }
}

export const getRotatedPoints = (numAxes, cX, cY, x, y) => {
  const coords = [];
  let angle = Math.PI / numAxes;
  for (let i = 0; i < numAxes * 2; ++i) {
    coords.push(rotate(angle * i, cX, cY, x, y));
  }
  return coords;
}