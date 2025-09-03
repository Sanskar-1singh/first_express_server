FROM node

WORKDIR /app

COPY . .

CMD ["node","src/index.js"]
