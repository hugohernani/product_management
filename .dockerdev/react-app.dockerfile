# pull official base image
ARG NODE_VERSION=13.12.0
FROM node:$NODE_VERSION-alpine

ARG APP_DIR=/app

# set working directory
WORKDIR $APP_DIR

# add `$APP_DIR/node_modules/.bin` to $PATH
ENV PATH $APP_DIR/node_modules/.bin:$PATH

# install app dependencies
RUN npm install --silent
RUN npm install react-scripts@4.0.3 -g --silent

# start app
CMD ["npm", "start"]
