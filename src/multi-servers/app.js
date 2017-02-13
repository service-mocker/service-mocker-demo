import { createClient } from 'service-mocker/client';
import { Logger } from 'utils';

const client = createClient('server.js');

client.ready.then(initApp);

function initApp() {
  const loggers = {
    local: new Logger(document.getElementById('api-local-content')),
    remote: new Logger(document.getElementById('api-remote-content')),
  };

  async function getUser(server, uid) {
    const origin = server === 'local' ? '' : 'https://a.com';

    const response = await fetch(`${origin}/users/${uid}`);

    loggers[server].log(await response.json());
  }

  document.getElementById('api-local-button')
    .addEventListener('click', () => {
      getUser('local', document.getElementById('api-local-uid').value);
    });

  document.getElementById('api-remote-button')
    .addEventListener('click', () => {
      getUser('remote', document.getElementById('api-remote-uid').value);
    });
}
