import { createClient } from 'service-mocker/client';

const client = createClient('server.js');

client.ready.then(initApp);

function initApp() {
  const catList = document.getElementById('catList');

  async function addCat(name) {
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

  async function updateCat(id, name) {
    await fetch(`/cats/${id}`, {
      method: 'PUT',
      header: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name }),
    });

    getCats();
  }

  async function deleteCat(id) {
    await fetch(`/cats/${id}`, {
      method: 'DELETE',
    });

    getCats();
  }

  function showCats(cats) {
    catList.innerHTML = '';
    cats.forEach(cat => {
      const catId = cat.id;
      const catName = cat.name;

      const input = document.createElement('input');
      const updateButton = document.createElement('button');
      const deleteButton = document.createElement('button');

      input.value = catName;
      updateButton.textContent = 'update';
      deleteButton.textContent = 'delete';
      updateButton.addEventListener('click', () => updateCat(catId, input.value));
      deleteButton.addEventListener('click', () => deleteCat(catId));

      const li = document.createElement('li');
      li.appendChild(input);
      li.appendChild(updateButton);
      li.appendChild(deleteButton);

      catList.appendChild(li);
    });

    const addCatInput = document.createElement('input');
    const addCatButton = document.createElement('button');

    addCatButton.textContent = 'add';

    addCatButton.addEventListener('click', () => addCat(addCatInput.value));

    const li = document.createElement('li');
    li.appendChild(addCatInput);
    li.appendChild(addCatButton);

    catList.appendChild(li);
  }

  async function getCats() {
    const response = await fetch(`/cats`);
    const cats = await response.json();
    showCats(cats);
  }

  document.getElementById('getMyCats').addEventListener('click', getCats);
}
