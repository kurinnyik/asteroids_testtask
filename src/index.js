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
  }

  draw(ctx) {
    let {x, y} = this.position;
    this.checkOutOfBoundaries();
    ctx.beginPath();
    ctx.strokeStyle = 'green';
    ctx.fillStyle = 'lightgreen';

    ctx.moveTo(x - 13 * this.size, y - 5 * this.size);
    ctx.lineTo(x - 12 * this.size, y - 12 * this.size);
    ctx.lineTo(x, y - 13 * this.size);
    ctx.lineTo(x + 10 * this.size, y - 8 * this.size);
    ctx.lineTo(x + 13 * this.size, y + 3 * this.size);
    ctx.lineTo(x + 12 * this.size, y + 8 * this.size);
    ctx.lineTo(x - 8 * this.size, y + 5 * this.size);
    ctx.lineTo(x - 10 * this.size, y);

    //ctx.lineTo(x - 12 * this.size, y - 12 * this.size);

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

    const collisionCheck = ctx.getImageData(x, y, 1, 1).data[1]; //green pixels
    if (collisionCheck > 230) {
      this.hit()
    };

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
    this.maxSpeed = 8;
    this.shoot = () => {
    };
    this.init();
  }

  init() {
    window.addEventListener("keypress", (event) => {
      switch (event.code) {
        case 'KeyW':
          if (this.speed.vy < 0) this.speed.vy -= this.accelerationDelta;
          else this.speed.vy = -0.5 - this.accelerationDelta;
          break;
        case 'KeyS':
          if (this.speed.vy > 0) this.speed.vy += this.accelerationDelta;
          else this.speed.vy = 0.5 + this.accelerationDelta;

          break;
        case 'KeyA':
          if (this.speed.vx < 0) this.speed.vx -= this.accelerationDelta;
          else this.speed.vx = -0.5 - this.accelerationDelta;

          break;
        case 'KeyD':
          if (this.speed.vx > 0) this.speed.vx += this.accelerationDelta;
          else this.speed.vx = 0.5 + this.accelerationDelta;
          break;
        case 'Space':
          this.shoot();
          break;
        default:
          break;
      }
      if (Math.abs(this.speed.vx) > this.maxSpeed) this.speed.vx = Math.sign(this.speed.vx) * this.maxSpeed;
      if (Math.abs(this.speed.vy) > this.maxSpeed) this.speed.vy = Math.sign(this.speed.vy) * this.maxSpeed;
    });

  }

  draw(ctx) {
    let {x, y} = this.position;
    this.checkOutOfBoundaries();
    ctx.beginPath();
    ctx.strokeStyle = 'black';
    ctx.moveTo(x - 10, y - 10);
    ctx.lineTo(x + 20, y);
    ctx.lineTo(x - 10, y + 10);
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
    this.score = 0;

    this.player = new Player(this.center, {vx: 0, vy: 0}, 0.7);
    this.player.checkOutOfBoundaries = this.outOfBoundariesWrap(this.player);
    this.asteroidSizes = [1, 3, 4];
    this.asteroids = this.initAsteroids();

    this.bullets = [];
    this.objects = [this.player, ...this.asteroids];
    this.canvas.addEventListener('mousemove', (event) => {
      this.mouse = {x: event.offsetX, y: event.offsetY};
    });
    this.player.shoot = () => {
      this.shoot()
    };
    requestAnimationFrame((time) => this.update(time));
  }

  onResize() {
    this.width = this.container.clientWidth;
    this.height = this.container.clientHeight;

    this.canvas.width = this.width;
    this.canvas.height = this.height;
    this.center = {x: Math.floor(this.width / 2), y: Math.floor(this.height / 2)};
  }

  calcDistance(obj1, obj2) {
    return Math.sqrt((obj2.x - obj1.x) ** 2 + (obj2.y - obj1.y) ** 2);
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
    let asteroidSize = size ? size : this.asteroidSizes[Math.floor(Math.random() * 3)];
    let asteroid = new Asteroid({x: x, y: y}, {vx: vx, vy: vy}, null, asteroidSize);
    asteroid.checkOutOfBoundaries = this.outOfBoundariesWrap(asteroid);
    return asteroid;
  }

  shoot() {
    const bulletSpeed = 5;
    const vector = {vx: this.mouse.x - this.player.position.x, vy: this.mouse.y - this.player.position.y};
    const vectorLength = this.calcDistance(this.mouse, this.player.position);
    const vectorNormalized = {
      vx: bulletSpeed * (vector.vx / vectorLength),
      vy: bulletSpeed * (vector.vy / vectorLength)
    };
    let bullet = new Bullet(this.player.position, vectorNormalized);
    this.bullets.push(bullet);
    bullet.checkOutOfBoundaries = this.outOfBoundariesDestroy(bullet, this.bullets.length - 1);
    bullet.hit = this.bulletHit(bullet);
  };

  bulletHit(bullet) {
    return () => {
      let checkDistance = 100;
      const asteroidSizes = Array.from(this.asteroidSizes);
      let nearest = null;
      for (let asteroid of this.asteroids) {
        const distance = this.calcDistance(asteroid.position, bullet.position);
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
      obj.draw(this.ctx);
    });
    requestAnimationFrame((time) => this.update(time));
  }
}

new Game();