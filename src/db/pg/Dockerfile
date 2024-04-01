FROM postgres:alpine
LABEL name="postgres4nodejs"
RUN localedef -i ru_RU -c -f UTF-8 -A /usr/share/locale/locale.alias ru_RU.UTF-8;\
    ln -sf /bin/bash /bin/sh
    # apt update && apt install -y iputils-ping net-tools iproute2 mc mc-data
ENV LANG ru_RU.utf8
ARG POSTGRES_EXPOSE=5432
# ENV POSTGRES_USER changeitwhenrun
# ENV POSTGRES_PASSWORD changeitwhenrun
# ENV POSTGRES_DB changeitwhenrun
WORKDIR /var/lib/postgresql/data
VOLUME [ "/var/lib/postgresql/data", "/var/log" ]
# RUN cp /usr/share/postgresql/postgresql.conf.sample /etc/postgresql/postgresql.conf
# RUN sed -i "s/#port = 5432/port = ${POSTGRES_EXPOSE}/g" /etc/postgresql/postgresql.conf
ENV PGPORT $POSTGRES_EXPOSE
EXPOSE $POSTGRES_EXPOSE
# задать конфигурацию базы данных:
# COPY postgresql.conf /etc/postgresql/postgresql.conf
# добавить скрипт инициализации базы данных:
COPY ./db.sql /docker-entrypoint-initdb.d/init.sql

# Adding a health check to your Dockerfile
HEALTHCHECK --interval=1m \
 --timeout=5s \
 CMD psql -U $POSTGRES_USER -d $POSTGRES_DB -l -o /var/log/pingpg.log || exit 1

# Подключение
# docker build -t postgres-for-nodejs .
# daemon mode for docker:
# docker run -d -p 15432:5432 --name postgres-for-nodejs-container postgres-for-nodejs 
