FROM node:18-alpine
LABEL name=express-ts-boilerplate

WORKDIR /app
COPY . /app

RUN yarn && yarn run build

CMD ["node", "./dist/index.js"]

EXPOSE 3000 9229
