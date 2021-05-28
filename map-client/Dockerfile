# 1. build image with 'docker build -t met-boilerplate .'
# 2. run image with 'docker run -p 80:80 met-boilerplate'
# Detailed desc. here: https://medium.com/@tiangolo/react-in-docker-with-nginx-built-with-multi-stage-docker-builds-including-testing-8cc49d6ec305
# Stage 0, "build-stage", based on Node.js, to build and compile the frontend
FROM tiangolo/node-frontend:10 as build-stage
ARG NPM_SCRIPT=build
ARG ENV_FILE
WORKDIR /app
COPY package*.json /app/
RUN npm install
COPY ./ /app/
COPY ./$ENV_FILE /app/.env
RUN npm run $NPM_SCRIPT

# Stage 1, based on Nginx, to have only the compiled app, ready for production with Nginx
FROM nginx:1.17.10
LABEL no.met.contact="your-team@met.no"
LABEL no.met.app-group="describe your app"
LABEL no.met.sponsor="arbeidsordre xxxxxxxxxx"

COPY --from=build-stage /app/build/ /usr/share/nginx/html
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx/nginx_docker_http_only.conf /etc/nginx/conf.d/default.conf

