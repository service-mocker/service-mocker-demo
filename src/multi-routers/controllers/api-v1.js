import { createServer } from 'service-mocker/server';

const { router } = createServer('/api/v1');

router.get('/users', (req, res) => {
  res.send({
    version: 'v1',
    users: [ 'Vincent Bel' ],
  });
});
