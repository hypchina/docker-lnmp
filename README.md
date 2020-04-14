# docker-lnmp
docker lnmp+redis集成环境配置,由于是在win7下使用boot2docker安装的docker，mysql的配置有些奇特，配置文件挂载得比较麻烦，不易修改，mysql的持久化目录也挂载不到win7共享目录下面 直接挂载到Oracle VM VirtualBox的指定目录下/data/storage/mysql57
win7和VirtualBox的共享目录名为dockershare
lnmp-config里面是配置文件(mysql除外，mysql的配置文件在mysql57里面)
app为php代码目录
data/storage为redis的数据持久化目录，mysql在使用boot2docker的时候不能把持久化目录指定到win7的分享目录里面 要不mysql各种问题
data/logs 日志目录

clone 代码到本地，把docker-lnmp 目录 更改为dockershare,然后 
docker-compose up -d
docker-compose -f mysql-compose.yml up -d


# 停止容器，删除容器 删除镜像
docker ps -a | grep "Exited" | awk '{print $1 }'|xargs docker stop
docker ps -a | grep "Exited" | awk '{print $1 }'|xargs docker rm
docker images|grep none|awk '{print $3 }'|xargs docker rmi
