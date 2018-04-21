#!/bin/bash

SERVER=hash/index.js

node $SERVER & sleep 5

echo "Benchmarking hash-sync..."
RESULTS="hash-sync\n"
RESULTS+=$(ab -k -n 10000 -c 10 -t 20 http://127.0.0.1:8000/sync/ | grep "Requests per second:");
RESULTS+="\n"

echo
echo "Benchmarking hash-async..."
RESULTS+="hash-async\n"
RESULTS+=$(ab -k -n 10000 -c 10 -t 20 http://127.0.0.1:8000/async/ | grep "Requests per second:")

pkill -f $SERVER

echo
echo "Summary:"
echo -e $RESULTS