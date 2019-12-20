<?php


if(isset($_POST['get'])) {

    require('dbh.inc.php');

    $products = [];
    $errors = ['connectionError' => '', 'queryError' => ''];

    $dbh = new Dbh;
    $conn = $dbh->connect();
    $errors['connectionError'] = $dbh->connError;

    if($conn) {
        $get = $_POST['get'];
        if($get == 'all') {
            try {
                $sql = 'SELECT * FROM products ORDER BY id DESC';
                $stmt = $conn->prepare($sql);
                $stmt->execute();
                $products['products'] = $stmt->fetchAll(PDO::FETCH_ASSOC);
            } catch (PDOException $e) {
                $errors['queryError'] = 'Query error: ' . $e;
            }
        }
    }

    $errorsWithProducts = $errors + $products;
    $errorsWithProductsJSON = json_encode($errorsWithProducts);
    echo $errorsWithProductsJSON;
}

?>