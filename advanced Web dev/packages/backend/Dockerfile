FROM node:14-alpine as base

WORKDIR /var/app/backend
COPY ./package*.json ./
RUN npm i
EXPOSE 3010
COPY . .
CMD ["npm", "run", "watch"]

# FROM base as dev
# ENV NODE_ENV=development

# FROM base as prod
# ENV NODE_ENV=production
# RUN npm run build