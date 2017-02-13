import { createServer } from 'service-mocker/server';
import { users } from './users';

const { router } = createServer();

router.get('/users/:id', (req, res) => {
  const id = req.params.id;

  if (!users[id]) {
    return res.status(404).send({
      error: 'Not Found',
    });
  }

  res.json({
    from: router.baseURL,
    user: users[id],
  });
});
