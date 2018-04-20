const crypto = require('crypto');
const http = require('http');

function hash(password, cb) {
  const salt = crypto.randomBytes(128).toString('base64');
  const hash = crypto.pbkdf2(password, salt, 10000, 512, 'sha512', cb);
}

http.createServer((req, res) => {
  // Imagine that loop below is real requests to some route
  for (let i = 0; i < 50; i++) {
    hash('random_password', f => f);
  }

  res.end('Done!')
}).listen(8000);