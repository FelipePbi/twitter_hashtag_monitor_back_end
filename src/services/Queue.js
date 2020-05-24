import Queue from 'bull';
import redisConfig from '../configs/Redis';
import MonitoringHashtag from '../jobs/MonitoringHashtag';

const monitoringQueue = new Queue(MonitoringHashtag.key, { redis: redisConfig });

export default monitoringQueue;
