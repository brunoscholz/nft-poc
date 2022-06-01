#!/bin/sh
set -e

echo "Running docker-entrypoint.sh in DEVELOPMENT mode"

# echo "Truffle init"
# truffle init

echo "Compiling contracts"
truffle compile

echo "Running contract tests"
truffle test

echo "Deploying contracts to the blockchain"
truffle migrate

echo "Start dev mode on port 4001"
yarn start

exec "$@"