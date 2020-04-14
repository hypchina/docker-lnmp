FROM node:latest
RUN mkdir -p /home/www/express
# workdir不要是windows和虚拟机共享的目录，会有一些意向不到的权限错误
WORKDIR /home/www/express
COPY . /home/www/express
RUN npm install
# ENTRYPOINT ["npm", "run"]
CMD [ "npm", "start" ]