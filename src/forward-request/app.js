import { createClient } from 'service-mocker/client';
import { Logger } from 'utils';

const client = createClient('server.js');

client.ready.then(() => {
  const trackName = document.getElementById('track-name');

  const resultLog = new Logger();

  resultLog.appendTo(document.getElementById('result'));

  async function getAlbums() {
    resultLog.clear();

    const request = await fetch(`/spotify/tracks?name=${encodeURIComponent(trackName.value)}`);

    resultLog.log(await request.json());
  }

  getAlbums();

  trackName.onchange = getAlbums;
});
