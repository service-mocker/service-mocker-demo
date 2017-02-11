import { createClient } from 'service-mocker/client';
import { Logger } from 'utils';

const client = createClient('server.js');

client.ready.then(initApp);

function initApp() {
  const loggers = {
    1: new Logger(document.getElementById('api-v1-content')),
    2: new Logger(document.getElementById('api-v2-content')),
  };

  async function getUsers(apiVersion) {
    const response = await fetch(`/api/v${apiVersion}/users`);

    loggers[apiVersion].log(await response.json());
  }

  document.getElementById('api-v1-button')
    .addEventListener('click', () => getUsers(1));

  document.getElementById('api-v2-button')
    .addEventListener('click', () => getUsers(2));
}
