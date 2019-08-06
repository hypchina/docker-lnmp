FROM cat2xyj/mini_php
#加载源
COPY swoole-4.3.1.tgz /usr/local/lib/swoole-4.3.1.tgz

RUN printf "no" | pecl install /usr/local/lib/swoole-4.3.1.tgz \
&& echo "extension=swoole.so" > /usr/local/etc/php/conf.d/ext-swoole.ini
#构建镜像 docker build -t 镜像名称 上下文路径