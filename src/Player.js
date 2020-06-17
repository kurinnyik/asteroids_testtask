import {getPointRotated, checkCollision, addListener} from 'utils';
import MovingObject from 'MovingObject';

export default class Player extends MovingObject {

  constructor(position, speed, accelerationDelta) {
    super(position, speed, accelerationDelta);
    this.maxSpeed = 5;
    this.accelerationDelta = accelerationDelta;
    this.init();
  }

  init() {
    addListener(window, "click", () => {
      this.shoot()
    });

    addListener(window, "keypress", (event) => {
      switch (event.code) {
        case 'KeyW':
          if (this.speed.vy < 0) this.speed.vy -= this.accelerationDelta;
          else this.speed.vy = -2 - this.accelerationDelta;
          break;
        case 'KeyS':
          if (this.speed.vy > 0) this.speed.vy += this.accelerationDelta;
          else this.speed.vy = 2 + this.accelerationDelta;

          break;
        case 'KeyA':
          if (this.speed.vx < 0) this.speed.vx -= this.accelerationDelta;
          else this.speed.vx = -2 - this.accelerationDelta;

          break;
        case 'KeyD':
          if (this.speed.vx > 0) this.speed.vx += this.accelerationDelta;
          else this.speed.vx = 2 + this.accelerationDelta;
          break;
        default:
          break;
      }
      if (Math.abs(this.speed.vx) > this.maxSpeed) this.speed.vx = Math.sign(this.speed.vx) * this.maxSpeed;
      if (Math.abs(this.speed.vy) > this.maxSpeed) this.speed.vy = Math.sign(this.speed.vy) * this.maxSpeed;
    });
  }

  update(options) {
    const {ctx, mouse} = options;
    this.updatePosition();
    let {x, y} = this.position;
    this.checkOutOfBoundaries();

    let point1 = getPointRotated({x: -10, y: -10}, this.position, null, mouse);
    let point2 = getPointRotated({x: 20, y: 0}, this.position, null, mouse);
    let point3 = getPointRotated({x: -10, y: 10}, this.position, null, mouse);

    [point1, point2, point3].forEach((point) => checkCollision(ctx, point, this.crash));

    ctx.beginPath();
    ctx.strokeStyle = 'black';
    ctx.moveTo(point1.x, point1.y);
    ctx.lineTo(point2.x, point2.y);
    ctx.lineTo(point3.x, point3.y);
    ctx.lineTo(x, y);
    ctx.closePath();
    ctx.stroke();


  }
}