UPDATE mysql.user SET authentication_string=PASSWORD("mihai") WHERE USER="root";
UPDATE mysql.user SET plugin="mysql_native_password";
