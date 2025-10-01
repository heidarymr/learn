
<?php
$json = file_get_contents('data.json');
$data = json_decode($json, true);
$flashcards = $data['flashcard'] ?? [];
function getImage($img) {
        if (!$img) return '';
        return 'data/' . $img;
}
?>
<!DOCTYPE html>
<html lang="fa">
<head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>اپلیکیشن آموزش زبان</title>
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.rtl.min.css" rel="stylesheet">
        <script src="https://code.jquery.com/jquery-3.7.1.min.js"></script>
        <style>
                body { background: #f8f9fa; }
                .unit-card { transition: box-shadow .2s; }
                .unit-card:hover { box-shadow: 0 0 20px #bbb; }
                .word-img { max-width: 60px; border-radius: 8px; }
                .modal-lg { max-width: 90vw; }
        </style>
</head>
<body>
<nav class="navbar navbar-expand-lg navbar-light bg-white shadow-sm">
    <div class="container">
        <a class="navbar-brand fw-bold" href="#">اپ آموزش زبان</a>
        <button id="settings" class="btn btn-outline-secondary ms-auto font-size" itemid="1"><img src="/apps-data/icons/Settings-50.png" alt="تنظیمات" style="width:24px;"> تنظیمات</button>
    </div>
</nav>
<div id="container" class="container py-4" style="opacity:1;">
    <div id="home-section">
        <h2 class="mb-4 text-center">واحدهای آموزشی</h2>
        <ul class="curriculum-item row g-4">
            <?php foreach ($flashcards as $idx => $unit): ?>
                <li class="col-12 col-sm-6 col-lg-4 item word-list-session" en="<?= htmlspecialchars($unit['en']) ?>" idx="<?= $idx ?>" wl="<?= isset($unit['wordlist']) ? count($unit['wordlist']) : 0 ?>">
                    <div class="card unit-card h-100">
                        <?php if (!empty($unit['image'])): ?>
                            <img src="<?= getImage($unit['image']) ?>" class="card-img-top" alt="<?= htmlspecialchars($unit['en']) ?>">
                        <?php endif; ?>
                        <div class="card-body d-flex flex-column">
                            <h5 class="card-title"> <?= htmlspecialchars($unit['en']) ?> </h5>
                            <p class="card-text text-muted"> <?= htmlspecialchars($unit['desc']) ?> </p>
                            <button class="btn btn-primary mt-auto show-unit-details" data-idx="<?= $idx ?>">مشاهده جزئیات</button>
                        </div>
                    </div>
                </li>
            <?php endforeach; ?>
        </ul>
    </div>
    <div id="category-section" style="display:none;">
        <div class="section">
            <div class="title"></div>
            <div class="container"></div>
        </div>
    </div>
</div>
<div id="bottom-section" style="display:none;">
    <audio id="sound" src="" controls style="width:100%;"></audio>
    <div class="container"></div>
</div>
<footer class="text-center py-4 bg-white mt-5 shadow-sm">
    <div class="container">
        <span class="text-muted">&copy; <?= date('Y') ?> اپ آموزش زبان | ساخته شده با PHP و Bootstrap</span>
    </div>
</footer>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"></script>
<script src="flashcard.min.js"></script>
</body>
</html>
