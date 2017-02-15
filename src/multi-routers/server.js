import { createServer } from 'service-mocker/server';
import apiV1 from './controllers/api-v1';
import apiV2 from './controllers/api-v2';

const { router } = createServer('/api');

apiV1(router.scope('/v1'));
apiV2(router.scope('/v2'));
