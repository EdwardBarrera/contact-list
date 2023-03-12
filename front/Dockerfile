FROM node:19-alpine3.16 as node
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build --prod

FROM nginx:alpine
COPY --from=node /app/dist/front /usr/share/nginx/html
EXPOSE 80
