import { createClient } from 'service-mocker/client';

const client = createClient('server.js');

client.ready.then(initApp);

function initApp() {
  async function greet() {
    const response = await fetch('/greet');
    document.getElementById('helloWorld').innerHTML = await response.text();
  }

  document.getElementById('greet').addEventListener('click', greet);
}
