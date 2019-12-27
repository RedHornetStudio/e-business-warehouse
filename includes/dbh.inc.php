<?php

class Dbh {
    private $hostname;
    private $username;
    private $password;
    private $dbname;
    public $connError;

    function connect() {
        $this->hostname = "localhost";
        $this->username = "id11739129_user";
        $this->password = "warehouse";
        $this->dbname = "id11739129_warehouse";
        $this->connError = "";

        try {
            $dsn = "mysql:host=" . $this->hostname . ";dbname=" . $this->dbname;
            $conn = new PDO($dsn, $this->username, $this->password);
            $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            return $conn;
        } catch (PDOException $e) {
            $this->connError = "Connection failed: " . $e;
            return null;
        }
    }
}

?>