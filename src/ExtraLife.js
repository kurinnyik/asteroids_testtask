import { calcDistance} from 'utils';


export default class ExtraLife {
  constructor(position) {
    this.position = position;
  }

  update(options) {
    let {x, y} = this.position;
    const {ctx, player, pickLife} = options;
    if (calcDistance(this.position, player.position) < 60) pickLife();
    ctx.strokeStyle = 'red';
    ctx.beginPath();
    ctx.arc(x, y, 30, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.closePath();
    ctx.strokeStyle = 'black';
    ctx.beginPath();
    ctx.moveTo(x, y - 15);
    ctx.lineTo(x-10, y + 10);
    ctx.lineTo(x, y);
    ctx.lineTo(x+10, y + 10);
    ctx.closePath();
    ctx.stroke();

  }
}