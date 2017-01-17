import { createClient } from 'service-mocker/client';

const client = createClient('server.js');

client.ready.then(initApp);

function initApp() {
  const catList = document.getElementById('catList');

  function addCat(name) {
    fetch('/cats', {
      method: 'POST',
      header: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name }),
    })
      .then(getCats);
  }

  function updateCat(id, name) {
    fetch(`/cats/${id}`, {
      method: 'PUT',
      header: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name }),
    })
      .then(getCats);
  }

  function deleteCat(id) {
    fetch(`/cats/${id}`, {
      method: 'DELETE',
    })
      .then(getCats);
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
      updateButton.onclick = () => updateCat(catId, input.value);
      deleteButton.onclick = () => deleteCat(catId);

      const li = document.createElement('li');
      li.appendChild(input);
      li.appendChild(updateButton);
      li.appendChild(deleteButton);

      catList.appendChild(li);
    });

    const addCatInput = document.createElement('input');
    const addCatButton = document.createElement('button');

    addCatButton.textContent = 'add';

    addCatButton.onclick = () => addCat(addCatInput.value);

    const li = document.createElement('li');
    li.appendChild(addCatInput);
    li.appendChild(addCatButton);

    catList.appendChild(li);
  }

  function getCats() {
    fetch(`/cats`)
      .then(response => response.json())
      .then(showCats);
  }

  document.getElementById('getMyCats').onclick = getCats;
}
