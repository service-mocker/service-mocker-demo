import { createClient } from 'service-mocker/client';

const client = createClient('server.js');

client.ready.then(async () => {
  const response = await fetch('/greet');
  document.getElementById('helloWorld').innerHTML = await response.text();
});
