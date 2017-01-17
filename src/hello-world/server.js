import { createServer } from 'service-mocker/server';

const mocker = createServer();

mocker.router.get('/greet', 'Hello New World!');
