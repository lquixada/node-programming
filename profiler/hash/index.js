// const fs = require('fs');
const crypto = require('crypto');
const express = require('express');

// const profiler = require('v8-profiler');
// profiler.startProfiling();

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

let counter = 0;

app
  .get('/sync', (req, res) => {
    hashSync('random_password');
    res.send('Done!\n');
  })
  .get('/async', (req, res) => {
    hashAsync('random_password', () => {
      res.send('Done!\n');
    });
  })
  .listen(8000);

// process.on('SIGINT', (code) => {
//   const profile1 = profiler.stopProfiling();
//   profile1.export(function(error, result) {
//     fs.writeFileSync('profile2.cpuprofile', result);
//     profile1.delete();
//     process.exit();
//   });
// });
