FROM debian:bookworm-slim

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

RUN  apt-get -f install

RUN chown -R mysql:mysql /var/lib/mysql /var/run/mysqld 
RUN chmod 750 /var/run/mysqld /var/lib/mysql

RUN rm *.deb
COPY ./mysql.cnf /etc/mysql/

# RUN mkdir -p /var/run/mysqld /var/lib/mysql && \
#     echo "mysql-server mysql-server/root_password password rootpassword" | debconf-set-selections && \
#     echo "mysql-server mysql-server/root_password_again password rootpassword" | debconf-set-selections && \
#     sed -i 's/bind-address.*/bind-address = 0.0.0.0/' /etc/mysql/my.cnf && \
#     chown -R mysql:mysql /var/lib/mysql /var/run/mysqld && \
#     chmod 1777 /var/run/mysqld /var/lib/mysql


WORKDIR /var/lib/mysql
RUN mkdir mysql-files
RUN chown mysql:mysql mysql-files
RUN chmod 750 mysql-files
RUN /bin/mysql_ssl_rsa_setup
#RUN /bin/mysqld_safe --initialize --user=mysql
RUN /bin/mysqld_safe --initialize --user=mysql --datadir=/var/lib/mysql
VOLUME /var/lib/mysql

# RUN service mysqld_safe start \
#     && mysqladmin -u root password $MYSQL_ROOT_PASSWORD \
#     && mysqld_safe --user=root --password=$MYSQL_ROOT_PASSWORD -e "CREATE DATABASE IF NOT EXISTS ${MYSQL_DATABASE};" \
#     && mysqld_safe --user=root --password=$MYSQL_ROOT_PASSWORD -e "GRANT ALL PRIVILEGES ON ${MYSQL_DATABASE}.* TO '${MYSQL_USER}'@'%' IDENTIFIED BY '${MYSQL_PASSWORD}';" \
#     && mysqld_safe --user=root --password=$MYSQL_ROOT_PASSWORD -e "FLUSH PRIVILEGES;"

ENTRYPOINT ["mysqld", "--user=mysql", "--log-error-verbosity=true"]

EXPOSE 3306/tcp 33060/tcp