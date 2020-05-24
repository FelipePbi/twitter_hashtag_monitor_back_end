"use strict"; function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _Queue = require('./services/Queue'); var _Queue2 = _interopRequireDefault(_Queue);
var _MonitoringHashtag = require('./jobs/MonitoringHashtag'); var _MonitoringHashtag2 = _interopRequireDefault(_MonitoringHashtag);

_Queue2.default.process(_MonitoringHashtag2.default.handle);
