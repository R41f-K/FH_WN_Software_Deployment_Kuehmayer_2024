FROM debian:bookworm-slim

ARG MYSQL_DATABASE
ENV MYSQL_DATABASE $MYSQL_DATABASE
ARG MYSQL_PASSWORD
ENV MYSQL_PASSWORD $MYSQL_PASSWORD
ARG MYSQL_USER
ENV MYSQL_USER $MYSQL_USER
ARG MYSQL_RANDOM_ROOT_PASSWORD
ENV MYSQL_RANDOM_ROOT_PASSWORD $MYSQL_RANDOM_ROOT_PASSWORD

RUN groupadd -r mysql && useradd -r -g mysql -s /bin/false mysql

RUN apt-get update
RUN apt-get install -y \
    dpkg \
    tar \
    libaio1 \
    perl \
    psmisc \
    libtirpc3 \
    libnuma1 \ 
    libmecab2 \
    libkrb5-3 \
    libgssapi-krb5-2 \
    libsasl2-2 \
    openssl


COPY mysql-server_8.0.40-1debian12_amd64.deb-bundle.tar /mysql-server_8.0.40-1debian12_amd64.deb-bundle.tar

RUN tar -xvf mysql-server_8.0.40-1debian12_amd64.deb-bundle.tar

RUN dpkg-preconfigure mysql-community-server_*.deb
RUN dpkg -i mysql-common_*.deb mysql-community-client-plugins_*.deb mysql-community-client-core_*.deb mysql-community-client_*.deb mysql-client_*.deb mysql-community-server-core_*.deb mysql-community-server_*.deb mysql-server_*.deb

RUN apt-get -f install

RUN chown -R mysql:mysql /var/lib/mysql /var/run/mysqld 
RUN chmod 750 /var/run/mysqld /var/lib/mysql

RUN rm *.deb
COPY ./mysql.cnf /etc/mysql/

WORKDIR /var/lib/mysql
RUN mkdir mysql-files
RUN chown mysql:mysql mysql-files
RUN chmod 750 mysql-files
RUN /bin/mysql_ssl_rsa_setup
RUN /bin/mysqld_safe --initialize-insecure --user=mysql --datadir=/var/lib/mysql
VOLUME /var/lib/mysql

RUN mysqld --user=root --datadir=/var/lib/mysql & \
    pid=$! && sleep 4 && \
    mysql --user=root -e "ALTER USER 'root'@'localhost' IDENTIFIED BY '${MYSQL_RANDOM_ROOT_PASSWORD}';" && \
    mysql --user=root -e "CREATE DATABASE IF NOT EXISTS ${MYSQL_DATABASE};" && \
    mysql --user=root -e "CREATE USER IF NOT EXISTS '${MYSQL_USER}'@'%' IDENTIFIED BY '${MYSQL_PASSWORD}';" && \
    mysql --user=root -e "GRANT ALL PRIVILEGES ON \`${MYSQL_DATABASE}\`.* TO '${MYSQL_USER}'@'%';" && \
    mysql --user=root -e "FLUSH PRIVILEGES;" && \
    kill $pid && echo $pid && sleep 4

RUN chown -R mysql:mysql /var/lib/mysql /var/run/mysqld 
RUN chmod 750 /var/run/mysqld /var/lib/mysql

CMD ["mysqld", "--user=mysql", "--log-error-verbosity=true", "--datadir=/var/lib/mysql"]

EXPOSE 3306/tcp 33060/tcp