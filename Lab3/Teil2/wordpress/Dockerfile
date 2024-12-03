FROM debian:bookworm-slim

RUN apt-get update
RUN apt-get install -y \
    apache2 \
    php-curl \
    php-gd \
    php-mbstring \
    php-xml \
    php-xmlrpc \
    php-soap \
    php-intl \
    php-zip \
    php \
    libapache2-mod-php \
    php-mysql \
    curl

COPY ./apache2.conf /etc/apache2/sites-available/wordpress.conf
RUN rm /var/www/html/index.html

RUN a2dissite 000-default
RUN a2ensite wordpress
RUN a2enmod rewrite
RUN apache2ctl configtest

WORKDIR /tmp
COPY ./wordpress-6.7.1.tar.gz ./wordpress-6.7.1.tar.gz
RUN tar xzvf wordpress-6.7.1.tar.gz
RUN touch /tmp/wordpress/.htaccess
RUN chmod 660 /tmp/wordpress/.htaccess
RUN mkdir /tmp/wordpress/wp-content/upgrade
RUN cp -arf /tmp/wordpress/. /var/www/wordpress

RUN rm -r /tmp/wordpress

RUN chown -R www-data:www-data /var/www/wordpress
RUN find /var/www/wordpress -type d -exec chmod g+s {} \;
RUN chmod g+w /var/www/wordpress/wp-content
RUN chmod -R g+w /var/www/wordpress/wp-content/themes
RUN chmod -R g+w /var/www/wordpress/wp-content/plugins
RUN mkdir -p /var/www/wordpress/wordpress/wp-content/uploads 
RUN chown -R www-data:www-data /var/www/wordpress/wordpress/wp-content/uploads 

COPY ./wp-config-sample.php /var/www/wordpress/wp-config.php

VOLUME /var/www/wordpress
EXPOSE 80/tcp

CMD ["apachectl", "-D", "FOREGROUND"]