#!/bin/bash

N=131071
SERVER=isprime/index.js

node $SERVER & sleep 5

echo "Benchmarking isprime-root..."
RESULTS="isprime-root\n"
RESULTS+=$(ab -k -n 50000 -c 100 -t 20 http://127.0.0.1:8000/root/?n=${N} | grep "Requests per second:");
RESULTS+="\n"

echo
echo "Benchmarking isprime-minus..."
RESULTS+="isprime-minus\n"
RESULTS+=$(ab -k -n 50000 -c 100 -t 20 http://127.0.0.1:8000/minus/?n=${N} | grep "Requests per second:")

pkill -f $SERVER

echo
echo "Summary:"
echo -e $RESULTS