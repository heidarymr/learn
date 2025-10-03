// بارگذاری دوره‌ها از API و نمایش
async function loadCourses() {
  const res = await fetch('/api/index.php?path=courses');
  const data = await res.json();
  const container = document.getElementById('main-content');
  container.innerHTML = '';
  if (data.courses && data.courses.length) {
    data.courses.forEach(course => {
      container.innerHTML += `
        <div class="col-md-4">
          <div class="card h-100">
            <img src="${course.cover_image}" class="card-img-top" alt="${course.image_alt}">
            <div class="card-body">
              <h5 class="card-title">${course.name}</h5>
              <p class="card-text">${course.description}</p>
              <button class="btn btn-primary" onclick="loadFlashcards(${course.id})">مشاهده فلش‌کارت‌ها</button>
            </div>
          </div>
        </div>
      `;
    });
  } else {
    container.innerHTML = '<div class="alert alert-warning">دوره‌ای یافت نشد.</div>';
  }
}

// بارگذاری فلش‌کارت‌های یک دوره
async function loadFlashcards(courseId) {
  const res = await fetch(`/api/index.php?path=flashcards`);
  const data = await res.json();
  const container = document.getElementById('main-content');
  container.innerHTML = '';
  const flashcards = data.flashcards.filter(f => f.course_id == courseId);
  if (flashcards.length) {
    flashcards.forEach(card => {
      container.innerHTML += `
        <div class="col-md-4">
          <div class="card h-100">
            <img src="${card.image}" class="card-img-top" alt="${card.en}">
            <div class="card-body">
              <h5 class="card-title">${card.en}</h5>
              <p class="card-text">${card.desc || ''}</p>
              <button class="btn btn-secondary" onclick="loadFlashcardDetail(${card.id})">جزئیات</button>
            </div>
          </div>
        </div>
      `;
    });
  } else {
    container.innerHTML = '<div class="alert alert-warning">فلش‌کارتی یافت نشد.</div>';
  }
}

// نمایش جزئیات یک فلش‌کارت
async function loadFlashcardDetail(cardId) {
  const res = await fetch(`/api/index.php?path=flashcard&id=${cardId}`);
  const data = await res.json();
  const card = data.flashcards;
  const container = document.getElementById('main-content');
  container.innerHTML = `<div class="col-12">
    <div class="card">
      <img src="${card.image}" class="card-img-top" alt="${card.en}">
      <div class="card-body">
        <h5 class="card-title">${card.en}</h5>
        <p class="card-text">${card.desc || ''}</p>
        <button class="btn btn-outline-primary" onclick="loadCourses()">بازگشت</button>
      </div>
    </div>
  </div>`;
}

// بارگذاری اولیه
window.onload = loadCourses;
