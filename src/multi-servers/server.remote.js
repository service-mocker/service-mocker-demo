import { createServer } from 'service-mocker/server';
import { users } from './users';

const { router } = createServer('https://a.com');

router.get('/users/:id', (req, res) => {
  const id = req.params.id;

  if (!users[id]) {
    return res.status(404).send({
      error: 'Not Found',
    });
  }

  res.json({
    from: router.baseURL,
    date: Date.now(),
    user: users[id],
  });
});
