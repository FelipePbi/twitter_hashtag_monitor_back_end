"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _bull = require('bull'); var _bull2 = _interopRequireDefault(_bull);
var _Redis = require('../configs/Redis'); var _Redis2 = _interopRequireDefault(_Redis);
var _MonitoringHashtag = require('../jobs/MonitoringHashtag'); var _MonitoringHashtag2 = _interopRequireDefault(_MonitoringHashtag);

const monitoringQueue = new (0, _bull2.default)(_MonitoringHashtag2.default.key, { redis: _Redis2.default });

exports. default = monitoringQueue;
