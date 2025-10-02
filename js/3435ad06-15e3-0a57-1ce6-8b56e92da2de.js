var timeout,
  elm,
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
  currentIndex,
  win_width = $(window).width(),
  win_height = $(window).height(),
  lang = 2,
  autoPlay = !1,
  tmp = "",
  audioLoop = 0,
  currentTime = 0,
  firstTimeLoaded = 0,
  fontSize = 100,
  path = "/apps-data/verbal-advantage-10/",
  lsession = "lastestSession-" + path.split("/")[2],
  lsetting = "settings-" + path.split("/")[2],
  lfontSetting = "fontSize-" + path.split("/")[2];
function succeded(e, t) {
  switch (t) {
  }
}
var intervalInit,
  audioTimeout,
  loadedTime = 0,
  ads = !1,
  countUnitLearned = 0;
$(function () {
  ((elm = document.getElementById("sound")),
    $("#modal").css({ display: "block", opacity: "1" }),
    resizeModal(),
    resizeHomeSection());
  var e = localStorage.getItem(lsetting);
  if (null == e) {
    var t = { next: !1, loop: 0 };
    localStorage.setItem(lsetting, JSON.stringify(t));
  }
  var i = localStorage.getItem(lfontSetting);
  if (null == i) {
    var t = { fontSize: fontSize };
    localStorage.setItem(lfontSetting, JSON.stringify(t));
  } else {
    var n = JSON.parse(localStorage.getItem(lfontSetting));
    fontSize = n.fontSize;
  }
  ($.ajax({
    url: "data/data.json?n=1",
    type: "GET",
    dataType: "text",
    success: function (e) {
      var t = $.parseJSON(e),
        n = t.flashcard;
      loadedTime = n.length;
      for (
        var s = [
            "#0D7F9B",
            "#82823F",
            "#D2462A",
            "#4d2f82",
            "#0F505B",
            "#485A90",
            "#82823F",
            "#2E3A98",
            "#985154",
            "#6c5658",
            "#2d7d6e",
          ],
          d = 0,
          r = 0;
        r < n.length;
        r++
      ) {
        var o = n[r].en,
          l = n[r].desc;
        l == null && (l = "Unit");
        var a = urlFriendlyFull(l.toLowerCase());
        0 == $("#div-" + a).length &&
          ($("#home-section").append(
            '<div id="div-' +
              a +
              '"><div class="section-cover" style="display:none;font-weight: bold; text-align: left; background:' +
              s[d] +
              '"><div style="padding:13px 10px; color:white;">' +
              l +
              '</div></div><ul class="curriculum-item"></ul></div>',
          ),
          (d += 1));
        var c = "waiting",
          h = localStorage.getItem(path.split("/")[2] + ":" + o.toLowerCase());
        null != h &&
          (!0 == $.parseJSON(h).read ? (c = "play") : (c = "reading"));
        var p =
          "/apps/" +
          path.split("/")[2] +
          "/" +
          urlFriendlyFull(o.toLowerCase()) +
          "/#" +
          r;
        if (n[r].wordlist != null) {
          var v = n[r].wordlist.length,
            m = "";
          ((p =
            "/apps/" +
            path.split("/")[2] +
            "/" +
            urlFriendlyFull(o + "-" + m).toLowerCase() +
            "/#" +
            r),
            $("#div-" + a)
              .children("ul")
              .append(
                '<li class="item  word-list-session" story-title="' +
                  m +
                  '"  en="' +
                  o +
                  '" idx="' +
                  r +
                  '" wl="' +
                  v +
                  '"><table id="tbl-last-session' +
                  r +
                  '"><tr><td><div class="' +
                  c +
                  '"></div></td><td><div class="title">' +
                  o +
                  "</div></td></tr></table></li>",
              ));
        } else
          $("#div-" + a)
            .children("ul")
            .append(
              '<li class="item  word-list-session"  story-title="" en="' +
                o +
                '" idx="' +
                r +
                '" wl="0" ><table id="tbl-last-session' +
                r +
                '"><tr><td><div class="' +
                c +
                '"></div></td><td><div class="title">' +
                o +
                "</div></td></tr></table></li>",
            );
        (sessionStorage.setItem(
          path.split("/")[2] + ":" + o,
          JSON.stringify(n[r]),
        ),
          (loadedTime -= 1),
          r == n.length - 1 &&
            (homeSectionResize(),
            resizeLastSession(),
            $("#container").css({ opacity: "1" }),
            $("#modal").animate({ opacity: "0" }, 1e3, function () {
              ($(".header").css({ display: "block" }), $("#modal").remove());
            })));
      }
      ($(".word-list-session").click(function () {
        !1 == checkUnitOpened($(this).attr("en"))
          ? (showAds(),
            "" == $(this).attr("story-title")
              ? showAdsForNextLesson(
                  $(this).attr("en"),
                  $(this).attr("en"),
                  $(this).attr("idx"),
                  0,
                )
              : showAdsForNextLesson(
                  $(this).attr("en"),
                  $(this).attr("en") + ": " + $(this).attr("story-title"),
                  $(this).attr("idx"),
                  0,
                ))
          : (!0 == showAds() && JSBridge.LoadStoryAnswerKeyVideoAds(""),
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
    $(window).resize(function () {
      var e = $("#section-section").find(".title").html();
      switch ((resizeModal(), homeSectionResize(), e)) {
        case "Index":
          scaleFontSizeIndexToolTips();
          break;
        case "":
          break;
        default:
          scaleFontSize();
      }
      (resizeLastSession(), resizeExerciseStory());
    }),
    $("body").css({ "font-size": fontSize + "%" }));
});
function init() {
  (loadLastSession(),
    $("#home-section").attr("top", $("#home-section").attr("top")),
    $("#home-section").css({ position: "absolute", top: 55 }),
    $("#category-section").attr("top", $("#home-section").attr("top")),
    $("#category-section").css({ top: 55 }),
    $("#section-section").click(function () {
      ($("#answer-popup").remove(),
        $(".font-size").attr("style", ""),
        $(".show-ads-cover").remove(),
        elm.pause(),
        loadLastSession(),
        clearTimeout(nextTimeOut),
        clearTimeout(loopTimeOut),
        $("#bottom-section")
          .children(".container")
          .html(
            '<div class="app-name">Verbal Advantage</div ><div class="app-slogan">Level 10</div>',
          ),
        $("#bottom-section").css({ display: "block" }),
        0 < $("#idiom-tip-popup").length && $("#idiom-tip-popup").remove(),
        $("#home-detail").css({ display: "block" }),
        $("#home-detail").animate({ opacity: "1" }, 0, function () {}),
        $("#section-section").css({ display: "none" }),
        $("#category-section").css({ position: "fixed" }),
        $("#category-section").animate(
          { opacity: 0, left: $(window).width() - 4 },
          0,
          function () {
            $("#category-section").css({
              position: "absolute",
              display: "none",
            });
          },
        ),
        $("#home-section").css({ position: "absolute", display: "block" }),
        $("html,body").animate(
          {
            scrollTop: $("#tbl-last-session" + currentIndex).offset().top - 100,
          },
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
          var e = $(this).index();
          0 === e
            ? (fontSize -= 10)
            : 1 === e
              ? (fontSize = 100)
              : 2 === e
                ? (fontSize += 10)
                : void 0;
          $("body").css({ "font-size": fontSize + "%" });
          var t = { fontSize: fontSize };
          localStorage.setItem(lfontSetting, JSON.stringify(t));
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
  (!1 == hold &&
    ((direction = "left"),
    (next = elm_index + 1),
    next == elm_length
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
  (!1 == hold &&
    ((direction = "right"),
    (next = elm_index - 1),
    0 > next
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
function panEnd(e) {
  ("left" == direction
    ? 100 < e
      ? ($("#item" + elm_index).animate(
          { left: -$(window).width() },
          400,
          function () {},
        ),
        1 == $("#item" + next).attr("story") ||
        1 == $("#item" + next).attr("exercise")
          ? $("#item" + next).animate({ left: 0 }, 400, function () {
              (playSound(next, $("#item" + next).attr("source")),
                focusReading(next));
            })
          : $("#item" + next).animate({ left: 10 }, 400, function () {
              (playSound(next, $("#item" + next).attr("source")),
                focusReading(next));
            }),
        (elm_index = next))
      : ($("#item" + elm_index).animate({ left: 10 }, 400, function () {}),
        $("#item" + next).animate(
          { left: $(window).width() },
          400,
          function () {},
        ),
        nextWordReading())
    : 100 < e
      ? ($("#item" + elm_index).animate(
          { left: $(window).width() },
          400,
          function () {},
        ),
        1 == $("#item" + next).attr("story") ||
        1 == $("#item" + next).attr("exercise")
          ? $("#item" + next).animate({ left: 0 }, 400, function () {
              (playSound(next, $("#item" + next).attr("source")),
                focusReading(next));
            })
          : $("#item" + next).animate({ left: 10 }, 400, function () {
              (playSound(next, $("#item" + next).attr("source")),
                focusReading(next));
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
  if (($("#setting-container").remove(), 0 == $("#setting-container").length)) {
    var e = "<table>";
    ((e +=
      '<tr><td>Auto next</td><td><label class="switch"><input id="chkAuto" type="checkbox"><div class="slider round"></div></label></td></tr>'),
      (e +=
        '<tr><td>Number of repeat</td><td><select id="optLoop"><option value="0">0</option><option value="1">1</option><option value="2">2</option><option value="3">3</option><option value="4">4</option><option value="5">5</option></select></td></tr>'),
      (e += "</table>"),
      $(".font-size").append(
        '<div id="setting-container"><div>' + e + "</div></div>",
      ),
      $("#setting-container").children("div").css({ padding: 10 }),
      $("#chkAuto, #optLoop").change(function () {
        var e = $("#chkAuto").prop("checked"),
          t = { next: e, loop: $("#optLoop").val() };
        localStorage.setItem(lsetting, JSON.stringify(t));
      }));
  }
  var t = JSON.parse(localStorage.getItem(lsetting));
  ($("#optLoop").val(t.loop),
    !0 == t.next
      ? $("#chkAuto").attr("checked", "checked")
      : $("#chkAuto").removeAttr("checked"));
}
function settings(e) {
  if (($("#setting-container").remove(), 1 == e)) {
    if (
      ($("#settings img").attr("src", "icons/close-window-50.png"),
      0 == $("#setting-container").length)
    ) {
      var t = "<table>";
      ((t +=
        '<tr><td>Auto next words</td><td><label class="switch"><input id="chkAuto" type="checkbox"><div class="slider round"></div></label></td></tr>'),
        (t +=
          '<tr><td>Number of repeat</td><td><select id="optLoop"><option value="0">0</option><option value="1">1</option><option value="2">2</option><option value="3">3</option><option value="4">4</option><option value="5">5</option></select></td></tr>'),
        (t += "</table>"),
        $("body").append(
          '<div id="setting-container"><div>' + t + "</div></div>",
        ),
        $("#setting-container").css({
          height: $(window).height(),
          width: 250,
          right: -300,
        }),
        $("#setting-container").children("div").css({ padding: 20 }),
        $("#chkAuto, #optLoop").change(function () {
          var e = $("#chkAuto").prop("checked"),
            t = { next: e, loop: $("#optLoop").val() };
          localStorage.setItem(lsetting, JSON.stringify(t));
        }));
    }
    var i = JSON.parse(localStorage.getItem(lsetting));
    ($("#optLoop").val(i.loop),
      !0 == i.next
        ? $("#chkAuto").attr("checked", "checked")
        : $("#chkAuto").removeAttr("checked"),
      $("#settings").attr("itemid", 0),
      $("#setting-container").animate({ right: 0 }, function () {}));
  } else
    ($("#settings img").attr("src", "icons/Settings-50.png"),
      $("#setting-container").animate({ right: -300 }, function () {}),
      $("#settings").attr("itemid", 1));
}
function resize() {
  1 == $("#show-menu").attr("itemid")
    ? $(".header").animate({ left: $(window).width() - 60 }, 0, function () {
        $(".header").css({ position: "fixed" });
      })
    : $(".header").css({ width: "100%", left: 0 });
  var e = $(window).width();
  ($("#container").css({ width: e }), $("#category-section").css({ width: e }));
}
function resizeHomeSection() {
  var e =
      $(window).height() -
      $(".header").height() -
      $("#bottom-section").height(),
    t = $(".header").css("height"),
    i = $("#home-section");
}
function showCategorySection(e, t, i) {
  if (
    ((autoPlay = !1),
    0 < $(".exercise-section-red-answer-key").length &&
      $(".exercise-section-red-answer-key").remove(),
    $(".font-size").attr("style", ""),
    0 < $("#answer-popup").length &&
      ($("#answer-popup").remove(),
      clearInterval(answerTimerInterval),
      (answerTimerInterval = null)),
    0 < $("#idiom-tip-popup").length && $("#idiom-tip-popup").remove(),
    setStoreLastSession(e, t, i),
    $("#bottom-section").css({ display: "none" }),
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
    "index" != e.toLowerCase())
  ) {
    var n = JSON.parse(sessionStorage.getItem(path.split("/")[2] + ":" + e));
    null == n
      ? $("#section-section").children(".title").html(e)
      : $("#section-section").children(".title").html(e);
  } else $("#section-section").children(".title").html(e);
  ($("html,body").animate({ scrollTop: 0 }, 0),
    $("#home-section").css({ display: "none", opacity: "0" }),
    $("#category-section").css({ left: "", display: "block", opacity: "1" }),
    $("#home-section").attr("home", "0"));
  var s = JSON.parse(localStorage.getItem(lsetting));
  (null != s && (audioLoop = s.loop),
    (currentReadingIndex = i),
    (currentIndex = t),
    getSectionItem(e));
}
function getSectionItem(e) {
  if (null != sessionStorage[path.split("/")[2] + ":" + e]) {
    var t = JSON.parse(localStorage.getItem(lsetting));
    remainAudioLoop = null != t && 0 < t.loop ? t.loop : 0;
    var n = localStorage.getItem(e.toLowerCase());
    if (null == n) {
      (localStorage.setItem(
        path.split("/")[2] + ":" + e.toLowerCase(),
        JSON.stringify({ read: !1 }),
      ),
        $("#tbl-last-session" + currentIndex)
          .find("div")
          .eq(0)
          .attr("class", "reading"));
    }
    $("#category-section").children(".section").children(".container").html("");
    var s = JSON.parse(
      sessionStorage.getItem(path.split("/")[2] + ":" + e),
    ).wordlist;
    if (s != null || null != s) {
      $("#category-section")
        .children(".section")
        .children(".container")
        .append(
          '<div id="idioms-block" class=" seg-block"><div class="wordlist-rotate">Word List</div><ul class="wordlist"></ul></div>',
        );
      for (var d = 0; d < s.length; d++) {
        var r = s[d].en,
          o = s[d].en.substring(0, 1),
          l = o.toUpperCase() + r.substring(1, r.length),
          a = s[d].vi,
          c = s[d].pron,
          h = s[d].desc,
          p = s[d].exam,
          v = s[d].image,
          m = s[d].sound,
          y =
            '<li remainAudioLoop="' + remainAudioLoop + '" id="item' + d + '">';
        ((y += '<div class="wordlist-cover">'),
          (y +=
            '<div class="en-word">' +
            r +
            ' <span class="en-pron">' +
            c +
            '</span> <img class="wordlist-sound speaker-louder" idx="' +
            d +
            '" source="data/' +
            urlFriendly(e) +
            "/wordlist/" +
            m +
            '" title="' +
            r +
            '" src="icons/speaker_louder.png" /></div>'),
          (y +=
            '<div class="en-desc">' +
            h
              .replace(r, "<strong>" + r + "</strong>")
              .replace(l, "<strong>" + l + "</strong>") +
            "</div>"),
          (y += '<div class="en-exam">' + p + "</div>"),
          (y += "</div>"),
          (y += "</li>"),
          $("#idioms-block").find(".wordlist").append(y),
          $("#item" + d).attr(
            "source",
            "data/" + urlFriendlyFull(e) + "/wordlist/" + m + "",
          ),
          $("#item" + d).attr("title", r),
          $("#item" + d).attr("nid", d + 1));
      }
    } else readFlag();
    var g = JSON.parse(
      sessionStorage.getItem(path.split("/")[2] + ":" + e),
    ).exercise;
    if (null != g)
      if (
        ($("#category-section")
          .children(".section")
          .children(".container")
          .append(
            '<div id="exercise-block" class="box_shadow_yt_iframe seg-block"></div>',
          ),
        "index" == e.toLowerCase())
      ) {
        for (var d = 0; 1 > d; d++) {
          var r = g[d].en,
            w = g[d].story;
          if (0 == d) {
            var y = "<div>";
            ((y +=
              '<div class="en-story"><div class="faq-list-section"><h2 style="margin-top:0px">' +
              r.toUpperCase() +
              "</h2>" +
              w +
              "</div></div>"),
              (y += "</div>"),
              $("#exercise-block").append(y));
          }
        }
        setTimeout(function () {
          for (var e = 1; e < g.length; e++) {
            var t = g[e].en,
              n = g[e].story;
            $("#exercise-block").append(
              '<div class="faq-list-section"><h2>' +
                t.toUpperCase() +
                "</h2>" +
                n +
                "</div></div>",
            );
          }
          $(".index-block-item li").click(function () {
            var e = $(this).children(".tool-index-idioms").html();
            ($(this).html('<div class="tool-index-idioms">' + e + "</div>"),
              $(this).css({ display: "contents", margin: "20px 0px 20px 0px" }),
              $(this)
                .children(".tool-index-idioms")
                .attr(
                  "style",
                  "display: table-cell;background:antiquewhite; padding:10px; border-radius:5px; color:black",
                ),
              scaleFontSize());
          });
        }, 200);
      } else
        for (var d = 0; d < g.length; d++) {
          var r = g[d].en,
            w = g[d].story,
            m = g[d].sound;
          ("Answer Key" == r
            ? $("#exercise-block").append(
                '<div id="exercise-answer-key"><div class="exercise-section">' +
                  r +
                  '</div><div class="faq-list-section" title="' +
                  r +
                  '">' +
                  w +
                  "</div></div></div>",
              )
            : "" == m
              ? $("#exercise-block").append(
                  '<div class="voca-block-title">' +
                    r +
                    ' </div><div class="faq-list-section" title="' +
                    r +
                    '">' +
                    w +
                    "</div></div>",
                )
              : $("#exercise-block").append(
                  '<div class="voca-block-title">' +
                    r +
                    ' <img title="' +
                    r +
                    '" source="data/' +
                    urlFriendly(e) +
                    "/exercise/" +
                    m +
                    '" class="speaker-louder" style="width:20px; float:left; margin-right: 10px" src="icons/speaker_louder.png" /></div><div class="faq-list-section" title="' +
                    r +
                    '">' +
                    w +
                    "</div></div>",
                ),
            d == g.length - 1 &&
              ("Answer Key" == r
                ? ($("#exercise-block").append(
                    '<div class="exercise-section-red-answer-key">Answer Key</div><p style="display:none" class="answer-key-remove-after">&nbsp;</p>',
                  ),
                  $(".exercise-section-red-answer-key").click(function () {
                    (0 == $(".show-ads-cover").length &&
                      $("body").append(
                        '<div class="show-ads-cover">Watch an AD to open ANSWER KEY</div>',
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
                        (console.log("VIDEO Ads loading..."),
                          JSBridge.LoadStoryAnswerKeyVideoAds(
                            "ANSWER KEY loaded. Check it out!",
                          ),
                          $(".show-ads-cover").remove(),
                          $("#exercise-block")
                            .children(".faq-list-section")
                            .children("ol")
                            .children("li")
                            .each(function () {
                              var e = $(this)
                                .find(".ul-choose-answer")
                                .attr("answer");
                              $("#exercise-block")
                                .children(".faq-list-section")
                                .children("ol")
                                .children("li")
                                .eq($(this).index())
                                .attr("answer-index", e);
                            }),
                          elm.pause(),
                          (autoPlay = !1),
                          $("#nav-story")
                            .children("li")
                            .eq(0)
                            .children("img")
                            .attr("status", 0),
                          $("#nav-story")
                            .children("li")
                            .eq(0)
                            .children("img")
                            .attr("src", "icons/play.png"),
                          readFlag(),
                          $(".answer-key-remove-after").remove(),
                          $("#exercise-answer-key").css({
                            display: "block",
                            "margin-top": "30px",
                          }),
                          $(".exercise-section-red-answer-key").css({
                            display: "none",
                          }),
                          $(".answer-key-only").html(""),
                          $("#exercise-answer-key").html(
                            '<table><tr><td></td><td style="background: aliceblue; text-align:center; font-weight:bold; text-transform:uppercase; padding:7px; font-size:15px">Answer Key</td><td style="background: aliceblue; text-align:center; font-weight:bold; text-transform:uppercase; padding:7px; font-size:15px">Your Answer</td></tr></table>',
                          ),
                          $(".exercise-section-red-answer-key")
                            .parent()
                            .children(".faq-list-section")
                            .each(function () {
                              ($("#exercise-answer-key table").append(
                                '<tr><td colspan="3" style="font-weight:bold; text-align:left; text-transform:uppercase">' +
                                  $(this).attr("title") +
                                  "</td></tr>",
                              ),
                                $(this)
                                  .children("ol")
                                  .each(function (e) {
                                    ($("#exercise-answer-key table").append(
                                      '<tr><td></td><td colspan="2" style="font-weight:bold;">' +
                                        $(this)
                                          .parent()
                                          .children("h4")
                                          .eq(e)
                                          .html() +
                                        "</td></tr>",
                                    ),
                                      $(this)
                                        .children(
                                          ".answer-the-questions-section",
                                        )
                                        .each(function () {
                                          ($("#divAnswerKeyCover").remove(),
                                            0 ==
                                              $("#divAnswerKeyCover").length &&
                                              $("body").append(
                                                '<div id="divAnswerKeyCover" style="display:none"><div></div><div></div></div>',
                                              ));
                                          var e = $(this)
                                            .attr("answer-index")
                                            .split(",");
                                          if (1 < e.length)
                                            for (var t = 0; t < e.length; t++)
                                              ($("#divAnswerKeyCover")
                                                .children("div")
                                                .eq(0)
                                                .append(
                                                  $(this)
                                                    .children(
                                                      ".ul-multi-choose-answer",
                                                    )
                                                    .children("li")
                                                    .eq(e[t])
                                                    .html() + "<br/>",
                                                ),
                                                $("#divAnswerKeyCover")
                                                  .children("div")
                                                  .eq(1)
                                                  .append(
                                                    $(this)
                                                      .children(
                                                        ".ul-multi-choose-answer",
                                                      )
                                                      .children("li")
                                                      .eq(e[t])
                                                      .html() + "<br/>",
                                                  ));
                                          var n = $(this)
                                            .children(".ul-choose-answer")
                                            .children("li")
                                            .eq($(this).attr("answer-index"));
                                          ($("#divAnswerKeyCover")
                                            .children("div")
                                            .eq(0)
                                            .html(n.html()),
                                            $("#divAnswerKeyCover")
                                              .children("div")
                                              .eq(0)
                                              .children("input")
                                              .remove());
                                          var s = $(this)
                                            .children(".ul-choose-answer")
                                            .children("li");
                                          (1 < e.length &&
                                            (s = $(this)
                                              .children(
                                                ".ul-multi-choose-answer",
                                              )
                                              .children("li")),
                                            $("#divAnswerKeyCover")
                                              .children("div")
                                              .eq(1)
                                              .html(""),
                                            s.each(function () {
                                              "checked" ==
                                                $(this)
                                                  .children("input")
                                                  .attr("checked") &&
                                                (1 < e.length
                                                  ? $("#divAnswerKeyCover")
                                                      .children("div")
                                                      .eq(1)
                                                      .append(
                                                        $(this).html() +
                                                          "<br/>",
                                                      )
                                                  : $("#divAnswerKeyCover")
                                                      .children("div")
                                                      .eq(1)
                                                      .append($(this).html()),
                                                $("#divAnswerKeyCover")
                                                  .children("div")
                                                  .eq(1)
                                                  .children("input")
                                                  .remove(),
                                                $(this)
                                                  .children("input")
                                                  .prop("checked", !0));
                                            }));
                                          var d = $.trim(
                                              $("#divAnswerKeyCover")
                                                .children("div")
                                                .eq(0)
                                                .html()
                                                .replace("____", ""),
                                            ),
                                            r = $.trim(
                                              $("#divAnswerKeyCover")
                                                .children("div")
                                                .eq(1)
                                                .html()
                                                .replace("____", ""),
                                            );
                                          d == r
                                            ? $(
                                                "#exercise-answer-key table",
                                              ).append(
                                                '<tr style="background:#1EA362; color:white"><td>' +
                                                  (parseInt($(this).index()) +
                                                    1) +
                                                  "</td><td>" +
                                                  d +
                                                  "</td><td>" +
                                                  r +
                                                  "</td></tr>",
                                              )
                                            : $(
                                                "#exercise-answer-key table",
                                              ).append(
                                                "<tr><td>" +
                                                  (parseInt($(this).index()) +
                                                    1) +
                                                  '</td><td style="background:#1EA362; color:white">' +
                                                  d +
                                                  '</td><td style="background:#D9433D; color:white">' +
                                                  r +
                                                  "</td></tr>",
                                              );
                                        }),
                                      $(this)
                                        .children(
                                          ".answer-the-questions-section-char",
                                        )
                                        .each(function () {
                                          ($("#divAnswerKeyCover").remove(),
                                            0 ==
                                              $("#divAnswerKeyCover").length &&
                                              $("body").append(
                                                '<div id="divAnswerKeyCover" style="display:none"><div></div><div></div></div>',
                                              ));
                                          var e = $(this).attr("value");
                                          $("#divAnswerKeyCover")
                                            .children("div")
                                            .eq(0)
                                            .html(e);
                                          var t = "";
                                          ($(this)
                                            .find(".txt-input-answer-char")
                                            .each(function () {
                                              t += $(this).val();
                                            }),
                                            $("#divAnswerKeyCover")
                                              .children("div")
                                              .eq(1)
                                              .html($(this).attr("pre") + t));
                                          var i = $.trim(
                                              $("#divAnswerKeyCover")
                                                .children("div")
                                                .eq(0)
                                                .html(),
                                            ),
                                            n = $.trim(
                                              $("#divAnswerKeyCover")
                                                .children("div")
                                                .eq(1)
                                                .html(),
                                            );
                                          i == n
                                            ? $(
                                                "#exercise-answer-key table",
                                              ).append(
                                                '<tr style="background:#1EA362; color:white"><td>' +
                                                  (parseInt($(this).index()) +
                                                    1) +
                                                  "</td><td>" +
                                                  i +
                                                  "</td><td>" +
                                                  n +
                                                  "</td></tr>",
                                              )
                                            : $(
                                                "#exercise-answer-key table",
                                              ).append(
                                                "<tr><td>" +
                                                  (parseInt($(this).index()) +
                                                    1) +
                                                  '</td><td style="background:#1EA362; color:white">' +
                                                  i +
                                                  '</td><td style="background:#D9433D; color:white">' +
                                                  n +
                                                  "</td></tr>",
                                              );
                                        }),
                                      $(this)
                                        .children(
                                          ".answer-the-questions-section-better-fit",
                                        )
                                        .each(function () {
                                          ($("#divAnswerKeyCover").remove(),
                                            0 ==
                                              $("#divAnswerKeyCover").length &&
                                              $("body").append(
                                                '<div id="divAnswerKeyCover" style="display:none"><div></div><div></div></div>',
                                              ));
                                          var e = $(this).attr("answer-index");
                                          $("#divAnswerKeyCover")
                                            .children("div")
                                            .eq(0)
                                            .html(e);
                                          var t = "";
                                          ($(this)
                                            .find(".opt-better-fit")
                                            .each(function () {
                                              t += $(this).val() + " / ";
                                            }),
                                            (t = t.substring(
                                              0,
                                              t.lastIndexOf("/"),
                                            )),
                                            $("#divAnswerKeyCover")
                                              .children("div")
                                              .eq(1)
                                              .html(t));
                                          var i = $.trim(
                                              $("#divAnswerKeyCover")
                                                .children("div")
                                                .eq(0)
                                                .html(),
                                            ),
                                            n = $.trim(
                                              $("#divAnswerKeyCover")
                                                .children("div")
                                                .eq(1)
                                                .html(),
                                            );
                                          i == n
                                            ? $(
                                                "#exercise-answer-key table",
                                              ).append(
                                                '<tr style="background:#1EA362; color:white"><td>' +
                                                  (parseInt($(this).index()) +
                                                    1) +
                                                  "</td><td>" +
                                                  i +
                                                  "</td><td>" +
                                                  n +
                                                  "</td></tr>",
                                              )
                                            : $(
                                                "#exercise-answer-key table",
                                              ).append(
                                                "<tr><td>" +
                                                  (parseInt($(this).index()) +
                                                    1) +
                                                  '</td><td style="background:#1EA362; color:white">' +
                                                  i +
                                                  '</td><td style="background:#D9433D; color:white">' +
                                                  n +
                                                  "</td></tr>",
                                              );
                                        }),
                                      $(this)
                                        .children(
                                          ".answer-the-questions-section-word-blank",
                                        )
                                        .each(function () {
                                          ($("#divAnswerKeyCover").remove(),
                                            0 ==
                                              $("#divAnswerKeyCover").length &&
                                              $("body").append(
                                                '<div id="divAnswerKeyCover" style="display:none"><div></div><div></div></div>',
                                              ));
                                          var e = $(this).attr("value");
                                          ($("#divAnswerKeyCover")
                                            .children("div")
                                            .eq(0)
                                            .html(e),
                                            $("#divAnswerKeyCover")
                                              .children("div")
                                              .eq(1)
                                              .html(
                                                $(this)
                                                  .children(".opt-fill-blank")
                                                  .val(),
                                              ));
                                          var t = $.trim(
                                              $("#divAnswerKeyCover")
                                                .children("div")
                                                .eq(0)
                                                .html(),
                                            ),
                                            i = $.trim(
                                              $("#divAnswerKeyCover")
                                                .children("div")
                                                .eq(1)
                                                .html(),
                                            );
                                          t == i
                                            ? $(
                                                "#exercise-answer-key table",
                                              ).append(
                                                '<tr style="background:#1EA362; color:white"><td>' +
                                                  (parseInt($(this).index()) +
                                                    1) +
                                                  "</td><td>" +
                                                  t +
                                                  "</td><td>" +
                                                  i +
                                                  "</td></tr>",
                                              )
                                            : $(
                                                "#exercise-answer-key table",
                                              ).append(
                                                "<tr><td>" +
                                                  (parseInt($(this).index()) +
                                                    1) +
                                                  '</td><td style="background:#1EA362; color:white">' +
                                                  t +
                                                  '</td><td style="background:#D9433D; color:white">' +
                                                  i +
                                                  "</td></tr>",
                                              );
                                        }),
                                      $(this)
                                        .children(
                                          ".answer-the-questions-word-similar",
                                        )
                                        .each(function () {
                                          ($("#divAnswerKeyCover").remove(),
                                            0 ==
                                              $("#divAnswerKeyCover").length &&
                                              $("body").append(
                                                '<div id="divAnswerKeyCover" style="display:none"><div></div><div></div></div>',
                                              ));
                                          var e = $(this).attr("value");
                                          ($("#divAnswerKeyCover")
                                            .children("div")
                                            .eq(0)
                                            .html(e),
                                            $("#divAnswerKeyCover")
                                              .children("div")
                                              .eq(1)
                                              .html(
                                                $(this)
                                                  .children(".txt-input-answer")
                                                  .val(),
                                              ));
                                          var t = $.trim(
                                              $("#divAnswerKeyCover")
                                                .children("div")
                                                .eq(0)
                                                .html(),
                                            ),
                                            i = $.trim(
                                              $("#divAnswerKeyCover")
                                                .children("div")
                                                .eq(1)
                                                .html(),
                                            );
                                          t == i
                                            ? $(
                                                "#exercise-answer-key table",
                                              ).append(
                                                '<tr style="background:#1EA362; color:white"><td>' +
                                                  (parseInt($(this).index()) +
                                                    1) +
                                                  "</td><td>" +
                                                  t +
                                                  "</td><td>" +
                                                  i +
                                                  "</td></tr>",
                                              )
                                            : $(
                                                "#exercise-answer-key table",
                                              ).append(
                                                "<tr><td>" +
                                                  (parseInt($(this).index()) +
                                                    1) +
                                                  '</td><td style="background:#1EA362; color:white">' +
                                                  t +
                                                  '</td><td style="background:#D9433D; color:white">' +
                                                  i +
                                                  "</td></tr>",
                                              );
                                        }),
                                      $(this)
                                        .children(".answer-the-questions-CI")
                                        .each(function () {
                                          ($("#divAnswerKeyCover").remove(),
                                            0 ==
                                              $("#divAnswerKeyCover").length &&
                                              $("body").append(
                                                '<div id="divAnswerKeyCover" style="display:none"><div></div><div></div></div>',
                                              ),
                                            $("#divAnswerKeyCover")
                                              .children("div")
                                              .eq(0)
                                              .html($(this).attr("value")),
                                            $("#divAnswerKeyCover")
                                              .children("div")
                                              .eq(1)
                                              .html(
                                                $(this)
                                                  .children(".opt-ci")
                                                  .val(),
                                              ));
                                          var e = $.trim(
                                              $("#divAnswerKeyCover")
                                                .children("div")
                                                .eq(0)
                                                .html(),
                                            ),
                                            t = $.trim(
                                              $("#divAnswerKeyCover")
                                                .children("div")
                                                .eq(1)
                                                .html(),
                                            );
                                          e == t
                                            ? $(
                                                "#exercise-answer-key table",
                                              ).append(
                                                '<tr style="background:#1EA362; color:white"><td>' +
                                                  (parseInt($(this).index()) +
                                                    1) +
                                                  "</td><td>" +
                                                  e +
                                                  "</td><td>" +
                                                  t +
                                                  "</td></tr>",
                                              )
                                            : $(
                                                "#exercise-answer-key table",
                                              ).append(
                                                "<tr><td>" +
                                                  (parseInt($(this).index()) +
                                                    1) +
                                                  '</td><td style="background:#1EA362; color:white">' +
                                                  e +
                                                  '</td><td style="background:#D9433D; color:white">' +
                                                  t +
                                                  "</td></tr>",
                                              );
                                        }));
                                  }),
                                $(this)
                                  .children("ul")
                                  .each(function (e) {
                                    ($("#exercise-answer-key table").append(
                                      '<tr><td></td><td colspan="2" style="font-weight:bold;">' +
                                        $(this)
                                          .parent()
                                          .children("h4")
                                          .eq(e)
                                          .html() +
                                        "</td></tr>",
                                    ),
                                      1 == e &&
                                        4 == puzzleIndex &&
                                        (puzzleIndex = 5));
                                    var t;
                                    ((t =
                                      0 == e
                                        ? puzzle[puzzleIndex].cross
                                        : puzzle[puzzleIndex].down),
                                      $(this)
                                        .children("li")
                                        .each(function (e) {
                                          ($("#divAnswerKeyCover").remove(),
                                            0 ==
                                              $("#divAnswerKeyCover").length &&
                                              $("body").append(
                                                '<div id="divAnswerKeyCover" style="display:none"><div></div><div></div></div>',
                                              ));
                                          var i = $(this)
                                            .find(".txt-input-answer")
                                            .val();
                                          $("#divAnswerKeyCover")
                                            .children("div")
                                            .eq(0)
                                            .html(i);
                                          var n = t[e].v,
                                            s = $.trim(i);
                                          n.toLowerCase() == s.toLowerCase()
                                            ? $(
                                                "#exercise-answer-key table",
                                              ).append(
                                                '<tr style="background:#1EA362; color:white"><td>' +
                                                  t[e].q +
                                                  "</td><td>" +
                                                  n +
                                                  "</td><td>" +
                                                  s +
                                                  "</td></tr>",
                                              )
                                            : $(
                                                "#exercise-answer-key table",
                                              ).append(
                                                "<tr><td>" +
                                                  t[e].q +
                                                  '</td><td style="background:#1EA362; color:white">' +
                                                  n +
                                                  '</td><td style="background:#D9433D; color:white">' +
                                                  s +
                                                  "</td></tr>",
                                              );
                                        }));
                                  }),
                                $(this)
                                  .children(".word-blank-cover")
                                  .each(function (e) {
                                    var t = $(this).attr("h4index");
                                    (null != t && (e = t),
                                      $("#exercise-answer-key table").append(
                                        '<tr><td></td><td colspan="2" style="font-weight:bold;">' +
                                          $(this)
                                            .parent()
                                            .children("h4")
                                            .eq(e)
                                            .html() +
                                          "</td></tr>",
                                      ),
                                      $(this)
                                        .find(
                                          ".answer-the-questions-section-word-blank",
                                        )
                                        .each(function (e) {
                                          ($("#divAnswerKeyCover").remove(),
                                            0 ==
                                              $("#divAnswerKeyCover").length &&
                                              $("body").append(
                                                '<div id="divAnswerKeyCover" style="display:none"><div></div><div></div></div>',
                                              ));
                                          var t = $(this).attr("value");
                                          ($("#divAnswerKeyCover")
                                            .children("div")
                                            .eq(0)
                                            .html(t),
                                            $("#divAnswerKeyCover")
                                              .children("div")
                                              .eq(1)
                                              .html(
                                                $(this)
                                                  .children(".opt-fill-blank")
                                                  .val(),
                                              ));
                                          var i = $.trim(
                                              $("#divAnswerKeyCover")
                                                .children("div")
                                                .eq(0)
                                                .html(),
                                            ),
                                            n = $.trim(
                                              $("#divAnswerKeyCover")
                                                .children("div")
                                                .eq(1)
                                                .html(),
                                            );
                                          i == n
                                            ? $(
                                                "#exercise-answer-key table",
                                              ).append(
                                                '<tr style="background:#1EA362; color:white"><td>' +
                                                  (e + 1) +
                                                  "</td><td>" +
                                                  i +
                                                  "</td><td>" +
                                                  n +
                                                  "</td></tr>",
                                              )
                                            : $(
                                                "#exercise-answer-key table",
                                              ).append(
                                                "<tr><td>" +
                                                  (e + 1) +
                                                  '</td><td style="background:#1EA362; color:white">' +
                                                  i +
                                                  '</td><td style="background:#D9433D; color:white">' +
                                                  n +
                                                  "</td></tr>",
                                              );
                                        }));
                                  }));
                            }),
                          $("#exercise-answer-key").css({ display: "block" }));
                      }));
                  }))
                : $("#exercise-block").append(
                    '<p style="display:none" class="answer-key-remove-after">&nbsp;</p>',
                  )));
        }
    var u = JSON.parse(
      sessionStorage.getItem(path.split("/")[2] + ":" + e),
    ).reading;
    if (null != u) {
      $("#category-section")
        .children(".section")
        .children(".container")
        .append(
          '<div id="story-block" class="box_shadow_yt_iframe seg-block"></div>',
        );
      for (var d = 0; d < u.length; d++) {
        var b = u[d].type,
          r = u[d].en,
          a = u[d].vi,
          f = u[d].story,
          v = u[d].image,
          m = u[d].sound;
        if ("story" == b) {
          var y =
            '<div id="item' +
            (s.length + d) +
            '" idx="' +
            (s.length + d) +
            '"  story="1" source="data/' +
            urlFriendlyFull(e) +
            "/reading/" +
            m +
            '" title="' +
            r +
            '" >';
          ((y +=
            '<div class="story-image"><img class="speaker-louder" idx="' +
            (s.length + d) +
            '"  source="data/' +
            urlFriendlyFull(e) +
            "/reading/" +
            m +
            '" title="' +
            r +
            '" story="1" src="data/' +
            urlFriendlyFull(e) +
            "/reading/" +
            v +
            '" /></div>'),
            (y +=
              '<h3 class="h3-en-story-title">' +
              r +
              ' <img class="wordlist-sound speaker-louder" idx="' +
              (s.length + d) +
              '"  source="data/' +
              urlFriendlyFull(e) +
              "/reading/" +
              m +
              '" title="' +
              r +
              '" src="icons/speaker_louder.png" /></h3>'),
            (y +=
              -1 < r.indexOf("Dialog")
                ? '<div style="clear:both" class="en-story">' + f + "</div>"
                : '<div class="en-story text-indent-para">' + f + "</div>"),
            (y += "</div>"),
            $("#story-block").append(y));
        } else
          "Answer Key" == r
            ? $("#story-block").append(
                '<div id="reading-answer-key"><div class="exercise-section">' +
                  r +
                  '</div><div class="faq-list-section" title="' +
                  r +
                  '">' +
                  f +
                  "</div></div>",
              )
            : $("#story-block").append(
                '<div class="reading-comprehension-section">Reading  Comprehension</div><div class="faq-list-section" title="' +
                  r +
                  '">' +
                  f +
                  "</div>",
              );
        d == u.length - 1 &&
          "" != r &&
          ($("#story-block").append(
            '<div class="reading-section-red-answer-key">Answer Key</div><p style="display:none" class="reading-answer-key-remove-after">&nbsp;</p>',
          ),
          $(".reading-section-red-answer-key").click(function () {
            ($("#reading-answer-key").find(".answer-key-only").html(""),
              $("#reading-answer-key").css({ display: "block" }),
              $(".reading-section-red-answer-key").css({ display: "none" }),
              $(".reading-answer-key-remove-after").remove(),
              $("#reading-answer-key").html(
                '<table><tr><td></td><td style="background: aliceblue; text-align:center; font-weight:bold; text-transform:uppercase; padding:7px; font-size:15px">Answer Key</td><td style="background: aliceblue; text-align:center; font-weight:bold; text-transform:uppercase; padding:7px; font-size:15px">Your Answer</td></tr></table>',
              ),
              $(this)
                .parent()
                .children(".faq-list-section")
                .each(function () {
                  ($("#reading-answer-key table").append(
                    '<tr><td colspan="3" style="font-weight:bold; text-align:left; text-transform:uppercase">' +
                      $(this).attr("title") +
                      "</td></tr>",
                  ),
                    $(this)
                      .children("ol")
                      .each(function (e) {
                        ($("#reading-answer-key table").append(
                          '<tr><td></td><td colspan="2" style="font-weight:bold;">' +
                            $(this).parent().children("h4").eq(e).html() +
                            "</td></tr>",
                        ),
                          $(this)
                            .children(
                              ".answer-the-questions-section-true-false",
                            )
                            .each(function (e) {
                              ($("#exercise-answer-key table").append(
                                '<tr><td></td><td colspan="2" style="font-weight:bold;">' +
                                  $(this).parent().children("h4").eq(e).html() +
                                  "</td></tr>",
                              ),
                                $("#divAnswerKeyCover").remove(),
                                0 == $("#divAnswerKeyCover").length &&
                                  $("body").append(
                                    '<div id="divAnswerKeyCover" style="display:none"><div></div><div></div></div>',
                                  ),
                                "" == $(this).attr("fvalue")
                                  ? ($("#divAnswerKeyCover")
                                      .children("div")
                                      .eq(0)
                                      .html($(this).attr("tof")),
                                    $("#divAnswerKeyCover")
                                      .children("div")
                                      .eq(1)
                                      .html(
                                        $(this)
                                          .children(".opt-true-false")
                                          .val(),
                                      ))
                                  : ($("#divAnswerKeyCover")
                                      .children("div")
                                      .eq(0)
                                      .html(
                                        $(this).attr("tof") +
                                          " / " +
                                          $(this).attr("fvalue"),
                                      ),
                                    $("#divAnswerKeyCover")
                                      .children("div")
                                      .eq(1)
                                      .html(
                                        $(this)
                                          .children(".opt-true-false")
                                          .val() +
                                          " / " +
                                          $(this)
                                            .children(
                                              ".txt-textarea-long-answer",
                                            )
                                            .val(),
                                      )));
                              var t = $.trim(
                                  $("#divAnswerKeyCover")
                                    .children("div")
                                    .eq(0)
                                    .html(),
                                ),
                                i = $.trim(
                                  $("#divAnswerKeyCover")
                                    .children("div")
                                    .eq(1)
                                    .html(),
                                );
                              t == i
                                ? $("#reading-answer-key table").append(
                                    '<tr style="background:#1EA362; color:white"><td>' +
                                      (parseInt($(this).index()) + 1) +
                                      "</td><td>" +
                                      t +
                                      "</td><td>" +
                                      i +
                                      "</td></tr>",
                                  )
                                : $("#reading-answer-key table").append(
                                    "<tr><td>" +
                                      (parseInt($(this).index()) + 1) +
                                      '</td><td style="background:#1EA362; color:white">' +
                                      t +
                                      '</td><td style="background:#D9433D; color:white">' +
                                      i +
                                      "</td></tr>",
                                  );
                            }),
                          $(this)
                            .children(".answer-the-questions-section")
                            .each(function () {
                              ($("#divAnswerKeyCover").remove(),
                                0 == $("#divAnswerKeyCover").length &&
                                  $("body").append(
                                    '<div id="divAnswerKeyCover" style="display:none"><div></div><div></div></div>',
                                  ));
                              var e = $(this).attr("answer-index").split(",");
                              if (1 < e.length)
                                for (var t = 0; t < e.length; t++)
                                  ($("#divAnswerKeyCover")
                                    .children("div")
                                    .eq(0)
                                    .append(
                                      $(this)
                                        .children(".ul-multi-choose-answer")
                                        .children("li")
                                        .eq(e[t])
                                        .html() + "<br/>",
                                    ),
                                    $("#divAnswerKeyCover")
                                      .children("div")
                                      .eq(1)
                                      .append(
                                        $(this)
                                          .children(".ul-multi-choose-answer")
                                          .children("li")
                                          .eq(e[t])
                                          .html() + "<br/>",
                                      ));
                              var n = $(this)
                                .children(".ul-choose-answer")
                                .children("li")
                                .eq($(this).attr("answer-index"));
                              ($("#divAnswerKeyCover")
                                .children("div")
                                .eq(0)
                                .html(n.html()),
                                $("#divAnswerKeyCover")
                                  .children("div")
                                  .eq(0)
                                  .children("input")
                                  .remove());
                              var s = $(this)
                                .children(".ul-choose-answer")
                                .children("li");
                              (1 < e.length &&
                                (s = $(this)
                                  .children(".ul-multi-choose-answer")
                                  .children("li")),
                                $("#divAnswerKeyCover")
                                  .children("div")
                                  .eq(1)
                                  .html(""),
                                s.each(function () {
                                  "checked" ==
                                    $(this).children("input").attr("checked") &&
                                    (1 < e.length
                                      ? $("#divAnswerKeyCover")
                                          .children("div")
                                          .eq(1)
                                          .append($(this).html() + "<br/>")
                                      : $("#divAnswerKeyCover")
                                          .children("div")
                                          .eq(1)
                                          .append($(this).html()),
                                    $("#divAnswerKeyCover")
                                      .children("div")
                                      .eq(1)
                                      .children("input")
                                      .remove(),
                                    $(this)
                                      .children("input")
                                      .prop("checked", !0));
                                }));
                              var d = $.trim(
                                  $("#divAnswerKeyCover")
                                    .children("div")
                                    .eq(0)
                                    .html(),
                                ),
                                r = $.trim(
                                  $("#divAnswerKeyCover")
                                    .children("div")
                                    .eq(1)
                                    .html(),
                                );
                              d == r
                                ? $("#reading-answer-key table").append(
                                    '<tr style="background:#1EA362; color:white"><td>' +
                                      (parseInt($(this).index()) + 1) +
                                      "</td><td>" +
                                      d +
                                      "</td><td>" +
                                      r +
                                      "</td></tr>",
                                  )
                                : $("#reading-answer-key table").append(
                                    "<tr><td>" +
                                      (parseInt($(this).index()) + 1) +
                                      '</td><td style="background:#1EA362; color:white">' +
                                      d +
                                      '</td><td style="background:#D9433D; color:white">' +
                                      r +
                                      "</td></tr>",
                                  );
                            }),
                          $(this)
                            .children(".answer-the-questions-textarea")
                            .each(function () {
                              ($("#divAnswerKeyCover").remove(),
                                0 == $("#divAnswerKeyCover").length &&
                                  $("body").append(
                                    '<div id="divAnswerKeyCover" style="display:none"><div></div><div></div></div>',
                                  ),
                                $("#divAnswerKeyCover")
                                  .children("div")
                                  .eq(0)
                                  .html($(this).attr("value")),
                                $("#divAnswerKeyCover")
                                  .children("div")
                                  .eq(1)
                                  .html(
                                    $(this)
                                      .children(".txt-textarea-long-answer")
                                      .val(),
                                  ));
                              var e = $.trim(
                                  $("#divAnswerKeyCover")
                                    .children("div")
                                    .eq(0)
                                    .html(),
                                ),
                                t = $.trim(
                                  $("#divAnswerKeyCover")
                                    .children("div")
                                    .eq(1)
                                    .html(),
                                );
                              e == t
                                ? $("#reading-answer-key table").append(
                                    '<tr style="background:#1EA362; color:white"><td>' +
                                      (parseInt($(this).index()) + 1) +
                                      "</td><td>" +
                                      e +
                                      "</td><td>" +
                                      t +
                                      "</td></tr>",
                                  )
                                : $("#reading-answer-key table").append(
                                    "<tr><td>" +
                                      (parseInt($(this).index()) + 1) +
                                      '</td><td style="background:#1EA362; color:white">' +
                                      e +
                                      '</td><td style="background:#D9433D; color:white">' +
                                      t +
                                      "</td></tr>",
                                  );
                            }));
                      }));
                }),
              $("#reading-answer-key").css({ display: "block" }));
          }));
      }
      $(".idiom-tip").click(function () {
        (0 < $("#idiom-tip-popup").length && $("#idiom-tip-popup").remove(),
          $("body").append(
            '<div id="idiom-tip-popup"><div style="display:none"><audio id="sound-tool-tip"></audio></div><div id="close-idiom-tip-popup"><img src="icons/close-window-50.png" /></div><div id="idiom-tip-popup-cover">' +
              $("#item" + $(this).attr("idx")).html() +
              "</div></div>",
          ),
          $("#idiom-tip-popup").find(".word-image").remove());
        var e = document.getElementById("sound-tool-tip");
        ($("#close-idiom-tip-popup img").click(function () {
          (e.pause(), $("#idiom-tip-popup").remove());
        }),
          $("#idiom-tip-popup-cover")
            .find(".speaker-louder")
            .click(function () {
              var t = $(this).attr("source");
              if (t != null) {
                var i = parseInt(
                  $("#nav-story")
                    .children("li")
                    .eq(0)
                    .children("img")
                    .attr("status"),
                );
                (1 == i &&
                  $("#nav-story").children("li").eq(0).trigger("click"),
                  (e.src = t),
                  (e.onloadedmetadata = function () {
                    e.play();
                  }),
                  (e.onended = function () {}));
              }
            }));
      });
    }
    (replaceChooseAnswer(),
      $(".counter").each(function () {
        $(this).css({
          "margin-left": ($(window).width() - $(this).width() - 20) / 2,
        });
      }),
      $(".speaker-louder").click(function () {
        var e = document.getElementById("sound-tool-tip");
        null != e && e.pause();
        var t = $(this).attr("source");
        ((autoPlay = !0),
          (currentReadingIndex = $(this).attr("idx")),
          playSound(currentReadingIndex, t),
          $("#nav-story li")
            .eq(0)
            .children("span")
            .html($(this).attr("title")));
      }),
      homeSectionResize(),
      scaleFontSize(),
      playSeeking(0));
    var x = window.location.hash.substring(1);
    if ("" != x) {
      var k = x.split("&");
      if (1 < k.length)
        switch (k[1].toLowerCase()) {
          case "word list":
            $(window).scrollTop($("#idioms-block").offset().top - 60);
            break;
          case "story":
            $(window).scrollTop($("#story-block").offset().top - 60);
            break;
          case "exercise":
            $(window).scrollTop($("#exercise-block").offset().top - 60);
        }
    }
  }
}
function playSeeking(e) {
  ($("#category-section")
    .find(".container")
    .children("li")
    .each(function () {
      $(this).css({ width: "100%" });
    }),
    (elm_length = $("#category-section")
      .find(".container")
      .children("li").length));
  for (var t = 0; t < elm_length; t++);
  ((currentReadingIndex = e),
    (elm_index = e),
    (hold = !1),
    (next = 0),
    setTimeout(function () {
      var e = $(".speaker-louder").eq(currentReadingIndex).attr("source");
      (playSound(currentReadingIndex, e), focusReading(currentReadingIndex));
    }, 1e3));
}
function playSound(t, e) {
  currentReadingIndex = t;
  (e == null
    ? readFlag()
    : ((elm.src = e),
      (elm.onloadedmetadata = function () {
        (localStorage.setItem("currentIndex", currentReadingIndex),
          $("#player-loading").remove(),
          !0 == autoPlay ? elm.play() : (autoPlay = !0));
      }),
      (elm.onended = function () {
        if (
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
          !0 == isStory())
        )
          readFlag();
        else if (!0 == isExercise()) {
          $("#exercise-block")
            .find(".exercise-section-red-answer-key")
            .css({ display: "block" });
          var e = parseInt(
            $("#exercise-block")
              .find(".exercise-section-answered")
              .attr("corrected"),
          );
          ($("#exercise-block")
            .find(".exercise-section-answered")
            .html(
              "You have answered correctly: " +
                e +
                "/" +
                $(".answer-the-questions-section").length,
            ),
            $("#exercise-block")
              .find(".exercise-section-answered")
              .css({ display: "block" }),
            $("#nav-story")
              .children("li")
              .eq(0)
              .children("img")
              .attr("status", 0),
            $("#nav-story")
              .children("li")
              .eq(0)
              .children("img")
              .attr("src", "icons/play.png"));
        } else {
          var t = parseInt(
            $("#item" + currentReadingIndex).attr("remainAudioLoop"),
          );
          0 < t
            ? (loopTimeOut = setTimeout(function () {
                ($("#item" + currentReadingIndex).attr(
                  "remainAudioLoop",
                  t - 1,
                ),
                  clearTimeout(nextTimeOut),
                  clearTimeout(loopTimeOut),
                  clearTimeout(autoNextTimeOut),
                  $(".speaker-louder")
                    .eq(currentReadingIndex)
                    .trigger("click"));
              }, 2e3))
            : (clearTimeout(nextTimeOut),
              clearTimeout(loopTimeOut),
              clearTimeout(autoNextTimeOut),
              (autoNextTimeOut = setTimeout(function () {
                (clearTimeout(nextTimeOut),
                  clearTimeout(loopTimeOut),
                  clearTimeout(autoNextTimeOut),
                  $("#item" + currentReadingIndex).attr(
                    "remainAudioLoop",
                    remainAudioLoop,
                  ),
                  nextWordReading());
              }, 200)));
        }
      })),
    $("#bottom-section").css({ display: "block" }));
  var i = JSON.parse(localStorage.getItem(lsession)),
    n = $("#tbl-last-session" + (parseInt(i.index) + 1)),
    s = n.parent().attr("en"),
    d = s;
  ("" != n.parent().attr("story-title") &&
    (d += ": " + n.parent().attr("story-title")),
    0 < n.length
      ? (e == null
          ? $("#bottom-section")
              .children(".container")
              .html(
                '<ul id="nav-story"><li style="width:0%"></li><li style="width:0%"></li><li  style="width:100%; color:yellow">' +
                  s +
                  "</li></ul>",
              )
          : 0 < $("#idioms-block").length
            ? $("#bottom-section")
                .children(".container")
                .html(
                  '<ul id="nav-story"><li source="' +
                    e +
                    '"><img class="audio-play" status="0" src="icons/play.png" /><span style="margin-left:5px; position:relative; top:-23px">' +
                    $(".speaker-louder").eq(currentReadingIndex).attr("title") +
                    "</span></li><li>Exercise</li><li>" +
                    d +
                    "</li></ul>",
                )
            : $("#bottom-section")
                .children(".container")
                .html(
                  '<ul id="nav-story"><li style="width:50%;" source="' +
                    e +
                    '"><img class="audio-play" status="0" src="icons/play.png" /><span style="margin-left:5px; position:relative; top:-23px">' +
                    $(".speaker-louder").eq(currentReadingIndex).attr("title") +
                    '</span></li><li style="display:none"></li><li style="width:50%;">' +
                    d +
                    "</li></ul>",
                ),
        $("#nav-story")
          .children("li")
          .eq(0)
          .click(function () {
            var e = document.getElementById("sound-tool-tip");
            (null != e && e.pause(),
              $(".show-ads-cover").remove(),
              1 ==
              $("#nav-story")
                .children("li")
                .eq(0)
                .children("img")
                .attr("status")
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
                  elm.play()));
          }),
        $("#nav-story")
          .children("li")
          .eq(1)
          .click(function () {
            switch (($(".show-ads-cover").remove(), $(this).html())) {
              case "Word List":
                $(window).scrollTop($("#idioms-block").offset().top - 60);
                break;
              case "Story":
                $(window).scrollTop($("#story-block").offset().top - 60);
                break;
              case "Exercise":
                $(window).scrollTop($("#exercise-block").offset().top - 60);
            }
          }),
        $("#nav-story")
          .children("li")
          .eq(2)
          .click(function () {
            0 < n.length
              ? !1 == checkUnitOpened(s)
                ? showAdsForNextLesson(s, d, parseInt(i.index) + 1, 0)
                : (elm.pause(),
                  (autoPlay = !1),
                  !0 == showAds() &&
                    JSBridge.LoadStoryAnswerKeyVideoAds(
                      d + " loaded. Check it out!",
                    ),
                  showCategorySection(s, parseInt(i.index) + 1, 0))
              : $("#section-section").trigger("click");
          }),
        !1 == autoPlay
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
              .attr("src", "icons/pause.png")),
        "" == $("#nav-story li").eq(0).children("span").html() &&
          $("#nav-story li")
            .eq(0)
            .children("span")
            .html($(".speaker-louder").eq(0).attr("title")))
      : $("#bottom-section")
          .children(".container")
          .html(
            '<div class="app-name">Verbal Advantage</div><div class="app-slogan">Level 10</div>',
          ),
    !1 == autoPlay
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
  var e = new Date(),
    t = e.getDate() + "-" + (e.getMonth() + 1) + "-" + e.getFullYear(),
    i = { adsCurrentDay: t };
  try {
    var n = localStorage.getItem("adsCurrentDay-" + path.split("/")[2]);
    return null == n
      ? (localStorage.setItem(
          "adsCurrentDay-" + path.split("/")[2],
          JSON.stringify(i),
        ),
        !0)
      : t != JSON.parse(n).adsCurrentDay &&
          (localStorage.setItem(
            "adsCurrentDay-" + path.split("/")[2],
            JSON.stringify(i),
          ),
          !0);
  } catch (e) {
    return (
      localStorage.setItem(
        "adsCurrentDay-" + path.split("/")[2],
        JSON.stringify(i),
      ),
      !0
    );
  }
}
function readFlag() {
  var e = JSON.parse(localStorage.getItem(lsession)),
    t = $("#tbl-last-session" + e.index)
      .parent()
      .attr("en");
  localStorage.removeItem(path.split("/")[2] + ":" + t.toLowerCase());
  var i = localStorage.getItem(path.split("/")[2] + ":" + t.toLowerCase());
  if (null == i) {
    localStorage.setItem(
      path.split("/")[2] + ":" + t.toLowerCase(),
      JSON.stringify({ read: !0 }),
    );
  }
  $("#tbl-last-session" + currentIndex)
    .find("div")
    .eq(0)
    .attr("class", "play");
}
function showAdsForNextLesson(e, t, i, n) {
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
        JSBridge.LoadStoryAnswerKeyVideoAds(t + " loaded. Check it out!"),
        showCategorySection(e, i, n),
        $(".show-ads-cover").remove());
    }),
    setTimeout(function () {
      ($(document).on("click", function (t) {
        0 === $(t.target).closest(".show-ads-cover").length &&
          $(".show-ads-cover").attr("opened") != null &&
          $(".show-ads-cover").remove();
      }),
        $(document).on("touchstart", function (t) {
          0 === $(t.target).closest(".show-ads-cover").length &&
            $(".show-ads-cover").attr("opened") != null &&
            $(".show-ads-cover").remove();
        }));
    }, 300));
}
function checkUnitOpened(e) {
  var t = localStorage.getItem(path.split("/")[2] + ":" + e.toLowerCase());
  return null != t;
}
function nextWordReading() {
  var e = JSON.parse(localStorage.getItem(lsetting));
  null != e &&
    !0 == e.next &&
    (nextTimeOut = setTimeout(function () {
      $("#item" + currentReadingIndex).attr("nid") != null &&
        ((currentReadingIndex = $("#item" + currentReadingIndex).attr("nid")),
        $("html, body").animate(
          { scrollTop: $("#item" + currentReadingIndex).offset().top - 60 },
          {
            complete: function () {
              ($("#nav-story li")
                .eq(0)
                .children("span")
                .html($("#item" + currentReadingIndex).attr("title")),
                $(".speaker-louder").eq(currentReadingIndex).trigger("click"));
            },
          },
        ));
    }, 3e3));
}
function focusReading(e) {
  if (
    0 ==
    $("#item" + e)
      .find(".word-image")
      .find(".reading").length
  ) {
    $("#item" + next)
      .find(".word-image")
      .append("<div class='reading' style='position:absolute;'></div>");
    var t = $(window).width();
    $("#item" + e)
      .find(".word-image")
      .find(".reading")
      .css({
        width: (t - 20) / 2,
        height: "100%",
        top: 0,
        left: (t - (t - 20) / 2) / 2 - 10,
      });
  }
}
function homeScroll() {
  ($(window).scroll(function () {
    var e = parseInt($("#home-section").height()),
      t = $("#home-section").offset(),
      i = $(window).height(),
      n = parseInt($(this).scrollTop());
    if (($("#home-section").attr("top", n), 0 != $("#exercise-block").length)) {
      var s = $("#exercise-block").position().top;
      $("#home-section").attr("vb", s - parseInt($(window).height()) - 150);
      var d = 0;
      (0 < $("#story-block").length && (d = $("#story-block").position().top),
        n >= s - parseInt($(window).height()) + 150 &&
          $("#bottom-section")
            .find("#nav-story")
            .children("li")
            .eq(1)
            .html("Story"),
        n >= d - parseInt($(window).height()) + 150 &&
          $("#bottom-section")
            .find("#nav-story")
            .children("li")
            .eq(1)
            .html("Word List"),
        n < s - parseInt($(window).height()) + 150 &&
          $("#bottom-section")
            .find("#nav-story")
            .children("li")
            .eq(1)
            .html("Exercise"));
    }
  }),
    $("#home-section").scroll(function () {
      var e = parseInt($("#home-section").height()),
        t = $("#home-section").offset(),
        i = $(window).height(),
        n = parseInt($(this).scrollTop());
      $("#home-section").attr("top", n);
    }));
}
function homeSectionResize() {
  var e = $(window).width() - 20;
  isMobile.any() || (e -= 18);
  var t = 320,
    i = Math.floor(e / t);
  0 == i && (i = 1);
  var n;
  ((n = 2 < i ? 10 * (2 * (i - 1)) : 10 * i),
    1 == i && (n = 0),
    (t = Math.floor((e - n) / i)),
    $("#home-section")
      .children("ul")
      .children("li")
      .each(function () {
        $(this).css({ clear: "" });
      }),
    $("#home-section")
      .children("ul")
      .children("li")
      .each(function () {
        ((0 < $(this).index()) & (0 == $(this).index() % i) &&
          $(this).css({ clear: "both" }),
          $(this).eq(i).css({ clear: "both" }),
          $(this).css({ width: t }),
          $(this).find("img").css({ width: t }));
      }),
    $(window).width() <= $(window).height()
      ? $(".counter").parent().css({ "padding-top": 20 })
      : $(".counter").parent().css({ "padding-top": 30 }),
    resizeHomeSection(),
    resizeUnitItem());
}
function scaleFontSize() {
  ($(".en-word").each(function () {
    var e = $(window).width() * $(window).height(),
      t = Math.sqrt(e) / Math.sqrt(786432);
  }),
    $(".alphabet").each(function () {
      var e = $(window).width() * $(window).height(),
        t = Math.sqrt(e) / Math.sqrt(786432);
      $(".alphabet").css("font-size", 300 * t + "%");
    }),
    $(".en-story-title").each(function () {
      var e = $(window).width() * $(window).height(),
        t = Math.sqrt(e) / Math.sqrt(786432),
        i = 150 * t;
      120 > i && (i = 120);
    }),
    resizeWordImage(),
    resizeUsageTipsSeg());
}
function scaleFontSizeIndexToolTips() {
  ($(".tool-index-idioms")
    .find(".en-word")
    .each(function () {
      var e = $(window).width() * $(window).height(),
        t = Math.sqrt(e) / Math.sqrt(786432),
        i = 110 * t;
      110 > i && (i = 110);
    }),
    $("#section-section")
      .children(".title")
      .css({ width: $(window).width() - 80 }),
    resizeUsageTipsSeg());
}
function resizeWordImage() {
  ($(".word-image")
    .find("img")
    .each(function () {
      ((hImage =
        $(window).height() -
        $(".en-word").height() -
        $(".vn-word").height() -
        $(".alphabet").height() -
        $("#bottom-section").height() -
        230),
        $(this).css({ margin: "10px 0px 10px 0px" }),
        300 <= hImage && (hImage = 300),
        120 >= hImage && (hImage = 120),
        $(this).css({ height: hImage, width: hImage }),
        1 == parseInt($(this).attr("story")) &&
          ($(this).css({ "margin-top": "0px" }),
          220 <= hImage && $(this).css({ height: 220, width: 220 }),
          120 >= hImage && $(this).css({ height: 120, width: 120 }),
          $(this).parent().css({ float: "", "padding-right": "" }),
          600 > $(window).width() &&
            $(this)
              .parent()
              .css({ float: "none", "padding-right": "initial" })));
    }),
    $(".wordlist-image")
      .find("img")
      .each(function () {
        ($(this).css({ margin: "8px 0px 0px 0px" }),
          $(this).css({ height: "", width: "" }));
        var e = 120;
        (400 > $(window).width() && (e = 100),
          $(this).css({ height: e, width: e }),
          $(this)
            .parent()
            .parent()
            .find(".wordlist-cover")
            .css({
              "max-width":
                $("#category-section").width() - ($(this).width() + 70),
            }));
      }));
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
  for (var e = 0; e < elm_length; e++);
  1 != $("#item" + currentReadingIndex).attr("story") &&
    1 != $("#item" + currentReadingIndex).attr("exercise");
}
function isStory() {
  var e = parseInt($("#exercise-block").attr("story"));
  return !(1 != e);
}
function isExercise() {
  var e = parseInt($("#exercise-block").attr("exercise"));
  return !(1 != e);
}
function resizeExerciseStory() {
  ($("#category-section")
    .find(".container")
    .children("li")
    .each(function () {
      if (1 == $(this).attr("story") || 1 == $(this).attr("exercise")) {
        var e = $("#item" + $(this).index()).children("div");
        e.css({ height: "", width: "", "overflow-y": "", "overflow-x": "" });
        var t =
          $(window).height() -
          $(".header").height() -
          $("#bottom-section").height();
        (e.height() > t,
          $("#item" + $(this).index())
            .find(".faq-list-section")
            .children("ol")
            .css({ margin: "", padding: "" }),
          $("#item" + $(this).index())
            .find(".faq-list-section")
            .css({ "padding-bottom": 10 }),
          400 > $(window).width() &&
            $("#item" + $(this).index())
              .find(".faq-list-section")
              .children("ol")
              .css({ margin: "0px", padding: "0px 0px 0px 20px" }));
      }
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
    $(".story-image").attr("style", ""),
    $(".h3-en-story-title,.story-image img").attr("style", ""),
    500 > $(window).width() &&
      ($(".story-image").attr("style", "float: none;padding-right: 0px;"),
      $(".h3-en-story-title").attr("style", "text-align:center"),
      $(".story-image img").attr("style", "width: 160px")),
    resizeTextareaAnswer());
}
function resizeStory() {
  $("#category-section")
    .find(".container")
    .children("li")
    .each(function () {
      if (1 == $(this).attr("story") || 1 == $(this).attr("exercise")) {
        var e = $("#item" + $(this).index()).children("div");
        e.css({ height: "", width: "" });
        var t =
          $(window).height() -
          $(".header").height() -
          $("#bottom-section").height();
        (e.height() > t,
          $("#item" + $(this).index())
            .find(".faq-list-section")
            .children("ol")
            .css({ margin: "", padding: "" }),
          400 > $(window).width() &&
            $("#item" + $(this).index())
              .find(".faq-list-section")
              .children("ol")
              .css({ margin: "0px", padding: "0px 0px 0px 20px" }));
      }
    });
}
function resizeUsageTipsSeg() {
  ($(".en-exam").each(function () {
    ($(this).css({ "padding-top": 10 }),
      $(this).children("div").css({ width: "", float: "" }),
      $(this)
        .children("div")
        .css({
          "font-size": "100%",
          "font-style": "normal",
          display: "inline-block",
          float: "left",
          "text-align": "left",
          "margin-top": 10,
        }),
      $(this).children("div").children("div").eq(1).css({ "padding-top": 10 }),
      $(this).children("div").width() >= $(window).width()
        ? $(this).children("div").css({ float: "" })
        : 0 == $(this).children("div").width()
          ? $(this).children("div").css({ width: "", float: "" })
          : $(this).children("div").css({ width: "", float: "" }));
  }),
    $(".toefl-prep-para").each(function () {
      $(this).parent().css({ "font-weight": "normal" });
    }));
}
function setStoreLastSession(e, t) {
  var i = {
    title: e,
    image: $("#home-section")
      .children("ul")
      .children("li")
      .eq(t)
      .find("img")
      .attr("src"),
    index: t,
    windex: 0,
    eindex: 0,
    sindex: 0,
  };
  localStorage.setItem(lsession, JSON.stringify(i));
}
function loadLastSession() {
  try {
    var e = JSON.parse(localStorage.getItem(lsession));
    if (null != e) {
      var t = "waiting",
        i = localStorage.getItem(
          path.split("/")[2] + ":" + e.title.toLowerCase(),
        );
      (null != i &&
        (!0 == $.parseJSON(i).read ? (t = "play") : (t = "reading")),
        $("#tbl-last-session" + e.index)
          .parent()
          .parent()
          .parent()
          .children(".section-cover")
          .attr("opened", "1"),
        $("#tbl-last-session" + e.index)
          .parent()
          .parent()
          .css({ display: "block" }),
        $("#tbl-last-session" + e.index)
          .find("td")
          .eq(0)
          .children("div")
          .attr("class", t),
        0 <
          $("#tbl-last-session" + e.index)
            .find("td")
            .eq(1)
            .find(".your-answer").length &&
          $("#tbl-last-session" + e.index)
            .find("td")
            .eq(1)
            .find(".your-answer")
            .remove(),
        $("#tbl-last-session" + e.index)
          .find("td")
          .eq(1)
          .children(".title")
          .append(loadAnswerKey(e.title)),
        "Index" != e.title &&
          $("#home-section")
            .children("#last-session-segment")
            .html(
              '<ul class="curriculum-item" style="background:#1DA362"><li class="item" id="word-list-session" style="color:white"><table><tr><td><div class="' +
                t +
                '"></div></td><td><div class="title">' +
                e.title +
                loadAnswerKey(e.title) +
                " </div></td></tr></table></li></ul>",
            ),
        $("#home-section")
          .children("div")
          .eq(0)
          .css({ "padding-top": 25, "padding-bottom": 0 }),
        $("#word-list-session, #img-last-session-unit").click(function () {
          showCategorySection(e.title, e.index, 0);
        }),
        $("#exercise-lastest-session").click(function () {
          var e = JSON.parse(localStorage.getItem(lsession));
          showCategorySection(e.title, e.index, e.eindex);
        }),
        $("#story-lastest-session, #story-lastest-session-play-button").click(
          function () {
            var e = JSON.parse(localStorage.getItem(lsession));
            showCategorySection(e.title, e.index, e.sindex);
          },
        ),
        resizeLastSession(),
        resizeUnitItem());
    } else
      ($("#tbl-last-session0").parent().parent().parent().attr("opened", "1"),
        $("#tbl-last-session0").parent().parent().css({ display: "block" }),
        $("#home-section")
          .children("div")
          .eq(0)
          .css({ "padding-top": 25, "padding-bottom": 0 }));
  } catch (e) {}
}
function resizeLastSession() {
  var e = $(window).width() - 130 - 40;
  (130 < e && (e = 130), $("#img-last-session-unit").css({ width: e }));
}
function resizeUnitItem() {
  var e =
    $("#home-section").children("ul").children("li").eq(0).width() - 130 - 20;
  (130 < e && (e = 130),
    $(".img-last-session-unit").css({ width: e }),
    $(".session-play-button").css({
      width: 39,
      "border-radius": "50px",
      border: "0px",
      position: "absolute",
      top: (e - 39) / 2,
      left: (e - 39) / 2,
    }));
}
function resizeModal() {
  var e = 320,
    t = 320;
  isMobile.any()
    ? ((e = 200), (t = e))
    : $(window).width() < e && ((e = $(window).width() - 40), (t = e));
}
function replaceChooseAnswer() {
  ($(".answer-the-questions-section .ul-choose-answer")
    .children("li")
    .each(function () {
      var e = $(this).html();
      $(this).html(
        '<input type="radio" name="rdo' +
          $(this).parent().parent().parent().parent().index() +
          $(this).parent().parent().index() +
          $(this).parent().index() +
          '" /> ' +
          e,
      );
    }),
    $(".answer-the-questions-section .ul-choose-answer")
      .children("li")
      .click(function () {
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
            }));
        var e = $(this).parent().parent().index();
        if (
          $(this).parent().attr("answer") ==
          $(this).find("input").parent().index()
        ) {
          var t =
            parseInt(
              $("#item" + currentReadingIndex)
                .find(".en-story")
                .find(".exercise-section-answered")
                .attr("corrected"),
            ) + 1;
          ($("#item" + currentReadingIndex)
            .find(".en-story")
            .find(".exercise-section-answered")
            .attr("corrected", t),
            $(".answer-the-questions-section")
              .eq(e)
              .append(
                '<div class="answer-voice">' +
                  $(".answer-key").eq(e).html() +
                  "</div>",
              ));
        } else
          $(".answer-the-questions-section")
            .eq(e)
            .append(
              '<div class="answer-voice answer-voice-wrong">' +
                $(".answer-key").eq(e).html() +
                "</div>",
            );
      }),
    $(".answer-the-questions-section .ul-multi-choose-answer")
      .children("li")
      .each(function () {
        var e = $(this).html();
        ($(this).html(
          '<input type="checkbox" name="rdo' +
            $(this).parent().parent().index() +
            $(this).parent().index() +
            '" /> ' +
            e,
        ),
          $(this).css({ "list-style-type": "none" }));
      }),
    $(".answer-the-questions-section .ul-multi-choose-answer")
      .children("li")
      .click(function () {
        $(this).unbind("click");
        var e = parseInt($(this).parent().attr("q")) - 1;
        if (
          (0 <= e &&
            ($(this).parent().attr("q", e),
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
          0 == e)
        ) {
          var t = "";
          if (
            ($(this)
              .parent()
              .children("li")
              .each(function () {
                ($(this).find("input").attr("disabled", "disabled"),
                  $(this).unbind("click"),
                  "checked" == $(this).find("input").attr("checked") &&
                    (t += $(this).index() + ","));
              }),
            0 < t.length && (t = t.substring(0, t.length - 1)),
            $(this).parent().parent().attr("answer-index") == t)
          ) {
            var i = $("#answer-popup div").eq(0).html().split("/");
            ($("#answer-popup div")
              .eq(0)
              .html(parseInt(i[0]) + 1 + "/" + i[1]),
              $(this)
                .parent()
                .css({
                  background: "#F5F5DC",
                  "border-radius": "7px",
                  padding: "8px",
                  border: "2px solid #1ea362",
                }));
          } else {
            var i = $("#answer-popup div").eq(2).html().split("/");
            ($("#answer-popup div")
              .eq(2)
              .html(parseInt(i[0]) + 1 + "/" + i[1]),
              $(this)
                .parent()
                .css({
                  background: "lightgray",
                  "border-radius": "7px",
                  padding: "8px",
                  border: "2px solid red",
                }));
          }
        }
      }),
    $(".faq-list-section .ul-choose-answer li").each(function () {
      var e = $(this)
        .html()
        .replace("_____", ' <input class="txt-input-answer" /> ');
      $(this).html(e);
    }),
    $(".faq-list-section p").each(function () {
      var e = $(this)
        .html()
        .replace(/ __________ /g, ' <input class="txt-input-answer" /> ');
      $(this).html(e);
    }),
    $(".txt-input-one-line").each(function () {
      var e = $(this)
        .html()
        .replace(/ _____ /g, ' <input class="txt-input-answer" /> ');
      $(this).html(e);
    }),
    $(".answer-the-questions-section-char").each(function () {
      var e = $(this)
        .html()
        .replace(/______/g, ' <input class="txt-input-answer-char" /> ')
        .replace(/_/g, ' <input class="txt-input-answer-char" /> ');
      $(this).html(e);
    }),
    $(".txt-input-answer-char").bind("input", function () {
      "" !== $(this).val() && $(this).next(".txt-input-answer-char").focus();
    }),
    $(".answer-the-questions-textarea").each(function () {
      var e = $(this)
        .html()
        .replace(
          /_____________/g,
          '<textarea class="txt-textarea-long-answer"></textarea>',
        )
        .replace(
          /__________/g,
          '<textarea class="txt-textarea-long-answer"></textarea>',
        );
      $(this).html(e);
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
      var e = $(this)
        .html()
        .replace(
          /__________/g,
          '<select class="opt-fill-blank"><option></option></select>',
        );
      $(this).html(e);
    }));
  var e = "";
  ($("#ul-free-option li").each(function () {
    e += "<option>" + $.trim($(this).html()) + "</option>";
  }),
    $(".opt-fill-blank").each(function () {
      $(this).append(e);
    }));
  var t = "";
  ($(".ul-free-option li").each(function () {
    t += "<option>" + $.trim($(this).html()) + "</option>";
  }),
    0 < $(".word-blank-cover").length &&
      ("" == t && (t = e),
      $(".word-blank-cover")
        .find(".answer-the-questions-section-word-blank")
        .each(function () {
          ($(this).children(".opt-fill-blank").html("<option></option>"),
            $(this).children(".opt-fill-blank").append(t));
        })),
    $(".opt-fill-blank").change(function () {
      ($(this).attr("disabled", "disabled"),
        $(this).css({ background: "#F3F3F3", border: "" }));
    }),
    $(".answer-the-questions-section-true-false").each(function () {
      var e = $(this)
        .html()
        .replace(
          /_____/,
          '<select class="opt-true-false"><option></option><option>T</option><option>F</option></select>',
        )
        .replace(
          /__________/,
          '<textarea class="txt-textarea-long-answer"></textarea>',
        );
      $(this).html(e);
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
    $(".answer-the-questions-word-similar").each(function () {
      var e = $(this)
        .html()
        .replace(/__________/g, '<input class="txt-input-answer" />');
      $(this).html(e);
    }),
    $(".answer-the-questions-CI").each(function () {
      var e = $(this)
        .html()
        .replace(
          /______/,
          '<select class="opt-ci"><option></option><option>C</option><option>I</option></select>',
        );
      $(this).html(e);
    }),
    $(".opt-ci").change(function () {
      ($(this).attr("disabled", "disabled"),
        $(this).css({ background: "#F3F3F3", border: "" }));
    }));
}
function resizeTextareaAnswer() {
  ($(".txt-textarea-long-answer").css({ width: "" }),
    330 > $(window).width() &&
      $(".txt-textarea-long-answer").css({ width: 230 }));
}
function loadAnswerKey() {
  return "";
}
function sendLoginAction(e) {
  try {
    webkit.messageHandlers.loginAction.postMessage(e);
  } catch (e) {}
}
function mobileHeader() {
  document.querySelector("h1").innerHTML = "WKWebView Mobile";
}
