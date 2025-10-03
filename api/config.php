<?php
// تنظیمات اتصال به دیتابیس
$DB_HOST = 'localhost';
$DB_NAME = 'esential_english';
$DB_USER = 'esential_english';
$DB_PASS = 'h4Fi%9iFj59';

try {
    $pdo = new PDO("mysql:host=$DB_HOST;dbname=$DB_NAME;charset=utf8", $DB_USER, $DB_PASS);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Database connection failed']);
    exit;
}
?>