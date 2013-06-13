<?php
$address = 'localhost';
$port = 2947;

$socket = socket_create(AF_INET, SOCK_STREAM, SOL_TCP);

if ($socket == false) {
	return;
}

$result = socket_connect($socket, $address, $port);

if ($result == false) {
	return;
}

$in = "?WATCH={\"enable\":true,\"json\":true};\n";

socket_write($socket, $in, strlen($in));

$out = socket_read($socket, 2048);

echo $out;

socket_close($socket);

?>