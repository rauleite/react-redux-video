FROM node:6.10-alpine

MAINTAINER rauleite

WORKDIR app

# ADD dist dist
# ADD dist-server dist-server

# VOLUME node_modules node_modules

# RUN npm install pm2
# RUN pm2-docker start npm -- start

ENTRYPOINT npm start
