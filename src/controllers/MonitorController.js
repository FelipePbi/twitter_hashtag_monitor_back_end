import Queue from '../services/Queue';

class MonitorController {
  async receiveTweets(req, res) {
    try {
      const {
        body: { tweets },
        state,
        io,
      } = req;

      if (state.monitoring) {
        const receivedIds = state.received.map(r => r.id);
        const approvedIds = state.approved.map(r => r.id);
        const rejectedIds = state.rejected.map(r => r.id);
        const newTweets = tweets.filter(
          x =>
            !receivedIds.includes(x.id) &&
            !approvedIds.includes(x.id) &&
            !rejectedIds.includes(x.id)
        );

        if (newTweets.length > 0) {
          state.received = [...state.received, ...newTweets];
          await io.emit('received_request', state.received);
        }
      }

      return res.status(404).json({ success: true, errors: ['Tweet not found'] });
    } catch (err) {
      return res.status(500).json({ success: true, errors: [err] });
    }
  }

  async approveTweet(req, res) {
    try {
      const { state, io } = req;

      const twittes = [...state.received, ...state.rejected];
      const twitterApproved = twittes.find(x => x.id === req.body.id);

      if (twitterApproved) {
        state.approved = [...state.approved, twitterApproved];
        state.rejected = state.rejected.filter(x => x.id !== req.body.id);
        state.received = state.received.filter(x => x.id !== req.body.id);
        await io.emit('reject_request', state.rejected);
        await io.emit('approved_request', state.approved);
        await io.emit('received_request', state.received);

        return res.status(200).json({ success: true, errors: [] });
      }

      return res.status(404).json({ success: true, errors: ['Tweet not found'] });
    } catch (err) {
      return res.status(500).json({ success: true, errors: [err] });
    }
  }

  async rejectTweet(req, res) {
    try {
      const { state, io } = req;

      const twittes = [...state.approved, ...state.received];
      const twitterRejected = twittes.find(x => x.id === req.body.id);

      if (twitterRejected) {
        state.rejected = [...state.rejected, twitterRejected];
        state.approved = state.approved.filter(x => x.id !== req.body.id);
        state.received = state.received.filter(x => x.id !== req.body.id);
        await io.emit('reject_request', state.rejected);
        await io.emit('approved_request', state.approved);
        await io.emit('received_request', state.received);

        return res.status(200).json({ success: true, errors: [] });
      }

      return res.status(404).json({ success: true, errors: ['Tweet not found'] });
    } catch (err) {
      return res.status(500).json({ success: true, errors: [err] });
    }
  }

  async resetState(req, res) {
    try {
      const { state, io } = req;

      state.rejected = [];
      state.approved = [];
      state.received = [];
      state.hashtag = '';
      state.monitoring = false;
      await io.emit('stateChange', { hashtag: state.hashtag, monitoring: state.monitoring });

      await io.emit('reject_request', state.rejected);
      await io.emit('approved_request', state.approved);
      await io.emit('received_request', state.received);

      return res.status(200).json({ success: true, errors: [] });
    } catch (err) {
      return res.status(500).json({ success: true, errors: [err] });
    }
  }

  async store(req, res) {
    const { state, io } = req;
    try {
      state.hashtag = req.body.hashtag ? req.body.hashtag : state.hashtag;
      state.monitoring = req.body.monitoring;

      await io.emit('stateChange', { hashtag: state.hashtag, monitoring: state.monitoring });

      const resetMilliseconds = new Date().setMilliseconds(0);
      const resetSeconds = new Date(resetMilliseconds).setSeconds(0);

      const dateString = new Date(resetSeconds).toISOString();

      if (state.monitoring && state.hashtag) {
        await Queue.add(
          { hashtag: state.hashtag, monitoring: state.monitoring, dateString },
          {
            delay: 5000,
            repeat: {
              every: 5000,
              limit: 1000,
            },
          }
        );
      } else {
        await Queue.pause();
        await Queue.empty();
        await Queue.isReady();
      }

      return res.status(200).json({ success: true, errors: [] });
    } catch (err) {
      return res.status(500).json({ success: true, errors: [err] });
    }
  }
}

export default new MonitorController();
