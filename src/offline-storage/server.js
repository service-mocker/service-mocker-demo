import { createServer } from 'service-mocker/server';
import localforage from 'localforage';
import uuid from 'uuid/v4';

const server = createServer();
const router = server.router;

const store = localforage.createInstance({
  name: 'service-mocke-demo',
  description: 'storage space for service mocker demo',
});

const CATS_KEY = 'cats';

async function ensureSetted() {
  const cats = await store.getItem(CATS_KEY);
  if (!cats) {
    await store.setItem(CATS_KEY, []);
  }
}

ensureSetted();

router.get('/cats', async (req, res) => {
  const cats = await store.getItem(CATS_KEY);

  res.json(cats);
});

router.post('/cats', async (req, res) => {
  const { name } = await req.json();

  const cats = await store.getItem(CATS_KEY);

  const newCat = {
    id: uuid(),
    name,
  };

  cats.push(newCat);

  await store.setItem(CATS_KEY, cats);

  res.json(newCat);
});
