#!/bin/bash

N=131071
SERVER=isprime/index.js

node $SERVER & sleep 5

echo "Benchmarking isprime-root..."
RESULTS="* isprime-root: "
RESULTS+=$(wrk -t1 -c2 http://127.0.0.1:8000/root/?n=${N} | grep "Requests/sec:" | tr -d "Requests/sec:");
RESULTS+=" req/s\n"

echo "Benchmarking isprime-minus..."
RESULTS+="* isprime-minus: "
RESULTS+=$(wrk -t1 -c2 http://127.0.0.1:8000/minus/?n=${N} | grep "Requests/sec:" | tr -d "Requests/sec:")
RESULTS+=" req/s\n"

pkill -f $SERVER

echo
echo "Summary:"
echo -e $RESULTS