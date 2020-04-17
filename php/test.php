<?php

$url = 'http://www.yssc666.com/shopsn_api/index.php/Home/Index/home';
$data = [];
$method = 'POST';

$ch = curl_init();
echo '<pre>';print_r($ch);
$method = strtoupper($method);

if ($method != 'GET') {
	curl_setopt($ch, CURLOPT_POST, true);
	curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query($data));
} else {
	$url .= '?'.http_build_query($data);
}
curl_setopt($ch, CURLOPT_URL, $url);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, false);

$output = curl_exec($ch);
if(curl_errno($ch)) {
	echo 'error: ' . curl_error($ch);
}

curl_close($ch);
$res = json_decode($output, true);


echo '<pre>';
print_r($res);