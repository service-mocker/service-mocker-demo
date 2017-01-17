import { createClient } from 'service-mocker/client';

const client = createClient('server.js');

client.ready.then(initApp);

function initApp() {
  function getUsers(apiVersion) {
    fetch(`/api/v${apiVersion}/users`)
    .then(response => response.text())
    .then(res => {
      document.getElementById(`apiV${apiVersion}Content`).innerHTML = res;
    });
  }

  document.getElementById('apiV1Button').onclick = () => getUsers(1);
  document.getElementById('apiV2Button').onclick = () => getUsers(2);
}
