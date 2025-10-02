// اختصاصی برای illustrated everyday expressions with stories 2
// متغیرها و توابع خاص این مجموعه

var path = "/apps-data/illustrated-everyday-expressions-with-stories-2/";
var lsession = "lastestSession-" + path.split("/")[2];
var lsetting = "settings-" + path.split("/")[2];
var lfontSetting = "fontSize-" + path.split("/")[2];
var loadedTime = 0;
var ads = false;
var countUnitLearned = 0;

function succeded(t, e, i) {
  // منطق خاص این مجموعه
  e;
}

function init() {
  // منطق خاص برای مقداردهی اولیه این مجموعه
  loadLastSession();
  $("#home-section").attr("top", $("#home-section").attr("top"));
  $("#home-section").css({ position: "absolute", top: 55 });
  $("#category-section").attr("top", $("#home-section").attr("top"));
  $("#category-section").css({ top: 55 });
  $("#section-section").click(function () {
    $("#answer-popup").remove();
    $(".font-size").attr("style", "");
    $(".show-ads-cover").remove();
    elm.pause();
    loadLastSession();
    clearTimeout(nextTimeOut);
    clearTimeout(loopTimeOut);
    $("#bottom-section").children(".container").html('<div class="app-name">illustrated Everyday Expressions</div><div class="app-slogan">with Stories 2</div>');
    $("#bottom-section").css({ display: "block" });
    if ($("#idiom-tip-popup").length > 0) $("#idiom-tip-popup").remove();
    // ادامه منطق اختصاصی...
  });
  // ادامه منطق اختصاصی...
}

// سایر توابع اختصاصی این مجموعه را اینجا قرار دهید
