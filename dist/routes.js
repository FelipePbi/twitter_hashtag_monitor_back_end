"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _express = require('express');
var _MonitorController = require('./controllers/MonitorController'); var _MonitorController2 = _interopRequireDefault(_MonitorController);

const routes = new (0, _express.Router)();

routes.post('/monitor', _MonitorController2.default.store);
routes.post('/monitor/reset', _MonitorController2.default.resetState);
routes.post('/monitor/tweets/receive', _MonitorController2.default.receiveTweets);
routes.post('/monitor/tweets/approve', _MonitorController2.default.approveTweet);
routes.post('/monitor/tweets/reject', _MonitorController2.default.rejectTweet);

exports. default = routes;
