# Builder needs only if your host OS different from Linux
FROM node:latest as builder
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
# COPY --chown=node:node package*.json ./

# Install app dependencies using the `npm ci` command instead of `npm install`
RUN npm ci --only=production 
# copy production node_modules
RUN cp -R node_modules prod_node_modules
# Install all node modules
RUN npm install

# Running `npm ci` removes the existing node_modules directory.
# Passing in --only=production ensures that only the production dependencies are installed.
# This ensures that the node_modules directory is as optimized as possible.
# RUN npm ci --only=production && npm cache clean --force

# Bundle app source
COPY . .
# COPY --chown=node:node . .
# USER node

# Build the project
RUN npm run build

# VOLUME /usr/src/app
VOLUME [ "/usr/src/app/prod_node_modules" ]

# Your app binds to port $PORT so use the EXPOSE instruction
EXPOSE $PORT

# # CMD [ "npm", "run", "start:prod" ]

# If you want to use a multi-stage build to reduce the image size comment previos line and uncomment next lines

# Stage 2: Setup the production environment
FROM node:alpine
LABEL name="node-home-service-runner"
RUN apk --no-cache add curl

# to change when run docker
ARG PORT=4000
# Set NODE_ENV environment variable
ARG NODE_ENV=production
ENV NODE_ENV $NODE_ENV
WORKDIR /usr/src/app
RUN mkdir /usr/src/app/dist; mkdir /usr/src/app/node_modules

# # If building for production don'tuse Linux host
COPY ./.env ./.env
COPY --from=builder /usr/src/app/doc ./doc
COPY --from=builder /usr/src/app/dist ./dist
COPY --from=builder /usr/src/app/prod_node_modules ./node_modules

# OR if building for production use Linux host
# COPY ./doc ./doc
# COPY ./dist ./dist
# COPY ./node_modules ./node_modules
# COPY ./.env ./.env

EXPOSE $PORT

# VOLUME /usr/src/app
VOLUME [ "/usr/src/app/node_modules", "/var/log" ]

CMD [ "node", "dist/main" ]

# Adding a health check to your Dockerfile
HEALTHCHECK --interval=1m \
 --timeout=5s \
 CMD curl -s -o /var/log/pingapp.log http://$HOSTNAME:$PORT/ || exit 1

# Подключение
# docker build -t home-service-nodejs .
# daemon mode for docker:
# docker run -d -p $PORT:$PORT --name home-service-nodejs-container home-service-nodejs 
