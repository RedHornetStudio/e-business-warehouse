<?php

require('dbh.inc.php');

if(isset($_POST['title'])) {
    $title = $_POST['title'];
    $description = $_POST['description'];
    $price = $_POST['price'];
    $stock = $_POST['stock'];
    $errors = ['connection' => '', 'query' => '', 'title' => '', 'description' => '', 'price' => '', 'stock' => ''];

    // check for errors in input fields
    $title = trim($_POST['title']);
    if(empty($title)) {
        $errors['title'] = 'a title is required';
    } else {
        if(!preg_match("/^[a-zA-Z0-9\s]+$/", $title)) {
            $errors['title'] = 'invalid title';
        }
    }

    $description = trim($_POST['description']);
    if(empty($description)) {
        $errors['description'] = 'a description is required';
    }

    $price = trim($_POST['price']);
    if(empty($price)) {
        $errors['price'] = 'a price is required';
    } else {
        if(!preg_match("/^([0-9]+){0,1}(\.[0-9]*){0,1}$/", $price)) {
            $errors['price'] = 'invalid price';
        }
    }

    $stock = trim($_POST['stock']);
    if(empty($stock)) {
        $errors['stock'] = 'a stock is required';
    } else {
        if(!preg_match("/^[0-9]+$/", $stock)) {
            $errors['stock'] = 'ivalid stock';
        }
    }

    $isError = false;
    foreach($errors as $error) {
        if($error != '') {
            $isError = true;
            break;
        }
    }

    if($isError) {
        $errorsJSON = json_encode($errors);
        echo $errorsJSON;
    } else {
        $dbh = new Dbh;
        $conn = $dbh->connect();
        $errors['connection'] = $dbh->connError;

        if($conn && !$isError) {
            try {
                $sql = 'INSERT INTO products (title, descrip, price, stock) VALUES (:title, :descrip, :price, :stock)';
                $stmt = $conn->prepare($sql);
                $stmt->execute(['title' => $title, 'descrip' => $description, 'price' => $price, 'stock' => $stock]);
            } catch (PDOException $e) {
                $errors['query'] = 'Query error: ' . $e;
            }
        }
        
        $errorsJSON = json_encode($errors);
        echo $errorsJSON;
    }
}

?>