FROM node:12.3-alpine

RUN apk add --no-cache --virtual .gyp \
  python \
  make \
  g++

RUN yarn global add react-scripts@^3.0.1

WORKDIR /app

COPY package.json yarn* ./
RUN yarn

COPY . .

USER node

CMD [ "yarn", "start" ]
