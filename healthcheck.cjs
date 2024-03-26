const express = require('express');
const { createHttpTerminator } = require('http-terminator');

const app = express();

const server = app.listen(3000);

app.get('/', (req, res) => {
  res.send('ok');
    exit(0);
});
exit(1);
