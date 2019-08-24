FROM node:12.3-alpine

WORKDIR /app

COPY package.json yarn* ./
RUN yarn

COPY . .

USER node

CMD [ "yarn", "start" ]
