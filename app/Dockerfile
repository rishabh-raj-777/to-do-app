FROM node:18-alpine

WORKDIR /app

RUN npm install express mongoose ejs dotenv body-parse
RUN npm install nodemon --save-dev
COPY package*.json .

COPY . .

EXPOSE 3000
CMD [ "node", "app.js" ]