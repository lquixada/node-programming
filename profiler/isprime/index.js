const crypto = require('crypto');
const express = require('express');
const app = express();

function isPrimeMinus(n) {
  n = parseInt(n, 10);
  for (let i=2; i<n-1; i++) {
    if (n%i===0) {
      return false;
    }
  }

  return true;
}

function isPrimeRoot(n) {
  for (let i=2; i<=Math.sqrt(n); i++) {
    if (n%i===0) {
      return false;
    }
  }

  return true;
}

app
  .get('/minus', (req, res) => {
    res.send(isPrimeMinus(req.query.n)+'\n')
  })
  .get('/root', (req, res) => {
    res.send(isPrimeRoot(req.query.n)+'\n')
  })
  .listen(8000);
