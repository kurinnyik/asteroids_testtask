function calcDistance(point1, point2) {
  return Math.sqrt((point2.x - point1.x) ** 2 + (point2.y - point1.y) ** 2);
}

function getPointRotated(point, origin, rotation, direction = null) { // direction used to calculate rotation to a specific point

  let cos, sin;
  if (!direction) {
    cos = rotation.x;
    sin = rotation.y;
  } else {
    const vectorShifted = {x: direction.x - origin.x, y: direction.y - origin.y};
    const vectorLength = calcDistance(origin, direction);
    const normVector = {
      x: vectorShifted.x / vectorLength,
      y: vectorShifted.y / vectorLength
    };
    cos = normVector.x;
    sin = normVector.y;
  }
  return {
    x: origin.x + point.x * cos - point.y * sin,
    y: origin.y + point.x * sin + point.y * cos
  };
}


function checkCollision(ctx, point, cb) {
  const collisionPixel = ctx.getImageData(point.x, point.y, 1, 1); //green pixels check is enough for detecting asteroid hit
  const green = collisionPixel.data[1];
  if (green > 230) cb();
}

//-- Listeners handling
const listeners = [];

function addListener(target, event, handler) {
  target.addEventListener(event, handler);
  listeners.push({target, event, handler});
}

function removeListener(target, event, handler) {
  target.removeEventListener(event, handler);
}

export {calcDistance, checkCollision, getPointRotated, addListener, removeListener, listeners};
