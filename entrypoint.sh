#!/bin/sh

ENV_VARIABLES='window.env = { \
  "BACKEND_BASE_URL":"'"${BACKEND_BASE_URL}"'", \
}'

sed -i "s@// ENV_PLACEHOLDER@${ENV_VARIABLES}@" /usr/share/nginx/html/index.html

exec "$@"
