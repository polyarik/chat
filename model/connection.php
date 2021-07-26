<?php

$link = mysqli_connect(HOST, MYSQL_USER, MYSQL_PASS, DATABASE) or die(mysqli_error());

mysqli_query($link, "CREATE TABLE IF NOT EXISTS " . TABLE . "(id INT NOT NULL AUTO_INCREMENT PRIMARY KEY, username VARCHAR(30), dt DATETIME, msg TEXT)")
    or die("Can't create the message table.");