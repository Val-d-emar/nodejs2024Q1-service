# # Start by specifying the base image
# FROM node:latest as builder
# RUN localedef -i ru_RU -c -f UTF-8 -A /usr/share/locale/locale.alias ru_RU.UTF-8;\
#     ln -sf /bin/bash /bin/sh;\
#     apt update && apt install -y iputils-ping net-tools iproute2 mc mc-data
# ENV LANG ru_RU.utf8
# # to change when run docker
# ARG PORT=4000
# # Create app directory
# WORKDIR /usr/src/app

# # Install app dependencies
# # A wildcard is used to ensure both package.json and package-lock.json are copied
# # where available (npm@5+)
# COPY package*.json ./
# # COPY --chown=node:node package*.json ./

# # Set NODE_ENV environment variable
# # ENV NODE_ENV production

# # Install all node modules
# RUN npm install

# # Install app dependencies using the `npm ci` command instead of `npm install`
# # RUN npm ci

# # Running `npm ci` removes the existing node_modules directory.
# # Passing in --only=production ensures that only the production dependencies are installed.
# # This ensures that the node_modules directory is as optimized as possible.
# # RUN npm ci --only=production && npm cache clean --force

# # Bundle app source
# COPY . .
# # COPY --chown=node:node . .
# # USER node

# # Build the project
# RUN npm run build

# # Your app binds to port $PORT so use the EXPOSE instruction
# EXPOSE $PORT

# # CMD [ "npm", "run", "start:prod" ]

# If you want to use a multi-stage build to reduce the image size comment previos line and uncomment next lines

# Stage 2: Setup the production environment
FROM node:alpine
LABEL name="node-home-service-runner"
RUN apk --no-cache add curl

# to change when run docker
ARG PORT=4000

WORKDIR /usr/src/app

# # If building for production don'tuse Linux host
# COPY --from=builder /usr/src/app/doc ./doc
# COPY --from=builder /usr/src/app/dist ./dist
# COPY --from=builder /usr/src/app/node_modules ./node_modules
# COPY --from=builder /usr/src/app/.env ./.env

# OR if building for production use Linux host
COPY ./doc ./doc
COPY ./dist ./dist
COPY ./node_modules ./node_modules
COPY ./.env ./.env

EXPOSE $PORT

CMD [ "node", "dist/main" ]

# Adding a health check to your Dockerfile
HEALTHCHECK --interval=1m \
 --timeout=5s \
 CMD curl -s -o /dev/null http://localhost:$PORT/ || exit 1

# Подключение
# docker build -t home-service-nodejs .
# run interactive mode:
# docker run -it -p $PORT:$PORT --name home-service-nodejs-container home-service-nodejs /bin/bash
# daemon mode for docker:
# docker run -d -p $PORT:$PORT --name home-service-nodejs-container home-service-nodejs 
