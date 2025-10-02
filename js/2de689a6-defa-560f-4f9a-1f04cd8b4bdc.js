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
  path = "/apps-data/4000-essential-english-words-3-2nd-edition/",
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
    url: "data/data.json",
    type: "GET",
    dataType: "text",
    success: function (e) {
      var t = $.parseJSON(e),
        n = t.flashcard;
      loadedTime = n.length;
      for (
        var r = [
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
          o = 0;
        o < n.length;
        o++
      ) {
        var s = n[o].en,
          a = n[o].desc;
        null == a && (a = "Unit");
        var l = urlFriendlyFull(a.toLowerCase());
        0 == $("#div-" + l).length &&
          ($("#home-section").append(
            '<div id="div-' +
              l +
              '"><div class="section-cover" style="display:none;font-weight: bold; text-align: left; background:' +
              r[d] +
              '"><div style="padding:13px 10px; color:white;">' +
              a +
              '</div></div><ul class="curriculum-item"></ul></div>',
          ),
          (d += 1));
        var c = "waiting",
          h = localStorage.getItem(path.split("/")[2] + ":" + s.toLowerCase());
        if (
          (null != h &&
            (!0 == $.parseJSON(h).read ? (c = "play") : (c = "reading")),
          null != n[o].wordlist)
        ) {
          var p = n[o].wordlist.length,
            v = n[o].reading[0].en;
          $("#div-" + l)
            .children("ul")
            .append(
              '<li class="item  word-list-session" story-title="' +
                v +
                '"  en="' +
                s +
                '" idx="' +
                o +
                '" wl="' +
                p +
                '"><table id="tbl-last-session' +
                o +
                '"><tr><td><div class="' +
                c +
                '"></div></td><td><div class="title">' +
                s +
                "</div></td></tr></table></li>",
            );
        } else
          $("#div-" + l)
            .children("ul")
            .append(
              '<li class="item  word-list-session"  story-title="" en="' +
                s +
                '" idx="' +
                o +
                '" wl="0" ><table id="tbl-last-session' +
                o +
                '"><tr><td><div class="' +
                c +
                '"></div></td><td><div class="title">' +
                s +
                "</div></td></tr></table></li>",
            );
        (sessionStorage.setItem(
          path.split("/")[2] + ":" + s,
          JSON.stringify(n[o]),
        ),
          (loadedTime -= 1),
          o == n.length - 1 &&
            (homeSectionResize(),
            resizeLastSession(),
            $("#container").css({ opacity: "1" }),
            $("#modal").animate({ opacity: "0" }, 1e3, function () {
              ($(".header").css({ display: "block" }), $("#modal").remove());
            })));
      }
      ($(".word-list-session").click(function () {
        !1 == checkUnitOpened($(this).attr("en"))
          ? "index" == $(this).attr("en").toLowerCase()
            ? showCategorySection($(this).attr("en"), $(this).attr("idx"), 0)
            : (showAds(),
              showAdsForNextLesson(
                $(this).attr("en"),
                $(this).attr("en"),
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
      }
      (resizeLastSession(),
        resizeExerciseStory(),
        resizePageContentImg(),
        resizeWordImage());
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
      ($("#category-section").find(".container").html(""),
        $("#answer-popup").remove(),
        $(".font-size").attr("style", ""),
        $(".show-ads-cover").remove(),
        elm.pause(),
        loadLastSession(),
        clearTimeout(nextTimeOut),
        clearTimeout(loopTimeOut),
        $("#bottom-section")
          .children(".container")
          .html(
            '<div class="app-name">4000 Essential English Words 3 (2nd Edition)</div ><div class="app-slogan">Paul Nation</div>',
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
        (localStorage.setItem(lsetting, JSON.stringify(t)),
          $(".wordlist li").each(function () {
            $(this).attr("remainaudioloop", $("#optLoop").val());
          }));
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
  ((autoPlay = !1),
    0 < $(".exercise-section-red-answer-key").length &&
      $(".exercise-section-red-answer-key").remove(),
    0 < $(".show-ads-cover").length && $(".show-ads-cover").remove(),
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
    $("#section-section").children(".title").html(e),
    $("html,body").animate({ scrollTop: 0 }, 0),
    $("#home-section").css({ display: "none", opacity: "0" }),
    $("#category-section").css({ left: "", display: "block", opacity: "1" }),
    $("#home-section").attr("home", "0"));
  var n = JSON.parse(localStorage.getItem(lsetting));
  (null != n && (audioLoop = n.loop),
    (currentReadingIndex = i),
    (currentIndex = t),
    getSectionItem(e));
}
function getSectionItem(e) {
  if (null != sessionStorage[path.split("/")[2] + ":" + e]) {
    var t = JSON.parse(localStorage.getItem(lsetting));
    remainAudioLoop = null != t && 0 < t.loop ? t.loop : 0;
    var i = localStorage.getItem(path.split("/")[2] + ":" + e.toLowerCase());
    if (null == i) {
      var n = { read: !1 };
      (localStorage.setItem(
        path.split("/")[2] + ":" + e.toLowerCase(),
        JSON.stringify(n),
      ),
        $("#tbl-last-session" + currentIndex)
          .find("div")
          .eq(0)
          .attr("class", "reading"));
    }
    $("#category-section").children(".section").children(".container").html("");
    var r = JSON.parse(
        sessionStorage.getItem(path.split("/")[2] + ":" + e),
      ).wordlist,
      d = JSON.parse(
        sessionStorage.getItem(path.split("/")[2] + ":" + e),
      ).reading;
    if (null != d) {
      var o = "",
        s =
          '<li  story="1" remainAudioLoop="' +
          remainAudioLoop +
          '" id="item' +
          0 +
          '"><div style="padding: 10px;"></div></li>';
      $("#category-section")
        .children(".section")
        .children(".container")
        .append(s);
      var a = JSON.parse(localStorage.getItem(lsession)),
        n = {
          title: a.title,
          image: $("#home-section")
            .children("ul")
            .children("li")
            .eq(a.index)
            .find("img")
            .attr("src"),
          index: a.index,
          windex: 0,
          eindex: a.eindex,
          sindex: 0,
        };
      localStorage.setItem(lsession, JSON.stringify(n));
      var l = JSON.parse(
          sessionStorage.getItem(path.split("/")[2] + ":" + e),
        ).en,
        s = "";
      ((s += '<div class="en-story">' + d + "</div>"),
        (s +=
          '<div style="text-align:center; padding-top:20px; width:100%; display:none"><div class="counter reading"><div></div></div><div style="clear:both"></div></div>'),
        0 == $("#story-block").length &&
          $("#item0").children("div").append('<div id="story-block"></div>'),
        $("#story-block").append(
          '<div class="story-block-cover">' + s + "</div>",
        ),
        wordList(),
        vocabularyTooltip(),
        $(".ckeditor-html5-audio").addClass("ads-sticky"),
        resizePageContentImg(),
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
              (elm.pause(),
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
                  .attr("src", "/apps-data/icons/play.png"),
                JSBridge.LoadStoryAnswerKeyVideoAds(
                  "ANSWER KEY loaded. Check it out!",
                ),
                $(".show-ads-cover").remove(),
                $("#exercise-answer-key").remove(),
                $("#story-block").append(
                  '<div id="exercise-answer-key" style="margin-top:30px"></div>',
                ),
                $(".answer-key-remove-after").remove(),
                $("#exercise-answer-key").css({ display: "block" }),
                $(".exercise-section-red-answer-key").css({ display: "none" }),
                $(".answer-key-only").html(""),
                $("#exercise-answer-key").html(
                  '<table><tr><td></td><td style="background: aliceblue; text-align:center; font-weight:bold; text-transform:uppercase; padding:7px;">Answer Key</td><td style="background: aliceblue; text-align:center; font-weight:bold; text-transform:uppercase; padding:7px;">Your Answer</td></tr></table>',
                ),
                $(".word-free-cover").each(function () {
                  var e = 0;
                  ("Sample & Definitions" != $(this).attr("title") &&
                    "" != $(this).attr("title") &&
                    $("#exercise-answer-key table").append(
                      '<tr><td colspan="3" style="text-align:left;">' +
                        $(this).attr("title") +
                        "</td></tr>",
                    ),
                    $(this)
                      .children("ol")
                      .each(function () {
                        var e = 1;
                        ($(this).attr("start") != null &&
                          (e = parseInt($(this).attr("start"))),
                          $(this)
                            .children(".answer-the-questions-section")
                            .each(function () {
                              ($("#divAnswerKeyCover").remove(),
                                0 == $("#divAnswerKeyCover").length &&
                                  $("body").append(
                                    '<div id="divAnswerKeyCover" style="display:none"><div></div><div></div></div>',
                                  ));
                              var t = $(this).attr("answer-index").split(",");
                              if (1 < t.length)
                                for (var n = 0; n < t.length; n++)
                                  ($("#divAnswerKeyCover")
                                    .children("div")
                                    .eq(0)
                                    .append(
                                      $(this)
                                        .children(".ul-multi-choose-answer")
                                        .children("li")
                                        .eq(t[n])
                                        .html() + "<br/>",
                                    ),
                                    $("#divAnswerKeyCover")
                                      .children("div")
                                      .eq(1)
                                      .append(
                                        $(this)
                                          .children(".ul-multi-choose-answer")
                                          .children("li")
                                          .eq(t[n])
                                          .html() + "<br/>",
                                      ));
                              var r = $(this)
                                .children(".ul-choose-answer")
                                .children("li")
                                .eq($(this).attr("answer-index"));
                              ($("#divAnswerKeyCover")
                                .children("div")
                                .eq(0)
                                .html(r.html()),
                                $("#divAnswerKeyCover")
                                  .children("div")
                                  .eq(0)
                                  .children("input")
                                  .remove());
                              var d = $(this)
                                .children(".ul-choose-answer")
                                .children("li");
                              (1 < t.length &&
                                (d = $(this)
                                  .children(".ul-multi-choose-answer")
                                  .children("li")),
                                $("#divAnswerKeyCover")
                                  .children("div")
                                  .eq(1)
                                  .html(""),
                                d.each(function () {
                                  "checked" ==
                                    $(this).children("input").attr("checked") &&
                                    (1 < t.length
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
                              var o = $.trim(
                                  $("#divAnswerKeyCover")
                                    .children("div")
                                    .eq(0)
                                    .html()
                                    .replace("____", ""),
                                ),
                                s = $.trim(
                                  $("#divAnswerKeyCover")
                                    .children("div")
                                    .eq(1)
                                    .html()
                                    .replace("____", ""),
                                );
                              (o.toLocaleLowerCase() == s.toLocaleLowerCase()
                                ? $("#exercise-answer-key table").append(
                                    '<tr style="background:#1EA362; color:white"><td>' +
                                      e +
                                      "</td><td>" +
                                      o +
                                      "</td><td>" +
                                      s +
                                      "</td></tr>",
                                  )
                                : $("#exercise-answer-key table").append(
                                    "<tr><td>" +
                                      e +
                                      '</td><td style="background:#1EA362; color:white">' +
                                      o +
                                      '</td><td style="background:#D9433D; color:white">' +
                                      s +
                                      "</td></tr>",
                                  ),
                                (e += 1));
                            }),
                          $(this)
                            .children(
                              ".answer-the-questions-section-better-fit",
                            )
                            .each(function () {
                              ($("#divAnswerKeyCover").remove(),
                                0 == $("#divAnswerKeyCover").length &&
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
                                (t = t.substring(0, t.lastIndexOf("/"))),
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
                              i.toLocaleLowerCase() == n.toLocaleLowerCase()
                                ? $("#reading-answer-key table").append(
                                    '<tr style="background:#1EA362; color:white"><td>' +
                                      (parseInt($(this).index()) + 1) +
                                      "</td><td>" +
                                      i +
                                      "</td><td>" +
                                      n +
                                      "</td></tr>",
                                  )
                                : $("#reading-answer-key table").append(
                                    "<tr><td>" +
                                      (parseInt($(this).index()) + 1) +
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
                                0 == $("#divAnswerKeyCover").length &&
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
                                    $(this).children(".opt-fill-blank").val(),
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
                              (i.toLocaleLowerCase() == n.toLocaleLowerCase()
                                ? $("#exercise-answer-key table").append(
                                    '<tr style="background:#1EA362; color:white"><td>' +
                                      e +
                                      "</td><td>" +
                                      i +
                                      "</td><td>" +
                                      n +
                                      "</td></tr>",
                                  )
                                : $("#exercise-answer-key table").append(
                                    "<tr><td>" +
                                      e +
                                      '</td><td style="background:#1EA362; color:white">' +
                                      i +
                                      '</td><td style="background:#D9433D; color:white">' +
                                      n +
                                      "</td></tr>",
                                  ),
                                (e += 1));
                            }),
                          $(this)
                            .children(".answer-the-questions-word-similar")
                            .each(function () {
                              ($("#divAnswerKeyCover").remove(),
                                0 == $("#divAnswerKeyCover").length &&
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
                                    $(this).children(".txt-input-answer").val(),
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
                              t.toLocaleLowerCase() == i.toLocaleLowerCase()
                                ? $("#exercise-answer-key table").append(
                                    '<tr style="background:#1EA362; color:white"><td>' +
                                      (parseInt($(this).index()) + 1) +
                                      "</td><td>" +
                                      t +
                                      "</td><td>" +
                                      i +
                                      "</td></tr>",
                                  )
                                : $("#exercise-answer-key table").append(
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
                            .children(".the-questions-R-W")
                            .each(function (e) {
                              ($("#divAnswerKeyCover").remove(),
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
                                      .html($(this).children(".opt-r-w").val()))
                                  : ($("#divAnswerKeyCover")
                                      .children("div")
                                      .eq(0)
                                      .html($(this).attr("fvalue")),
                                    $("#divAnswerKeyCover")
                                      .children("div")
                                      .eq(1)
                                      .html(
                                        $(this)
                                          .children(".txt-textarea-long-answer")
                                          .val(),
                                      )));
                              for (
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
                                  ),
                                  n = t.toLocaleLowerCase().split("/"),
                                  r = !1,
                                  d = 0;
                                d < n.length;
                                d++
                              )
                                if ($.trim(n[d]) == i.toLocaleLowerCase()) {
                                  r = !0;
                                  break;
                                }
                              !0 == r && "" != i.toLocaleLowerCase()
                                ? $("#exercise-answer-key table").append(
                                    '<tr style="background:#1EA362; color:white"><td>' +
                                      (parseInt(e) + 1) +
                                      "</td><td>" +
                                      t +
                                      "</td><td>" +
                                      i +
                                      "</td></tr>",
                                  )
                                : $("#exercise-answer-key table").append(
                                    "<tr><td>" +
                                      (parseInt(e) + 1) +
                                      '</td><td style="background:#1EA362; color:white">' +
                                      t +
                                      '</td><td style="background:#D9433D; color:white">' +
                                      i +
                                      "</td></tr>",
                                  );
                            }));
                      }),
                    $(this)
                      .find(".answer-the-questions-section-char")
                      .each(function () {
                        ((e += 1),
                          $("#divAnswerKeyCover").remove(),
                          0 == $("#divAnswerKeyCover").length &&
                            $("body").append(
                              '<div id="divAnswerKeyCover" style="display:none"><div></div><div></div></div>',
                            ));
                        var t = $(this).attr("text");
                        $("#divAnswerKeyCover").children("div").eq(0).html(t);
                        var i = "";
                        ($(this)
                          .find(".txt-input-answer-char")
                          .each(function () {
                            i += $(this).val();
                          }),
                          $(this).attr("pre") == null
                            ? $("#divAnswerKeyCover")
                                .children("div")
                                .eq(1)
                                .html(i)
                            : $("#divAnswerKeyCover")
                                .children("div")
                                .eq(1)
                                .html($(this).attr("pre") + i));
                        var n = $.trim(
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
                        n.toLocaleLowerCase() == r.toLocaleLowerCase()
                          ? $("#exercise-answer-key table").append(
                              '<tr style="background:#1EA362; color:white"><td>' +
                                e +
                                "</td><td>" +
                                n +
                                "</td><td>" +
                                r +
                                "</td></tr>",
                            )
                          : $("#exercise-answer-key table").append(
                              "<tr><td>" +
                                e +
                                '</td><td style="background:#1EA362; color:white">' +
                                n +
                                '</td><td style="background:#D9433D; color:white">' +
                                r +
                                "</td></tr>",
                            );
                      }),
                    $(this)
                      .children(".word-blank-cover")
                      .each(function (e) {
                        var t = $(this).attr("h4index");
                        (t != null && (e = t),
                          $("#exercise-answer-key table").append(
                            '<tr><td></td><td colspan="2" style="font-weight:bold;">' +
                              $(this).parent().children("h4").eq(e).html() +
                              "</td></tr>",
                          ),
                          $(this)
                            .find(".answer-the-questions-section-word-blank")
                            .each(function (e) {
                              ($("#divAnswerKeyCover").remove(),
                                0 == $("#divAnswerKeyCover").length &&
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
                                    $(this).children(".opt-fill-blank").val(),
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
                              i.toLocaleLowerCase() == n.toLocaleLowerCase()
                                ? $("#exercise-answer-key table").append(
                                    '<tr style="background:#1EA362; color:white"><td>' +
                                      (e + 1) +
                                      "</td><td>" +
                                      i +
                                      "</td><td>" +
                                      n +
                                      "</td></tr>",
                                  )
                                : $("#exercise-answer-key table").append(
                                    "<tr><td>" +
                                      (e + 1) +
                                      '</td><td style="background:#1EA362; color:white">' +
                                      i +
                                      '</td><td style="background:#D9433D; color:white">' +
                                      n +
                                      "</td></tr>",
                                  );
                            }));
                      }),
                    $(this)
                      .children(".word-or-phrase")
                      .each(function (e) {
                        var t = $(this).attr("h4index");
                        (t != null && (e = t),
                          $("#exercise-answer-key table").append(
                            '<tr><td colspan="3" style="font-weight:bold; text-align:left">' +
                              $(this).parent().children("h4").eq(e).html() +
                              "</td></tr>",
                          ),
                          $(this)
                            .children("table")
                            .children("tbody")
                            .children("tr")
                            .each(function (e) {
                              ($("#divAnswerKeyCover").remove(),
                                0 == $("#divAnswerKeyCover").length &&
                                  $("body").append(
                                    '<div id="divAnswerKeyCover" style="display:none"><div></div><div></div></div>',
                                  ));
                              var t = $(this)
                                .children("td")
                                .eq(0)
                                .attr("value");
                              ($("#divAnswerKeyCover")
                                .children("div")
                                .eq(0)
                                .html(t),
                                $("#divAnswerKeyCover")
                                  .children("div")
                                  .eq(1)
                                  .html(
                                    $(this).find(".opt-word-phrase").val(),
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
                                ? $("#exercise-answer-key table").append(
                                    '<tr style="background:#1EA362; color:white"><td>' +
                                      (e + 1) +
                                      "</td><td>" +
                                      i +
                                      "</td><td>" +
                                      n +
                                      "</td></tr>",
                                  )
                                : $("#exercise-answer-key table").append(
                                    "<tr><td>" +
                                      (e + 1) +
                                      '</td><td style="background:#1EA362; color:white">' +
                                      i +
                                      '</td><td style="background:#D9433D; color:white">' +
                                      n +
                                      "</td></tr>",
                                  );
                            }));
                      }),
                    $(this)
                      .find(".answer-the-questions-word-free")
                      .each(function (e) {
                        ($("#divAnswerKeyCover").remove(),
                          0 == $("#divAnswerKeyCover").length &&
                            $("body").append(
                              '<div id="divAnswerKeyCover" style="display:none"><div></div><div></div></div>',
                            ));
                        var t = $(this).attr("text");
                        ($("#divAnswerKeyCover").children("div").eq(0).html(t),
                          $("#divAnswerKeyCover")
                            .children("div")
                            .eq(1)
                            .html(
                              $(this).children(".txt-small-input-answer").val(),
                            ));
                        for (
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
                            ),
                            r = i.toLocaleLowerCase().split("/"),
                            d = !1,
                            o = 0;
                          o < r.length;
                          o++
                        )
                          if ($.trim(r[o]) == n.toLocaleLowerCase()) {
                            d = !0;
                            break;
                          }
                        !0 == d && "" != n.toLocaleLowerCase()
                          ? $("#exercise-answer-key table").append(
                              '<tr style="background:#1EA362; color:white"><td>' +
                                (e + 1) +
                                "</td><td>" +
                                i +
                                "</td><td>" +
                                n +
                                "</td></tr>",
                            )
                          : $("#exercise-answer-key table").append(
                              "<tr><td>" +
                                (e + 1) +
                                '</td><td style="background:#1EA362; color:white">' +
                                i +
                                '</td><td style="background:#D9433D; color:white">' +
                                n +
                                "</td></tr>",
                            );
                      }),
                    $(this)
                      .find(".answer-the-questions-textarea")
                      .each(function (e) {
                        ($("#divAnswerKeyCover").remove(),
                          0 == $("#divAnswerKeyCover").length &&
                            $("body").append(
                              '<div id="divAnswerKeyCover" style="display:none"><div></div><div></div></div>',
                            ));
                        var t = $(this).attr("text");
                        ($("#divAnswerKeyCover").children("div").eq(0).html(t),
                          $("#divAnswerKeyCover")
                            .children("div")
                            .eq(1)
                            .html(
                              $(this)
                                .children(".txt-textarea-long-answer")
                                .val(),
                            ));
                        for (
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
                            ),
                            r = i.toLocaleLowerCase().split("/"),
                            d = !1,
                            o = 0;
                          o < r.length;
                          o++
                        )
                          if ($.trim(r[o]) == n.toLocaleLowerCase()) {
                            d = !0;
                            break;
                          }
                        !0 == d && "" != n.toLocaleLowerCase()
                          ? $("#exercise-answer-key table").append(
                              '<tr style="background:#1EA362; color:white"><td>' +
                                (e + 1) +
                                "</td><td>" +
                                i +
                                "</td><td>" +
                                n +
                                "</td></tr>",
                            )
                          : $("#exercise-answer-key table").append(
                              "<tr><td>" +
                                (e + 1) +
                                '</td><td style="background:#1EA362; color:white">' +
                                i +
                                '</td><td style="background:#D9433D; color:white">' +
                                n +
                                "</td></tr>",
                            );
                      }),
                    $(this)
                      .find(".answer-the-questions-section-true-false")
                      .each(function (e) {
                        ($("#divAnswerKeyCover").remove(),
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
                                  $(this).children(".opt-true-false").val(),
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
                                  $(this).children(".opt-true-false").val() +
                                    " / " +
                                    $(this)
                                      .children(".txt-textarea-long-answer")
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
                          ? $("#exercise-answer-key table").append(
                              '<tr style="background:#1EA362; color:white"><td>' +
                                (e + 1) +
                                "</td><td>" +
                                t +
                                "</td><td>" +
                                i +
                                "</td></tr>",
                            )
                          : $("#exercise-answer-key table").append(
                              "<tr><td>" +
                                (e + 1) +
                                '</td><td style="background:#1EA362; color:white">' +
                                t +
                                '</td><td style="background:#D9433D; color:white">' +
                                i +
                                "</td></tr>",
                            );
                      }));
                }),
                $("#exercise-answer-key").css({ display: "block" }),
                $("html, body").animate(
                  { scrollTop: $("#exercise-answer-key").offset().top - 100 },
                  600,
                  function () {},
                ),
                readFlag());
            }));
        }),
        $(".speaker-louder").each(function (e) {
          ($(this).attr("idx", e), (o += $(this).attr("source") + ","));
        }),
        "" != o && (o = o.substring(0, o.length - 1)),
        $("#item0").attr("soundarr", o),
        $("#item0").attr("si", 0));
    }
    (replaceChooseAnswer2(),
      loadNoteWordList(),
      resizeWordImage(),
      $(".counter").each(function () {
        $(this).css({
          "margin-left": ($(window).width() - $(this).width() - 20) / 2,
        });
      }),
      homeSectionResize(),
      playSeeking(currentReadingIndex));
  }
}
function playSeeking(e) {
  (0 < $("#idiom-tip-popup").length && $("#idiom-tip-popup").remove(),
    $("#category-section")
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
      (playSound(
        currentReadingIndex,
        $(".speaker-louder").eq(currentReadingIndex).attr("source"),
      ),
        focusReading(currentReadingIndex));
    }, 1e3));
}
function playSound(t, e) {
  (clearInterval(audioInterval), (currentReadingIndex = t));
  (e != null &&
    ((elm.src = e),
    (elm.onloadedmetadata = function () {
      (localStorage.setItem("currentIndex", currentReadingIndex),
        !0 == autoPlay ? elm.play() : (autoPlay = !0));
    }),
    (elm.onended = function () {
      (readFlag(),
        $("#nav-story").children("li").eq(0).children("img").attr("status", 0),
        $("#nav-story")
          .children("li")
          .eq(0)
          .children("img")
          .attr("src", "icons/play.png"),
        !0 == isStory());
      var e = parseInt(
        $("#item" + currentReadingIndex).attr("remainAudioLoop"),
      );
      0 < e
        ? (loopTimeOut = setTimeout(function () {
            ($(".wordlist li")
              .eq(currentReadingIndex)
              .attr("remainAudioLoop", e - 1),
              playSound(
                currentReadingIndex,
                $(".wordlist li").eq(currentReadingIndex).attr("source"),
              ),
              clearTimeout(nextTimeOut),
              clearTimeout(loopTimeOut),
              clearTimeout(autoNextTimeOut));
          }, 2e3))
        : (clearTimeout(nextTimeOut),
          clearTimeout(loopTimeOut),
          clearTimeout(autoNextTimeOut),
          (autoNextTimeOut = setTimeout(function () {
            ($(".wordlist li")
              .eq(currentReadingIndex)
              .find(".reading")
              .click(function () {
                (clearTimeout(nextTimeOut),
                  clearTimeout(loopTimeOut),
                  clearTimeout(autoNextTimeOut),
                  playSound(t, $(this).parent().parent().attr("source")));
              }),
              $(".wordlist li")
                .eq(currentReadingIndex)
                .attr("remainAudioLoop", remainAudioLoop),
              nextWordReading());
          }, 200)));
    })),
    $("#bottom-section").css({ display: "block" }));
  var i = JSON.parse(localStorage.getItem(lsession)),
    n = $("#tbl-last-session" + (parseInt(i.index) + 1)),
    r = n.parent().attr("en");
  (0 < n.length
    ? ($("#bottom-section").children(".container").html(`<ul id="nav-story">
        <li source="${e}"><img class="audio-play" status="0" src="icons/play.png" /><span style="margin-left:5px; position:relative; top:-7px"></span></li>
        <li>Exercise</li>
        <li style="color:yellow">${r}</li>
        </ul>`),
      $("#nav-story")
        .children("li")
        .eq(0)
        .click(function () {
          ($(".show-ads-cover").remove(),
            1 ==
            $("#nav-story").children("li").eq(0).children("img").attr("status")
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
          switch ($(this).html()) {
            case "Word List":
              $(window).scrollTop($(".section-rotate").eq(0).offset().top - 60);
              break;
            case "Story":
              $(window).scrollTop($(".section-rotate").eq(2).offset().top - 60);
              break;
            case "Exercise":
              $(window).scrollTop($(".section-rotate").eq(1).offset().top - 60);
          }
        }),
      $("#nav-story")
        .children("li")
        .eq(2)
        .click(function () {
          0 < n.length
            ? !1 == checkUnitOpened(r)
              ? showAdsForNextLesson(
                  r,
                  r + " loaded. Check it out!",
                  parseInt(i.index) + 1,
                  0,
                )
              : (elm.pause(),
                (autoPlay = !1),
                !0 == showAds() &&
                  JSBridge.LoadStoryAnswerKeyVideoAds(
                    r.toUpperCase() + " loaded. Check it out!",
                  ),
                showCategorySection(r, parseInt(i.index) + 1, 0))
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
            .attr("src", "icons/pause.png"),
          elm.play()),
      "" == $("#nav-story li").eq(0).children("span").html() &&
        $("#nav-story li")
          .eq(0)
          .children("span")
          .html($(".speaker-louder").eq(currentReadingIndex).attr("title")))
    : $("#bottom-section")
        .children(".container")
        .html(
          '<div class="app-name">4000 Essential English Words 3 (2nd Edition)</div><div class="app-slogan">Paul Nation</div>',
        ),
    resizeExerciseStory());
}
function wordList() {
  let e = $(".wordlist");
  e.addClass("box_shadow_yt_iframe seg-block");
  var t = JSON.parse(localStorage.getItem(lsetting));
  ((remainAudioLoop = null != t && 0 < t.loop ? t.loop : 0),
    e.children("li").each(function (t) {
      ($(this).attr("remainaudioloop", remainAudioLoop),
        $(this).attr("title", $(this).attr("word")),
        t < e.children("li").length - 1 && $(this).attr("nid", t + 1),
        $(this).attr("source", `data/wordlist/${$(this).attr("word")}.mp3`));
      let i = `<div class="wordlist-image"><img idx="${t}" source="data/wordlist/${urlFriendlyFull($(this).attr("word"))}.mp3" title="${$(this).attr("word")}" src="data/wordlist/${$(this).attr("img")}" /></div>
        <div class="wordlist-cover">
            <div class="en-word">${$(this).attr("word")} <span class="en-pron">[${$(this).attr("pro")}]</span> <img class="wordlist-sound speaker-louder" idx="${t}" source="data/wordlist/${urlFriendlyFull($(this).attr("word"))}.mp3" title="${$(this).attr("word")}" src="/apps-data/icons/speaker_louder.png" /></div>
            <div class="en-desc">${$(this).children("div").eq(0).html()}</div>
            <div class="en-exam"><span class="arrow">→</span>  ${$(this).children("div").eq(1).html()}</div>
        </div>`;
      ($(this).html(i),
        $(".speaker-louder, .wordlist-image img")
          .off("click")
          .on("click", function () {
            var e = $(this).attr("source");
            ((currentReadingIndex = $(this).attr("idx")),
              playSound(currentReadingIndex, e),
              $("#nav-story li")
                .eq(0)
                .children("span")
                .html($(this).attr("title")),
              homeScroll(""));
          }));
    }));
}
function vocabularyTooltip() {
  ($(".voca").each(function () {
    let e = $(this).attr("idx");
    (e == null && (e = $(this).attr("tabindex")),
      $(this).removeAttr("href"),
      $(this).css({ cursor: "pointer" }));
  }),
    $(".voca").click(function () {
      (0 < $("#idiom-tip-popup").length && $("#idiom-tip-popup").remove(),
        $("body").append(
          `<div id="idiom-tip-popup"><div id="close-idiom-tip-popup"><img src="icons/close-window-50.png" /></div><div id="idiom-tip-popup-cover">${$(".wordlist li").eq($(this).attr("tabindex")).html()}</div></div>`,
        ),
        $("#idiom-tip-popup").find(".word-image").remove(),
        $("#close-idiom-tip-popup img").click(function () {
          $("#idiom-tip-popup").remove();
        }));
    }));
}
function showAds() {
  var e = new Date(),
    t = e.getDate() + "-" + (e.getMonth() + 1) + "-" + e.getFullYear(),
    i = { adsCurrentDay: t };
  try {
    var n = localStorage.getItem("adsCurrentDay");
    return null == n
      ? (localStorage.setItem("adsCurrentDay", JSON.stringify(i)), !0)
      : t != JSON.parse(n).adsCurrentDay &&
          (localStorage.setItem("adsCurrentDay", JSON.stringify(i)), !0);
  } catch (e) {
    return (localStorage.setItem("adsCurrentDay", JSON.stringify(i)), !0);
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
          e.toUpperCase() +
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
          e.toUpperCase() + " loaded. Check it out!",
        ),
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
  let t = $(".wordlist li").eq(currentReadingIndex);
  null != e &&
    !0 == e.next &&
    (nextTimeOut = setTimeout(function () {
      t.attr("nid") != null &&
        ((currentReadingIndex = parseInt(t.attr("nid"))),
        (t = $(".wordlist li").eq(currentReadingIndex)),
        $("html, body").animate(
          { scrollTop: t.offset().top - 60 },
          {
            complete: function () {
              ($("#nav-story li").eq(0).children("span").html(t.attr("title")),
                playSound(currentReadingIndex, t.attr("source")));
            },
          },
        ));
    }, 3e3));
}
function nextDialogueReading() {
  var e = JSON.parse(localStorage.getItem(lsetting));
  if (null != e && !0 == e.next) {
    var t = $("#item" + currentReadingIndex).attr("si"),
      i = $("#item" + currentReadingIndex)
        .attr("soundarr")
        .split(",");
    if (t < i.length - 1) {
      var n = parseInt(t) + 1,
        r = i[n];
      ($("#item" + currentReadingIndex).attr("source", r),
        $("#item" + currentReadingIndex).attr("si", n),
        $("html, body").animate(
          { scrollTop: $(".speaker-louder").eq(n).offset().top - 100 },
          600,
          function () {
            (playSound(currentReadingIndex, r),
              $("#nav-story li")
                .eq(0)
                .children("span")
                .html($(".speaker-louder").eq(n).attr("title")));
          },
        ));
    }
  }
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
  $(window).scroll(function () {
    var e = parseInt($(this).scrollTop());
    if (0 < $(".section-rotate").eq(1).length) {
      var t = $(".section-rotate").eq(1).position().top,
        i = 0;
      (0 < $(".section-rotate").eq(2).length &&
        (i = $(".section-rotate").eq(2).position().top),
        e >= t - parseInt($(window).height()) + 150 &&
          $("#bottom-section")
            .find("#nav-story")
            .children("li")
            .eq(1)
            .html("Story"),
        e >= i - parseInt($(window).height()) + 150 &&
          $("#bottom-section")
            .find("#nav-story")
            .children("li")
            .eq(1)
            .html("Word List"),
        e < t - parseInt($(window).height()) + 150 &&
          $("#bottom-section")
            .find("#nav-story")
            .children("li")
            .eq(1)
            .html("Exercise"));
    }
  });
}
function homeSectionResize() {
  (resizeHomeSection(), resizeUnitItem());
}
function scaleFontSize() {
  ($(".en-word").each(function () {
    var e = $(window).width() * $(window).height(),
      t = Math.sqrt(e) / Math.sqrt(786432),
      i = 110 * t;
    110 > i && (i = 110);
  }),
    $(".wordlist-cover .en-word").each(function () {
      var e = $(window).width() * $(window).height(),
        t = Math.sqrt(e) / Math.sqrt(786432),
        i = 110 * t;
      (110 > i && (i = 110), $(this).css("font-size", i + "%"));
    }),
    $(".vn-word").each(function () {
      var e = $(window).width() * $(window).height(),
        t = Math.sqrt(e) / Math.sqrt(786432);
      $(".vn-word").css("font-size", 140 * t + "%");
    }),
    $(".alphabet").each(function () {
      var e = $(window).width() * $(window).height(),
        t = Math.sqrt(e) / Math.sqrt(786432);
      $(".alphabet").css("font-size", 300 * t + "%");
    }),
    $(".en-story-title").each(function () {
      var e = $(window).width() * $(window).height(),
        t = Math.sqrt(e) / Math.sqrt(786432),
        i = 200 * t;
      120 > i && (i = 120);
    }),
    $("#category-section")
      .children(".section")
      .children(".container")
      .find(".word-image")
      .find("img")
      .each(function () {
        ((hImage =
          $(window).height() -
          $(".en-word").height() -
          $(".vn-word").height() -
          $(".alphabet").height() -
          $("#bottom-section").height() -
          230),
          $(this).css({ margin: "" }),
          250 <= hImage && (hImage = 250),
          120 >= hImage &&
            ((hImage = 120), $(this).css({ margin: "10px 0px 10px 0px" })),
          $(this).css({ height: hImage, width: hImage }),
          $(this).parent().css({ float: "", padding: "" }),
          $("#item" + currentReadingIndex)
            .find(".en-story-title")
            .css({ "padding-bottom": "" }),
          1 == parseInt($(this).attr("story"))
            ? (250 <= hImage && $(this).css({ height: 250, width: 250 }),
              120 >= hImage && $(this).css({ height: 120, width: 120 }),
              450 <= $(window).width() &&
                ($(this)
                  .parent()
                  .css({ float: "left", padding: "0px 15px 0px 0px" }),
                $("#item" + currentReadingIndex)
                  .find(".en-story-title")
                  .css({ "padding-bottom": 10 })))
            : ((hImage =
                ($(window).height() -
                  $(this).parent().parent().find(".en-word").height() -
                  $(this).parent().parent().find(".en-exam").height() -
                  $(this).parent().parent().find(".en-desc").height() -
                  $("#bottom-section").height()) /
                2),
              $(this).css({ height: "0px", width: "0px", display: "none" }),
              $(this)
                .parent()
                .css({ float: "", "padding-top": hImage / 2 })));
      }),
    $("#section-section")
      .children(".title")
      .css({ width: $(window).width() - 100 }),
    resizeExerciseStory());
}
function scaleFontSizeIndexToolTips() {
  ($(".tool-index-idioms")
    .find(".en-word")
    .each(function () {
      var e = $(window).width() * $(window).height(),
        t = Math.sqrt(e) / Math.sqrt(786432);
    }),
    $("#section-section")
      .children(".title")
      .css({ width: $(window).width() - 80 }),
    resizeExerciseStory());
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
        (400 > $(window).width() && (e = 90),
          $(this).css({ height: e, width: e }),
          $(this)
            .parent()
            .parent()
            .find(".wordlist-cover")
            .css({
              "max-width": $(".wordlist").width() - ($(this).width() + 40),
            }));
      }));
}
function resizePageContentImg() {
  ($(".story-block-cover")
    .find("img")
    .each(function () {
      let e = $(this).attr("width");
      e != null && 500 > e
        ? ($(this).css({ width: $(this).attr("width") }),
          400 > $(window).width() && $(this).css({ width: "100%" }))
        : ($(this).css({ width: "100%", height: "auto", "max-width": "800px" }),
          $(this).parent().css({ "text-align": "left" }));
    }),
    $(".story-block-cover")
      .find(".img-app-small")
      .each(function () {
        let e = $(this).attr("width");
        e == null
          ? $(this).removeAttr("style")
          : 800 > $(window).width()
            ? ($(this).css({
                width: "100%",
                "padding-right": "0px",
                float: "none",
                "max-width": "none",
                height: "auto",
              }),
              $(".audio-app").css({ width: "100%" }))
            : ($(this).removeAttr("style"),
              $(".audio-app").removeAttr("style"));
      }));
}
function isStory() {
  var e = parseInt($("#item" + currentReadingIndex).attr("story"));
  return !(1 != e);
}
function isExercise() {
  var e = parseInt($("#item" + currentReadingIndex).attr("exercise"));
  return !(1 != e);
}
function resizeExerciseStory() {
  ($("#category-section")
    .find(".container")
    .children("li")
    .each(function () {
      if (1 == $(this).attr("story") || 1 == $(this).attr("exercise")) {
        ($("#item" + $(this).index())
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
        var e = $("#item" + $(this).index()).children("div");
        e.css({ padding: 10 });
        var t =
          $(window).height() -
          $(".header").height() -
          $("#bottom-section").height();
        e.height() > t;
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
    $(".answer-the-questions-section-word-blank").each(function () {
      var e = $(this).width() - $(this).children("span").width() - 5;
      (50 > e && (e = 50),
        $(this).children(".opt-fill-blank").css({ "max-width": e }));
    }),
    $(".sample-cover").each(function () {
      $(this).children("img");
      ($(this).children("img").css({ "max-width": 400, "min-width": 300 }),
        $(this)
          .children("div")
          .css({ "max-width": "calc(100% - 350px)", "min-width": 300 }),
        400 >= $(window).width() &&
          $(this).children("img").css({ "max-width": 300 }));
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
        $("#tbl-last-session0").parent().parent().css({ display: "block" }));
  } catch (e) {}
  $("#home-section")
    .children("div")
    .eq(0)
    .css({ "padding-top": 20, "padding-bottom": 0 });
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
  (isMobile.any()
    ? ((e = 200), (t = e))
    : $(window).width() < e && ((e = $(window).width() - 40), (t = e)),
    $("#modal")
      .find("img")
      .css({
        width: e,
        position: "fixed",
        left: ($(window).width() - e) / 2,
        top: ($(window).height() - t) / 2,
      }));
}
function replaceChooseAnswer2() {
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
        if (
          ($(this)
            .parent()
            .children("li")
            .each(function () {
              $(this).css({ color: "", "font-weight": "" });
            }),
          $(this).find("input").attr("checked", "checked"),
          $(this).find("input").prop("checked", !0),
          $(this)
            .parent()
            .children("li")
            .each(function () {}),
          $(this).parent().parent().attr("answer-index") == $(this).index())
        ) {
          if (0 < $("#answer-popup").length) {
            var e = $("#answer-popup div").eq(0).html().split("/");
            ($("#answer-popup div")
              .eq(0)
              .html(parseInt(e[0]) + 1 + "/" + e[1]),
              $(this).find("input").attr("checked", "checked"),
              $(this)
                .parent()
                .css({
                  background: "#F5F5DC",
                  "border-radius": "7px",
                  padding: "8px",
                  border: "2px solid #1ea362",
                }));
          }
        } else if (0 < $("#answer-popup").length) {
          var e = $("#answer-popup div").eq(2).html().split("/");
          ($("#answer-popup div")
            .eq(2)
            .html(parseInt(e[0]) + 1 + "/" + e[1]),
            $(this).css({ color: "red", "font-weight": "bold" }),
            $(this).find("input").attr("checked", "checked"),
            $(this)
              .parent()
              .css({
                background: "lightgray",
                "border-radius": "7px",
                padding: "8px",
                border: "2px solid red",
              }));
        }
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
        var e = parseInt($(this).parent().attr("q")) - 1;
        if (
          (0 <= e &&
            ($(this).parent().attr("q", e),
            $(this).find("input").attr("checked", "checked"),
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
                "checked" == $(this).find("input").attr("checked") &&
                  (t += $(this).index() + ",");
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
          /_____/g,
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
            /_____/g,
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
          /_____/g,
          '<select class="opt-fill-blank"><option></option></select>',
        );
      $(this).html(e);
    }));
  var e = "";
  ($("#ul-free-option")
    .children("li")
    .each(function () {
      e += "<option>" + $.trim($(this).html()) + "</option>";
    }),
    $(".opt-fill-blank").each(function () {
      $(this).append(e);
    }));
  var t = "";
  ($(".ul-free-option")
    .children("li")
    .each(function () {
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
    $(".answer-the-questions-word-free").each(function () {
      var e = $(this)
        .html()
        .replace(/_____/g, ' <input class="txt-small-input-answer" />');
      $(this).html(e);
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
          '<textarea class="txt-textarea-long-answer w-100"></textarea>',
        );
      ($(this).html(e),
        $(".opt-true-false")
          .unbind()
          .bind("change", function () {
            "F" == $(this).val()
              ? $(this)
                  .parent()
                  .children(".txt-textarea-long-answer")
                  .css({ display: "block" })
              : ($(this)
                  .parent()
                  .children(".txt-textarea-long-answer")
                  .css({ display: "none" }),
                $(this).parent().children(".txt-textarea-long-answer").val(""));
          }));
    }),
    $(".ol-upper-alpha li").each(function () {
      var e = $(this)
        .html()
        .replace(/_____/g, ' <input class="txt-small-input-answer" /> ');
      $(this).html(e);
    }),
    $(".speaker-louder").each(function () {
      $(this).attr("src", "icons/speaker_louder.png");
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
        var e = $("#answer-popup div").eq(1).html().split(":"),
          t = parseInt(e[1]) + 1,
          i = parseInt(e[0]);
        59 < t && (++i, (t = 0));
        var n = $("#answer-popup div").eq(0).html().split("/"),
          r = $("#answer-popup div").eq(2).html().split("/"),
          d = parseInt(n[0]) + parseInt(r[0]);
        ((59 < i || d >= parseInt(n[1])) &&
          (clearInterval(answerTimerInterval),
          0 < parseInt(r[0]) &&
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
          10 > t && (t = "0" + t),
          10 > i && (i = "0" + i),
          $("#answer-popup div")
            .eq(1)
            .html(i + ":" + t));
      }, 1e3)));
}
function auto_grow(e) {
  ((e.style.height = "5px"), (e.style.height = e.scrollHeight + "px"));
}
function wordnote(e) {
  ($("#word-note-cover").remove(),
    $(".word-note-cover").each(function () {
      $(this).show();
    }),
    e.parent().parent().find(".word-note-cover").hide());
  var t = e.attr("word"),
    i = JSON.parse(localStorage.getItem(t)),
    n = "";
  if (null == i) {
    var r = {};
    ((r.note = ""), (n = ""), localStorage.setItem(t, JSON.stringify(r)));
  } else null != i.note && (n = i.note);
  var d = e.attr("windex");
  (e
    .parent()
    .parent()
    .find(".en-desc")
    .append(
      '<div id="word-note-cover"><textarea word="' +
        t +
        '">' +
        n +
        '</textarea><br/><input type="button"  word="' +
        t +
        '" windex="' +
        d +
        '" class="note-button" value="Save" /> <input type="button" word="' +
        t +
        '" windex="' +
        d +
        '" class="note-button" value="Close" /></div>',
    ),
    e.parent().parent().find(".en-desc").css({ display: "block" }),
    setTimeout(function () {
      var e = $("#word-note-cover").children("textarea").get(0).scrollHeight;
      $("#word-note-cover")
        .children("textarea")
        .css("height", e + "px");
    }, 1),
    $("#word-note-cover")
      .children("textarea")
      .on("input", function () {
        var e = $(this).get(0).scrollHeight;
        $(this).css("height", e + "px");
      }),
    $("#word-note-cover")
      .children("input")
      .eq(0)
      .bind("click", function () {
        var e = JSON.parse(localStorage.getItem($(this).attr("word")));
        ((e.note = $("#word-note-cover textarea").val()),
          localStorage.setItem($(this).attr("word"), JSON.stringify(e)),
          "" == e.note
            ? ($(".wordlist li")
                .eq($(this).attr("windex"))
                .find(".word-note-cover")
                .hide(),
              $("#item" + $(this).attr("windex"))
                .find(".word-note-cover")
                .hide())
            : (0 ==
                $(".wordlist li")
                  .eq($(this).attr("windex"))
                  .find(".word-note-cover").length &&
                $(".wordlist li")
                  .eq($(this).attr("windex"))
                  .find(".en-desc")
                  .append('<div class="word-note-cover"></div>'),
              0 ==
                $("#voca" + $(this).attr("windex")).find(".word-note-cover")
                  .length &&
                $("#voca" + $(this).attr("windex"))
                  .find(".en-desc")
                  .append('<div class="word-note-cover"></div>'),
              $(".wordlist li")
                .eq($(this).attr("windex"))
                .find(".word-note-cover")
                .html(e.note.replace(/\n/g, "<br/>")),
              $("#voca" + $(this).attr("windex"))
                .find(".word-note-cover")
                .html(e.note.replace(/\n/g, "<br/>")),
              $(".wordlist li")
                .eq($(this).attr("windex"))
                .find(".word-note-cover")
                .show(),
              $("#voca" + $(this).attr("windex"))
                .find(".word-note-cover")
                .show()),
          $("#word-note-cover").remove());
      }),
    $("#word-note-cover")
      .children("input")
      .eq(1)
      .bind("click", function () {
        var e = JSON.parse(localStorage.getItem($(this).attr("word")));
        ("" == e.note
          ? $("#word-note-cover").parent().children(".word-note-cover").hide()
          : (0 ==
            $("#word-note-cover").parent().children(".word-note-cover").length
              ? $("#word-note-cover")
                  .parent()
                  .append(
                    '<div class="word-note-cover">' +
                      e.note.replace(/\n/g, "<br/>") +
                      "</div>",
                  )
              : $("#word-note-cover")
                  .parent()
                  .children(".word-note-cover")
                  .html(e.note.replace(/\n/g, "<br/>")),
            $("#word-note-cover").parent().children(".word-note-cover").show()),
          $("#word-note-cover").parent().children(".word-note-cover").show(),
          $("#word-note-cover").remove());
      }));
}
function loadRead(e) {
  var t = localStorage.getItem(e.toLowerCase());
}
function loadNoteWordList() {
  0 < $("#vocabulary-block").length &&
    $("#vocabulary-block")
      .children(".wordlist")
      .children("li")
      .each(function () {
        var e = JSON.parse(localStorage.getItem($(this).attr("word")));
        if (null == e) {
          $(this)
            .find(".en-word")
            .html(
              $(this).find(".en-word").html() +
                ' <img word="' +
                $(this).attr("word") +
                '" windex="' +
                $(this).index() +
                '" onclick="wordnote($(this))" src="icons/note_app.jpg" class="word-note" />',
            );
        } else "" != e.note;
      });
}
function sendLoginAction(e) {
  try {
    webkit.messageHandlers.loginAction.postMessage(e);
  } catch (e) {}
}
function mobileHeader() {
  document.querySelector("h1").innerHTML = "WKWebView Mobile";
}
