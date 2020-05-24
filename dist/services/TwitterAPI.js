"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _axios = require('axios'); var _axios2 = _interopRequireDefault(_axios);
var _SecretApiTwitter = require('../configs/SecretApiTwitter'); var _SecretApiTwitter2 = _interopRequireDefault(_SecretApiTwitter);

const twApi = _axios2.default.create({
  baseURL: _SecretApiTwitter2.default.base_url,
});

twApi.defaults.headers.Authorization = `Bearer ${_SecretApiTwitter2.default.bearer_token}`;

exports. default = twApi;
