//utils
function calcDistance(point1, point2) {
  return Math.sqrt((point2.x - point1.x) ** 2 + (point2.y - point1.y) ** 2);
}

function getPointRotated(point, origin, direction, rotation) {

  let cos, sin;
  if (!direction && rotation) {
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
  //debugger;
  const collisionPixel = ctx.getImageData(point.x, point.y, 1, 1); //green pixels
  const green = collisionPixel.data[1];
  if (green > 230) cb();
}


//---
class MovingObject {
  constructor(position, speed = {vx: 0, vy: 0}, accelerationDelta = 0) {
    this.position = position;
    this.speed = speed;
    this.accelerationDelta = accelerationDelta;
  }

  update() {
    this.position = {
      x: this.position.x + this.speed.vx,
      y: this.position.y + this.speed.vy
    }
  }
}

class Asteroid extends MovingObject {
  constructor(position, speed, accelerationDelta, size) {
    super(position, speed, accelerationDelta);
    this.size = size;
    this.rotation = {x: 2 * Math.random() - 1, y: 2 * Math.random() - 1}
  }

  draw(ctx) {
    let {x, y} = this.position;
    this.checkOutOfBoundaries();

    ctx.beginPath();
    ctx.strokeStyle = 'green';
    ctx.fillStyle = 'lightgreen';
    let point0 = {x: x - 13 * this.size, y: y - 5 * this.size};
    //point0 = getPointRotated(point0, this.position, null, this.rotation);
    const pointsBeforeRotation = [
      [x - 12 * this.size, y - 12 * this.size],
      [x, y - 13 * this.size],
      [x + 10 * this.size, y - 8 * this.size],
      [x + 13 * this.size, y + 3 * this.size],
      [x + 8 * this.size, y + 7 * this.size],
      [x + 3 * this.size, y + 5 * this.size],
      [x - 8 * this.size, y + 5 * this.size],
      [x - 10 * this.size, y]
    ];
    //debugger;
    ctx.moveTo(point0.x, point0.y);

    pointsBeforeRotation.forEach(point => {
        let newPoint = getPointRotated({x: point[0], y: point[1]}, this.position, null, this.rotation);
//console.log(newPoint);
        ctx.lineTo(point[0], point[1]);
      }
    );

    ctx.closePath();

    ctx.fill();

    ctx.stroke();


  }
}

class Bullet extends MovingObject {
  constructor(position, speed, accelerationDelta) {
    super(position, speed, accelerationDelta);
  }

  draw(ctx) {
    let {x, y} = this.position;

    checkCollision(ctx, this.position, this.hit);
    this.checkOutOfBoundaries();
    ctx.strokeStyle = 'black';
    ctx.beginPath();
    ctx.arc(x, y, 3, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.closePath();
  }
}

class Player extends MovingObject {

  constructor(position, speed, accelerationDelta) {
    super(position, speed, accelerationDelta);
    this.maxSpeed = 5;
    this.lives = 3;
    this.init();
  }

  init() {

    window.addEventListener("click", (_) => {
      this.shoot()
    });

    window.addEventListener("keypress", (event) => {
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

  draw(ctx, mouse) {
    let {x, y} = this.position;
    let point1 = getPointRotated({x: -10, y: -10}, this.position, mouse);
    let point2 = getPointRotated({x: 20, y: 0}, this.position, mouse);
    let point3 = getPointRotated({x: -10, y: 10}, this.position, mouse);
    this.checkOutOfBoundaries();
    [point1, point2, point3].forEach((point) => checkCollision(ctx, point, this.crash))
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


export default class Game {
  constructor() {
    this.container = document.getElementById('content');
    this.canvas = document.getElementById('canvas');
    this.ctx = this.canvas.getContext('2d');

    this.prevUpdateTime = 0;
    this.height = 0;
    this.width = 0;
    this.center = {x: 0, y: 0};
    this.mouse = {x: 0, y: 0};

    this.init();
  }

  init() {
    window.addEventListener("resize", x => this.onResize());
    this.onResize();
    this.onScoreScreen = false;
    this.ctx.font = "24px Arial";

    this.score = 0;

    this.player = new Player(this.center, {vx: 0, vy: 0}, 0.7);
    this.player.checkOutOfBoundaries = this.outOfBoundariesWrap(this.player);
    this.asteroidSizes = [2, 3, 4, 7];
    this.asteroids = this.initAsteroids();

    this.bullets = [];
    this.objects = [this.player, ...this.asteroids];
    this.canvas.addEventListener('mousemove', (event) => {
      this.mouse = {x: event.offsetX, y: event.offsetY};
    });
    this.player.shoot = this.shoot();
    this.player.crash = this.crash();

    requestAnimationFrame((time) => this.update(time));
  }

  onResize() {
    this.width = this.container.clientWidth;
    this.height = this.container.clientHeight;

    this.canvas.width = this.width;
    this.canvas.height = this.height;
    this.center = {x: Math.floor(this.width / 2), y: Math.floor(this.height / 2)};
  }

  initAsteroids() {
    let arr = [];
    let maxTries = 20;
    while (arr.length < 7 && maxTries !== 0) {
      arr.push(this.spawnAsteroid());
      maxTries--;
    }

    return arr
  }

  spawnAsteroid(size, position) {
    let side = Math.floor(Math.random() * 2);
    const boundariesArray = [[0, 0.2 * this.width, 0, this.height], [0.8 * this.width, this.width, 0, this.height]];
    let boundaries = boundariesArray[side];
    let x = position ? position.x : Math.random() * (boundaries[1] - boundaries[0]) + boundaries[0];
    let y = position ? position.y : Math.random() * (boundaries[2] - boundaries[3]) + boundaries[2];
    let vx = (Math.random() * 5) - 2.5;
    let vy = (Math.random() * 5) - 2.5;
    let asteroidSize = size ? size : this.asteroidSizes[Math.floor(Math.random() * this.asteroidSizes.length)];
    let asteroid = new Asteroid({x: x, y: y}, {vx: vx, vy: vy}, null, asteroidSize);
    asteroid.checkOutOfBoundaries = this.outOfBoundariesWrap(asteroid);
    return asteroid;
  }

  shoot() {
    return () => {
      const bulletSpeed = 5;
      const vector = {vx: this.mouse.x - this.player.position.x, vy: this.mouse.y - this.player.position.y};
      const vectorLength = calcDistance(this.mouse, this.player.position);
      const vectorNormalized = {
        vx: bulletSpeed * (vector.vx / vectorLength),
        vy: bulletSpeed * (vector.vy / vectorLength)
      };
      let bullet = new Bullet(this.player.position, vectorNormalized);
      this.bullets.push(bullet);
      bullet.checkOutOfBoundaries = this.outOfBoundariesDestroy(bullet, this.bullets.length - 1);
      bullet.hit = this.bulletHit(bullet);
    }
  };

  crash() {
    return () => {
      if (this.player.lives === 1) this.gameOver();
      else {
        this.player.lives--;
        const spawnPosition = {
          x: Math.floor(Math.random() * this.width),
          y: Math.floor(Math.random() * this.height)
        };
        let checkDistance = 50;
        this.asteroids = this.asteroids.filter(asteroid => {
          const distance = calcDistance(asteroid.position, spawnPosition);
          return checkDistance < distance
        });
        this.player.position.x = spawnPosition.x;
        this.player.position.y = spawnPosition.y;

        this.player.speed.vx = 0;
        this.player.speed.vy = 0;

      }
    }
  }

  gameOver() {
    this.ctx.clearRect(0, 0, canvas.width, canvas.height);
    this.prevUpdateTime = 0;
    this.onScoreScreen = true;
    this.ctx.font = "64px Arial";
    window.addEventListener("keypress", (event) => {
      if (event.code === "KeyR") startNewGame();
    });


    this.ctx.strokeText(`GAME OVER`, this.center.x - 128, this.center.y - 64);
    this.ctx.strokeText(`Score: ${this.score}`, this.center.x - 128, this.center.y);

    this.ctx.strokeText(`press R to restart`, this.center.x - 128, this.center.y + 64);
  }

  bulletHit(bullet) {
    return () => {
      let checkDistance = 150;
      const asteroidSizes = this.asteroidSizes;
      let nearest = null;
      for (let asteroid of this.asteroids) {
        const distance = calcDistance(asteroid.position, bullet.position);
        if (checkDistance > distance) {
          checkDistance = distance;
          nearest = asteroid;
        }
        if (checkDistance < 13) break;
      }
      //;


      this.bullets.splice(this.bullets.indexOf(bullet), 1);
      if (nearest) { //additional check for simultaneous collisions
        const asteroidIndex = this.asteroids.indexOf(nearest);

        if (nearest.size > asteroidSizes[0]) {
          let newSize = asteroidSizes[asteroidSizes.indexOf(nearest.size) - 1];

          this.asteroids.push(this.spawnAsteroid(newSize, nearest.position));
          this.asteroids.push(this.spawnAsteroid(newSize, nearest.position));
        } else {
          this.asteroids.push(this.spawnAsteroid());
        }
        this.score += 10 * nearest.size;
        this.asteroids.splice(asteroidIndex, 1);
      }
    }
  }

  outOfBoundariesWrap(object) {
    return () => {
      if (object.position.x > this.width) object.position.x = 0;
      if (object.position.y > this.height) object.position.y = 0;
      if (object.position.x < 0) object.position.x = this.width;
      if (object.position.y < 0) object.position.y = this.height;
    }
  }

  outOfBoundariesDestroy(object) {
    return () => {
      if (object.position.x > this.width || object.position.y > this.height || object.position.x < 0 || object.position.y < 0) {
        const index = this.bullets.indexOf(object);
        this.bullets.splice(index, 1)
      }
    }
  }

  update(time) {
    const dt = time - this.prevUpdateTime;
    this.prevUpdateTime = time;
    this.ctx.clearRect(0, 0, canvas.width, canvas.height);
    this.objects = [...this.asteroids, ...this.bullets];
    this.objects.push(this.player);
    this.objects.forEach((obj) => {
      obj.update();
      obj.draw(this.ctx, this.mouse);
    });
    if (!this.onScoreScreen) {
      this.ctx.strokeText(`score: ${this.score}\n lives: ${this.player.lives}`, 10, 50);
      requestAnimationFrame((time) => this.update(time));
    }
  }
}

function startNewGame() {
  new Game();
};

startNewGame();