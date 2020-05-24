"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _express = require('express'); var _express2 = _interopRequireDefault(_express);
var _morgan = require('morgan'); var _morgan2 = _interopRequireDefault(_morgan);
var _bodyparser = require('body-parser'); var _bodyparser2 = _interopRequireDefault(_bodyparser);
var _dotenv = require('dotenv'); var _dotenv2 = _interopRequireDefault(_dotenv);
var _socketio = require('socket.io'); var _socketio2 = _interopRequireDefault(_socketio);
var _http = require('http'); var _http2 = _interopRequireDefault(_http);
var _cors = require('cors'); var _cors2 = _interopRequireDefault(_cors);
// import BullBoard from 'bull-board';

var _routes = require('./routes'); var _routes2 = _interopRequireDefault(_routes);
var _Queue = require('./services/Queue'); var _Queue2 = _interopRequireDefault(_Queue);

class App {
  constructor() {
    _dotenv2.default.config();
    this.app = _express2.default.call(void 0, );
    this.server = _http2.default.Server(this.app);
    this.io = _socketio2.default.call(void 0, this.server);

    this.state = {
      hashtag: '',
      monitoring: false,
      received: [],
      approved: [],
      rejected: [],
    };

    this.websockets();

    this.middlewares();
    this.routes();
    this.resetJobs();
  }

  websockets() {
    this.io.on('connection', socket => {
      console.log('Usuário Conectado', socket.id);

      socket.emit('initialState', this.state);
    });
  }

  middlewares() {
    this.app.use(_cors2.default.call(void 0, ));
    this.app.use(_express2.default.json());
    this.app.use(_morgan2.default.call(void 0, 'dev'));
    this.app.use(_bodyparser2.default.urlencoded({ extended: false }));
    this.app.use((req, res, next) => {
      req.io = this.io;
      req.state = this.state;

      return next();
    });
  }

  routes() {
    // BullBoard.setQueues([Queue]);
    // this.app.use('/admin/queues', BullBoard.UI);
    this.app.use('/api', _routes2.default);
  }

  async resetJobs() {
    await _Queue2.default.pause();
    await _Queue2.default.empty();
    await _Queue2.default.isReady();
  }
}

exports. default = new App().server;
