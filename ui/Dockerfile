FROM node:8

WORKDIR /usr/src/app

COPY package.json .
RUN npm install --quiet
COPY . .

CMD ["npm", "run" ,"dev"]
