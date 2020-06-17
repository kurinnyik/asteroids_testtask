export default class MovingObject {
  constructor(position, speed = {vx: 0, vy: 0}) {
    this.position = position;
    this.speed = speed;
  }

  updatePosition() {
    this.position = {
      x: this.position.x + this.speed.vx,
      y: this.position.y + this.speed.vy
    }
  }
}
