# Hardhat Fund Me

Hardhat Fund Me is a simple Blockchain application for crowd funding, a showcase of using Hardhat framework along with Node.js.

# Quick Overview

Smart contracts written in Solidity allowing funders to contribute and only the owner can withdraw

Can be deployed to different networks by updating `hardhat.config.js` file, and store additional information in `helper-hardhat-config.js` file

For testing, 2 types of tests are developed configured:

- Unit test
- Staging test

Mocks are also created for testing

Use different kinds of storage in different scenerios

Apply Solidity code convention

# Getting Started

## Requirements

- git
- Node.js
- yarn

## Quick Start

```
git clone git@github.com:nvtrinh2001/hardhat-fund-me.git
cd hardhat-fund-me
yarn
yarn hardhat
```

# Deploy

## Hardhat Deployment

```
yarn hardhat deploy
```

## Local Deployment

Create your local hardhat network:

```
yarn hardhat node
```

And, **in a different terminal**:

```
yarn hardhat deploy --network localhost
```

## Testnet or Mainnet

Setup environment variables:

- PRIVATE_KEY
- RINKEBY_RPC_URL

Get testnet ETH from faucets.chain.link

Deploy:

```
yarn hardhat deploy --network rinkeby
```

# Test

## Unit tests

```
yarn run test
```

## Staging tests

```
yarn run test:staging
```

## Test coverage

```
yarn run coverage
```

## Estimate Gas

Run:

```
yarn hardhat test
```

Gas estimation will be saved in `gas-report.txt`

# Verify on Etherscan

Get your API key from Etherscan, then deploying the application will automatically verify the contracts for you.
