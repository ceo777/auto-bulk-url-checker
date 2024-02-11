# syntax=docker/dockerfile:1

FROM node:20-alpine

RUN apk add dumb-init

USER node

WORKDIR /usr/src/app

COPY --chown=node:node package*.json .

RUN npm ci --omit=dev

COPY --chown=node:node /dist ./dist
COPY --chown=node:node .env .env

ENTRYPOINT ["/usr/bin/dumb-init", "--"]

CMD ["node", "dist/main.js"]