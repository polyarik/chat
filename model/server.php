<?php

header("Content-Type: text/html; charset=utf-8");
error_reporting(E_ALL);
//ini_set('display_errors','Off');

session_start();

include("server-data.php");
include("connection.php");
require("functions.php"); //require_once()

identifyUser();

if (isset($_GET['func'])) {
	switch ($_GET['func']) {
		case 'setName': {
			$username = str_replace("\n", "", $_GET['username']);
			$username = validateString($link, $username, 30);
			
			if ($username) {
				$_SESSION["username"] = $username;
				echo json_encode($_SESSION["username"]);
			} else
				echo "0";

			break;
		}

		case 'newMessage': {
			$message = validateString($link, $_GET['message']);

			if ($message) {
				$result = addMessage($link, $message);
				echo json_encode($result);
			} else
				echo "0";

			break;
		}

		case 'getMessages': {
			$from = ctype_digit($_GET['from']) ? intval($_GET['from']) : null;
			$to = ctype_digit($_GET['to']) ? intval($_GET['to']) : null;

			$result = selectMessages($link, $from, $to);
			$messages = array();

			while ($row = mysqli_fetch_array($result, MYSQLI_ASSOC)) {
				$message = array('username' => $row['username'], 'dt' => $row['dt'], 'msg' => $row['msg']);
				$messages[$row['id']] = $message;
			}

			echo json_encode($messages);
			break;
		}

		case 'eraseAllMessages': {
			if ($GET['password'] === PASSWORD) {
				$res = deleteAllMessages($link);
				echo json_encode($res);
			} else
				echo "0";
		}
	}
}

function identifyUser() {
	$username = "username";

	if (isset($_SESSION["username"]))
		$username = $_SESSION["username"];

	define("USERNAME", $username);
}

function validateString($link, $string, $maxLen=4096) {
	$string = substr($string, 0, $maxLen); 
	$string = str_replace(" ", " ", $string);

	if (gettype($string) === "string" && strlen($string) > 0 && !ctype_space($string)) {
		$string = str_replace("<", "&lt", $string);
		$string = str_replace(">", "&gt", $string);
		//$string = str_replace("\n", "<br>", $string) . "<br>";
		$string = mysqli_real_escape_string($link, $string);

		return $string;
	} else
		return false;
}