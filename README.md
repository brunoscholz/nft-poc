# NFT REACT MARKETPLACE

# INTRODUCTION

# GETTING STARTED

```
This project requires that you use yarn instead of npm commands
If you use npm commands the dependencies will fail to install correctly

1- Install yarn globally:
npm install --global yarn

2- Install project dependencies:
yarn

3- Start the project:
yarn start

```

# TRUFFLE COMMANDS

```
1 - TEST CONTRACTS WILL COMPILE & CREATE ABI FILES -- BUT THEY WONT HAVE ANY NETWORK INFORMATION ADDED
truffle compile

2 - DEPLOY CONTRACT ON NETWORK (IN THIS EXAMPLE RINKEBY)
truffle migrate --reset --network rinkeby

3 - RUN MINT SCRIPT ON A SPECIFIC NETWORK (IN THIS EXAMPLE RINKEBY)
truffle exec src/utils/mint.js --network rinkeby

```
