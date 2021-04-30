FROM node:16-alpine3.13 as build-step

RUN mkdir /app
WORKDIR /app

COPY package.json /app
RUN npm install
COPY . /app
RUN npm run build

FROM nginx:1.19.10-alpine
COPY --from=build-step /app/build /usr/share/nginx/html
COPY --from=build-step /app/nginx/default.conf /etc/nginx/conf.d/default.conf
