const crypto = require('crypto');
const express = require('express');
const app = express();

function hashSync(password) {
  const salt = crypto.randomBytes(128).toString('base64');
  const hash = crypto.pbkdf2Sync(password, salt, 10000, 512, 'sha512');
  return hash;
}

function hashAsync(password, cb) {
  const salt = crypto.randomBytes(128).toString('base64');
  const hash = crypto.pbkdf2(password, salt, 10000, 512, 'sha512', cb);
}

app.get('/sync', (req, res) => {
  for (let i = 0; i < 50; i++) {
    hash('random_password');
  }

  res.send('Done!\n');
});

app.get('/async', (req, res) => {
  for (let i = 0; i < 50; i++) {
    hashAsync('random_password', f => f);
  }

  res.send('Done!\n');
});

app.listen(8000, () => console.log('Example app listening on port 8000!'))
