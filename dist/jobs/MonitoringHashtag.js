"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _axios = require('axios'); var _axios2 = _interopRequireDefault(_axios);
var _TwitterAPI = require('../services/TwitterAPI'); var _TwitterAPI2 = _interopRequireDefault(_TwitterAPI);
var _Api = require('../configs/Api'); var _Api2 = _interopRequireDefault(_Api);

exports. default = {
  key: 'MonitoringHashtag',
  async handle(props) {
    const { dateString, hashtag } = props.data;

    console.log(`Monitorando Hashtag #${hashtag} - ${dateString}`);

    const { data } = await _TwitterAPI2.default.get(
      `/labs/2/tweets/search?start_time=${dateString}&expansions=author_id&user.fields=name,profile_image_url,username,verified&query=%23${hashtag}`
    );

    if (data && data.data && data.data.length > 0) {
      const tweets = data.data;
      const usets = (data.includes && data.includes.users) || [];

      const response = tweets.map(x => {
        const { name, username, profile_image_url, verified } =
          usets.find(i => i.id === x.author_id) || {};
        return { id: x.id, text: x.text, name, username, profile_image_url, verified };
      });

      await _axios2.default.post(`${_Api2.default.baseURL}/monitor/tweets/receive`, { tweets: response });
    }
  },
};
