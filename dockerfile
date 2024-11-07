# Base image
FROM node:18-alpine

# Arbeitsverzeichnis setzen
WORKDIR /app

# Package files kopieren
COPY package*.json ./

# Dependencies installieren
RUN npm install

# Restliche Projektdateien kopieren
COPY . .

# Build durchführen
RUN npm run build

# Port exponieren
EXPOSE 3000

# Startbefehl
CMD ["npm", "start"]
