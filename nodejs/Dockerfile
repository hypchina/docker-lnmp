FROM node:8.16.0-alpine
ADD . /server/www/
WORKDIR /server/www/
RUN cd /server/www && npm install
EXPOSE 3001
CMD ["node","server.js"]