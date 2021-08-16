# DeTrust, build your own trust on chain

## About

Decentralized Trust on Ethereum.

## Running locally in development mode

To get started, just clone the repository and run `yarn install && yarn dev`:

```
git clone git@github.com:detrust-finance/frontend.git

cd frontend

yarn install

yarn dev
```

## Building and deploying in production

If you wanted to run this site in production, you should install modules then build the site with `yarn build` and run it with `yarn start`:

```
yarn install

yarn build

yarn start
```

You should run `yarn build` again any time you make changes to the site.

## Configuring

Copy `.env_sample` to `.env.local`.

To use Wallet Connect properly, change the `NEXT_PUBLIC_NETWORK_URL` variable in `.env.local` file to your Infura.io or other network URL. 

Detrust.finance supports multiple networks. The list of supported networks is available in the `.env_sample` file.

Set `NEXT_PUBLIC_DETRUST_CONTRACT_ADDRESS_${NETWORK_NAME}` to your deplyed contract address. Example: `NEXT_PUBLIC_DETRUST_CONTRACT_ADDRESS_RINKEBY=''`. 
