FROM node:14-alpine as build-stage
WORKDIR /usr/app-build
COPY package.json ./
COPY tsconfig.json ./
COPY webpack.common.js ./
COPY webpack.prod.js ./
COPY postcss.config.js ./
COPY .eslintrc.json ./
COPY .prettierrc ./
COPY src ./src
RUN ls -a
RUN yarn build:prod

FROM nginx:1.19.10-alpine
COPY --from=build-stage /usr/app-build/dist /usr/share/nginx/html
COPY entrypoint.sh /usr/share/nginx
RUN chmod +x /usr/share/nginx/entrypoint.sh
ENTRYPOINT ["/usr/share/nginx/entrypoint.sh"]
CMD ["nginx", "-g", "daemon off;"]
