FROM php:7.3-fpm

COPY swoole-4.4.17.tgz /usr/local/lib/swoole-4.4.17.tgz
COPY xdebug-2.9.4.tgz /usr/local/lib/xdebug-2.9.4.tgz
COPY composer.phar /usr/local/bin/composer
#COPY composer.installer.php /usr/local/lib/composer.installer.php
COPY sources.list /etc/apt/sources.list
# 测试容器 docker run --name testphp -it --rm php:7.3-fpm bash
# 官方版本默认安装扩展:
# Core, ctype, curl
# date, dom
# fileinfo, filter, ftp
# hash
# iconv
# json
# libxml
# mbstring, mysqlnd
# openssl
# pcre, PDO, pdo_sqlite, Phar, posix
# readline, Reflection, session, SimpleXML, sodium, SPL, sqlite3, standard
# tokenizer
# xml, xmlreader, xmlwriter
# zlib

RUN apt-get update && apt-get install -y git \
        libbz2-dev \
        libenchant-dev \
        libfreetype6-dev \
        libjpeg62-turbo-dev \
        libpng-dev \
        libgmp-dev \
        libxml2-dev \
        libtidy-dev \
        libxslt1-dev \
        libzip-dev \
        libsnmp-dev \
        libpq-dev \
        libpspell-dev \
        librecode-dev \
        firebird-dev \
        freetds-dev \
        libldap2-dev \
        libicu-dev \
        libmcrypt-dev \
        libreadline-dev \
        libmagickwand-dev \
        build-essential \
        libmagickcore-dev \
        libmagickwand-dev \
&& docker-php-ext-install \
        bz2 \
        enchant \
        gmp \
        soap \
        wddx \
        xmlrpc \
        tidy \
        xsl \
        zip \
        snmp \
        pgsql \
        pdo_pgsql \
        pspell \
        recode \
        pdo_firebird \
        interbase \
        intl
RUN docker-php-ext-configure gd --with-freetype-dir=/usr/include/ --with-jpeg-dir=/usr/include/ && docker-php-ext-install -j$(nproc) gd
RUN docker-php-ext-configure pdo_dblib --with-libdir=lib/x86_64-linux-gnu && docker-php-ext-install -j$(nproc) pdo_dblib
RUN docker-php-ext-configure ldap --with-libdir=lib/x86_64-linux-gnu && docker-php-ext-install -j$(nproc) ldap
#RUN docker-php-ext-configure imap --with-kerberos --with-imap-ssl && docker-php-ext-install imap

RUN pecl install mcrypt-1.0.3 && docker-php-ext-enable mcrypt
# imagick
RUN export CFLAGS="$PHP_CFLAGS" CPPFLAGS="$PHP_CPPFLAGS" LDFLAGS="$PHP_LDFLAGS" && pecl install imagick-3.4.3 && docker-php-ext-enable imagick


# 1.0.22 redis 扩展
RUN pecl install redis-5.2.1 && docker-php-ext-enable redis
# 1.0.23 增加 swoole 扩展
RUN pecl install /usr/local/lib/swoole-4.4.17.tgz && docker-php-ext-enable swoole
# 1.0.24 增加 opcache 扩展
RUN docker-php-ext-configure opcache --enable-opcache && docker-php-ext-install opcache
# 1.0.25 增加 xdebug 扩展
RUN pecl install /usr/local/lib/xdebug-2.9.4.tgz && docker-php-ext-enable xdebug
# composer
RUN chmod 755 /usr/local/bin/composer && composer config -g repo.packagist composer https://packagist.phpcomposer.com
#RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer \
#    && composer config -g repo.packagist composer https://packagist.phpcomposer.com
#RUN php -r "readfile('composer.installer.php');" | php -- --install-dir=/usr/local/bin --filename=composer \
#&& composer config -g repo.packagist composer https://packagist.phpcomposer.com

# 1.0.2 增加 bcmath, calendar, exif, gettext, sockets, dba,
# mysqli, pcntl, pdo_mysql, shmop, sysvmsg, sysvsem, sysvshm 扩展
RUN docker-php-ext-install -j$(nproc) bcmath calendar exif gettext \
sockets dba mysqli pcntl pdo_mysql shmop sysvmsg sysvsem sysvshm

# 1.0.26 增加 odbc, pdo_odbc 扩展
RUN set -ex; \
docker-php-source extract; \
{ \
     echo '# https://github.com/docker-library/php/issues/103#issuecomment-271413933'; \
     echo 'AC_DEFUN([PHP_ALWAYS_SHARED],[])dnl'; \
     echo; \
     cat /usr/src/php/ext/odbc/config.m4; \
} > temp.m4; \
mv temp.m4 /usr/src/php/ext/odbc/config.m4; \
apt-get update; \
apt-get install -y --no-install-recommends unixodbc-dev; \
rm -rf /var/lib/apt/lists/*; \
docker-php-ext-configure odbc --with-unixODBC=shared,/usr; \
docker-php-ext-configure pdo_odbc --with-pdo-odbc=unixODBC,/usr; \
docker-php-ext-install odbc pdo_odbc; \
docker-php-source delete

# 镜像信息
LABEL Author="Hyp"
LABEL Version="1.0.25-fpm"
LABEL Description="PHP FPM 7.3 镜像. All extensions."


#构建镜像 docker build -t 镜像名称 上下文路径