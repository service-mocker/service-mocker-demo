import { createClient } from 'service-mocker/client';
import { Logger } from 'utils';

const client = createClient('server.js');

client.ready.then(initApp);

function initApp() {
  const catList = document.getElementById('catList');
  const resultLog = new Logger();

  resultLog.appendTo(document.getElementById('result'));

  async function addCat(name) {
    if (!name) return;

    await fetch('/cats', {
      method: 'POST',
      header: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name }),
    });

    getCats();
  }

  function showCats(cats) {
    catList.innerHTML = `
      ${cats.map(cat => (`<li>${cat.name}</li>`)).join('')}
      <li>
        <input id="addCatInput" />
        <button id="addCatButton">add new cat</button>
      </li>
    `;

    const addCatInput = document.getElementById('addCatInput');
    const addCatButton = document.getElementById('addCatButton');

    addCatButton.addEventListener('click', () => addCat(addCatInput.value));
  }

  async function getCats() {
    resultLog.clear();

    const response = await fetch(`/cats`);
    const cats = await response.json();
    showCats(cats);

    resultLog.log(cats);
  }

  document.getElementById('getMyCats').addEventListener('click', getCats);
}
