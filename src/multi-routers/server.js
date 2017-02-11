import { createServer } from 'service-mocker/server';

const server = createServer();
const router = server.router;

router.base('/api/v1')
  .get('/users', (req, res) => {
    res.send({
      version: 'v1',
      users: [ 'Vincent Bel' ],
    });
  });

router.base('/api/v2')
  .get('/users', (req, res) => {
    res.send({
      version: 'v2',
      users: [ 'Dolphin Wood', 'Vincent Bel' ],
    });
  });
