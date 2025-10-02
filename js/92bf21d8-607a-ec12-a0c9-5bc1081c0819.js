var timeout,
  hImage,
  elm_length,
  elm_index,
  hold,
  l1,
  l2,
  next,
  direction,
  mc,
  nextTimeOut,
  loopTimeOut,
  autoNextTimeOut,
  audioInterval,
  currentReadingIndex,
  remainAudioLoop,
  elm,
  win_width = $(window).width(),
  win_height = $(window).height(),
  lang = 2,
  autoPlay = !1,
  tmp = "",
  audioLoop = 0,
  currentTime = 0,
  adsNextUnit = !0,
  fontSize = 100;
function succeded(t, e, i) {
  e;
}
var intervalInit,
  audioTimeout,
  loadedTime = 0,
  ads = !1;
function init() {
  (loadLastSession(),
    $("#home-section").attr("top", $("#home-section").attr("top")),
    $("#home-section").css({ position: "absolute", top: 55 }),
    $("#category-section").attr("top", $("#home-section").attr("top")),
    $("#category-section").css({ top: 55 }),
    $("#modal").css({
      width: $(window).width(),
      height: $(window).height() + 500,
    }),
    $("#section-section").click(function () {
      (0 < $(".exercise-section-red-answer-key").length &&
        $(".exercise-section-red-answer-key").remove(),
        0 < $("#answer-popup").length &&
          ($("#answer-popup").remove(),
          clearInterval(answerTimerInterval),
          (answerTimerInterval = null)),
        0 < $("#idiom-tip-popup").length && $("#idiom-tip-popup").remove(),
        $("#home-section").removeAttr("home"),
        elm.pause(),
        loadLastSession(),
        clearTimeout(nextTimeOut),
        clearTimeout(loopTimeOut),
        $("#bottom-section")
          .children(".container")
          .html(
            '<div class="app-name">Mastering the American Accent</div><div class="app-slogan"></div>',
          ),
        $("#bottom-section").css({ display: "block" }),
        $("#home-detail").css({ display: "block" }),
        $("#home-detail").animate({ opacity: "1" }, 0, function () {}),
        $("#section-section").css({ display: "none" }),
        $("#category-section").css({ display: "none" }),
        $("#home-section").css({ display: "block" }),
        $("html,body").animate(
          { scrollTop: $("#home-section").attr("top") },
          0,
        ),
        $("#home-section").animate({ opacity: 1, left: 0 }, 0, function () {}));
    }),
    $("#settings").click(function () {
      settings($("#settings").attr("itemid"));
    }),
    loadSettings(),
    $(".font-size").bind("click", function () {
      ($(this).css({ "border-radius": "0px" }),
        $(".font-size-cover,#setting-container").css({ display: "block" }),
        $(".font-size-cover>button").unbind("click"),
        $(".font-size-cover>button").bind("click", function () {
          switch ($(this).index()) {
            case 0:
              fontSize -= 10;
              break;
            case 1:
              fontSize = 100;
              break;
            case 2:
              fontSize += 10;
          }
          $("body").css({ "font-size": fontSize + "%" });
          var t = { fontSize: fontSize };
          localStorage.setItem("fontSize", JSON.stringify(t));
        }));
    }),
    $(document).on("click", function (t) {
      0 === $(t.target).closest(".font-size").length &&
        ($(".font-size").css({ "border-radius": "" }),
        $(".font-size-cover,#setting-container").hide());
    }),
    $(document).on("touchstart", function (t) {
      0 === $(t.target).closest(".font-size").length &&
        ($(".font-size").css({ "border-radius": "" }),
        $(".font-size-cover,#setting-container").hide());
    }),
    homeSectionResize(),
    homeScroll(""));
}
function panLeft() {
  (0 == hold &&
    ((direction = "left"),
    (next = elm_index + 1) == elm_length
      ? (next = 0)
      : $("#item" + (elm_index + 1)).css({ left: $(window).width() }),
    elm_length == elm_index + 1 && $("#item0").css({ left: $(window).width() }),
    (hold = !0)),
    (l1 = $("#item" + elm_index).offset().left),
    (l2 = $("#item" + next).offset().left),
    $("#item" + elm_index).animate({ left: l1 - 1 }, 0, function () {}),
    $("#item" + next).animate({ left: parseInt(l2) - 1 }, 0, function () {}));
}
function panRight() {
  (0 == hold &&
    ((direction = "right"),
    (next = elm_index - 1) < 0
      ? (next = elm_length - 1)
      : $("#item" + (elm_index - 1)).css({ left: -$(window).width() }),
    0 == next &&
      $("#item" + (elm_length - 1)).css({ left: -$(window).width() }),
    (hold = !0)),
    (l1 = $("#item" + elm_index).offset().left),
    (l2 = $("#item" + next).offset().left),
    $("#item" + elm_index).animate(
      { left: parseInt(l1) + 1 },
      0,
      function () {},
    ),
    $("#item" + next).animate({ left: parseInt(l2) + 1 }, 0, function () {}));
}
function panEnd(t) {
  ("left" == direction
    ? 100 < t
      ? ($("#item" + elm_index).animate(
          { left: -$(window).width() },
          400,
          function () {},
        ),
        1 == $("#item" + next).attr("story") ||
        1 == $("#item" + next).attr("exercise")
          ? (1 == $("#item" + next).attr("exercise") && elm.pause(),
            $("#item" + next).animate({ left: 0 }, 400, function () {
              playSound(next, $("#item" + next).attr("source"));
            }))
          : $("#item" + next).animate({ left: 10 }, 400, function () {
              playSound(next, $("#item" + next).attr("source"));
            }),
        (elm_index = next))
      : ($("#item" + elm_index).animate({ left: 10 }, 400, function () {}),
        $("#item" + next).animate(
          { left: $(window).width() },
          400,
          function () {},
        ),
        nextWordReading())
    : 100 < t
      ? ($("#item" + elm_index).animate(
          { left: $(window).width() },
          400,
          function () {},
        ),
        1 == $("#item" + next).attr("story") ||
        1 == $("#item" + next).attr("exercise")
          ? (1 == $("#item" + next).attr("exercise") && elm.pause(),
            $("#item" + next).animate({ left: 0 }, 400, function () {
              playSound(next, $("#item" + next).attr("source"));
            }))
          : $("#item" + next).animate({ left: 10 }, 400, function () {
              playSound(next, $("#item" + next).attr("source"));
            }),
        (elm_index = next))
      : ($("#item" + elm_index).animate({ left: 10 }, 300, function () {}),
        $("#item" + next).animate(
          { left: -$(window).width() },
          400,
          function () {},
        ),
        nextWordReading()),
    (hold = !1));
}
function loadSettings() {
  ($("#setting-container").remove(),
    0 == $("#setting-container").length &&
      ((t = "<table>"),
      (t +=
        '<tr><td>Auto next</td><td><label class="switch"><input id="chkAuto" type="checkbox"><div class="slider round"></div></label></td></tr>'),
      (t +=
        '<tr style="display:none"><td>Number of repeat</td><td><select id="optLoop"><option value="0">0</option><option value="1">1</option><option value="2">2</option><option value="3">3</option><option value="4">4</option><option value="5">5</option></select></td></tr>'),
      (t += "</table>"),
      $(".font-size").append(
        '<div id="setting-container"><div><table><tr><td>Auto next</td><td><label class="switch"><input id="chkAuto" type="checkbox"><div class="slider round"></div></label></td></tr><tr style="display:none"><td>Number of repeat</td><td><select id="optLoop"><option value="0">0</option><option value="1">1</option><option value="2">2</option><option value="3">3</option><option value="4">4</option><option value="5">5</option></select></td></tr></table></div></div>',
      ),
      $("#setting-container").children("div").css({ padding: 10 }),
      $("#chkAuto, #optLoop").change(function () {
        var t = {
          next: $("#chkAuto").prop("checked"),
          loop: $("#optLoop").val(),
        };
        localStorage.setItem("settings", JSON.stringify(t));
      })));
  var t = JSON.parse(localStorage.getItem("settings"));
  ($("#optLoop").val(t.loop),
    1 == t.next
      ? $("#chkAuto").attr("checked", "checked")
      : $("#chkAuto").removeAttr("checked"));
}
function settings(t) {
  var e;
  ($("#setting-container").remove(),
    1 == t
      ? ($("#settings img").attr("src", "icons/close-window-50.png"),
        0 == $("#setting-container").length &&
          ((e = "<table>"),
          (e +=
            '<tr><td>Auto next</td><td><label class="switch"><input id="chkAuto" type="checkbox"><div class="slider round"></div></label></td></tr>'),
          (e +=
            '<tr><td>Number of repeat</td><td><select id="optLoop"><option value="0">0</option><option value="1">1</option><option value="2">2</option><option value="3">3</option><option value="4">4</option><option value="5">5</option></select></td></tr>'),
          (e += "</table>"),
          $("body").append(
            '<div id="setting-container"><div><table><tr><td>Auto next</td><td><label class="switch"><input id="chkAuto" type="checkbox"><div class="slider round"></div></label></td></tr><tr><td>Number of repeat</td><td><select id="optLoop"><option value="0">0</option><option value="1">1</option><option value="2">2</option><option value="3">3</option><option value="4">4</option><option value="5">5</option></select></td></tr></table></div></div>',
          ),
          $("#setting-container").css({
            height: $(window).height(),
            right: -300,
          }),
          $("#setting-container").children("div").css({ padding: 20 }),
          $("#chkAuto, #optLoop").change(function () {
            var t = {
              next: $("#chkAuto").prop("checked"),
              loop: $("#optLoop").val(),
            };
            localStorage.setItem("settings", JSON.stringify(t));
          })),
        (e = JSON.parse(localStorage.getItem("settings"))),
        $("#optLoop").val(e.loop),
        1 == e.next
          ? $("#chkAuto").attr("checked", "checked")
          : $("#chkAuto").removeAttr("checked"),
        $("#settings").attr("itemid", 0),
        $("#setting-container").animate({ right: 0 }, function () {}))
      : ($("#settings img").attr("src", "icons/Settings-50.png"),
        $("#setting-container").animate({ right: -300 }, function () {}),
        $("#settings").attr("itemid", 1)));
}
function resize() {
  1 == $("#show-menu").attr("itemid")
    ? $(".header").animate({ left: $(window).width() - 60 }, 0, function () {
        $(".header").css({ position: "fixed" });
      })
    : $(".header").css({ width: "100%", left: 0 });
  var t = $(window).width();
  ($("#container").css({ width: t }),
    $("#category-section").css({ width: "100%" }),
    $("#modal").css({ width: $(window).width(), height: $(window).height() }));
}
function resizeHomeSection() {
  ($(window).height(),
    $(".header").height(),
    $("#bottom-section").height(),
    $(".header").css("height"),
    $("#home-section"));
}
function showCategorySection(t, e, i) {
  ($("#bottom-section").css({ display: "none" }),
    (autoPlay = !1),
    0 < $(".exercise-section-red-answer-key").length &&
      $(".exercise-section-red-answer-key").remove(),
    0 < $(".show-ads-cover").length && $(".show-ads-cover").remove(),
    0 < $("#answer-popup").length &&
      ($("#answer-popup").remove(),
      clearInterval(answerTimerInterval),
      (answerTimerInterval = null)),
    0 < $("#idiom-tip-popup").length && $("#idiom-tip-popup").remove(),
    setStoreLastSession(t, e),
    $("#category-section").attr("top", $("#home-section").attr("top")),
    $("#home-detail").animate({ opacity: "0" }, 0, function () {
      $("#home-detail").css({ display: "none" });
    }),
    $("#section-section").css({
      display: "block",
      opacity: "0",
      left: $(window).width(),
    }),
    $("#section-section").animate(
      { opacity: "1", left: 0 },
      500,
      function () {},
    ),
    $("#section-section").children(".title").html(t),
    $("html,body").animate({ scrollTop: 0 }, 0),
    $("#home-section").css({ display: "none", opacity: "0" }),
    $("#category-section").css({ left: "", display: "block", opacity: "1" }),
    $("#home-section").attr("home", "0"));
  var n = JSON.parse(localStorage.getItem("settings"));
  ((audioLoop = n.loop),
    (currentReadingIndex = i),
    (currentIndex = e),
    getSectionItem(t));
}
function getSectionItem(t) {
  if (null != sessionStorage[t]) {
    var e = JSON.parse(localStorage.getItem("settings"));
    ((remainAudioLoop = null != e && 0 < e.loop ? e.loop : 0),
      null == localStorage.getItem(t.toLowerCase()) &&
        ((a = { read: !1 }),
        localStorage.setItem(t.toLowerCase(), JSON.stringify(a)),
        $("#tbl-last-session" + currentIndex)
          .find("div")
          .eq(0)
          .attr("class", "reading")),
      $("#category-section")
        .children(".section")
        .children(".container")
        .html(""));
    var i = JSON.parse(sessionStorage.getItem(t)).reading;
    if (null != i) {
      var n = "",
        o =
          '<li  story="1" remainAudioLoop="' +
          remainAudioLoop +
          '" id="item0"><div></div></li>';
      $("#category-section")
        .children(".section")
        .children(".container")
        .append(o);
      for (var s = 0; s < i.length; s++) {
        var a,
          r = i[s].type,
          l = i[s].en,
          d = (i[s].vi, i[s].story),
          c = (i[s].image, i[s].sound);
        "story" === r.toLowerCase() &&
          ((a = {
            title: (r = JSON.parse(localStorage.getItem("lastestSession")))
              .title,
            image: $("#home-section")
              .children("ul")
              .children("li")
              .eq(r.index)
              .find("img")
              .attr("src"),
            index: r.index,
            windex: 0,
            eindex: r.eindex,
            sindex: 0,
          }),
          localStorage.setItem("lastestSession", JSON.stringify(a)),
          (o = "") != l &&
            ("" != c
              ? ((o +=
                  '<div class="wordlist-rotate" id="block-' +
                  urlFriendly(l) +
                  '"><img title="' +
                  l +
                  '" source="data/' +
                  urlFriendly(t) +
                  "/reading/" +
                  c +
                  '" class="speaker-louder" src="icons/speaker_louder.png" /></div>'),
                (n += "data/" + urlFriendly(t) + "/reading/" + c + ","))
              : (o += '<div class="wordlist-rotate"></div>')),
          (o += '<div class="en-story">' + d + "</div>"),
          (o +=
            '<div style="text-align:center; padding-top:20px; width:100%; display:none"><div class="counter reading"><div></div></div><div style="clear:both"></div></div>'),
          0 == $("#story-block").length &&
            $("#item0").children("div").append('<div id="story-block"></div>'),
          $("#story-block").append(
            '<div class="story-block-cover">' + o + "</div>",
          ),
          "" != c &&
            null == $("#item0").attr("source") &&
            $("#item0").attr(
              "source",
              "data/" + urlFriendly(t) + "/reading/" + c,
            ),
          $(".speaker-louder").unbind("click"),
          $(".speaker-louder").click(function () {
            autoPlay = !0;
            var t = $(this).attr("source");
            ($("#item0").attr("source", t),
              $("#item0").attr("nelement", "voca0"),
              $("#item" + currentReadingIndex).attr(
                "si",
                $(".speaker-louder").index($(this)),
              ),
              playSound(currentReadingIndex, t),
              $("#nav-story li")
                .eq(0)
                .children("span")
                .html($(this).attr("title")));
          }),
          $(".idiom-tip").click(function () {
            (0 < $("#idiom-tip-popup").length && $("#idiom-tip-popup").remove(),
              $("body").append(
                '<div id="idiom-tip-popup"><div id="close-idiom-tip-popup"><img src="icons/close-window-50.png" /></div><div id="idiom-tip-popup-cover">' +
                  $("#voca" + $(this).attr("idx")).html() +
                  "</div></div>",
              ),
              $("#idiom-tip-popup")
                .find(".word-image,.speaker-louder")
                .remove(),
              $("#close-idiom-tip-popup img").click(function () {
                $("#idiom-tip-popup").remove();
              }));
          }));
      }
      ("" != n && (n = n.substring(0, n.length - 1)),
        $("#item0").attr("soundarr", n),
        $("#item0").attr("si", 0));
    }
    ($(".counter").each(function () {
      $(this).css({
        "margin-left": ($(window).width() - $(this).width() - 20) / 2,
      });
    }),
      homeSectionResize(),
      scaleFontSize(),
      playSeeking(currentReadingIndex));
  }
}
function playSeeking(t) {
  (0 < $("#idiom-tip-popup").length && $("#idiom-tip-popup").remove(),
    (currentReadingIndex = t),
    swipeWindow(),
    (elm_index = t),
    (hold = !1),
    (next = 0),
    setTimeout(function () {
      playSound(
        currentReadingIndex,
        $("#item" + currentReadingIndex).attr("source"),
      );
    }, 1e3));
}
function playSound(t, e) {
  currentReadingIndex = t;
  null != e
    ? ($("#item" + t)
        .find(".reading")
        .unbind("click"),
      (elm.src = e.toLowerCase()),
      elm.addEventListener("loadedmetadata", function () {
        (localStorage.setItem("currentIndex", currentReadingIndex),
          1 == autoPlay && (elm.play(), (autoPlay = !0)));
      }),
      elm.addEventListener("ended", function () {
        1 == isStory() &&
          ($("#nav-story")
            .children("li")
            .eq(0)
            .children("img")
            .attr("status", 0),
          $("#nav-story")
            .children("li")
            .eq(0)
            .children("img")
            .attr("src", "icons/play.png"),
          readFlag());
        parseInt($("#item" + currentReadingIndex).attr("remainAudioLoop"));
        (clearTimeout(nextTimeOut),
          clearTimeout(loopTimeOut),
          clearTimeout(autoNextTimeOut),
          (autoNextTimeOut = setTimeout(function () {
            ($("#item" + t)
              .find(".reading")
              .click(function () {
                (clearTimeout(nextTimeOut),
                  clearTimeout(loopTimeOut),
                  clearTimeout(autoNextTimeOut),
                  playSound(t, $(this).parent().parent().attr("source")));
              }),
              $("#item" + currentReadingIndex).attr(
                "remainAudioLoop",
                remainAudioLoop,
              ),
              nextDialogueReading());
          }, 5e3)));
      }))
    : readFlag();
  var i = JSON.parse(localStorage.getItem("lastestSession"));
  $("#bottom-section").css({ display: "block" });
  var n = $("#tbl-last-session" + (parseInt(i.index) + 1));
  (0 < n.length
    ? ((i = JSON.parse(localStorage.getItem("lastestSession"))),
      (n = n.parent().attr("en")),
      null != e
        ? 0 == autoPlay
          ? $("#bottom-section")
              .children(".container")
              .html(
                '<ul id="nav-story"><li style="width:48%"><img class="audio-play" status="0" src="icons/play.png" /><span style="margin-left:5px; position:relative; top:-23px"></span></li><li style="width:0%"></li><li  style="width: 48%; text-align:center; padding-left:5px; padding-right:5px; color:yellow">' +
                  n +
                  "</li></ul>",
              )
          : $("#bottom-section")
              .children(".container")
              .html(
                '<ul id="nav-story"><li style="width:48%"><img class="audio-play" status="1" src="icons/pause.png" /><span style="margin-left:5px; position:relative; top:-23px"></span></li><li style="width:0%"></li><li  style="width: 48%; text-align:center; padding-left:5px; padding-right:5px; color:yellow">' +
                  n +
                  "</li></ul>",
              )
        : $("#bottom-section")
            .children(".container")
            .html(
              '<ul id="nav-story"><li style="width:0%"></li><li style="width:0%"></li><li  style="width: calc(100% - 10px); text-align:center; padding-left:5px; padding-right:5px; color:yellow">' +
                n +
                "</li></ul>",
            ))
    : null != e
      ? 0 == autoPlay
        ? $("#bottom-section")
            .children(".container")
            .html(
              '<ul id="nav-story"><li style="width:48%"><img class="audio-play" status="0" src="icons/play.png" /><span style="margin-left:5px; position:relative; top:-23px"></span></li><li style="width:0%"></li><li  style="width: 48%; text-align:center; padding-left:5px; padding-right:5px; color:yellow">Mastering the American Accent</li></ul>',
            )
        : $("#bottom-section")
            .children(".container")
            .html(
              '<ul id="nav-story"><li style="width:48%"><img class="audio-play" status="1" src="icons/pause.png" /><span style="margin-left:5px; position:relative; top:-23px"></span></li><li style="width:0%"></li><li  style="width: 48%; text-align:center; padding-left:5px; padding-right:5px; color:yellow">Mastering the American Accent</li></ul>',
            )
      : $("#bottom-section")
          .children(".container")
          .html(
            '<ul id="nav-story"><li style="width:0%"></li><li style="width:0%"></li><li  style="width: calc(100% - 10px); text-align:center; padding-left:5px; padding-right:5px; color:yellow">Mastering the American Accent</li></ul>',
          ),
    "" == $("#nav-story li").eq(0).children("span").html() &&
      $("#nav-story li")
        .eq(0)
        .children("span")
        .html($(".speaker-louder").eq(0).attr("title")),
    $("#nav-story")
      .children("li")
      .eq(0)
      .click(function () {
        1 == $("#nav-story").children("li").eq(0).children("img").attr("status")
          ? ($("#nav-story")
              .children("li")
              .eq(0)
              .children("img")
              .attr("status", 0),
            $("#nav-story")
              .children("li")
              .eq(0)
              .children("img")
              .attr("src", "icons/play.png"),
            elm.pause())
          : ($("#nav-story")
              .children("li")
              .eq(0)
              .children("img")
              .attr("status", 1),
            $("#nav-story")
              .children("li")
              .eq(0)
              .children("img")
              .attr("src", "icons/pause.png"),
            elm.play());
      }),
    $("#nav-story")
      .children("li")
      .eq(1)
      .click(function () {}),
    $("#nav-story")
      .children("li")
      .eq(2)
      .click(function () {
        var t = JSON.parse(localStorage.getItem("lastestSession")),
          e = $("#tbl-last-session" + (parseInt(t.index) + 1));
        0 < e.length
          ? 0 == checkUnitOpened((e = e.parent().attr("en")))
            ? showAdsForNextLesson(
                e,
                e + " loaded. Check it out!",
                parseInt(t.index) + 1,
                0,
              )
            : (elm.pause(),
              (autoPlay = !1),
              1 == showAds() &&
                JSBridge.LoadStoryAnswerKeyVideoAds(
                  e.toUpperCase() + " loaded. Check it out!",
                ),
              showCategorySection(e, parseInt(t.index) + 1, 0))
          : $("#section-section").trigger("click");
      }),
    0 == autoPlay
      ? ($("#nav-story")
          .children("li")
          .eq(0)
          .children("img")
          .attr("status", "0"),
        $("#nav-story")
          .children("li")
          .eq(0)
          .children("img")
          .attr("src", "icons/play.png"))
      : ($("#nav-story")
          .children("li")
          .eq(0)
          .children("img")
          .attr("status", "1"),
        $("#nav-story")
          .children("li")
          .eq(0)
          .children("img")
          .attr("src", "icons/pause.png"),
        elm.play()),
    resizeExerciseStory());
}
function showAds() {
  var t = new Date(),
    e = t.getDate() + "-" + (t.getMonth() + 1) + "-" + t.getFullYear(),
    i = { adsCurrentDay: e };
  try {
    var n = localStorage.getItem("adsCurrentDay");
    return (
      (null == n || e != JSON.parse(n).adsCurrentDay) &&
      (localStorage.setItem("adsCurrentDay", JSON.stringify(i)), !0)
    );
  } catch (t) {
    return (localStorage.setItem("adsCurrentDay", JSON.stringify(i)), !0);
  }
}
function readFlag() {
  (localStorage.removeItem(
    $("#section-section").find(".title").html().toLowerCase(),
  ),
    null ==
      localStorage.getItem(
        $("#section-section").find(".title").html().toLowerCase(),
      ) &&
      localStorage.setItem(
        $("#section-section").find(".title").html().toLowerCase(),
        JSON.stringify({ read: !0 }),
      ),
    $("#tbl-last-session" + currentIndex)
      .find("div")
      .eq(0)
      .attr("class", "play"));
}
function showAdsForNextLesson(t, e, i, n) {
  ($(".show-ads-cover").remove(),
    $(document).off("click"),
    0 == $(".show-ads-cover").length &&
      $("body").append(
        '<div class="show-ads-cover" opened="1">Watch an AD to open ' +
          t.toUpperCase() +
          "</div>",
      ),
    $(".show-ads-cover").css({
      "border-bottom": "1px solid",
      "font-weight": "bold",
      "z-index": "9999999",
      position: "fixed",
      left: 0,
      width: "calc(100% - 20px)",
      bottom: 50,
      "border-radius": "0px",
      padding: "15px 10px",
    }),
    $(".show-ads-cover").css({ display: "block" }),
    $(".show-ads-cover").bind("click", function () {
      (elm.pause(),
        (autoPlay = !1),
        JSBridge.LoadStoryAnswerKeyVideoAds(
          t.toUpperCase() + " loaded. Check it out!",
        ),
        showCategorySection(t, i, n),
        $(".show-ads-cover").remove());
    }),
    setTimeout(function () {
      ($(document).on("click", function (t) {
        0 === $(t.target).closest(".show-ads-cover").length &&
          null != $(".show-ads-cover").attr("opened") &&
          $(".show-ads-cover").remove();
      }),
        $(document).on("touchstart", function (t) {
          0 === $(t.target).closest(".show-ads-cover").length &&
            null != $(".show-ads-cover").attr("opened") &&
            $(".show-ads-cover").remove();
        }));
    }, 300));
}
function showAdsForNextLesson1(t, e, i, n) {
  (0 == $(".exercise-section-red-answer-key").length &&
    $("body").append(
      '<div class="exercise-section-red-answer-key">Watch an AD to OPEN NEW LESSON: ' +
        t +
        "</div>",
    ),
    $(".exercise-section-red-answer-key").css({
      "border-bottom": "1px solid",
      "font-weight": "bold",
      "z-index": "9999",
      position: "fixed",
      left: 0,
      width: "calc(100% - 20px)",
      bottom: 50,
      "border-radius": "0px",
      padding: "15px 10px",
    }),
    $(".exercise-section-red-answer-key").css({ display: "block" }),
    $(".exercise-section-red-answer-key").bind("click", function () {
      (elm.pause(),
        (autoPlay = !1),
        JSBridge.LoadStoryAnswerKeyVideoAds(e),
        showCategorySection(t, i, 0),
        $(".exercise-section-red-answer-key").remove());
    }));
}
function checkUnitOpened(t) {
  return null != localStorage.getItem(t.toLowerCase());
}
function nextDialogueReading() {
  var t,
    e,
    i,
    n = JSON.parse(localStorage.getItem("settings"));
  null == n ||
    1 != n.next ||
    ((t = $("#item" + currentReadingIndex).attr("si")) <
      (n = $("#item" + currentReadingIndex)
        .attr("soundarr")
        .split(",")).length -
        1 &&
      ((e = parseInt(t) + 1),
      (i = n[e]),
      $("#item" + currentReadingIndex).attr("source", i),
      $("#item" + currentReadingIndex).attr("si", e),
      $("html, body").animate(
        {
          scrollTop:
            $(
              "#block-" + urlFriendly($(".speaker-louder").eq(e).attr("title")),
            ).offset().top - 80,
        },
        600,
        function () {
          (playSound(currentReadingIndex, i),
            $("#nav-story li")
              .eq(0)
              .children("span")
              .html($(".speaker-louder").eq(e).attr("title")));
        },
      )));
}
function nextWordReading() {
  var t = JSON.parse(localStorage.getItem("settings"));
  null != t &&
    1 == t.next &&
    (nextTimeOut = setTimeout(function () {
      var t = $("#item" + currentReadingIndex).attr("nelement");
      ($("#" + t)
        .find(".wordlist-cover")
        .find(".speaker-louder")
        .trigger("click"),
        $("#" + t)
          .find(".wordlist-cover")
          .find(".speaker-louder")
          .scrollTop(),
        $("html, body").animate(
          { scrollTop: $("#" + t).offset().top - 50 },
          800,
        ));
    }, 3e3));
}
function homeScroll(t) {
  ($(window).scroll(function () {
    (parseInt($("#home-section").height()),
      $("#home-section").offset(),
      $(window).height());
    var t = parseInt($(this).scrollTop());
    null == $("#home-section").attr("home") &&
      $("#home-section").attr("top", t);
  }),
    $("#home-section").scroll(function () {
      (parseInt($("#home-section").height()),
        $("#home-section").offset(),
        $(window).height());
      var t = parseInt($(this).scrollTop());
      $("#home-section").attr("top", t);
    }));
}
function homeSectionResize() {
  (resizeHomeSection(), resizeUnitItem());
}
function scaleFontSize() {
  var e = 786432;
  ($(".en-word").each(function () {
    var t = $(window).width() * $(window).height(),
      t = 300 * (Math.sqrt(t) / Math.sqrt(e));
    $(".en-word").css("font-size", t + "%");
  }),
    $(".wordlist-cover .en-word").each(function () {
      var t = $(window).width() * $(window).height(),
        t = 110 * (Math.sqrt(t) / Math.sqrt(e));
      (t < 110 && (t = 110), $(this).css("font-size", t + "%"));
    }),
    $(".vn-word").each(function () {
      var t = $(window).width() * $(window).height(),
        t = 140 * (Math.sqrt(t) / Math.sqrt(e));
      $(".vn-word").css("font-size", t + "%");
    }),
    $(".alphabet").each(function () {
      var t = $(window).width() * $(window).height(),
        t = 300 * (Math.sqrt(t) / Math.sqrt(e));
      $(".alphabet").css("font-size", t + "%");
    }),
    $(".en-story-title").each(function () {
      var t = $(window).width() * $(window).height(),
        t = 200 * (Math.sqrt(t) / Math.sqrt(e));
      (t < 120 && (t = 120), $(".en-story-title").css("font-size", t + "%"));
    }),
    $("#section-section")
      .children(".title")
      .css({ width: $(window).width() - 80 }),
    resizeExerciseStory());
}
function scaleFontSizeIndexToolTips() {
  ($(".tool-index-idioms")
    .find(".en-word")
    .each(function () {
      var t = $(window).width() * $(window).height(),
        t = 300 * (Math.sqrt(t) / Math.sqrt(786432));
      $(this).css("font-size", t + "%");
    }),
    $("#section-section")
      .children(".title")
      .css({ width: $(window).width() - 80 }),
    resizeExerciseStory());
}
function swipeWindow() {
  ($("#category-section")
    .find(".container")
    .children("li")
    .each(function () {
      $(this).css({ width: "100%" });
    }),
    (elm_length = $("#category-section")
      .find(".container")
      .children("li").length));
  for (var t = 0; t < elm_length; t++)
    $("#item" + t).css({ position: "fixed", left: -$(window).width() });
  1 == $("#item" + currentReadingIndex).attr("story") ||
  1 == $("#item" + currentReadingIndex).attr("exercise")
    ? $("#item" + currentReadingIndex).css({ position: "", left: "" })
    : $("#item" + currentReadingIndex).css({ position: "fixed", left: 10 });
}
function isStory() {
  return 1 == parseInt($("#item" + currentReadingIndex).attr("story"));
}
function isExercise() {
  return 1 == parseInt($("#item" + currentReadingIndex).attr("exercise"));
}
function resizeExerciseStory() {
  ($("#category-section")
    .find(".container")
    .children("li")
    .each(function () {
      var t;
      (1 != $(this).attr("story") && 1 != $(this).attr("exercise")) ||
        ($("#item" + $(this).index())
          .find(".faq-list-section")
          .children("ol")
          .css({ margin: "", padding: "" }),
        $("#item" + $(this).index())
          .find(".faq-list-section")
          .css({ "padding-bottom": 10 }),
        $(window).width() < 400 &&
          $("#item" + $(this).index())
            .find(".faq-list-section")
            .children("ol")
            .css({ margin: "0px", padding: "0px 0px 0px 20px" }),
        (t = $("#item" + $(this).index()).children("div")).css({ padding: 10 }),
        $(window).height(),
        $(".header").height(),
        $("#bottom-section").height(),
        t.height());
    }),
    $("#nav-story li").each(function () {
      ($(this).children("img").css({ float: "", "margin-left": "" }),
        $(this)
          .children("span")
          .attr("style", "margin-left:5px; position:relative; top:-23px"),
        $(this).width() < $(this).children("span").width() + 45 &&
          ($(this).children("img").css({ float: "left", "margin-left": 5 }),
          $(this).children("span").attr("style", "margin-left:5px;")));
    }),
    $(".answer-the-questions-section-word-blank").each(function () {
      var t = $(this).width() - $(this).children("span").width() - 5;
      (t < 50 && (t = 50),
        $(this).children(".opt-fill-blank").css({ "max-width": t }));
    }),
    $(".sample-cover").each(function () {
      $(this).children("img");
      ($(this).children("img").css({ "max-width": 150 }),
        $(this).children("div").css({ "max-width": "calc(100% - 150px)" }),
        $(window).width() <= 400 &&
          ($(this).children("img").css({ "max-width": 110 }),
          $(this).children("div").css({ "max-width": "calc(100% - 110px)" })));
    }));
}
function loadLastSession() {
  try {
    var t,
      e,
      i = JSON.parse(localStorage.getItem("lastestSession"));
    null != i &&
      ((t = "waiting"),
      null != (e = localStorage.getItem(i.title.toLowerCase())) &&
        (t = 1 == $.parseJSON(e).read ? "play" : "reading"),
      $("#tbl-last-session" + i.index)
        .parent()
        .parent()
        .parent()
        .attr("opened", "1"),
      $("#tbl-last-session" + i.index)
        .parent()
        .parent()
        .css({ display: "block" }),
      $("#tbl-last-session" + i.index)
        .find("td")
        .eq(0)
        .children("div")
        .attr("class", t),
      $("html,body").animate(
        { scrollTop: $("#tbl-last-session" + i.index).offset().top - 50 },
        0,
      ),
      "Index" != i.title &&
        $("#home-section")
          .children("div")
          .eq(0)
          .html(
            '<ul class="curriculum-item" style="background:#1DA362"><li class="item" id="word-list-session" style="color:white"><table><tr><td><div class="' +
              t +
              '"></div></td><td><div class="title">' +
              i.title +
              " </div></td></tr></table></li></ul>",
          ),
      $("#home-section")
        .children("div")
        .eq(0)
        .css({ "padding-top": 15, "padding-bottom": 0 }),
      $("#word-list-session, #img-last-session-unit").click(function () {
        showCategorySection(i.title, i.index, 0);
      }),
      $("#exercise-lastest-session").click(function () {
        var t = JSON.parse(localStorage.getItem("lastestSession"));
        showCategorySection(t.title, t.index, t.eindex);
      }),
      $("#story-lastest-session, #story-lastest-session-play-button").click(
        function () {
          var t = JSON.parse(localStorage.getItem("lastestSession"));
          showCategorySection(t.title, t.index, t.sindex);
        },
      ),
      resizeLastSession(),
      resizeUnitItem());
  } catch (t) {}
}
function resizeLastSession() {
  var t = $(window).width() - 130 - 40;
  (120 < t && (t = 120), $("#img-last-session-unit").css({ width: t }));
}
function resizeUnitItem() {
  var t =
    $("#home-section").children("ul").children("li").eq(0).width() - 130 - 20;
  (120 < t && (t = 120),
    $(".img-last-session-unit").css({ width: t }),
    $(".session-play-button").css({
      width: 39,
      "border-radius": "50px",
      border: "0px",
      position: "absolute",
      top: (t - 39) / 2,
      left: (t - 39) / 2,
    }));
}
function setStoreLastSession(t, e) {
  e = {
    title: t,
    image: $("#home-section")
      .children("ul")
      .children("li")
      .eq(e)
      .find("img")
      .attr("src"),
    index: e,
    windex: 0,
    eindex: 0,
    sindex: 0,
  };
  localStorage.setItem("lastestSession", JSON.stringify(e));
}
function resizeModal() {
  var t = 320,
    e = 320;
  (isMobile.any()
    ? (e = t = 200)
    : $(window).width() < t && (e = t = $(window).width() - 40),
    $("#modal")
      .find("img")
      .css({
        width: t,
        position: "fixed",
        left: ($(window).width() - t) / 2,
        top: ($(window).height() - e) / 2,
      }));
}
function replaceChooseAnswer2() {
  ($(".answer-the-questions-section .ul-choose-answer")
    .children("li")
    .each(function () {
      var t = $(this).html();
      $(this).html(
        '<input type="radio" name="rdo' +
          $(this).parent().parent().parent().parent().index() +
          $(this).parent().parent().index() +
          $(this).parent().index() +
          '" /> ' +
          t,
      );
    }),
    $(".answer-the-questions-section .ul-choose-answer")
      .children("li")
      .click(function () {
        var t;
        ($(this)
          .parent()
          .children("li")
          .each(function () {
            $(this).css({ color: "", "font-weight": "" });
          }),
          $(this).find("input").attr("checked", "checked"),
          $(this).find("input").prop("checked", !0),
          $(this).css({ color: "gray", "font-style": "italic" }),
          $(this)
            .parent()
            .children("li")
            .each(function () {
              ($(this).find("input").attr("disabled", "disabled"),
                $(this).unbind("click"));
            }),
          $(this).parent().parent().attr("answer-index") == $(this).index()
            ? 0 < $("#answer-popup").length &&
              ((t = $("#answer-popup div").eq(0).html().split("/")),
              $("#answer-popup div")
                .eq(0)
                .html(parseInt(t[0]) + 1 + "/" + t[1]),
              $(this).find("input").attr("checked", "checked"),
              $(this)
                .parent()
                .css({
                  background: "#F5F5DC",
                  "border-radius": "7px",
                  padding: "8px",
                  border: "2px solid #1ea362",
                }))
            : 0 < $("#answer-popup").length &&
              ((t = $("#answer-popup div").eq(2).html().split("/")),
              $("#answer-popup div")
                .eq(2)
                .html(parseInt(t[0]) + 1 + "/" + t[1]),
              $(this).css({ color: "red", "font-weight": "bold" }),
              $(this).find("input").attr("checked", "checked"),
              $(this)
                .parent()
                .css({
                  background: "lightgray",
                  "border-radius": "7px",
                  padding: "8px",
                  border: "2px solid red",
                })));
      }),
    $(".answer-the-questions-section .ul-multi-choose-answer")
      .children("li")
      .each(function () {
        var t = $(this).html();
        ($(this).html(
          '<input type="checkbox" name="rdo' +
            $(this).parent().parent().index() +
            $(this).parent().index() +
            '" /> ' +
            t,
        ),
          $(this).css({ "list-style-type": "none" }));
      }),
    $(".answer-the-questions-section .ul-multi-choose-answer")
      .children("li")
      .click(function () {
        $(this).unbind("click");
        var t,
          e,
          i = parseInt($(this).parent().attr("q")) - 1;
        (0 <= i &&
          ($(this).parent().attr("q", i),
          $(this).find("input").attr("checked", "checked"),
          $(this).css({
            "font-weight": "",
            background: "lightgray",
            padding: "8px",
          }),
          $(this).find("input").attr("disabled", "disabled"),
          $(".answer-the-questions-section .ul-multi-choose-answer")
            .children("li")
            .eq($(this).index())
            .unbind("click")),
          0 == i &&
            ((t = ""),
            $(this)
              .parent()
              .children("li")
              .each(function () {
                ($(this).find("input").attr("disabled", "disabled"),
                  $(this).unbind("click"),
                  "checked" == $(this).find("input").attr("checked") &&
                    (t += $(this).index() + ","));
              }),
            0 < t.length && (t = t.substring(0, t.length - 1)),
            $(this).parent().parent().attr("answer-index") == t
              ? ((e = $("#answer-popup div").eq(0).html().split("/")),
                $("#answer-popup div")
                  .eq(0)
                  .html(parseInt(e[0]) + 1 + "/" + e[1]),
                $(this)
                  .parent()
                  .css({
                    background: "#F5F5DC",
                    "border-radius": "7px",
                    padding: "8px",
                    border: "2px solid #1ea362",
                  }))
              : ((e = $("#answer-popup div").eq(2).html().split("/")),
                $("#answer-popup div")
                  .eq(2)
                  .html(parseInt(e[0]) + 1 + "/" + e[1]),
                $(this)
                  .parent()
                  .css({
                    background: "lightgray",
                    "border-radius": "7px",
                    padding: "8px",
                    border: "2px solid red",
                  }))));
      }),
    $(".faq-list-section .ul-choose-answer li").each(function () {
      var t = $(this)
        .html()
        .replace("_____", ' <input class="txt-input-answer" /> ');
      $(this).html(t);
    }),
    $(".faq-list-section p").each(function () {
      var t = $(this)
        .html()
        .replace(/ __________ /g, ' <input class="txt-input-answer" /> ');
      $(this).html(t);
    }),
    $(".txt-input-one-line").each(function () {
      var t = $(this)
        .html()
        .replace(/ _____ /g, ' <input class="txt-input-answer" /> ');
      $(this).html(t);
    }),
    $(".answer-the-questions-section-char").each(function () {
      var t = $(this)
        .html()
        .replace(/______/g, ' <input class="txt-input-answer-char" /> ')
        .replace(/_/g, ' <input class="txt-input-answer-char" /> ');
      $(this).html(t);
    }),
    $(".txt-input-answer-char").bind("input", function () {
      "" !== $(this).val() && $(this).next(".txt-input-answer-char").focus();
    }),
    $(".answer-the-questions-textarea").each(function () {
      var t = $(this)
        .html()
        .replace(
          /_____________/g,
          '<textarea class="txt-textarea-long-answer"></textarea>',
        )
        .replace(
          /__________/g,
          '<textarea class="txt-textarea-long-answer"></textarea>',
        );
      $(this).html(t);
    }),
    $(".answer-the-questions-section-better-fit").each(function () {
      var e = $(this).children("span").eq(0).html().split("/"),
        t = $(this)
          .html()
          .replace(
            /__________/g,
            ' <select class="opt-better-fit"><option></option></select> ',
          );
      ($(this).html(t),
        $(this)
          .find(".opt-better-fit")
          .each(function () {
            for (var t = 0; t < e.length; t++)
              $(this).append(
                '<option value="' +
                  $.trim(e[t]) +
                  '">' +
                  $.trim(e[t]) +
                  "</option>",
              );
          }));
    }),
    $(".answer-the-questions-section-word-blank").each(function () {
      var t = $(this)
        .html()
        .replace(/__________/g, "");
      $(this).html(
        "<span>" +
          t +
          '</span> <select class="opt-fill-blank"><option></option></select>',
      );
    }));
  var t = "";
  ($("#ul-free-option")
    .children("li")
    .each(function () {
      t += "<option>" + $.trim($(this).html()) + "</option>";
    }),
    $(".opt-fill-blank").each(function () {
      $(this).append(t);
    }));
  var e = "";
  ($(".ul-free-option")
    .children("li")
    .each(function () {
      e += "<option>" + $.trim($(this).html()) + "</option>";
    }),
    0 < $(".word-blank-cover").length &&
      ("" == e && (e = t),
      $(".word-blank-cover")
        .find(".answer-the-questions-section-word-blank")
        .each(function () {
          ($(this).children(".opt-fill-blank").html("<option></option>"),
            $(this).children(".opt-fill-blank").append(e));
        })),
    $(".opt-fill-blank").change(function () {
      ($(this).attr("disabled", "disabled"),
        $(this).css({ background: "#F3F3F3", border: "" }));
    }),
    $(".answer-the-questions-section-true-false").each(function () {
      var t = $(this)
        .html()
        .replace(
          /_____/,
          '<select class="opt-true-false"><option></option><option>T</option><option>F</option></select>',
        )
        .replace(
          /__________/,
          '<textarea class="txt-textarea-long-answer"></textarea>',
        );
      $(this).html(t);
    }),
    $(".opt-true-false").change(function () {
      ($(this).attr("disabled", "disabled"),
        $(this).css({ background: "#F3F3F3", border: "" }),
        "F" == $(this).val() &&
          $(this)
            .parent()
            .children(".txt-textarea-long-answer")
            .css({ display: "block" }));
    }),
    $(".the-questions-R-W").each(function () {
      var t = $(this)
        .html()
        .replace(
          /_____/,
          '<select class="opt-r-w"><option></option><option>Right</option><option>Wrong</option></select>',
        )
        .replace(
          /__________/,
          '<textarea class="txt-textarea-long-answer"></textarea>',
        );
      $(this).html(t);
    }),
    $(".opt-r-w").change(function () {
      ($(this).attr("disabled", "disabled"),
        $(this).css({ background: "#F3F3F3", border: "" }),
        "Wrong" == $(this).val() &&
          $(this)
            .parent()
            .children(".txt-textarea-long-answer")
            .css({ display: "block" }));
    }),
    $(".answer-the-questions-word-similar").each(function () {
      var t = $(this)
        .html()
        .replace(/__________/g, '<input class="txt-input-answer" />');
      $(this).html(t);
    }),
    $(".answer-the-questions-CI").each(function () {
      var t = $(this)
        .html()
        .replace(
          /______/,
          '<select class="opt-ci"><option></option><option>C</option><option>I</option></select>',
        );
      $(this).html(t);
    }),
    $(".opt-ci").change(function () {
      ($(this).attr("disabled", "disabled"),
        $(this).css({ background: "#F3F3F3", border: "" }));
    }),
    $(".word-or-phrase").each(function () {
      var t = $(this)
        .html()
        .replace(
          /______/g,
          '<select class="opt-word-phrase"><option></option></select>',
        );
      $(this).html(t);
      var e = "";
      ($(this)
        .children("table")
        .children("tbody")
        .children("tr")
        .each(function () {
          e += "<option>" + $(this).children("td").eq(1).html() + "</option>";
        }),
        $(".opt-word-phrase").each(function () {
          $(this).append(e);
        }));
    }),
    $(".opt-word-phrase").change(function () {
      ($(this).attr("disabled", "disabled"),
        $(this).css({ background: "#F3F3F3", border: "" }));
    }),
    $(".answer-the-questions-word-free").each(function () {
      var t = $(this)
        .html()
        .replace(/__________/g, ' <input class="txt-input-answer" />');
      $(this).html(t);
    }));
}
function practiceTimerAlert() {
  0 == $("#answer-popup").length &&
    ($("body").append(
      '<div id="answer-popup"><div>0/' +
        $(".answer-the-questions-section").length +
        "</div><div>00:00</div><div>0/" +
        $(".answer-the-questions-section").length +
        "</div></div>",
    ),
    0 == $("#exercise-answer-block").length &&
      $("#exercise-block")
        .parent()
        .append('<div id="exercise-answer-block"></div>'),
    $("#exercise-answer-block").css({ display: "block" }),
    null == answerTimerInterval &&
      (answerTimerInterval = setInterval(function () {
        var t = $("#answer-popup div").eq(1).html().split(":"),
          e = parseInt(t[1]) + 1,
          i = parseInt(t[0]);
        59 < e && ((i += 1), (e = 0));
        var n = $("#answer-popup div").eq(0).html().split("/"),
          o = $("#answer-popup div").eq(2).html().split("/"),
          t = parseInt(n[0]) + parseInt(o[0]);
        ((59 < i || t >= parseInt(n[1])) &&
          (clearInterval(answerTimerInterval),
          0 < parseInt(o[0]) &&
            ($(".exercise-section-red-answer-key").css({
              "border-bottom": "1px solid",
              "font-weight": "bold",
              "z-index": "9999",
              position: "fixed",
              left: 0,
              width: "100%",
              bottom: 100,
              "border-radius": "0px",
              padding: "15px 0px 15px 0px",
            }),
            $(".exercise-section-red-answer-key").css({ display: "block" }),
            $("#exercise-answer-block").html(
              "<p>&nbsp;</p><p>&nbsp;</p><p>&nbsp;</p>",
            ))),
          e < 10 && (e = "0" + e),
          i < 10 && (i = "0" + i),
          $("#answer-popup div")
            .eq(1)
            .html(i + ":" + e));
      }, 1e3)));
}
function auto_grow(t) {
  ((t.style.height = "5px"), (t.style.height = t.scrollHeight + "px"));
}
function wordnote(t) {
  ($("#word-note-cover").remove(),
    $(".word-note-cover").each(function () {
      $(this).show();
    }),
    t.parent().children(".word-note-cover").hide());
  var e = t.attr("word"),
    i = JSON.parse(localStorage.getItem(e)),
    n = "";
  null != i.note && (n = i.note);
  i = t.attr("windex");
  (t
    .parent()
    .append(
      '<div id="word-note-cover"><textarea word="' +
        e +
        '">' +
        n +
        '</textarea><br/><input type="button"  word="' +
        e +
        '" windex="' +
        i +
        '" class="note-button" value="Save" /> <input type="button" word="' +
        e +
        '" windex="' +
        i +
        '" class="note-button" value="Close" /></div>',
    ),
    setTimeout(function () {
      var t = $("#word-note-cover").children("textarea").get(0).scrollHeight;
      $("#word-note-cover")
        .children("textarea")
        .css("height", t + "px");
    }, 1),
    $("#word-note-cover")
      .children("textarea")
      .on("input", function () {
        var t = $(this).get(0).scrollHeight;
        $(this).css("height", t + "px");
      }),
    $("#word-note-cover")
      .children("input")
      .eq(0)
      .bind("click", function () {
        var t = JSON.parse(localStorage.getItem($(this).attr("word")));
        ((t.note = $("#word-note-cover textarea").val()),
          localStorage.setItem($(this).attr("word"), JSON.stringify(t)),
          "" != t.note
            ? (0 ==
                $(".wordlist li")
                  .eq($(this).attr("windex"))
                  .find(".word-note-cover").length &&
                $(".wordlist li")
                  .eq($(this).attr("windex"))
                  .find(".en-desc")
                  .append('<div class="word-note-cover"></div>'),
              0 ==
                $("#item" + $(this).attr("windex")).find(".word-note-cover")
                  .length &&
                $("#item" + $(this).attr("windex"))
                  .find(".en-desc")
                  .append('<div class="word-note-cover"></div>'),
              $(".wordlist li")
                .eq($(this).attr("windex"))
                .find(".word-note-cover")
                .html(t.note.replace(/\n/g, "<br/>")),
              $("#item" + $(this).attr("windex"))
                .find(".word-note-cover")
                .html(t.note.replace(/\n/g, "<br/>")),
              $(".wordlist li")
                .eq($(this).attr("windex"))
                .find(".word-note-cover")
                .show(),
              $("#item" + $(this).attr("windex"))
                .find(".word-note-cover")
                .show())
            : ($(".wordlist li")
                .eq($(this).attr("windex"))
                .find(".word-note-cover")
                .hide(),
              $("#item" + $(this).attr("windex"))
                .find(".word-note-cover")
                .hide()),
          $("#word-note-cover").remove());
      }),
    $("#word-note-cover")
      .children("input")
      .eq(1)
      .bind("click", function () {
        var t = JSON.parse(localStorage.getItem($(this).attr("word")));
        ("" != t.note
          ? (0 ==
            $("#word-note-cover").parent().children(".word-note-cover").length
              ? $("#word-note-cover")
                  .parent()
                  .append(
                    '<div class="word-note-cover">' +
                      t.note.replace(/\n/g, "<br/>") +
                      "</div>",
                  )
              : $("#word-note-cover")
                  .parent()
                  .children(".word-note-cover")
                  .html(t.note.replace(/\n/g, "<br/>")),
            $("#word-note-cover").parent().children(".word-note-cover").show())
          : $("#word-note-cover").parent().children(".word-note-cover").hide(),
          $("#word-note-cover").parent().children(".word-note-cover").show(),
          $("#word-note-cover").remove());
      }));
}
function loadRead(t, e) {
  localStorage.getItem(t.toLowerCase());
}
function sendLoginAction(t) {
  try {
    webkit.messageHandlers.loginAction.postMessage(t);
  } catch (t) {}
}
function mobileHeader() {
  document.querySelector("h1").innerHTML = "WKWebView Mobile";
}
$(function () {
  var t;
  ((elm = document.getElementById("sound")),
    $("#modal").css({ display: "block", opacity: "1" }),
    $("#extendedSplashProgress").css({
      left: ($(window).width() - $("#extendedSplashProgress").width()) / 2,
    }),
    resizeModal(),
    resize(),
    null == localStorage.getItem("settings") &&
      ((t = { next: !1, loop: 0 }),
      localStorage.setItem("settings", JSON.stringify(t))),
    null == localStorage.getItem("fontSize")
      ? ((t = { fontSize: fontSize }),
        localStorage.setItem("fontSize", JSON.stringify(t)))
      : ((t = JSON.parse(localStorage.getItem("fontSize"))),
        (fontSize = t.fontSize)),
    $.ajax({
      url: "data/data.json?n=" + new Date().getTime(),
      type: "GET",
      dataType: "text",
      success: function (t) {
        var e = $.parseJSON(t).flashcard;
        ($("#home-section").html(""),
          $("#home-section").append('<div style="padding-bottom:20px"></div>'),
          (loadedTime = e.length));
        for (
          var i =
              "#0D7F9B,#82823F,#D2462A,#4d2f82,#0F505B,#485A90,#82823F,#2E3A98,#985154,#6c5658,#2d7d6e".split(
                ",",
              ),
            n = 0,
            o = 0;
          o < e.length;
          o++
        ) {
          var s = e[o].en,
            a = e[o].desc;
          null == a && (a = "Index");
          var r = urlFriendly(a.toLowerCase());
          0 == $("#div-" + r).length &&
            ($("#home-section").append(
              '<div id="div-' +
                r +
                '"><div class="section-cover" style="font-weight: bold; text-align: left; background:' +
                i[n] +
                '"><div style="padding:13px 10px; color:white;">' +
                a +
                '</div></div><ul class="curriculum-item"></ul></div>',
            ),
            (n += 1));
          var l,
            d = "waiting",
            a = localStorage.getItem(s.toLowerCase());
          (null != a && (d = 1 == $.parseJSON(a).read ? "play" : "reading"),
            null != e[o].wordlist
              ? ((l = e[o].wordlist.length),
                e[o].reading[0].en,
                e[o].reading[0].image,
                $("#div-" + r)
                  .children("ul")
                  .append(
                    '<li class="item  word-list-session"  en="' +
                      s +
                      '" idx="' +
                      o +
                      '" wl="' +
                      l +
                      '" ><table id="tbl-last-session' +
                      o +
                      '"><tr><td><div class="' +
                      d +
                      '"></div></td><td><div class="title">' +
                      s +
                      " </div></td></tr></table></li>",
                  ))
              : "Index" == s
                ? $("#home-section")
                    .children("ul")
                    .append(
                      '<li style="text-align:unset"><div><table id="tbl-last-session' +
                        o +
                        '"><tr><td style="position:relative"><img en="' +
                        s +
                        '" idx="' +
                        o +
                        '" wl="' +
                        l +
                        '" style=" border:0px solid chocolate;" class="word-list-session img-last-session-unit" src="data/icon.jpg" /></td></tr></table><div en="' +
                        s +
                        '" idx="' +
                        o +
                        '" wl="' +
                        l +
                        '" class="word-list-session button-lesson" style="text-align:center; color:white;  background:None">' +
                        s +
                        "</div></div></li>",
                    )
                : $("#div-" + r)
                    .children("ul")
                    .append(
                      '<li class="item  word-list-session"  en="' +
                        s +
                        '" idx="' +
                        o +
                        '" wl="0" ><table id="tbl-last-session' +
                        o +
                        '"><tr><td><div class="' +
                        d +
                        '"></div></td><td><div class="title">' +
                        s +
                        " </div></td></tr></table></li>",
                    ),
            sessionStorage.setItem(s, JSON.stringify(e[o])),
            --loadedTime);
        }
        ($(".word-list-session").click(function () {
          0 == checkUnitOpened($(this).attr("en"))
            ? (showAds(),
              showAdsForNextLesson(
                $(this).attr("en"),
                $(this).attr("en"),
                $(this).attr("idx"),
                0,
              ))
            : (1 == showAds() && JSBridge.LoadStoryAnswerKeyVideoAds(""),
              showCategorySection($(this).attr("en"), $(this).attr("idx"), 0));
        }),
          $(".exercise-lastest-session").click(function () {
            showCategorySection(
              $(this).attr("en"),
              $(this).attr("idx"),
              parseInt($(this).attr("wl")),
            );
          }),
          $(".story-lastest-session, .session-play-button").click(function () {
            0 == checkUnitOpened($(this).attr("en")) ||
              showCategorySection(
                $(this).attr("en"),
                $(this).attr("idx"),
                parseInt($(this).attr("wl")),
              );
          }),
          $(".section-cover").bind("click", function () {
            "1" == $(this).attr("opened")
              ? ($(this).attr("opened", "0"),
                $(this)
                  .parent()
                  .children(".curriculum-item")
                  .css({ display: "" }))
              : ($(this)
                  .parent()
                  .children(".curriculum-item")
                  .css({ display: "block" }),
                $(this).attr("opened", "1"));
          }),
          init());
      },
    }),
    (intervalInit = setInterval(function () {
      loadedTime <= 0 &&
        (clearInterval(intervalInit),
        homeSectionResize(),
        swipeWindow(),
        resizeLastSession(),
        $("#modal").animate({ opacity: "0" }, 2e3, function () {
          $("#modal").css({ display: "none" });
        }));
    }, 1e3)),
    $(window).resize(function () {
      var t = $("#section-section").find(".title").html();
      switch (
        (resizeModal(), resize(), homeSectionResize(), swipeWindow(), t)
      ) {
        case "Index":
          scaleFontSizeIndexToolTips();
          break;
        case "":
          break;
        default:
          scaleFontSize();
      }
      resizeLastSession();
    }),
    $("body").css({ "font-size": fontSize + "%" }));
});
