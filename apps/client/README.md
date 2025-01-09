```sh
docker buildx bake --load client
docker run --rm -p 3000:8080 -it ton-nft-marketplace/client
```
