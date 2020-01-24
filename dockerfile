## BUILDER ##
ARG node_version=12
FROM node:${node_version}-alpine AS builder

WORKDIR /opt

WORKDIR /opt/basket-case
COPY package*.json ./

RUN npm ci

COPY . .

RUN npm run build:ts
## END BUILDER ##

## RUNNER ##
ARG node_version=12
FROM node:${node_version}-alpine AS runner

WORKDIR /opt/basket-case

COPY package*.json ./

RUN npm ci --production

COPY --from=builder /opt/basket-case/dist ./dist
COPY --from=builder /opt/basket-case/config ./config

RUN chown -R node:node /opt/basket-case
USER node
CMD ["npm", "start"]
## END RUNNER ##
