FROM node:20-alpine

WORKDIR /app

COPY package*.json ./

RUN npm ci --include=dev

COPY . .

COPY ./.env.example ./.env

ENV PORT=3000
EXPOSE 3000

CMD ["npm", "run", "docker:dev"]