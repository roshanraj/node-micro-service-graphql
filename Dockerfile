FROM node:10
MAINTAINER rraj 
USER root
RUN apt-get update
RUN mkdir app && cd app
COPY ./ /app/
WORKDIR /app
RUN npm install 
EXPOSE 9999
CMD npm start