<?php

header("Access-Control-Allow-Origin: *");
if(isset($_POST['get'])) {

    require('dbh.inc.php');

    $products = [];
    $errors = ['connectionError' => '', 'queryError' => '', 'requestError' => ''];

    $dbh = new Dbh;
    $conn = $dbh->connect();
    $errors['connectionError'] = $dbh->connError;   
     
    $get = $_POST['get'];
    if($get == 'all') {

        if($conn) {
            try {
                $sql = 'SELECT * FROM products ORDER BY id DESC';
                $stmt = $conn->prepare($sql);
                $stmt->execute();
                $products['products'] = $stmt->fetchAll(PDO::FETCH_ASSOC);
                // $i = 0;
                // while($result = $stmt->fetch(PDO::FETCH_ASSOC)) {
                //     $products['products'][$i] = $result;
                //     $i++;
                // }
            } catch (PDOException $e) {
                $errors['queryError'] = 'Query error: ' . $e;
            }
        }

    } else if(preg_match("/^[0-9]+$/", $get)) {

        if($conn) {
            try {
                $sql = 'SELECT * FROM products WHERE id = :id';
                $stmt = $conn->prepare($sql);
                $stmt->execute(['id' => $_POST['get']]);
                $products['products'] = $stmt->fetchAll(PDO::FETCH_ASSOC);
            } catch (PDOException $e) {
                $errors['queryError'] = 'Query error: ' . $e;
            }
        }

    } else {
        $errors['queryError'] = 'Wrong request';
    }

    $errorsWithProducts = $errors + $products;
    $errorsWithProductsJSON = json_encode($errorsWithProducts);
    echo $errorsWithProductsJSON;
}

?>