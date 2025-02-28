FROM node:22
WORKDIR /app
COPY package*.json ./
RUN npm install -y
COPY . .
RUN npm run build
VOLUME /app/dist
