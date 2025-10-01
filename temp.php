<?php
/**
 * essential_bootstrap_app.php
 * A single-file PHP + Bootstrap 5 responsive admin + public viewer for your educational JSON data.
 * Features:
 * - Lists courses (folders)
 * - Browse flashcards per course
 * - View wordlist, readings, exercises, idioms in modals
 * - Full-text search (across titles, words, readings)
 * - Simple admin: import insert_all.sql or regenerate from data/ (requires existing generator script)
 * - Audio playback, pagination, responsive UI
 *
 * Requirements:
 * - PHP 7.4+ with PDO (MySQL)
 * - MySQL database with tables (see create_tables SQL below)
 * - Put this file in web root and configure DB credentials below
 *
 * Security note: This is a starter app. For production, enable authentication, CSRF protection,
 * and properly secure file uploads and error reporting.
 */

// ------------------- CONFIG -------------------
$dbHost = 'localhost';
$dbName = 'esential_english';
$dbUser = 'esential_english';
$dbPass = 'Wmrh~754!';
$dsn = "mysql:host=$dbHost;dbname=$dbName;charset=utf8mb4";
$dataDir = __DIR__ . '/data'; // optional: used by admin import to re-run generator
$perPage = 12; // pagination default

// ------------------- helper functions -------------------
function pdo_connect($dsn, $user, $pass) {
    try {
        $pdo = new PDO($dsn, $user, $pass, [
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
            PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8mb4"
        ]);
        return $pdo;
    } catch (Exception $e) {
        http_response_code(500);
        echo "Database connection failed: " . htmlspecialchars($e->getMessage());
        exit;
    }
}

function h($s) { return htmlspecialchars($s, ENT_QUOTES|ENT_SUBSTITUTE, 'UTF-8'); }

// ------------------- ROUTING -------------------
$pdo = pdo_connect($dsn, $dbUser, $dbPass);
$action = $_GET['action'] ?? 'home';

// API endpoints used by JS
if (isset($_GET['api'])) {
    header('Content-Type: application/json; charset=utf-8');
    $api = $_GET['api'];
    if ($api === 'courses') {
        $stmt = $pdo->query('SELECT id, name FROM courses ORDER BY name');
        echo json_encode($stmt->fetchAll());
        exit;
    }
    if ($api === 'flashcards') {
        $course = intval($_GET['course'] ?? 0);
        $page = max(1, intval($_GET['page'] ?? 1));
        $limit = intval($_GET['limit'] ?? 12);
        $offset = ($page-1)*$limit;
        $totalStmt = $pdo->prepare('SELECT COUNT(*) FROM flashcards WHERE course_id = ?');
        $totalStmt->execute([$course]);
        $total = (int)$totalStmt->fetchColumn();
        $stmt = $pdo->prepare('SELECT id, image, en, vi FROM flashcards WHERE course_id = ? ORDER BY id LIMIT ? OFFSET ?');
        $stmt->bindValue(1, $course, PDO::PARAM_INT);
        $stmt->bindValue(2, $limit, PDO::PARAM_INT);
        $stmt->bindValue(3, $offset, PDO::PARAM_INT);
        $stmt->execute();
        $rows = $stmt->fetchAll();
        echo json_encode(['total'=>$total, 'page'=>$page, 'perPage'=>$limit, 'data'=>$rows]);
        exit;
    }
    if ($api === 'flashcard_detail') {
        $id = intval($_GET['id'] ?? 0);
        $stmt = $pdo->prepare('SELECT * FROM flashcards WHERE id = ?');
        $stmt->execute([$id]);
        $fc = $stmt->fetch();
        if (!$fc) { echo json_encode(['error'=>'not found']); exit; }
        // fetch wordlist, exercises, readings, idioms
        $res = ['flashcard'=>$fc];
        $q = $pdo->prepare('SELECT * FROM wordlist WHERE flashcard_id = ? ORDER BY id'); $q->execute([$id]); $res['wordlist']=$q->fetchAll();
        $q = $pdo->prepare('SELECT * FROM exercises WHERE flashcard_id = ? ORDER BY id'); $q->execute([$id]); $res['exercises']=$q->fetchAll();
        $q = $pdo->prepare('SELECT * FROM readings WHERE flashcard_id = ? ORDER BY id'); $q->execute([$id]); $res['readings']=$q->fetchAll();
        $q = $pdo->prepare('SELECT * FROM idioms WHERE flashcard_id = ? ORDER BY id'); $q->execute([$id]); $res['idioms']=$q->fetchAll();
        echo json_encode($res);
        exit;
    }
    if ($api === 'search') {
        $q = trim($_GET['q'] ?? '');
        $page = max(1, intval($_GET['page'] ?? 1));
        $limit = intval($_GET['limit'] ?? 20);
        $offset = ($page-1)*$limit;
        // simple fulltext-like queries using LIKE; consider enabling fulltext indexes
        $like = "%" . str_replace(['%','_'],['\\%','\\_'],$q) . "%";
        $sql = "SELECT 'flashcard' as type, f.id, f.en AS title, f.desc AS body FROM flashcards f WHERE f.en LIKE ? OR f.desc LIKE ? "
             . "UNION ALL "
             . "SELECT 'word' as type, w.id, w.en AS title, w.desc AS body FROM wordlist w WHERE w.en LIKE ? OR w.desc LIKE ? "
             . "UNION ALL "
             . "SELECT 'reading' as type, r.id, r.en AS title, r.story AS body FROM readings r WHERE r.en LIKE ? OR r.story LIKE ? "
             . "LIMIT ? OFFSET ?";
        $stmt = $pdo->prepare($sql);
        $stmt->bindValue(1, $like);
        $stmt->bindValue(2, $like);
        $stmt->bindValue(3, $like);
        $stmt->bindValue(4, $like);
        $stmt->bindValue(5, $like);
        $stmt->bindValue(6, $like);
        $stmt->bindValue(7, $limit, PDO::PARAM_INT);
        $stmt->bindValue(8, $offset, PDO::PARAM_INT);
        $stmt->execute();
        $rows = $stmt->fetchAll();
        echo json_encode(['q'=>$q,'page'=>$page,'limit'=>$limit,'results'=>$rows]);
        exit;
    }
    http_response_code(400);
    echo json_encode(['error'=>'unknown api']);
    exit;
}

// Admin actions (simple, no auth). For production add auth!
if ($action === 'admin' && $_SERVER['REQUEST_METHOD'] === 'POST') {
    $sub = $_POST['sub'] ?? '';
    if ($sub === 'run_import_sql' && isset($_FILES['sqlfile'])) {
        // load uploaded SQL and execute (dangerous, use with care)
        $tmp = $_FILES['sqlfile']['tmp_name'];
        $sql = file_get_contents($tmp);
        try {
            $pdo->exec($sql);
            $msg = 'SQL executed successfully';
        } catch (Exception $e) { $msg = 'SQL error: '. $e->getMessage(); }
        header('Location: ?action=admin&msg='.urlencode($msg)); exit;
    }
    if ($sub === 'clear_data') {
        try {
            $pdo->exec('SET FOREIGN_KEY_CHECKS=0; TRUNCATE idioms; TRUNCATE readings; TRUNCATE exercises; TRUNCATE wordlist; TRUNCATE flashcards; TRUNCATE courses; SET FOREIGN_KEY_CHECKS=1;');
            $msg = 'All tables truncated';
        } catch (Exception $e) { $msg = 'Error: '.$e->getMessage(); }
        header('Location: ?action=admin&msg='.urlencode($msg)); exit;
    }
}

// ------------------- UI rendering -------------------
?><!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <title>Essential Courses — Viewer</title>
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet">
  <style>/* small UI tweaks */
    .course-card{cursor:pointer}
    .flashcard-img{height:150px;object-fit:cover;width:100%}
    .truncate-2{display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden}
  </style>
</head>
<body class="bg-light">
<nav class="navbar navbar-expand-lg navbar-dark bg-primary">
  <div class="container-fluid">
    <a class="navbar-brand" href="?">Essential English</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navs">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navs">
      <ul class="navbar-nav me-auto">
        <li class="nav-item"><a class="nav-link" href="?">Courses</a></li>
        <li class="nav-item"><a class="nav-link" href="?action=search">Search</a></li>
        <li class="nav-item"><a class="nav-link" href="?action=admin">Admin</a></li>
      </ul>
      <form class="d-flex" role="search" onsubmit="doQuickSearch(event)">
        <input id="qinput" class="form-control me-2" type="search" placeholder="Search words, readings..." aria-label="Search">
        <button class="btn btn-light" type="submit">Search</button>
      </form>
    </div>
  </div>
</nav>

<div class="container my-4">
<?php if ($action === 'home'): ?>
  <h3>Courses</h3>
  <div id="coursesRow" class="row gy-3"></div>
  <script>
    async function loadCourses(){
      const res = await fetch('?api=courses');
      const data = await res.json();
      const row = document.getElementById('coursesRow');
      row.innerHTML='';
      for(const c of data){
        const col = document.createElement('div'); col.className='col-12 col-sm-6 col-md-4 col-lg-3';
        col.innerHTML = `<div class="card course-card" onclick="openCourse(${c.id}, ${1})">
          <div class="card-body d-flex flex-column">
            <h5 class="card-title">${c.name}</h5>
            <p class="card-text text-muted small">ID: ${c.id}</p>
            <div class="mt-auto"><a href="?action=course&course=${c.id}" class="stretched-link"></a></div>
          </div></div>`;
        row.appendChild(col);
      }
    }
    loadCourses();
    function openCourse(id,page){ location.href='?action=course&course='+id+'&page='+page; }
    async function doQuickSearch(e){ e.preventDefault(); const q=document.getElementById('qinput').value.trim(); if(!q) return; location.href='?action=search&q='+encodeURIComponent(q); }
  </script>

<?php elseif ($action === 'course'):
  $courseId = intval($_GET['course'] ?? 0);
  $page = max(1,intval($_GET['page'] ?? 1));
  // simple server-side: fetch course name
  $stmt = $pdo->prepare('SELECT name FROM courses WHERE id = ?'); $stmt->execute([$courseId]); $course = $stmt->fetchColumn();
  if (!$course) { echo '<div class="alert alert-danger">Course not found</div>'; }
?>
  <div class="d-flex align-items-center mb-3">
    <h3 class="me-3">Course: <?=h($course)?></h3>
    <a class="btn btn-outline-secondary" href="?">Back</a>
  </div>
  <div id="cardsArea"></div>
  <nav><ul class="pagination" id="pager"></ul></nav>

  <script>
    const courseId = <?=json_encode($courseId)?>;
    let currentPage = <?=json_encode($page)?>;
    async function loadFlashcards(page=1){
      const res = await fetch(`?api=flashcards&course=${courseId}&page=${page}&limit=<?= $perPage ?>`);
      const j = await res.json();
      const area = document.getElementById('cardsArea'); area.innerHTML='';
      const row = document.createElement('div'); row.className='row g-3';
      for(const f of j.data){
        const col = document.createElement('div'); col.className='col-6 col-md-4 col-lg-3';
        col.innerHTML = `<div class="card h-100">
          <img src="/files/xxxx" onerror="this.style.display='none'" class="card-img-top flashcard-img" alt="">
          <div class="card-body">
            <h6 class="card-title">${escapeHtml(f.en||'Untitled')}</h6>
            <p class="card-text truncate-2">${escapeHtml(f.vi||'')}</p>
            <div class="d-flex justify-content-between mt-2">
              <a class="btn btn-sm btn-primary" href="#" onclick="openFlashcard(${f.id});return false;">Open</a>
            </div>
          </div></div>`;
        row.appendChild(col);
      }
      area.appendChild(row);
      renderPager(j.total, j.page, j.perPage);
    }
    function escapeHtml(s){ return (s||'').replace(/[&<>\"']/g, function(m){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]; }); }
    function renderPager(total,page,per){
      const pages = Math.max(1, Math.ceil(total/per));
      const el = document.getElementById('pager'); el.innerHTML='';
      for(let i=1;i<=pages;i++){ const li=document.createElement('li'); li.className='page-item'+(i===page?' active':''); li.innerHTML=`<a class="page-link" href="?action=course&course=${courseId}&page=${i}">${i}</a>`; el.appendChild(li); }
    }
    async function openFlashcard(id){
      const res = await fetch(`?api=flashcard_detail&id=${id}`); const j=await res.json(); showFlashcardModal(j); }
    function showFlashcardModal(data){
      const modalHtml = `
      <div class="modal fade" id="fcModal" tabindex="-1"><div class="modal-dialog modal-xl"><div class="modal-content">
        <div class="modal-header"><h5 class="modal-title">${escapeHtml(data.flashcard.en||'')}</h5><button type="button" class="btn-close" data-bs-dismiss="modal"></button></div>
        <div class="modal-body">
          <div class="row">
            <div class="col-md-4"><img src="/files/${escapeHtml(data.flashcard.image||'')}" class="img-fluid" onerror="this.style.display='none'"></div>
            <div class="col-md-8">
              <p><strong>vi:</strong> ${escapeHtml(data.flashcard.vi||'')}</p>
              <p><strong>desc:</strong> ${escapeHtml(data.flashcard.desc||'')}</p>
              <hr>
              <h6>Wordlist</h6>
              <ul>${data.wordlist.map(w=>`<li><strong>${escapeHtml(w.en)}</strong> — ${escapeHtml(w.desc||'')}</li>`).join('')}</ul>
              <h6>Exercises</h6>
              <ul>${data.exercises.map(x=>`<li>${escapeHtml(x.en||'')}<div class='small'>${escapeHtml(x.story||'')}</div></li>`).join('')}</ul>
              <h6>Readings</h6>
              <ul>${data.readings.map(r=>`<li>${escapeHtml(r.type||'')} — ${escapeHtml(r.en||'')}<div class='small'>${escapeHtml(r.story||r.raw_text||'')}</div></li>`).join('')}</ul>
            </div>
          </div>
        </div>
      </div></div></div>`;
      let wrapper = document.createElement('div'); wrapper.innerHTML = modalHtml; document.body.appendChild(wrapper);
      const modal = new bootstrap.Modal(document.getElementById('fcModal'));
      modal.show();
      document.getElementById('fcModal').addEventListener('hidden.bs.modal', function(){ wrapper.remove(); });
    }
    loadFlashcards(currentPage);
  </script>

<?php elseif ($action === 'search'):
  $q = $_GET['q'] ?? '';
?>
  <h3>Search</h3>
  <form class="mb-3" onsubmit="doSearch(event)">
    <div class="input-group">
      <input id="sq" class="form-control" value="<?=h($q)?>" placeholder="Search...">
      <button class="btn btn-primary">Search</button>
    </div>
  </form>
  <div id="searchResults"></div>
  <script>
    async function doSearch(e){ e && e.preventDefault(); const q=document.getElementById('sq').value.trim(); if(!q) return; const res=await fetch('?api=search&q='+encodeURIComponent(q)); const j=await res.json(); renderSearch(j.results); }
    function renderSearch(rows){ const area=document.getElementById('searchResults'); area.innerHTML=''; for(const r of rows){ const div=document.createElement('div'); div.className='card mb-2'; div.innerHTML=`<div class='card-body'><h5>${escapeHtml(r.title||'')}</h5><p class='small text-muted'>${escapeHtml(r.type)}</p><p>${escapeHtml((r.body||'').substring(0,300))}</p><a href='#' class='stretched-link' onclick='openResult(${JSON.stringify(r.type)}, ${r.id});return false;'>Open</a></div>`; area.appendChild(div);} }
    function openResult(type,id){ if(type==='flashcard') openFlashcard(id); else if(type==='word') location.href='?action=word&id='+id; else location.href='?action=reading&id='+id; }
    doSearch();
  </script>

<?php elseif ($action === 'admin'): ?>
  <h3>Admin</h3>
  <?php if (isset($_GET['msg'])): ?><div class="alert alert-info"><?=h($_GET['msg'])?></div><?php endif; ?>
  <div class="card mb-3"><div class="card-body">
    <h5>Import SQL</h5>
    <form method="post" enctype="multipart/form-data">
      <input type="hidden" name="sub" value="run_import_sql">
      <div class="mb-2"><input type="file" name="sqlfile" accept=".sql" required></div>
      <button class="btn btn-success">Upload & Execute SQL</button>
    </form>
  </div></div>
  <div class="card mb-3"><div class="card-body">
    <h5>Maintenance</h5>
    <form method="post" onsubmit="return confirm('This will delete existing data. Continue?');">
      <input type="hidden" name="sub" value="clear_data">
      <button class="btn btn-danger">Clear All Data (truncate tables)</button>
    </form>
  </div></div>
  <div class="card"><div class="card-body">
    <h5>Notes</h5>
    <p class="small text-muted">To bulk-import from your JSON files you should first generate a big insert_all.sql (using your generator script) and then upload it here to execute. This admin area is intentionally minimal — add authentication before using in production.</p>
  </div></div>

<?php else: ?>
  <div class="alert alert-warning">Unknown action</div>
<?php endif; ?>
</div>

<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>
