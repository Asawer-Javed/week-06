# Frontend
FROM node:14 AS frontend
WORKDIR /app
COPY my-app/package.json my-app/package-lock.json ./
RUN npm install
COPY my-app ./
RUN npm run build

# Backend
FROM node:14 AS backend
WORKDIR /app
COPY server/package.json server/package-lock.json ./
RUN npm install
COPY server ./
COPY --from=frontend /app/build ./build
CMD ["node", "server.js"]