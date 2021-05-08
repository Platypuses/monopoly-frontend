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

FROM nginx:stable-alpine
COPY --from=build-stage /usr/app-build/dist /usr/share/nginx/html
CMD ["nginx", "-g", "daemon off;"]
