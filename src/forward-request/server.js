import { createServer } from 'service-mocker/server';

const { router } = createServer();

const tracksMap = {
  'Headlights': '3h9uL1GB5GU0TdNPrFHluJ',
  '真夏の果実': '6c1e5UUXX6NbqI20vyNlZ3',
  '光るなら': '1ftMyRaQwrni8VRG73jjbL',
  'なんでもないや': '59pUIlXjQupbiYwt40uUTi',
};

router.scope('/spotify').get('/tracks', (req, res) => {
  const trackID = tracksMap[req.query.name];
  res.forward(`https://api.spotify.com/v1/tracks/${trackID}`);
});
