import { checkCollision} from 'utils';

import MovingObject from 'MovingObject';

export default class Bullet extends MovingObject {
  constructor(position, speed) {
    super(position, speed);
  }

  update(options) {
    this.updatePosition();
    let {x, y} = this.position;
    const {ctx} = options;

    checkCollision(ctx, this.position, this.hit);
    this.checkOutOfBoundaries();
    ctx.strokeStyle = 'black';
    ctx.beginPath();
    ctx.arc(x, y, 2, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.closePath();
  }
}