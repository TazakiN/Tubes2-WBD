FROM node:20-alpine

WORKDIR /app

COPY package*.json ./

RUN npm ci --include=dev

COPY . .

ENV PORT=4001
EXPOSE 4001

CMD ["npm", "run", "docker:dev"]