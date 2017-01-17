const path = require('path');
const express = require('express');

const app = express();

app.use(express.static(path.join(__dirname, 'build')));

app.listen(3000, () => {
  console.log('Server listening on http://localhost:3000, Ctrl+C to stop');
});
