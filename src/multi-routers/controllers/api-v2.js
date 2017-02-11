import { createServer } from 'service-mocker/server';

const { router } = createServer('/api/v2');

router.get('/users', (req, res) => {
  res.send({
    version: 'v2',
    users: [ 'Dolphin Wood', 'Vincent Bel' ],
  });
});
