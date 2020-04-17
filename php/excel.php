<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2018-08-24
 * Time: 16:24
 */

require_once './PHPExcel/PHPExcel.php';

set_time_limit(0);
$outfile = './sql/1.sql';
$dir = "./bank/";

$fileList = scandir($dir);
echo "开始创建";
//print_r($fileList);die;
foreach ($fileList as $f) {
    if (!is_dir($f)) {
        $filePath = $dir.$f;
        echo iconv('gbk' , 'utf-8' , $filePath)."<br>";
        wrFile($filePath, $outfile);
    }
}

echo "创建完成";


function wrFile($filePath, $outfile) {
    
    $outfile = str_replace('.xlsx', '.sql', $filePath);
    $outfile = str_replace('/bank/', '/sql/', $outfile);
    $myfile = fopen($outfile, "w");
    fwrite($myfile, "\n");
    
    /**默认用excel2007读取excel，若格式不对，则用之前的版本进行读取*/
    $PHPReader = new PHPExcel_Reader_Excel2007();
    if(!$PHPReader->canRead($filePath)){
        $PHPReader = new PHPExcel_Reader_Excel5();
        if(!$PHPReader->canRead($filePath)){
            echo 'no Excel';
            return ;
        }
    }

    $PHPExcel = $PHPReader->load($filePath);
    /**读取excel文件中的第一个工作表*/
    $currentSheet = $PHPExcel->getSheet(0);
    /**取得最大的列号*/
    $allColumn = $currentSheet->getHighestColumn();
    /**取得一共有多少行*/
    $allRow = $currentSheet->getHighestRow();

    /**从第二行开始输出，因为excel表中第一行为列名*/
    for($currentRow = 2;$currentRow <= $allRow;$currentRow++){
        /**从第A列开始输出*/
        $txt = "";
        for($currentColumn= 'C';$currentColumn<= $allColumn; $currentColumn++){

            if ($currentColumn == 'C' || $currentColumn == 'F') {
                /**ord()将字符转为十进制数*/
                $val = $currentSheet->getCellByColumnAndRow(ord($currentColumn) - 65,$currentRow)->getValue();
                if ($val) {
                    $txt = $txt . ",\t'" . trim($val) . "'";
                }

            }

            // 名称处理
            if ($currentColumn == 'H') {
                /**ord()将字符转为十进制数*/
                $val = $currentSheet->getCellByColumnAndRow(ord($currentColumn) - 65,$currentRow)->getValue();
                if ($val) {

                    $varArry = explode('|', $val);

                    $num = '';
                    if (count($varArry) == 2) {
                        $name = $varArry[1];
                        $num = $varArry[0];
                    } else {
                        $name = $varArry[0];
                    }

                    $txt = $txt . ",\t'" . trim($name) . "'" . ",\t'" . trim($num) . "'";

                }

            }

        }
        if (!empty($txt)) {
            $txt = "INSERT INTO `db_a_bank_num` VALUES (null" . $txt . ");\n";
            fwrite($myfile, $txt);
        }
        
    }
    
    fclose($myfile);

}




