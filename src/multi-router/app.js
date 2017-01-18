import { createClient } from 'service-mocker/client';

const client = createClient('server.js');

client.ready.then(initApp);

function initApp() {
  async function getUsers(apiVersion) {
    const response = await fetch(`/api/v${apiVersion}/users`);
    const elem = document.getElementById(`apiV${apiVersion}Content`);
    elem.innerHTML = await response.text();
  }

  document.getElementById('apiV1Button')
    .addEventListener('click', () => getUsers(1));

  document.getElementById('apiV2Button')
    .addEventListener('click', () => getUsers(2));
}
