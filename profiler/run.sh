#!/bin/bash

echo hash-sync >> results.txt ;
node server-hash-sync.js & sleep 5 ; 
ab -k -n 50000 -c 100 -t 20 http://127.0.0.1:8000/ | grep "Requests per second:" >> results.txt ;
pkill -f server-hash-sync ;
sleep 5 

echo hash-async >> results.txt ;
node server-hash-async.js & sleep 5 ; 
ab -k -n 50000 -c 100 -t 20 http://127.0.0.1:8000/ | grep "Requests per second:" >> results.txt ;
pkill -f server-hash-async ;
sleep 5 