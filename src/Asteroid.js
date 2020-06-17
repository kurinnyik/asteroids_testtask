import {getPointRotated} from 'utils';

import MovingObject from 'MovingObject';

export default class Asteroid extends MovingObject {
  constructor(position, speed, size) {
    super(position, speed);
    this.size = size;
    let rotX = 2 * Math.random() - 1;
    let rotY = Math.random() < 0.5 ? Math.sqrt(1 - rotX ** 2) : -Math.sqrt(1 - rotX ** 2);
    this.rotation = {x: rotX, y: rotY};

    this.pointsBeforeRotation = [
      [-12 * this.size, -12 * this.size],
      [2*this.size, -13*Math.random() * this.size],
      [(Math.random() * 2 + 8) * this.size, -8 * this.size],
      [13 * this.size, 3 * this.size],
      [(Math.random() * 2 + 6) * this.size, (Math.random() * 2 + 5) * this.size],
      [3 * this.size, (Math.random() * 2 + 3) * this.size],
      [-8 * this.size, 5 * this.size],
      [(Math.random() * 2 - 12) * this.size,]
    ];
  }

  update(options) {
    const {ctx} = options;
    this.updatePosition();
    this.checkOutOfBoundaries();

    ctx.beginPath();
    ctx.strokeStyle = 'green';
    ctx.fillStyle = 'lightgreen';

    let point0 = {x: -13 * this.size, y: -5 * this.size};
    point0 = getPointRotated(point0, this.position, this.rotation);
    ctx.moveTo(point0.x, point0.y);

    this.pointsBeforeRotation.forEach(point => {
        let newPoint = getPointRotated({x: point[0], y: point[1]}, this.position, this.rotation);
        ctx.lineTo(newPoint.x, newPoint.y);
      }
    );

    ctx.closePath();
    ctx.fill();
    ctx.stroke();
  }
}