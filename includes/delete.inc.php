<?php

if(isset($_POST['delete'])) {

    require('dbh.inc.php');

    $delete = $_POST['delete'];
    $errors = ['connectionError' => '', 'queryError' => '', 'requestError' => ''];

    $dbh = new Dbh;
    $conn = $dbh->connect();
    $errors['connection'] = $dbh->connError;

    if($conn) {
        try {
            $sql = 'DELETE FROM products WHERE id = :id';
            $stmt = $conn->prepare($sql);
            $stmt->execute(['id' => $delete]);
        } catch (PDOException $e) {
            $errors['query'] = 'Query error: ' . $e;
        }
    }
    
    $errorsJSON = json_encode($errors);
    echo $errorsJSON;
}

?>