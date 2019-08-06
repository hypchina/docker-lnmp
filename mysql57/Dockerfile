FROM mysql:5.7
RUN rm -rf /etc/mysql/conf.d/*
COPY ["./my.cnf","/etc/mysql/conf.d/my.cnf"]
RUN chmod -R 644 /etc/mysql/conf.d
CMD ["/entrypoint.sh","mysqld"]
#docker build -t testmysql-image .
