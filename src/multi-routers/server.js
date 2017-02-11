import { createServer } from 'service-mocker/server';
import apiV1 from './controllers/api-v1';
import apiV2 from './controllers/api-v2';

const { router } = createServer();

apiV1(router.base('/api/v1'));
apiV2(router.base('/api/v2'));
