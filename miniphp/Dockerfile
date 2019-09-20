FROM cat2xyj/mini_php
#加载源
COPY swoole-4.3.1.tgz /usr/local/lib/swoole-4.3.1.tgz

RUN printf "no" | pecl install /usr/local/lib/swoole-4.3.1.tgz \
&& echo "extension=swoole.so" > /usr/local/etc/php/conf.d/ext-swoole.ini
RUN pecl install xdebug && docker-php-ext-enable xdebug
RUN groupadd dockeruser && useradd -g dockeruser dockeruser
USER dockeruser
#构建镜像 docker build -t 镜像名称 上下文路径