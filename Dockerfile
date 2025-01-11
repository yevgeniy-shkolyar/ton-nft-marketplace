FROM docker.io/node:22-alpine AS node
RUN mkdir -p /opt/marketplace/ \
    && chown -R node:node /opt/marketplace/
RUN apk upgrade --update-cache --available && \
    apk add openssl && \
    rm -rf /var/cache/apk/*

WORKDIR /opt/marketplace
ARG NODE_ENV=production
ENV NODE_ENV $NODE_ENV
ENV PATH /opt/marketplace/node_modules/.bin:$PATH
USER node

FROM node AS packages
COPY --chown=node:node \
    package.json \
    yarn.lock \
    .yarnrc.yml \
    tsconfig.json \
    .prettierrc.js \
    .prettierignore \
    /opt/marketplace/
COPY --chown=node:node \
    .yarn/ \
    /opt/marketplace/.yarn/

COPY --chown=node:node apps/api/package.json \
    ./apps/api/
COPY --chown=node:node apps/client/package.json \
    ./apps/client/
COPY --chown=node:node libs/eslint-config/package.json \
    ./libs/eslint-config/

FROM packages AS dev
USER node
RUN yarn install && \
    rm -rf "$(yarn cache clean)"
COPY --chown=node:node ./ ./

FROM packages AS prebuild-api
RUN yarn workspaces focus \
    @ton-nft-marketplace/api && \
    rm -rf "$(yarn cache clean)"
COPY --chown=node:node ./apps/api ./apps/api
RUN yarn workspace @ton-nft-marketplace/api build

FROM node AS api
COPY --from=packages /opt/marketplace /opt/marketplace
RUN yarn workspaces focus --production \
    @ton-nft-marketplace/api \
    && rm -rf "$(yarn cache clean)"
COPY --from=prebuild-api \
    /opt/marketplace/apps/api/dist /opt/marketplace/apps/api/dist
WORKDIR /opt/marketplace/apps/api
CMD ["node", "dist/main.js"]

FROM packages AS prebuild-client
RUN yarn workspaces focus @ton-nft-marketplace/client \
    && rm -rf "$(yarn cache clean)"
COPY --chown=node:node ./apps/client ./apps/client
RUN yarn workspace @ton-nft-marketplace/client build

FROM node AS client
COPY --from=packages /opt/marketplace /opt/marketplace
RUN yarn workspaces focus --production @ton-nft-marketplace/client \
    && rm -rf "$(yarn cache clean)"
COPY --from=prebuild-client \
    /opt/marketplace/apps/client/next.config.mjs /opt/marketplace/apps/client/
COPY --from=prebuild-client \
    /opt/marketplace/apps/client/public /opt/marketplace/apps/client/public
COPY --from=prebuild-client \
    /opt/marketplace/apps/client/.next /opt/marketplace/apps/client/.next
WORKDIR /opt/marketplace/apps/client
CMD ["yarn", "next", "start"]
