FROM node:18-slim

WORKDIR /usr/src

COPY . .

RUN npm install
RUN npm run shared

CMD ["npm", "start"]