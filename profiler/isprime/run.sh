#!/bin/bash

SERVER=isprime/index.js

# Big Prime Numbers
# * 8191 <- good for benchmark tests
# * 131071
# * 524287
# * 6700417
# * 2147483647 <- good for manual tests
N=131071

node $SERVER & sleep 5

echo -n "Benchmarking isprime-root..."
PUNCH=$(wrk http://127.0.0.1:8000/root/?n=${N} | grep "Requests/sec:" | tr -d "Requests/sec:");
echo "${PUNCH} req/s"

echo -n "Benchmarking isprime-minus..."
PUNCH=$(wrk http://127.0.0.1:8000/minus/?n=${N} | grep "Requests/sec:" | tr -d "Requests/sec:")
echo "${PUNCH} req/s"

pkill -f $SERVER

echo "Done!"
