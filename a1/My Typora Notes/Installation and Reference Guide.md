# Installation and Reference Guide

### LAMP installation

You-tube : Traversy Media

Install Lamp Stack (Linux, Apache, MySQL, PHP) 

###### Steps to be follow:

- sudo apt-get update

- sudo apt-get install apache2

  ​	after the installation  cross check in the browser(localhost)

- sudo apt-add-repository ppa:ondrej/php

- sudo apt-get update

- sudo apt-get install php7.0

- sudo /etc/init.d/apache2 restart

- sudo nano /var/www/html/test.php

  ​	just to check whether php is working. Write some code and execute it. (localhost/test.php) any browser

- sudo apt-get install mysql-server

- sudo mysql -u root -p

  ​	here create your db 

- sudo apt-get install phpmyadmin