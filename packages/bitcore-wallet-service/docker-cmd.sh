#!/bin/bash

cd packages/bitcore-wallet-service && npm start

tail -F log
