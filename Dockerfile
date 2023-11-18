FROM node:18-slim

WORKDIR /usr/src

COPY . .

RUN npm install

CMD ["npm", "start"]