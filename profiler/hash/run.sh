#!/bin/bash

SERVER=hash/index.js

node $SERVER & sleep 5

echo -n "Benchmarking hash-sync..."
PUNCH=$(wrk http://127.0.0.1:8000/sync/ | grep "Requests/sec:" | tr -d "Requests/sec:");
echo "${PUNCH} req/s"

echo -n "Benchmarking hash-async..."
PUNCH=$(wrk http://127.0.0.1:8000/async/ | grep "Requests/sec:" | tr -d "Requests/sec:");
echo "${PUNCH} req/s"

pkill -f $SERVER

echo "Done!"