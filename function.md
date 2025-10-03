# داکیومنت کامل فایل js/6ce4abe4-1689-98e8-b0eb-6eb2911e780a.js

این فایل مربوط به بخش اصلی اپلیکیشن یادگیری زبان است و شامل توابع و متغیرهای مختلف برای مدیریت نمایش واحدها، داستان‌ها، تمرین‌ها، تبلیغات، تنظیمات و تعامل کاربر با رابط کاربری می‌باشد. در ادامه هر بخش و تابع به زبان فارسی توضیح داده شده است:

---

## متغیرهای اصلی
- متغیرهای سراسری برای مدیریت وضعیت صفحه، اندازه فونت، مسیر داده‌ها، وضعیت تبلیغات، شمارنده‌ها و غیره تعریف شده‌اند.

## توابع و رویدادهای اصلی

### 1. succeded
تابع خالی برای مدیریت موفقیت عملیات (در حال حاضر بدون استفاده).

### 2. $(function () {...})
رویداد آماده شدن صفحه. بارگذاری داده‌ها، تنظیمات اولیه، واکشی اطلاعات از localStorage، ساخت لیست واحدها و مدیریت کلی صفحه اصلی.

### 3. init
راه‌اندازی صفحه اصلی، بارگذاری آخرین جلسه، تنظیم رویدادها و مدیریت نمایش بخش‌های مختلف.

### 4. panLeft / panRight / panEnd
مدیریت حرکت بین آیتم‌ها (واحدها/داستان‌ها) به چپ و راست با انیمیشن.

### 5. loadSettings / settings
بارگذاری و ذخیره تنظیمات کاربر مثل تعداد تکرار و حالت پخش خودکار.

### 6. resize / resizeHomeSection / resizeModal / resizeUnitItem / resizeLastSession
تنظیم اندازه و موقعیت عناصر صفحه برای واکنش‌گرایی و نمایش صحیح در دستگاه‌های مختلف.

### 7. showCategorySection
نمایش جزئیات یک واحد شامل داستان، واژگان و تمرین‌ها. مدیریت وضعیت پخش و نمایش تبلیغات.

### 8. getSectionItem
بارگذاری آیتم‌های یک واحد (واژگان، داستان، تمرین) و ساخت رابط کاربری مربوطه.

### 9. playSound / playSeeking / nextDialogueReading / focusReading
مدیریت پخش صوت، جابجایی بین بخش‌های صوتی، و تمرکز روی آیتم فعلی.

### 10. showAds / showAdsForNextLesson
نمایش تبلیغات و مدیریت اجبار کاربر به دیدن تبلیغ برای باز کردن بخش‌های خاص.

### 11. readFlag
ثبت وضعیت خوانده شدن یک واحد و بروزرسانی نمایش آن.

### 12. checkUnitOpened
بررسی باز بودن یک واحد بر اساس localStorage.

### 13. homeScroll
مدیریت اسکرول صفحه اصلی و تغییر وضعیت نمایش بر اساس موقعیت اسکرول.

### 14. scaleFontSize / scaleFontSizeIndexToolTips
تنظیم اندازه فونت عناصر مختلف بر اساس اندازه صفحه.

### 15. isStory / isExercise
بررسی نوع آیتم فعلی (داستان یا تمرین).

### 16. resizeExerciseStory
تنظیم اندازه و موقعیت عناصر بخش تمرین و داستان.

### 17. setStoreLastSession / loadLastSession
ذخیره و بارگذاری آخرین جلسه مطالعه شده کاربر.

### 18. replaceChooseAnswer2
تبدیل گزینه‌های انتخابی به رادیو و چک‌باکس و مدیریت رویدادهای انتخاب پاسخ.

### 19. practiceTimerAlert
نمایش تایمر تمرین و مدیریت پایان زمان پاسخ‌دهی.

### 20. auto_grow
افزایش خودکار ارتفاع textarea بر اساس محتوای وارد شده.

### 21. wordnote / loadNoteWordList
مدیریت یادداشت‌گذاری روی واژگان و بارگذاری یادداشت‌های کاربر.

### 22. sendLoginAction / mobileHeader
توابع کمکی برای ارسال اکشن ورود و تغییر عنوان هدر در حالت موبایل.

---

## توضیحات تکمیلی
- این فایل با استفاده از jQuery و localStorage تعامل دارد.
- تبلیغات و اجبار نمایش تبلیغ برای باز کردن بخش‌های خاص از طریق توابع showAds و showAdsForNextLesson مدیریت می‌شود.
- ساختار داده‌ها بر اساس فایل data.json و sessionStorage است.
- تمامی رویدادهای کلیک، اسکرول و تغییر تنظیمات به صورت داینامیک مدیریت می‌شوند.
- بخش‌های مختلف رابط کاربری مثل داستان، تمرین، واژگان و تنظیمات به صورت واکنش‌گرا و قابل شخصی‌سازی هستند.

---

## تعاملات با localStorage

در این فایل، از localStorage برای ذخیره و بازیابی اطلاعات کاربر استفاده می‌شود. مهم‌ترین تعاملات عبارتند از:

### 1. ذخیره تنظیمات کاربر
- تنظیمات مربوط به پخش خودکار و تعداد تکرار در کلیدهایی مانند `settings-IELTS-Academic-17` ذخیره می‌شود:
  ```js
  localStorage.setItem(lsetting, JSON.stringify({ next: true, loop: 2 }));
  var settings = JSON.parse(localStorage.getItem(lsetting));
  ```

### 2. ذخیره اندازه فونت
- اندازه فونت انتخابی کاربر در کلید `fontSize-IELTS-Academic-17` ذخیره و بازیابی می‌شود:
  ```js
  localStorage.setItem(lfontSetting, JSON.stringify({ fontSize: 100 }));
  var fontSize = JSON.parse(localStorage.getItem(lfontSetting)).fontSize;
  ```

### 3. وضعیت مطالعه واحدها
- برای هر واحد، وضعیت مطالعه (خوانده شده یا نه) در کلیدهایی مانند `IELTS-Academic-17:unitName` ذخیره می‌شود:
  ```js
  localStorage.setItem(path.split("/")[2] + ":" + unitName, JSON.stringify({ read: true }));
  var status = JSON.parse(localStorage.getItem(path.split("/")[2] + ":" + unitName));
  ```

### 4. ذخیره آخرین جلسه مطالعه شده
- اطلاعات آخرین واحد مطالعه شده کاربر در کلید `lastestSession-IELTS-Academic-17` ذخیره می‌شود:
  ```js
  localStorage.setItem(lsession, JSON.stringify({ title: unit, index: idx, ... }));
  var lastSession = JSON.parse(localStorage.getItem(lsession));
  ```

### 5. مدیریت تبلیغات
- برای کنترل نمایش تبلیغات، تاریخ آخرین نمایش تبلیغ در کلید `adsCurrentDay-IELTS-Academic-17` ذخیره می‌شود:
  ```js
  localStorage.setItem("adsCurrentDay-" + path.split("/")[2], JSON.stringify({ adsCurrentDay: today }));
  var adsDay = JSON.parse(localStorage.getItem("adsCurrentDay-" + path.split("/")[2]));
  ```

### 6. یادداشت‌گذاری روی واژگان
- یادداشت‌های کاربر برای هر واژه در کلید با نام واژه ذخیره می‌شود:
  ```js
  localStorage.setItem(word, JSON.stringify({ note: "یادداشت کاربر" }));
  var note = JSON.parse(localStorage.getItem(word)).note;
  ```

### 7. سایر موارد
- در برخی بخش‌ها برای ذخیره وضعیت‌های موقت یا داده‌های کمکی نیز از localStorage استفاده شده است.

---

در مجموع، localStorage نقش مهمی در حفظ تنظیمات، وضعیت مطالعه، یادداشت‌ها و کنترل تبلیغات برای هر کاربر دارد و باعث می‌شود تجربه کاربری شخصی‌سازی و پایدار باشد.

---

این داکیومنت خلاصه‌ای از عملکرد و ساختار فایل js/6ce4abe4-1689-98e8-b0eb-6eb2911e780a.js را به زبان فارسی ارائه می‌دهد. برای توضیح جزئی‌تر هر تابع یا بخش خاص، می‌توانید درخواست دهید.
