import Queue from './services/Queue';
import MonitoringHashtag from './jobs/MonitoringHashtag';

Queue.process(MonitoringHashtag.handle);
