import { createServer } from 'service-mocker/server';
import apiV1 from './api-v1';
import apiV2 from './api-v2';

const server = createServer();
const router = server.router;

const apiV1Router = router.base('/api/v1');
const apiV2Router = router.base('/api/v2');

apiV1(apiV1Router);
apiV2(apiV2Router);
