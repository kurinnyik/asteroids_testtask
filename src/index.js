import {calcDistance, addListener, removeListener, listeners} from 'utils';
import playSound from 'sound';
import Player from 'Player';
import Asteroid from 'Asteroid';
import Bullet from 'Bullet';
import ExtraLife from 'ExtraLife';


export default class Game {
  constructor() {
    this.container = document.getElementById('content');
    this.canvas = document.getElementById('canvas');
    this.ctx = this.canvas.getContext('2d');

    this.height = 0;
    this.width = 0;
    this.center = {x: 0, y: 0};
    this.mouse = {x: 0, y: 0};

    this.init();
  }

  init() {
    addListener(window, "resize", x => this.onResize());
    this.onResize();
    this.onScoreScreen = false;
    this.score = 0;
    this.lifeForPoints = [10, 120, 8000, 10000, 15000];
    this.lives = 3;

    this.player = new Player(this.center, {vx: 0, vy: 0}, 1);

    this.asteroidSizes = [2, 3, 4, 7];
    this.asteroids = this.initAsteroids();
    this.bullets = [];
    this.extraLives = [];

    this.player.checkOutOfBoundaries = this.outOfBoundariesWrap(this.player);
    addListener(this.canvas, 'mousemove', (event) => {
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
    while (arr.length < 7) {
      arr.push(this.spawnAsteroid());
    }
    return arr
  }

  spawnAsteroid(size, position, speed) {
    let side = Math.floor(Math.random() * 2);
    const boundariesArray = [[0, 0.2 * this.width, 0, this.height], [0.8 * this.width, this.width, 0, this.height]];
    let boundaries = boundariesArray[side];

    let x, y;
    let asteroidSize = size ? size : this.asteroidSizes[Math.floor(Math.random() * this.asteroidSizes.length)];

    let timesTried = 0;
    while (timesTried < 10) {
      x = position ? position.x + timesTried * 20 : Math.random() * (boundaries[1] - boundaries[0]) + boundaries[0];
      y = position ? position.y + timesTried * 20 : Math.random() * (boundaries[2] - boundaries[3]) + boundaries[2];

      if (calcDistance({x, y}, this.player.position) > asteroidSize * 15) {
        timesTried = timesTried + 10;
      }
      timesTried++;
    }
    let vx = speed ? speed.vx : (Math.random() * 5) - 2.5;
    let vy = speed ? speed.vy : (Math.random() * 5) - 2.5;
    let asteroid = new Asteroid({x: x, y: y}, {vx, vy}, asteroidSize);
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

      let noviceShot = this.outOfBoundariesDestroy(bullet, this.bullets.length - 1);
      let veteranShot = this.outOfBoundariesBounce(bullet);

      bullet.checkOutOfBoundaries = this.score < 4000 ? noviceShot : veteranShot; // small advantage for the player after a good score
      bullet.hit = this.bulletHit(bullet);
    }
  }
  ;

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

      this.bullets.splice(this.bullets.indexOf(bullet), 1);
      if (nearest) { //additional check for simultaneous collisions
        const asteroidIndex = this.asteroids.indexOf(nearest);

        if (nearest.size > asteroidSizes[0]) {
          let newSize = asteroidSizes[asteroidSizes.indexOf(nearest.size) - 1];
          let newSpeed1 = {
            vx: nearest.speed.vx + Math.random() * 2 - 1,
            vy: nearest.speed.vy + Math.random() * 2 - 1
          };
          let newSpeed2 = {
            vx: nearest.speed.vx + Math.random() * 2 - 1,
            vy: nearest.speed.vy + Math.random() * 2 - 1
          };
          this.asteroids.push(this.spawnAsteroid(newSize, nearest.position, newSpeed1));
          this.asteroids.push(this.spawnAsteroid(newSize, nearest.position, newSpeed2));
        } else {
          this.asteroids.push(this.spawnAsteroid());
        }
        this.score += 10 * nearest.size;
        if (this.lifeForPoints[0] < this.score) {
          this.extraLives.push(new ExtraLife({x: Math.random() * this.width, y: Math.random() * this.height}));
          this.lifeForPoints.shift();
        }
        this.asteroids.splice(asteroidIndex, 1);
        playSound(440, 220);
      }
    }
  }

  outOfBoundariesBounce(bullet) {
    return () => {
      const {x, y} = bullet.position;
      if (x > this.width || x < 0) bullet.speed.vx = -bullet.speed.vx;
      if (y > this.height || y < 0) bullet.speed.vy = -bullet.speed.vy;
    }
  }

  outOfBoundariesDestroy(bullet) {
    return () => {
      const {x, y} = bullet.position;

      if (x > this.width || y > this.height || x < 0 || y < 0) {
        const index = this.bullets.indexOf(bullet);
        this.bullets.splice(index, 1)
      }
    }
  }

  crash() {
    return () => {
      if (this.lives === 1) this.gameOver();
      else {
        this.lives--;
        playSound(55, 135);
        // removing all of the asteroids on the spawn
        this.asteroids = this.initAsteroids();
        this.bullets = [];
        this.player.position.x = this.center.x;
        this.player.position.y = this.center.y;

        this.player.speed.vx = 0;
        this.player.speed.vy = 0;
      }
    }
  }

  pickLife(extraLife) {
    return () => {
      this.lives++;
      this.extraLives.splice(this.extraLives.indexOf(extraLife), 1);
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

  update(time) {
    this.ctx.clearRect(0, 0, this.width, this.height);

    this.asteroids.forEach(asteroid => {
      asteroid.update({ctx: this.ctx});
    });
    this.player.update({ctx: this.ctx, mouse: this.mouse});

    if (this.bullets.length > 0) this.bullets.forEach(bullet => {
      bullet.update({ctx: this.ctx});
    });

    if (this.extraLives.length > 0) this.extraLives.forEach(el =>
      el.update({ctx: this.ctx, player: this.player, pickLife: this.pickLife(el)}));


    if (!this.onScoreScreen) {
      this.ctx.font = "24px Helvetica";
      this.ctx.strokeStyle = 'black';

      this.ctx.strokeText(`score: ${this.score}\n lives: ${this.lives}`, 10, 50);
      requestAnimationFrame((time) => this.update(time));
    }
  }

  gameOver() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    playSound(55, 57, 1000);

    this.onScoreScreen = true;
    this.ctx.font = "64px Helvetica";
    this.ctx.strokeStyle = 'green';
    addListener(window, "keypress", (event) => {
      if (event.code === "KeyR") startNewGame();
    });

    this.ctx.strokeText(`GAME OVER`, this.center.x - 128, this.center.y - 64);
    this.ctx.strokeText(`Score: ${this.score}`, this.center.x - 128, this.center.y);
    this.ctx.strokeText(`press R to restart`, this.center.x - 128, this.center.y + 64);
  }
}

function startNewGame() {
  listeners.forEach(listener => removeListener(listener.target, listener.event, listener.handler));
  new Game();
}

startNewGame();