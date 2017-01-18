import { createServer } from 'service-mocker/server';

const server = createServer();
const router = server.router;

const catsById = {
  101: {
    id: 101,
    name: 'Molly',
  },
  102: {
    id: 102,
    name: 'Charlie',
  },
  103: {
    id: 103,
    name: 'Poppy',
  },
};

const catIds = [101, 102, 103];

let nextId = 104;

router.get('/cats', (req, res) => {
  res.json(catIds.map(id => catsById[id]));
});

router.post('/cats', async (req, res) => {
  const { name } = await req.json();
  const newCat = {
    id: nextId,
    name,
  };

  catsById[nextId] = newCat;
  catIds.push(nextId);
  nextId += 1;

  res.json(newCat);
}
);

router.put('/cats/:id', async (req, res) => {
  const { id } = req.params;
  const cat = catsById[id];
  if (!cat) {
    return res.status(404).json({
      error: { message: 'Cat not found!' },
    });
  }

  const { name } = await req.json();
  if (name) {
    cat.name = name;
  }

  res.json(cat);
});

router.delete('/cats/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  const cat = catsById[id];
  if (!cat) {
    return res.status(404).json({
      error: { message: 'Cat not found!' },
    });
  }

  delete catsById[id];

  const catIndex = catIds.indexOf(id);
  catIds.splice(catIndex, 1);

  res.json(cat);
});
