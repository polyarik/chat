<?php

function addMessage($link, $message) {
    $query = "INSERT INTO " . TABLE . "(username, dt, msg) VALUES ('" . USERNAME . "', UTC_TIMESTAMP(), '$message')";
    return mysqli_query($link, $query);
}

function selectMessages($link, $from=0, $to=null) {
    $floor = "1";
    $ceil = "1";

    if ($from)
        $floor = "id >= " . $from;

    if ($to)
        $ceil = "id <= " . $to;

    $query = "SELECT * FROM " . TABLE . " WHERE $floor AND $ceil ORDER BY dt DESC";
    return mysqli_query($link, $query);
}

function deleteAllMessages($link) {
    $query = "DROP TABLE " . TABLE;
    return mysqli_query($link, $query);
}