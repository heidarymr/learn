<?php
header('Content-Type: application/json; charset=utf-8');
require_once 'config.php';

// مسیر و متد را دریافت کن
$method = $_SERVER['REQUEST_METHOD'];
$path = isset($_GET['path']) ? $_GET['path'] : '';
$id = isset($_GET['id']) ? $_GET['id'] : null;

// روت ساده برای نمونه
switch ($path) {
    case 'courses':
        if ($method === 'GET') getList($pdo, 'courses');
        break;
    case 'course':
        if ($method === 'GET' && $id) getItem($pdo, 'courses', $id);
        break;
    case 'flashcards':
        if ($method === 'GET') getList($pdo, 'flashcards');
        break;
    case 'flashcard':
        if ($method === 'GET' && $id) getItem($pdo, 'flashcards', $id);
        break;
    case 'exercises':
        if ($method === 'GET') getList($pdo, 'exercises');
        break;
    case 'exercise':
        if ($method === 'GET' && $id) getItem($pdo, 'exercises', $id);
        break;
    case 'idioms':
        if ($method === 'GET') getList($pdo, 'idioms');
        break;
    case 'idiom':
        if ($method === 'GET' && $id) getItem($pdo, 'idioms', $id);
        break;
    case 'readings':
        if ($method === 'GET') getList($pdo, 'readings');
        break;
    case 'reading':
        if ($method === 'GET' && $id) getItem($pdo, 'readings', $id);
        break;
    case 'wordlist':
        if ($method === 'GET') getList($pdo, 'wordlist');
        break;
    case 'word':
        if ($method === 'GET' && $id) getItem($pdo, 'wordlist', $id);
        break;
    case 'v_course_flashcard_stats':
        if ($method === 'GET') getList($pdo, 'v_course_flashcard_stats');
        break;
    case 'v_course_summary':
        if ($method === 'GET') getList($pdo, 'v_course_summary');
        break;
    default:
        echo json_encode(['error' => 'Invalid endpoint']);
        break;
}

// دریافت لیست
function getList($pdo, $table) {
    $stmt = $pdo->query("SELECT * FROM `$table`");
    $items = $stmt->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode([$table => $items]);
}

// دریافت یک آیتم خاص
function getItem($pdo, $table, $id) {
    $stmt = $pdo->prepare("SELECT * FROM `$table` WHERE id = ?");
    $stmt->execute([$id]);
    $item = $stmt->fetch(PDO::FETCH_ASSOC);
    if ($item) {
        echo json_encode([$table => $item]);
    } else {
        http_response_code(404);
        echo json_encode(['error' => 'Not found']);
    }
}
?>