FROM node:14-alpine as base

WORKDIR /var/app/frontend
COPY ./package*.json ./
RUN npm install
EXPOSE 3000
COPY . .
CMD ["npm", "run", "watch"]
