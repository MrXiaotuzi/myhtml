<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2018-08-24
 * Time: 16:24
 */

require_once './PHPExcel/PHPExcel.php';

set_time_limit(0);
$outfile = './all.sql';
$dir = "./sql/";

$fileList = scandir($dir);

echo "开始合并";
$myfile = fopen($outfile, "w+");

foreach ($fileList as $f) {
    if (!is_dir($f)) {
        $filePath = $dir.$f;
        echo iconv('gbk' , 'utf-8' , $filePath)."<br>";


        $tempFile = fopen($filePath, 'r');
        $txt = fread($tempFile, filesize($filePath));

        fwrite($myfile, $txt);
        $txt = null;

    }
}

fclose($myfile);
echo "合并完成";






