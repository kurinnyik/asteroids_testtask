(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
    }
  }return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
  };
}();

function _toConsumableArray(arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) {
      arr2[i] = arr[i];
    }return arr2;
  } else {
    return Array.from(arr);
  }
}

function _possibleConstructorReturn(self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }return call && (typeof call === "object" || typeof call === "function") ? call : self;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

var MovingObject = function () {
  function MovingObject(position) {
    var speed = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : { vx: 0, vy: 0 };
    var accelerationDelta = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;

    _classCallCheck(this, MovingObject);

    this.position = position;
    this.speed = speed;
    this.accelerationDelta = accelerationDelta;
  }

  _createClass(MovingObject, [{
    key: 'update',
    value: function update() {
      this.position = {
        x: this.position.x + this.speed.vx,
        y: this.position.y + this.speed.vy
      };
    }
  }]);

  return MovingObject;
}();

var Asteroid = function (_MovingObject) {
  _inherits(Asteroid, _MovingObject);

  function Asteroid(position, speed, accelerationDelta, size) {
    _classCallCheck(this, Asteroid);

    var _this = _possibleConstructorReturn(this, (Asteroid.__proto__ || Object.getPrototypeOf(Asteroid)).call(this, position, speed, accelerationDelta));

    _this.size = size;
    return _this;
  }

  _createClass(Asteroid, [{
    key: 'draw',
    value: function draw(ctx) {
      var _position = this.position,
          x = _position.x,
          y = _position.y;

      this.checkOutOfBoundaries();
      ctx.moveTo(x - 30 * this.size, y - 20 * this.size);
      ctx.lineTo(x - 10 * this.size, y - 25 * this.size);
      ctx.lineTo(x - 15 * this.size, y - 17 * this.size);
      ctx.lineTo(x - 10 * this.size, y - 10 * this.size);
      ctx.lineTo(x, y - 5 * this.size);
      ctx.lineTo(x + 5 * this.size, y);
      ctx.lineTo(x, y + 13 * this.size);
      ctx.lineTo(x - 5 * this.size, y + 15 * this.size);
      ctx.lineTo(x - 20 * this.size, y + 13 * this.size);
      ctx.lineTo(x - 35 * this.size, y - 5 * this.size);
      ctx.closePath();
      ctx.stroke();
    }
  }]);

  return Asteroid;
}(MovingObject);

var Bullet = function (_MovingObject2) {
  _inherits(Bullet, _MovingObject2);

  function Bullet(position, speed, accelerationDelta) {
    _classCallCheck(this, Bullet);

    return _possibleConstructorReturn(this, (Bullet.__proto__ || Object.getPrototypeOf(Bullet)).call(this, position, speed, accelerationDelta));
  }

  _createClass(Bullet, [{
    key: 'draw',
    value: function draw(ctx) {
      var _position2 = this.position,
          x = _position2.x,
          y = _position2.y;

      this.checkOutOfBoundaries();
      ctx.beginPath();
      ctx.arc(x, y, 3, 0, 2 * Math.PI);
      ctx.stroke();
    }
  }]);

  return Bullet;
}(MovingObject);

var Player = function (_MovingObject3) {
  _inherits(Player, _MovingObject3);

  function Player(position, speed, accelerationDelta) {
    _classCallCheck(this, Player);

    var _this3 = _possibleConstructorReturn(this, (Player.__proto__ || Object.getPrototypeOf(Player)).call(this, position, speed, accelerationDelta));

    _this3.maxSpeed = 5;
    _this3.shoot = function () {};
    _this3.init();
    return _this3;
  }

  _createClass(Player, [{
    key: 'init',
    value: function init() {
      var _this4 = this;

      window.addEventListener("keypress", function (event) {
        switch (event.code) {
          case 'KeyW':
            if (_this4.speed.vy < 0) _this4.speed.vy -= _this4.accelerationDelta;else _this4.speed.vy = -0.5 - _this4.accelerationDelta;
            break;
          case 'KeyS':
            if (_this4.speed.vy > 0) _this4.speed.vy += _this4.accelerationDelta;else _this4.speed.vy = 0.5 + _this4.accelerationDelta;

            break;
          case 'KeyA':
            if (_this4.speed.vx < 0) _this4.speed.vx -= _this4.accelerationDelta;else _this4.speed.vx = -0.5 - _this4.accelerationDelta;

            break;
          case 'KeyD':
            if (_this4.speed.vx > 0) _this4.speed.vx += _this4.accelerationDelta;else _this4.speed.vx = 0.5 + _this4.accelerationDelta;
            break;
          case 'Space':
            _this4.shoot();
            break;
          default:
            break;
        }
        if (Math.abs(_this4.speed.vx) > _this4.maxSpeed) _this4.speed.vx = Math.sign(_this4.speed.vx) * _this4.maxSpeed;
        if (Math.abs(_this4.speed.vy) > _this4.maxSpeed) _this4.speed.vy = Math.sign(_this4.speed.vy) * _this4.maxSpeed;
      });
    }
  }, {
    key: 'draw',
    value: function draw(ctx) {
      var _position3 = this.position,
          x = _position3.x,
          y = _position3.y;

      this.checkOutOfBoundaries();
      ctx.beginPath();
      ctx.moveTo(x - 10, y - 10);
      ctx.lineTo(x + 20, y);
      ctx.lineTo(x - 10, y + 10);
      ctx.lineTo(x, y);
      ctx.closePath();
      ctx.stroke();
    }
  }]);

  return Player;
}(MovingObject);

var Game = function () {
  function Game() {
    _classCallCheck(this, Game);

    this.container = document.getElementById('content');
    this.canvas = document.getElementById('canvas');
    this.ctx = this.canvas.getContext('2d');

    this.prevUpdateTime = 0;
    this.height = 0;
    this.width = 0;
    this.center = { x: 0, y: 0 };
    this.mouse = { x: 0, y: 0 };
    this.score = 0;

    this.init();
  }

  _createClass(Game, [{
    key: 'init',
    value: function init() {
      var _this5 = this;

      window.addEventListener("resize", function (x) {
        return _this5.onResize();
      });
      this.onResize();
      this.player = new Player(this.center, { vx: 0, vy: 0 }, 0.7);
      this.player.checkOutOfBoundaries = this.outOfBoundariesWrap(this.player);
      var asteroids = this.initAsteroids();
      this.objects = [this.player].concat(_toConsumableArray(asteroids));
      this.canvas.addEventListener('mousemove', function (event) {
        _this5.mouse = { x: event.offsetX, y: event.offsetY };
      });
      this.player.shoot = function () {
        _this5.shoot();
      };
      requestAnimationFrame(function (time) {
        return _this5.update(time);
      });
    }
  }, {
    key: 'onResize',
    value: function onResize() {
      this.width = this.container.clientWidth;
      this.height = this.container.clientHeight;

      this.canvas.width = this.width;
      this.canvas.height = this.height;
      this.center = { x: Math.floor(this.width / 2), y: Math.floor(this.height / 2) };
    }
  }, {
    key: 'initAsteroids',
    value: function initAsteroids() {
      var arr = [];
      var maxTries = 20;
      while (arr.length < 7 && maxTries !== 0) {
        arr.push(this.spawnAsteroid());
        maxTries--;
      }

      return arr;
    }
  }, {
    key: 'spawnAsteroid',
    value: function spawnAsteroid() {
      var side = Math.floor(Math.random() * 2);
      var boundariesArray = [[0, 0.2 * this.width, 0, this.height], [0.8 * this.width, this.width, 0, this.height]];
      var boundaries = boundariesArray[side];
      var x = Math.random() * (boundaries[1] - boundaries[0]) + boundaries[0];
      var y = Math.random() * (boundaries[2] - boundaries[3]) + boundaries[2];
      var vx = Math.random() * 5 - 2.5;
      var vy = Math.random() * 5 - 2.5;
      var asteroidSizes = [1, 1.5, 2];
      var size = asteroidSizes[Math.floor(Math.random() * 3)];
      var asteroid = new Asteroid({ x: x, y: y }, { vx: vx, vy: vy }, null, size);
      asteroid.checkOutOfBoundaries = this.outOfBoundariesWrap(asteroid);
      return asteroid;
    }
  }, {
    key: 'shoot',
    value: function shoot() {
      var bulletSpeed = 5;
      var vector = { vx: this.mouse.x - this.player.position.x, vy: this.mouse.y - this.player.position.y };
      var vectorLength = Math.sqrt(vector.vx ** 2 + vector.vy ** 2);
      var vectorNormalized = { vx: bulletSpeed * (vector.vx / vectorLength), vy: bulletSpeed * (vector.vy / vectorLength) };
      var bullet = new Bullet(this.player.position, vectorNormalized);
      this.objects.push(bullet);
      bullet.checkOutOfBoundaries = this.outOfBoundariesDestroy(bullet, this.objects.length - 1);
    }
  }, {
    key: 'outOfBoundariesWrap',
    value: function outOfBoundariesWrap(object) {
      var _this6 = this;

      return function () {
        if (object.position.x > _this6.width) object.position.x = 0;
        if (object.position.y > _this6.height) object.position.y = 0;
        if (object.position.x < 0) object.position.x = _this6.width;
        if (object.position.y < 0) object.position.y = _this6.height;
      };
    }
  }, {
    key: 'outOfBoundariesDestroy',
    value: function outOfBoundariesDestroy(object) {
      var _this7 = this;

      return function () {
        if (object.position.x > _this7.width || object.position.y > _this7.height || object.position.x < 0 || object.position.y < 0) {
          var index = _this7.objects.indexOf(object);
          _this7.objects.splice(index, 1);
        }
      };
    }
  }, {
    key: 'update',
    value: function update(time) {
      var _this8 = this;

      var dt = time - this.prevUpdateTime;
      this.prevUpdateTime = time;
      this.ctx.clearRect(0, 0, canvas.width, canvas.height);
      this.objects.forEach(function (obj) {
        obj.update();
        obj.draw(_this8.ctx);
      });
      requestAnimationFrame(function (time) {
        return _this8.update(time);
      });
    }
  }]);

  return Game;
}();

exports.default = Game;

new Game();

},{}]},{},[1])
//# sourceMappingURL=game.js.map
