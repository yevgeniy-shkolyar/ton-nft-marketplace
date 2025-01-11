# Demo TON NFT Marketplace

### Running the Project in Development Mode

##### Installing dependencies

Link to the guide for installing Node Version Manager (nvm).

https://github.com/nvm-sh/nvm?tab=readme-ov-file#installing-and-updating

```shell
nvm install
npm install -g yarn
yarn install
```

##### Starting

```shell
yarn dev
```


### FRP (Fast Reverse Proxy).

```sh
brew install frpc
yarn dotenv -e .env.secrets.decrypted -- frpc -c frpc.toml
```

### Build docker

```sh
docker buildx bake --load api client
```

