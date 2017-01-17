import { createClient } from 'service-mocker/client';

const client = createClient('server.js');

client.ready
  .then(() => fetch('/greet'))
  .then(response => response.text())
  .then((text) => {
    document.getElementById('helloWorld').innerHTML = text;
  });
