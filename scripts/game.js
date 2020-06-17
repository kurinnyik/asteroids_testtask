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

var _utils = require('utils');

var _MovingObject2 = require('MovingObject');

var _MovingObject3 = _interopRequireDefault(_MovingObject2);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
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

var Asteroid = function (_MovingObject) {
  _inherits(Asteroid, _MovingObject);

  function Asteroid(position, speed, size) {
    _classCallCheck(this, Asteroid);

    var _this = _possibleConstructorReturn(this, (Asteroid.__proto__ || Object.getPrototypeOf(Asteroid)).call(this, position, speed));

    _this.size = size;
    var rotX = 2 * Math.random() - 1;
    var rotY = Math.random() < 0.5 ? Math.sqrt(1 - rotX ** 2) : -Math.sqrt(1 - rotX ** 2);
    _this.rotation = { x: rotX, y: rotY };

    // randomized points for a variations of asteroids form
    _this.pointsBeforeRotation = [[-12 * _this.size, -12 * _this.size], [2 * _this.size, -13 * Math.random() * _this.size], [(Math.random() * 2 + 8) * _this.size, -8 * _this.size], [13 * _this.size, 3 * _this.size], [(Math.random() * 2 + 6) * _this.size, (Math.random() * 2 + 5) * _this.size], [3 * _this.size, (Math.random() * 2 + 3) * _this.size], [-8 * _this.size, 5 * _this.size], [(Math.random() * 2 - 12) * _this.size]];
    return _this;
  }

  _createClass(Asteroid, [{
    key: 'update',
    value: function update(options) {
      var _this2 = this;

      var ctx = options.ctx;

      this.updatePosition();
      this.checkOutOfBoundaries();

      ctx.beginPath();
      ctx.strokeStyle = 'green';
      ctx.fillStyle = 'lightgreen';

      var point0 = { x: -13 * this.size, y: -5 * this.size };
      point0 = (0, _utils.getPointRotated)(point0, this.position, this.rotation);
      ctx.moveTo(point0.x, point0.y);

      this.pointsBeforeRotation.forEach(function (point) {
        var newPoint = (0, _utils.getPointRotated)({ x: point[0], y: point[1] }, _this2.position, _this2.rotation);
        ctx.lineTo(newPoint.x, newPoint.y);
      });

      ctx.closePath();
      ctx.fill();
      ctx.stroke();
    }
  }]);

  return Asteroid;
}(_MovingObject3.default);

exports.default = Asteroid;

},{"MovingObject":3,"utils":7}],2:[function(require,module,exports){
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

var _utils = require('utils');

var _MovingObject2 = require('MovingObject');

var _MovingObject3 = _interopRequireDefault(_MovingObject2);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
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

var Bullet = function (_MovingObject) {
  _inherits(Bullet, _MovingObject);

  function Bullet(position, speed) {
    _classCallCheck(this, Bullet);

    return _possibleConstructorReturn(this, (Bullet.__proto__ || Object.getPrototypeOf(Bullet)).call(this, position, speed));
  }

  _createClass(Bullet, [{
    key: 'update',
    value: function update(options) {
      this.updatePosition();
      var _position = this.position,
          x = _position.x,
          y = _position.y;
      var ctx = options.ctx;

      (0, _utils.checkCollision)(ctx, this.position, this.hit);
      this.checkOutOfBoundaries();
      ctx.strokeStyle = 'black';
      ctx.beginPath();
      ctx.arc(x, y, 2, 0, 2 * Math.PI);
      ctx.stroke();
      ctx.closePath();
    }
  }]);

  return Bullet;
}(_MovingObject3.default);

exports.default = Bullet;

},{"MovingObject":3,"utils":7}],3:[function(require,module,exports){
"use strict";

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

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

var MovingObject = function () {
  function MovingObject(position) {
    var speed = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : { vx: 0, vy: 0 };

    _classCallCheck(this, MovingObject);

    this.position = position;
    this.speed = speed;
  }

  _createClass(MovingObject, [{
    key: "updatePosition",
    value: function updatePosition() {
      this.position = {
        x: this.position.x + this.speed.vx,
        y: this.position.y + this.speed.vy
      };
    }
  }]);

  return MovingObject;
}();

exports.default = MovingObject;

},{}],4:[function(require,module,exports){
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

var _utils = require('utils');

var _MovingObject2 = require('MovingObject');

var _MovingObject3 = _interopRequireDefault(_MovingObject2);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
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

var Player = function (_MovingObject) {
  _inherits(Player, _MovingObject);

  function Player(position, speed, accelerationDelta) {
    _classCallCheck(this, Player);

    var _this = _possibleConstructorReturn(this, (Player.__proto__ || Object.getPrototypeOf(Player)).call(this, position, speed, accelerationDelta));

    _this.maxSpeed = 5;
    _this.accelerationDelta = accelerationDelta;
    _this.init();
    return _this;
  }

  _createClass(Player, [{
    key: 'init',
    value: function init() {
      var _this2 = this;

      (0, _utils.addListener)(window, "click", function () {
        _this2.shoot();
      });

      (0, _utils.addListener)(window, "keypress", function (event) {
        switch (event.code) {
          case 'KeyW':
            if (_this2.speed.vy < 0) _this2.speed.vy -= _this2.accelerationDelta;else _this2.speed.vy = -2 - _this2.accelerationDelta;
            break;
          case 'KeyS':
            if (_this2.speed.vy > 0) _this2.speed.vy += _this2.accelerationDelta;else _this2.speed.vy = 2 + _this2.accelerationDelta;

            break;
          case 'KeyA':
            if (_this2.speed.vx < 0) _this2.speed.vx -= _this2.accelerationDelta;else _this2.speed.vx = -2 - _this2.accelerationDelta;

            break;
          case 'KeyD':
            if (_this2.speed.vx > 0) _this2.speed.vx += _this2.accelerationDelta;else _this2.speed.vx = 2 + _this2.accelerationDelta;
            break;
          default:
            break;
        }
        if (Math.abs(_this2.speed.vx) > _this2.maxSpeed) _this2.speed.vx = Math.sign(_this2.speed.vx) * _this2.maxSpeed;
        if (Math.abs(_this2.speed.vy) > _this2.maxSpeed) _this2.speed.vy = Math.sign(_this2.speed.vy) * _this2.maxSpeed;
      });
    }
  }, {
    key: 'update',
    value: function update(options) {
      var _this3 = this;

      var ctx = options.ctx,
          mouse = options.mouse;

      this.updatePosition();
      var _position = this.position,
          x = _position.x,
          y = _position.y;

      this.checkOutOfBoundaries();

      var point1 = (0, _utils.getPointRotated)({ x: -10, y: -10 }, this.position, null, mouse);
      var point2 = (0, _utils.getPointRotated)({ x: 20, y: 0 }, this.position, null, mouse);
      var point3 = (0, _utils.getPointRotated)({ x: -10, y: 10 }, this.position, null, mouse);

      [point1, point2, point3].forEach(function (point) {
        return (0, _utils.checkCollision)(ctx, point, _this3.crash);
      });

      ctx.beginPath();
      ctx.strokeStyle = 'black';
      ctx.moveTo(point1.x, point1.y);
      ctx.lineTo(point2.x, point2.y);
      ctx.lineTo(point3.x, point3.y);
      ctx.lineTo(x, y);
      ctx.closePath();
      ctx.stroke();
    }
  }]);

  return Player;
}(_MovingObject3.default);

exports.default = Player;

},{"MovingObject":3,"utils":7}],5:[function(require,module,exports){
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

var _utils = require('utils');

var _sound = require('sound');

var _sound2 = _interopRequireDefault(_sound);

var _Player = require('Player');

var _Player2 = _interopRequireDefault(_Player);

var _Asteroid = require('Asteroid');

var _Asteroid2 = _interopRequireDefault(_Asteroid);

var _Bullet = require('Bullet');

var _Bullet2 = _interopRequireDefault(_Bullet);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

var Game = function () {
  function Game() {
    _classCallCheck(this, Game);

    this.container = document.getElementById('content');
    this.canvas = document.getElementById('canvas');
    this.ctx = this.canvas.getContext('2d');

    this.height = 0;
    this.width = 0;
    this.center = { x: 0, y: 0 };
    this.mouse = { x: 0, y: 0 };

    this.init();
  }

  _createClass(Game, [{
    key: 'init',
    value: function init() {
      var _this = this;

      (0, _utils.addListener)(window, "resize", function (x) {
        return _this.onResize();
      });
      this.onResize();
      this.onScoreScreen = false;
      this.score = 0;
      this.lives = 3;

      this.player = new _Player2.default(this.center, { vx: 0, vy: 0 }, 1);

      this.asteroidSizes = [2, 3, 4, 7];
      this.asteroids = this.initAsteroids();

      this.bullets = [];

      this.player.checkOutOfBoundaries = this.outOfBoundariesWrap(this.player);
      (0, _utils.addListener)(this.canvas, 'mousemove', function (event) {
        _this.mouse = { x: event.offsetX, y: event.offsetY };
      });
      this.player.shoot = this.shoot();
      this.player.crash = this.crash();

      requestAnimationFrame(function (time) {
        return _this.update(time);
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
      while (arr.length < 7) {
        arr.push(this.spawnAsteroid());
      }
      return arr;
    }
  }, {
    key: 'spawnAsteroid',
    value: function spawnAsteroid(size, position, speed) {
      var side = Math.floor(Math.random() * 2);
      var boundariesArray = [[0, 0.2 * this.width, 0, this.height], [0.8 * this.width, this.width, 0, this.height]];
      var boundaries = boundariesArray[side];

      var x = void 0,
          y = void 0;
      var asteroidSize = size ? size : this.asteroidSizes[Math.floor(Math.random() * this.asteroidSizes.length)];

      var timesTried = 0;
      while (timesTried < 10) {
        x = position ? position.x + timesTried * 20 : Math.random() * (boundaries[1] - boundaries[0]) + boundaries[0];
        y = position ? position.y + timesTried * 20 : Math.random() * (boundaries[2] - boundaries[3]) + boundaries[2];

        if ((0, _utils.calcDistance)({ x: x, y: y }, this.player.position) > asteroidSize * 15) {
          timesTried = timesTried + 10;
        }
        timesTried++;
      }
      var vx = speed ? speed.vx : Math.random() * 5 - 2.5;
      var vy = speed ? speed.vy : Math.random() * 5 - 2.5;
      var asteroid = new _Asteroid2.default({ x: x, y: y }, { vx: vx, vy: vy }, asteroidSize);
      asteroid.checkOutOfBoundaries = this.outOfBoundariesWrap(asteroid);
      return asteroid;
    }
  }, {
    key: 'shoot',
    value: function shoot() {
      var _this2 = this;

      return function () {
        var bulletSpeed = 5;
        var vector = { vx: _this2.mouse.x - _this2.player.position.x, vy: _this2.mouse.y - _this2.player.position.y };
        var vectorLength = (0, _utils.calcDistance)(_this2.mouse, _this2.player.position);
        var vectorNormalized = {
          vx: bulletSpeed * (vector.vx / vectorLength),
          vy: bulletSpeed * (vector.vy / vectorLength)
        };
        var bullet = new _Bullet2.default(_this2.player.position, vectorNormalized);
        _this2.bullets.push(bullet);

        var noviceShot = _this2.outOfBoundariesDestroy(bullet, _this2.bullets.length - 1);
        var veteranShot = _this2.outOfBoundariesBounce(bullet);

        bullet.checkOutOfBoundaries = _this2.score < 4000 ? noviceShot : veteranShot; // small advantage for the player after a good score
        bullet.hit = _this2.bulletHit(bullet);
      };
    }
  }, {
    key: 'bulletHit',
    value: function bulletHit(bullet) {
      var _this3 = this;

      return function () {
        var checkDistance = 150;
        var asteroidSizes = _this3.asteroidSizes;
        var nearest = null;
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
          for (var _iterator = _this3.asteroids[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var asteroid = _step.value;

            var distance = (0, _utils.calcDistance)(asteroid.position, bullet.position);
            if (checkDistance > distance) {
              checkDistance = distance;
              nearest = asteroid;
            }
            if (checkDistance < 13) break;
          }
        } catch (err) {
          _didIteratorError = true;
          _iteratorError = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion && _iterator.return) {
              _iterator.return();
            }
          } finally {
            if (_didIteratorError) {
              throw _iteratorError;
            }
          }
        }

        _this3.bullets.splice(_this3.bullets.indexOf(bullet), 1);
        if (nearest) {
          //additional check for simultaneous collisions
          var asteroidIndex = _this3.asteroids.indexOf(nearest);

          if (nearest.size > asteroidSizes[0]) {
            var newSize = asteroidSizes[asteroidSizes.indexOf(nearest.size) - 1];
            var newSpeed1 = {
              vx: nearest.speed.vx + Math.random() * 2 - 1,
              vy: nearest.speed.vy + Math.random() * 2 - 1
            };
            var newSpeed2 = {
              vx: nearest.speed.vx + Math.random() * 2 - 1,
              vy: nearest.speed.vy + Math.random() * 2 - 1
            };
            _this3.asteroids.push(_this3.spawnAsteroid(newSize, nearest.position, newSpeed1));
            _this3.asteroids.push(_this3.spawnAsteroid(newSize, nearest.position, newSpeed2));
          } else {
            _this3.asteroids.push(_this3.spawnAsteroid());
          }
          _this3.score += 10 * nearest.size;
          _this3.asteroids.splice(asteroidIndex, 1);
          (0, _sound2.default)(440, 220);
        }
      };
    }
  }, {
    key: 'outOfBoundariesBounce',
    value: function outOfBoundariesBounce(bullet) {
      var _this4 = this;

      return function () {
        var _bullet$position = bullet.position,
            x = _bullet$position.x,
            y = _bullet$position.y;

        if (x > _this4.width || x < 0) bullet.speed.vx = -bullet.speed.vx;
        if (y > _this4.height || y < 0) bullet.speed.vy = -bullet.speed.vy;
      };
    }
  }, {
    key: 'outOfBoundariesDestroy',
    value: function outOfBoundariesDestroy(bullet) {
      var _this5 = this;

      return function () {
        var _bullet$position2 = bullet.position,
            x = _bullet$position2.x,
            y = _bullet$position2.y;

        if (x > _this5.width || y > _this5.height || x < 0 || y < 0) {
          var index = _this5.bullets.indexOf(bullet);
          _this5.bullets.splice(index, 1);
        }
      };
    }
  }, {
    key: 'crash',
    value: function crash() {
      var _this6 = this;

      return function () {
        if (_this6.lives === 1) _this6.gameOver();else {
          _this6.lives--;
          (0, _sound2.default)(55, 135);
          // removing all of the asteroids on the spawn
          var checkDistance = 200;
          _this6.asteroids = _this6.asteroids.filter(function (asteroid) {
            var distance = (0, _utils.calcDistance)(asteroid.position, _this6.center);
            return checkDistance < distance;
          });
          _this6.player.position.x = _this6.center.x;
          _this6.player.position.y = _this6.center.y;

          _this6.player.speed.vx = 0;
          _this6.player.speed.vy = 0;
        }
      };
    }
  }, {
    key: 'outOfBoundariesWrap',
    value: function outOfBoundariesWrap(object) {
      var _this7 = this;

      return function () {
        if (object.position.x > _this7.width) object.position.x = 0;
        if (object.position.y > _this7.height) object.position.y = 0;
        if (object.position.x < 0) object.position.x = _this7.width;
        if (object.position.y < 0) object.position.y = _this7.height;
      };
    }
  }, {
    key: 'update',
    value: function update(time) {
      var _this8 = this;

      this.ctx.clearRect(0, 0, this.width, this.height);

      this.asteroids.forEach(function (asteroid) {
        asteroid.update({ ctx: _this8.ctx });
      });
      this.player.update({ ctx: this.ctx, mouse: this.mouse });

      this.bullets.forEach(function (bullet) {
        bullet.update({ ctx: _this8.ctx });
      });

      if (!this.onScoreScreen) {
        this.ctx.font = "24px Helvetica";

        this.ctx.strokeText('score: ' + this.score + '\n lives: ' + this.lives, 10, 50);
        requestAnimationFrame(function (time) {
          return _this8.update(time);
        });
      }
    }
  }, {
    key: 'gameOver',
    value: function gameOver() {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      (0, _sound2.default)(55, 57, 1000);

      this.onScoreScreen = true;
      this.ctx.font = "64px Helvetica";
      this.ctx.strokeStyle = 'green';
      (0, _utils.addListener)(window, "keypress", function (event) {
        if (event.code === "KeyR") startNewGame();
      });

      this.ctx.strokeText('GAME OVER', this.center.x - 128, this.center.y - 64);
      this.ctx.strokeText('Score: ' + this.score, this.center.x - 128, this.center.y);
      this.ctx.strokeText('press R to restart', this.center.x - 128, this.center.y + 64);
    }
  }]);

  return Game;
}();

exports.default = Game;

function startNewGame() {
  _utils.listeners.forEach(function (listener) {
    return (0, _utils.removeListener)(listener.target, listener.event, listener.handler);
  });
  new Game();
}

startNewGame();

},{"Asteroid":1,"Bullet":2,"Player":4,"sound":6,"utils":7}],6:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var audioContext = new (window.AudioContext || window.webkitAudioContext)();
var masterGainNode = audioContext.createGain();
masterGainNode.connect(audioContext.destination);
masterGainNode.gain.value = 0.001;

function playSound(freq1, freq2) {
  var duration = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 100;
  // two notes frequencies and optional duration of them

  var osc1 = audioContext.createOscillator();
  var osc2 = audioContext.createOscillator();

  osc1.type = 'square';
  osc2.type = 'sawtooth';
  osc1.frequency.value = freq1;
  osc2.frequency.value = freq2;
  osc1.connect(masterGainNode);
  osc2.connect(masterGainNode);
  osc1.start(0);
  osc2.start(0);

  setTimeout(function () {
    osc1.stop();
    osc2.stop();
  }, duration);
}

exports.default = playSound;

},{}],7:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
function calcDistance(point1, point2) {
  return Math.sqrt((point2.x - point1.x) ** 2 + (point2.y - point1.y) ** 2);
}

function getPointRotated(point, origin, rotation) {
  var direction = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;
  // direction used to calculate rotation to a specific point

  var cos = void 0,
      sin = void 0;
  if (!direction) {
    cos = rotation.x;
    sin = rotation.y;
  } else {
    var vectorShifted = { x: direction.x - origin.x, y: direction.y - origin.y };
    var vectorLength = calcDistance(origin, direction);
    var normVector = {
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
  var collisionPixel = ctx.getImageData(point.x, point.y, 1, 1); //green pixels check is enough for detecting asteroid hit
  var green = collisionPixel.data[1];
  if (green > 230) cb();
}

//-- Listeners handling
var listeners = [];

function addListener(target, event, handler) {
  target.addEventListener(event, handler);
  listeners.push({ target: target, event: event, handler: handler });
}

function removeListener(target, event, handler) {
  target.removeEventListener(event, handler);
}

exports.calcDistance = calcDistance;
exports.checkCollision = checkCollision;
exports.getPointRotated = getPointRotated;
exports.addListener = addListener;
exports.removeListener = removeListener;
exports.listeners = listeners;

},{}]},{},[5])
//# sourceMappingURL=game.js.map
