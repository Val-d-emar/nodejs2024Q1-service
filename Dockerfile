# Start by specifying the base image
FROM node:latest
RUN localedef -i ru_RU -c -f UTF-8 -A /usr/share/locale/locale.alias ru_RU.UTF-8;\
    ln -sf /bin/bash /bin/sh;\
    apt update && apt install -y iputils-ping net-tools iproute2 mc mc-data
ENV LANG ru_RU.utf8
# to change when run docker
ARG PORT=4000
# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json and package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

# Install all node modules
RUN npm install

# Bundle app source
COPY . .

# Build the project
RUN npm run build

# Your app binds to port 4000 so use the EXPOSE instruction
EXPOSE $PORT

CMD [ "npm", "run", "start:prod" ]

# Use a multi-stage build to reduce the image size
# Stage 1: Build the application
# FROM node:latest as builder
# LABEL name="node-home-service-builder"

# WORKDIR /usr/src/app

# COPY package*.json ./

# RUN npm install

# COPY . .

# RUN npm run build

# # Stage 2: Setup the production environment
# FROM node:alpine
# LABEL name="node-home-service-runner"

# # to change when run docker
# ARG PORT=4000

# WORKDIR /usr/src/app

# COPY --from=builder /usr/src/app/doc ./doc
# COPY --from=builder /usr/src/app/dist ./dist
# COPY --from=builder /usr/src/app/node_modules ./node_modules
# COPY --from=builder /usr/src/app/.env ./.env

# EXPOSE $PORT
# CMD [ "node", "dist/main"]

# Adding a health check to your Dockerfile
# HEALTHCHECK --interval=1m \
#  --timeout=5s \
#  CMD curl -s -o /dev/null http://localhost:$PORT/ || exit 1

# Подключение
# docker build -t home-service-nodejs .
# run interactive mode:
# docker run -it -p $PORT:$PORT --name home-service-nodejs-container home-service-nodejs /bin/bash
# daemon mode for docker:
# docker run -d -p $PORT:$PORT --name home-service-nodejs-container home-service-nodejs 
