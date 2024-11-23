FROM node:20-alpine

WORKDIR /app

COPY package.json .

RUN npm install

# RUN npm i -g serve

COPY . .

# RUN npm run build

# EXPOSE 5173

EXPOSE 3000

CMD ["npm", "run", "dev"]

# CMD [ "serve", "-s", "dist" ]j