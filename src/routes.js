import { Router } from 'express';
import MonitorController from './controllers/MonitorController';

const routes = new Router();

routes.post('/monitor', MonitorController.store);
routes.post('/monitor/reset', MonitorController.resetState);
routes.post('/monitor/tweets/receive', MonitorController.receiveTweets);
routes.post('/monitor/tweets/approve', MonitorController.approveTweet);
routes.post('/monitor/tweets/reject', MonitorController.rejectTweet);

export default routes;
