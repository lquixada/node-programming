const crypto = require('crypto');
const http = require('http');

function hash(password) {
  const salt = crypto.randomBytes(128).toString('base64');
  const hash = crypto.pbkdf2Sync(password, salt, 10000, 512, 'sha512');
  return hash;
}
 
http.createServer((req, res) => {
  // Imagine that loop below is real requests to some route
  for (let i = 0; i < 50; i++) {
    hash('random_password');
  }

  res.end('Done!');
}).listen(8000);
