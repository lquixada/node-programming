#!/bin/bash

SERVER=hash/index.js

node $SERVER & sleep 5

echo "Benchmarking hash-sync..."
RESULTS="* hash-sync\n"
RESULTS+=$(wrk -t1 -c2 http://127.0.0.1:8000/sync/ | grep "Requests/sec:" | tr -d "Requests/sec:");
RESULTS+=" req/s\n"

echo "Benchmarking hash-async..."
RESULTS+="* hash-async\n"
RESULTS+=$(wrk -t1 -c2 http://127.0.0.1:8000/async/ | grep "Requests/sec:" | tr -d "Requests/sec:")
RESULTS+=" req/s\n"
pkill -f $SERVER

echo
echo "Summary:"
echo -e $RESULTS