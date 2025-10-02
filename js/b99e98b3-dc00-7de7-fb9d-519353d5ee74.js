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
  answerTimerInterval,
  win_width = $(window).width(),
  win_height = $(window).height(),
  lang = 2,
  autoPlay = !1,
  tmp = "",
  audioLoop = 0,
  currentTime = 0,
  adsNextUnit = !0,
  fontSize = 100,
  path = "/apps-data/english-grammar-tests/",
  lsession = "lastestSession-" + path.split("/")[2],
  lsetting = "settings-" + path.split("/")[2],
  lfontSetting = "fontSize-" + path.split("/")[2];
function succeded(e, t, i) {
  t;
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
      ($("#answer-popup").length > 0 &&
        ($("#answer-popup").remove(),
        clearInterval(answerTimerInterval),
        (answerTimerInterval = null)),
        $("#idiom-tip-popup").length > 0 && $("#idiom-tip-popup").remove(),
        $("#home-section").removeAttr("home"));
      var e = document.getElementById("sound");
      (null != e && (e.pause(), (e.currentTime = 0)),
        loadLastSession(),
        clearTimeout(nextTimeOut),
        clearTimeout(loopTimeOut),
        $("#bottom-section")
          .children(".container")
          .html(
            '<div class="app-name">English Grammar Tests</div><div class="app-slogan">(9246 questions)</div>',
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
    $(".font-size").bind("click", function () {
      ($(this).css({ "border-radius": "0px" }),
        $(".font-size-cover").css({ display: "block" }),
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
          var e = { fontSize: fontSize };
          localStorage.setItem(lfontSetting, JSON.stringify(e));
        }));
    }),
    $(document).on("click", function (e) {
      0 === $(e.target).closest(".font-size").length &&
        ($(".font-size").css({ "border-radius": "" }),
        $(".font-size-cover").hide());
    }),
    $(document).on("touchstart", function (e) {
      0 === $(e.target).closest(".font-size").length &&
        ($(".font-size").css({ "border-radius": "" }),
        $(".font-size-cover").hide());
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
function panEnd(e) {
  if ("left" == direction)
    if (e > 100) {
      if (
        ($("#item" + elm_index).animate(
          { left: -$(window).width() },
          400,
          function () {},
        ),
        1 == $("#item" + next).attr("story") ||
          1 == $("#item" + next).attr("exercise"))
      ) {
        if (1 == $("#item" + next).attr("exercise"))
          null != (t = document.getElementById("sound")) &&
            (t.pause(), (t.currentTime = 0));
        $("#item" + next).animate({ left: 0 }, 400, function () {
          playSound(next, $("#item" + next).attr("source"));
        });
      } else
        $("#item" + next).animate({ left: 10 }, 400, function () {
          playSound(next, $("#item" + next).attr("source"));
        });
      elm_index = next;
    } else
      ($("#item" + elm_index).animate({ left: 10 }, 400, function () {}),
        $("#item" + next).animate(
          { left: $(window).width() },
          400,
          function () {},
        ),
        nextWordReading());
  else if (e > 100) {
    if (
      ($("#item" + elm_index).animate(
        { left: $(window).width() },
        400,
        function () {},
      ),
      1 == $("#item" + next).attr("story") ||
        1 == $("#item" + next).attr("exercise"))
    ) {
      var t;
      if (1 == $("#item" + next).attr("exercise"))
        null != (t = document.getElementById("sound")) &&
          (t.pause(), (t.currentTime = 0));
      $("#item" + next).animate({ left: 0 }, 400, function () {
        playSound(next, $("#item" + next).attr("source"));
      });
    } else
      $("#item" + next).animate({ left: 10 }, 400, function () {
        playSound(next, $("#item" + next).attr("source"));
      });
    elm_index = next;
  } else
    ($("#item" + elm_index).animate({ left: 10 }, 300, function () {}),
      $("#item" + next).animate(
        { left: -$(window).width() },
        400,
        function () {},
      ),
      nextWordReading());
  hold = !1;
}
function settings(e) {
  if (($("#setting-container").remove(), 1 == e)) {
    if (
      ($("#settings img").attr("src", "icons/close-window-50.png"),
      0 == $("#setting-container").length)
    ) {
      ('<tr><td>Auto next</td><td><label class="switch"><input id="chkAuto" type="checkbox"><div class="slider round"></div></label></td></tr>',
        '<tr><td>Number of repeat</td><td><select id="optLoop"><option value="0">0</option><option value="1">1</option><option value="2">2</option><option value="3">3</option><option value="4">4</option><option value="5">5</option></select></td></tr>',
        "</table>",
        $("body").append(
          '<div id="setting-container"><div><table><tr><td>Auto next</td><td><label class="switch"><input id="chkAuto" type="checkbox"><div class="slider round"></div></label></td></tr><tr><td>Number of repeat</td><td><select id="optLoop"><option value="0">0</option><option value="1">1</option><option value="2">2</option><option value="3">3</option><option value="4">4</option><option value="5">5</option></select></td></tr></table></div></div>',
        ),
        $("#setting-container").css({
          height: $(window).height(),
          right: -300,
        }),
        $("#setting-container").children("div").css({ padding: 20 }),
        $("#chkAuto, #optLoop").change(function () {
          var e = {
            next: $("#chkAuto").prop("checked"),
            loop: $("#optLoop").val(),
          };
          localStorage.setItem(lsetting, JSON.stringify(e));
        }));
    }
    var t = JSON.parse(localStorage.getItem(lsetting));
    ($("#optLoop").val(t.loop),
      1 == t.next
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
  ($("#container").css({ width: e }),
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
function showCategorySection(e, t, i) {
  ((autoPlay = !1),
    $("#answer-popup").length > 0 &&
      ($("#answer-popup").remove(),
      clearInterval(answerTimerInterval),
      (answerTimerInterval = null)),
    $("#idiom-tip-popup").length > 0 && $("#idiom-tip-popup").remove(),
    setStoreLastSession(e, t),
    settings(0),
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
  ((audioLoop = n.loop),
    (currentReadingIndex = i),
    (currentIndex = t),
    getSectionItem(e));
}
function getSectionItem(e) {
  if (null != sessionStorage[e]) {
    var t = JSON.parse(localStorage.getItem(lsetting));
    if (
      ((remainAudioLoop = null != t && t.loop > 0 ? t.loop : 0),
      null == localStorage.getItem(e.toLowerCase()))
    ) {
      var i = { read: !1 };
      (localStorage.setItem(e.toLowerCase(), JSON.stringify(i)),
        $("#tbl-last-session" + currentIndex)
          .find("div")
          .eq(0)
          .attr("class", "reading"));
    }
    $("#category-section").children(".section").children(".container").html("");
    var n = JSON.parse(sessionStorage.getItem(e));
    if (null != n) {
      var o = n.en,
        s = n.story,
        r = JSON.parse(localStorage.getItem(lsession));
      $("#category-section")
        .children(".section")
        .children(".container")
        .append('<li exercise="1" id="item0"><div></div></li>');
      i = {
        title: r.title,
        image: $("#home-section")
          .children("ul")
          .children("li")
          .eq(r.index)
          .find("img")
          .attr("src"),
        index: r.index,
        windex: 0,
        eindex: 0,
        sindex: 0,
      };
      (localStorage.setItem(lsession, JSON.stringify(i)),
        0 == $("#exercise-block").length &&
          $("#item0").children("div").append('<div id="exercise-block"></div>'),
        $("#exercise-block").append(
          '<div class="faq-list-section" title="' +
            o +
            '">' +
            s +
            "</div></div>",
        ),
        $("#exercise-block").append(
          '<div class="exercise-section-red-answer-key">Watch an AD for ANSWER KEY</div>',
        ),
        $(".exercise-section-red-answer-key").click(function () {
          (JSBridge.LoadStoryAnswerKeyVideoAds(
            "ANSWER KEY loaded. Check it out!",
          ),
            $(".answer-key-remove-after").remove(),
            $("#exercise-answer-key").css({ display: "block" }),
            $(".exercise-section-red-answer-key").css({ display: "none" }),
            $(".answer-key-only").html(""),
            $("#exercise-answer-block").html(
              '<table><tr><td></td><td style="background: aliceblue; text-align:center; font-weight:bold; text-transform:uppercase; padding:7px; font-size:15px">Answer Key</td><td style="background: aliceblue; text-align:center; font-weight:bold; text-transform:uppercase; padding:7px; font-size:15px">Your Answer</td></tr></table>',
            ),
            $(".faq-list-section").each(function () {
              $(this).find(".answer-the-questions-section").length > 0 &&
                ($("#exercise-answer-block table").append(
                  '<tr style="display:none"><td colspan="3" style="font-weight:bold;">' +
                    $(this).attr("title") +
                    "</td></tr>",
                ),
                $(this)
                  .find(".answer-the-questions-section")
                  .each(function () {
                    ($("#divAnswerKeyCover").remove(),
                      0 == $("#divAnswerKeyCover").length &&
                        $("body").append(
                          '<div id="divAnswerKeyCover" style="display:none"><div></div><div></div></div>',
                        ));
                    var e = $(this).attr("answer-index").split(",");
                    if (e.length > 1)
                      for (var t = 0; t < e.length; t++)
                        ($("#divAnswerKeyCover")
                          .children("div")
                          .eq(0)
                          .append(
                            $(this)
                              .children(".ul-multi-choose-answer")
                              .children("li")
                              .eq(e[t])
                              .html() + "<br/><br/>",
                          ),
                          $("#divAnswerKeyCover")
                            .children("div")
                            .eq(1)
                            .append(
                              $(this)
                                .children(".ul-multi-choose-answer")
                                .children("li")
                                .eq(e[t])
                                .html() + "<br/><br/>",
                            ));
                    var i = $(this)
                      .children(".ul-choose-answer")
                      .children("li")
                      .eq($(this).attr("answer-index"));
                    ($("#divAnswerKeyCover")
                      .children("div")
                      .eq(0)
                      .html(i.html()),
                      $("#divAnswerKeyCover")
                        .children("div")
                        .eq(0)
                        .children("input")
                        .remove());
                    var n = $(this)
                      .children(".ul-choose-answer")
                      .children("li");
                    (e.length > 1 &&
                      (n = $(this)
                        .children(".ul-multi-choose-answer")
                        .children("li")),
                      $("#divAnswerKeyCover").children("div").eq(1).html(""),
                      n.each(function () {
                        "checked" ==
                          $(this).children("input").attr("checked") &&
                          (e.length > 1
                            ? $("#divAnswerKeyCover")
                                .children("div")
                                .eq(1)
                                .append($(this).html() + "<br/><br/>")
                            : $("#divAnswerKeyCover")
                                .children("div")
                                .eq(1)
                                .append($(this).html()),
                          $("#divAnswerKeyCover")
                            .children("div")
                            .eq(1)
                            .children("input")
                            .remove(),
                          $(this).children("input").prop("checked", !0));
                      }));
                    var o = $.trim(
                        $("#divAnswerKeyCover").children("div").eq(0).html(),
                      ),
                      s = $.trim(
                        $("#divAnswerKeyCover").children("div").eq(1).html(),
                      );
                    o == s
                      ? $("#exercise-answer-block table").append(
                          '<tr style="background:#1EA362; color:white"><td>' +
                            (parseInt($(this).index()) + 1) +
                            "</td><td>" +
                            o +
                            "</td><td>" +
                            s +
                            "</td></tr>",
                        )
                      : $("#exercise-answer-block table").append(
                          "<tr><td>" +
                            (parseInt($(this).index()) + 1) +
                            '</td><td style="background:#1EA362; color:white">' +
                            o +
                            '</td><td style="background:#D9433D; color:white">' +
                            s +
                            "</td></tr>",
                        );
                  }));
            }),
            $("#exercise-answer-block").append("<p>&nbsp;</p>"),
            $("#exercise-answer-block").css({ display: "block" }),
            $("html,body").animate(
              { scrollTop: $("#exercise-answer-block").offset().top - 100 },
              500,
            ));
        }));
    }
    (replaceChooseAnswer(e),
      $(".counter").each(function () {
        $(this).css({
          "margin-left": ($(window).width() - $(this).width() - 20) / 2,
        });
      }),
      homeSectionResize(),
      scaleFontSize(),
      playSeeking(currentReadingIndex));
  }
}
function playSeeking(e) {
  ($("#idiom-tip-popup").length > 0 && $("#idiom-tip-popup").remove(),
    (currentReadingIndex = e),
    swipeWindow(),
    (elm_index = e),
    (hold = !1),
    (next = 0),
    setTimeout(function () {
      playSound(
        currentReadingIndex,
        $("#item" + currentReadingIndex).attr("source"),
      );
    }, 1e3));
}
function playSound(e, i) {
  currentReadingIndex = e;
  var n = document.getElementById("sound"),
    o = JSON.parse(localStorage.getItem(lsession));
  $("#bottom-section").css({ display: "block" });
  var s = $("#tbl-last-session" + (parseInt(o.index) + 1));
  if (s.length > 0) {
    o = JSON.parse(localStorage.getItem(lsession));
    var r = s.parent().attr("en");
    !1 === autoPlay
      ? $("#bottom-section")
          .children(".container")
          .html(
            '<ul id="nav-story"><li style="width:30%"><img class="audio-play" status="0" src="icons/blue-circle-replay-50.png" /><span style="margin-left:5px; position:relative; top:-23px"></span></li><li style="width:0%"></li><li  style="width: calc(70% - 10px); text-align:center; padding-left:5px; padding-right:5px; color:yellow">' +
              r +
              "</li></ul>",
          )
      : $("#bottom-section")
          .children(".container")
          .html(
            '<ul id="nav-story"><li style="width:30%"><img class="audio-play" status="1" src="icons/blue-circle-replay-50.png" /><span style="margin-left:5px; position:relative; top:-23px"></span></li><li style="width:0%"></li><li  style="width: calc(70% - 10px); text-align:center; padding-left:5px; padding-right:5px; color:yellow">' +
              r +
              "</li></ul>",
          );
  } else
    $("#bottom-section")
      .children(".container")
      .html(
        '<div class="app-name">English Grammar Tests</div><div class="app-slogan">(9246 questions)</div>',
      );
  ($("#nav-story")
    .children("li")
    .eq(0)
    .click(function () {
      var e = JSON.parse(localStorage.getItem(lsession));
      if (null != e) {
        var t = JSON.parse(localStorage.getItem(e.title.toLowerCase()));
        if (null != t) {
          var i = { read: !1, total: t.total, correct: 0, wrong: 0, time: "" };
          localStorage.setItem(e.title.toLowerCase(), JSON.stringify(i));
        }
        showCategorySection(e.title, e.index, 0);
      }
    }),
    $("#nav-story")
      .children("li")
      .eq(1)
      .click(function () {}),
    $("#nav-story")
      .children("li")
      .eq(2)
      .click(function () {
        (n.pause(), (autoPlay = !1));
        var e = JSON.parse(localStorage.getItem(lsession)),
          t = $("#tbl-last-session" + (parseInt(e.index) + 1));
        if (t.length > 0) {
          var i = t.parent().attr("en");
          0 == checkUnitOpened(i)
            ? showAdsForNextLesson(
                i,
                i + " loaded. Check it out!",
                parseInt(e.index) + 1,
                0,
              )
            : ((autoPlay = !1),
              1 == showAds() &&
                JSBridge.LoadStoryAnswerKeyVideoAds(
                  i.toUpperCase() + " loaded. Check it out!",
                ),
              showCategorySection(i, parseInt(e.index) + 1, 0));
        } else $("#section-section").trigger("click");
      }),
    null != i &&
      ($("#item" + e)
        .find(".reading")
        .unbind("click"),
      (n.src = i),
      (n.onloadedmetadata = function () {
        (null != localStorage[i]
          ? ((t = localStorage.getItem(i)),
            parseInt(t) < 1e3 && localStorage.setItem(i, parseInt(t) + 1))
          : localStorage.setItem(i, "1"),
          localStorage.setItem("currentIndex", currentReadingIndex),
          1 == autoPlay ? n.play() : (autoPlay = !0));
      }),
      (n.onended = function () {
        if (1 == isStory()) {
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
            localStorage.removeItem(
              $("#section-section").find(".title").html().toLowerCase(),
            ),
            null ==
              localStorage.getItem(
                $("#section-section").find(".title").html().toLowerCase(),
              ))
          ) {
            localStorage.setItem(
              $("#section-section").find(".title").html().toLowerCase(),
              JSON.stringify({ read: !0 }),
            );
          }
          $("#tbl-last-session" + currentIndex)
            .find("div")
            .eq(0)
            .attr("class", "play");
        }
        var t = parseInt(
          $("#item" + currentReadingIndex).attr("remainAudioLoop"),
        );
        t > 0
          ? (loopTimeOut = setTimeout(function () {
              ($("#item" + currentReadingIndex).attr("remainAudioLoop", t - 1),
                playSound(
                  currentReadingIndex,
                  $("#item" + currentReadingIndex).attr("source"),
                ),
                clearTimeout(nextTimeOut),
                clearTimeout(loopTimeOut),
                clearTimeout(autoNextTimeOut));
            }, 2e3))
          : (clearTimeout(nextTimeOut),
            clearTimeout(loopTimeOut),
            clearTimeout(autoNextTimeOut),
            (autoNextTimeOut = setTimeout(function () {
              ($("#item" + e)
                .find(".reading")
                .click(function () {
                  (clearTimeout(nextTimeOut),
                    clearTimeout(loopTimeOut),
                    clearTimeout(autoNextTimeOut),
                    playSound(e, $(this).parent().parent().attr("source")));
                }),
                $("#item" + currentReadingIndex).attr(
                  "remainAudioLoop",
                  remainAudioLoop,
                ),
                nextWordReading());
            }, 200)));
      })));
}
function showAds() {
  var e = new Date(),
    t = e.getDate() + "-" + (e.getMonth() + 1) + "-" + e.getFullYear(),
    i = { adsCurrentDay: t };
  try {
    var n = localStorage.getItem("adsCurrentDay-" + path.split("/")[2]);
    return (
      (null == n || t != JSON.parse(n).adsCurrentDay) &&
      (localStorage.setItem(
        "adsCurrentDay-" + path.split("/")[2],
        JSON.stringify(i),
      ),
      !0)
    );
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
  if (
    (localStorage.removeItem(t.toLowerCase()),
    null == localStorage.getItem(t.toLowerCase()))
  ) {
    localStorage.setItem(t.toLowerCase(), JSON.stringify({ read: !0 }));
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
      ((autoPlay = !1),
        JSBridge.LoadStoryAnswerKeyVideoAds(
          e.toUpperCase() + " loaded. Check it out!",
        ),
        showCategorySection(e, i, n),
        $(".show-ads-cover").remove());
    }),
    setTimeout(function () {
      ($(document).on("click", function (e) {
        0 === $(e.target).closest(".show-ads-cover").length &&
          null != $(".show-ads-cover").attr("opened") &&
          $(".show-ads-cover").remove();
      }),
        $(document).on("touchstart", function (e) {
          0 === $(e.target).closest(".show-ads-cover").length &&
            null != $(".show-ads-cover").attr("opened") &&
            $(".show-ads-cover").remove();
        }));
    }, 300));
}
function checkUnitOpened(e) {
  return null != localStorage.getItem(e.toLowerCase());
}
function nextDialogueReading() {
  var e = JSON.parse(localStorage.getItem(lsetting));
  if (null != e && 1 == e.next) {
    var t = $("#item" + currentReadingIndex).attr("si"),
      i = $("#item" + currentReadingIndex)
        .attr("soundarr")
        .split(",");
    if (t < i.length - 1) {
      var n = parseInt(t) + 1,
        o = i[n];
      ($("#item" + currentReadingIndex).attr("source", o),
        $("#item" + currentReadingIndex).attr("si", n),
        (location.hash = "#block-" + (n + 1)),
        $("#block-" + (n + 1))
          .children("div")
          .eq(1)
          .css({ display: "block" }),
        playSound(currentReadingIndex, o),
        $("#nav-story li")
          .eq(0)
          .children("span")
          .html($(".speaker-louder").eq(n).attr("title")));
    }
  }
}
function nextWordReading() {
  var e = JSON.parse(localStorage.getItem(lsetting));
  null != e &&
    1 == e.next &&
    (nextTimeOut = setTimeout(function () {
      var e = $("#item" + currentReadingIndex).attr("nelement");
      ($("#" + e)
        .find(".wordlist-cover")
        .find(".speaker-louder")
        .trigger("click"),
        $("#" + e)
          .find(".wordlist-cover")
          .find(".speaker-louder")
          .scrollTop(),
        $("html, body").animate(
          { scrollTop: $("#" + e).offset().top - 50 },
          800,
        ));
    }, 3e3));
}
function homeScroll(e) {
  ($(window).scroll(function () {
    (parseInt($("#home-section").height()),
      $("#home-section").offset(),
      $(window).height());
    var e = parseInt($(this).scrollTop());
    null == $("#home-section").attr("home") &&
      $("#home-section").attr("top", e);
  }),
    $("#home-section").scroll(function () {
      (parseInt($("#home-section").height()),
        $("#home-section").offset(),
        $(window).height());
      var e = parseInt($(this).scrollTop());
      $("#home-section").attr("top", e);
    }));
}
function homeSectionResize() {
  (resizeHomeSection(), resizeUnitItem());
}
function scaleFontSize() {
  var e = 786432;
  ($(".en-word").each(function () {
    var t = $(window).width() * $(window).height(),
      i = 300 * (Math.sqrt(t) / Math.sqrt(e));
    $(".en-word").css("font-size", i + "%");
  }),
    $(".wordlist-cover .en-word").each(function () {
      var t = $(window).width() * $(window).height(),
        i = 110 * (Math.sqrt(t) / Math.sqrt(e));
      (i < 110 && (i = 110), $(this).css("font-size", i + "%"));
    }),
    $(".vn-word").each(function () {
      var t = $(window).width() * $(window).height(),
        i = 140 * (Math.sqrt(t) / Math.sqrt(e));
      $(".vn-word").css("font-size", i + "%");
    }),
    $(".alphabet").each(function () {
      var t = $(window).width() * $(window).height(),
        i = 300 * (Math.sqrt(t) / Math.sqrt(e));
      $(".alphabet").css("font-size", i + "%");
    }),
    $(".en-story-title").each(function () {
      var t = $(window).width() * $(window).height(),
        i = 200 * (Math.sqrt(t) / Math.sqrt(e));
      (i < 120 && (i = 120), $(".en-story-title").css("font-size", i + "%"));
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
      var e = $(window).width() * $(window).height(),
        t = 300 * (Math.sqrt(e) / Math.sqrt(786432));
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
  for (var e = 0; e < elm_length; e++)
    $("#item" + e).css({ position: "fixed", left: -$(window).width() });
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
      if (1 == $(this).attr("story") || 1 == $(this).attr("exercise")) {
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
              .css({ margin: "0px", padding: "0px 0px 0px 30px" }));
        var e = $("#item" + $(this).index()).children("div");
        e.css({ padding: 10 });
        ($(window).height(),
          $(".header").height(),
          $("#bottom-section").height());
        e.height();
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
      (e < 50 && (e = 50),
        $(this).children(".opt-fill-blank").css({ "max-width": e }));
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
    var e = JSON.parse(localStorage.getItem(lsession));
    if (null != e) {
      var t = "waiting",
        i = localStorage.getItem(e.title.toLowerCase());
      (null != i && (t = 1 == $.parseJSON(i).read ? "play" : "reading"),
        $("#tbl-last-session" + e.index)
          .parent()
          .parent()
          .parent()
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
        $("#tbl-last-session" + e.index)
          .find("td")
          .eq(1)
          .find(".your-answer").length > 0 &&
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
        $("html,body").animate(
          { scrollTop: $("#tbl-last-session" + e.index).offset().top - 50 },
          0,
        ),
        "Index" != e.title &&
          $("#home-section")
            .children("div")
            .eq(0)
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
          .css({ "padding-top": 15, "padding-bottom": 0 }),
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
}
function resizeLastSession() {
  var e = $(window).width() - 130 - 40;
  (e > 120 && (e = 120), $("#img-last-session-unit").css({ width: e }));
}
function resizeUnitItem() {
  var e =
    $("#home-section").children("ul").children("li").eq(0).width() - 130 - 20;
  (e > 120 && (e = 120),
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
function resizeModal() {
  var e = 320,
    t = 320;
  (isMobile.any()
    ? (t = e = 200)
    : $(window).width() < e && (t = e = $(window).width() - 40),
    $("#modal")
      .find("img")
      .css({
        width: e,
        position: "fixed",
        left: ($(window).width() - e) / 2,
        top: ($(window).height() - t) / 2,
      }));
}
function replaceChooseAnswer(e) {
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
          (practiceTimerAlert(e),
          $(this)
            .parent()
            .children("li")
            .each(function () {
              $(this).css({ color: "", "font-weight": "" });
            }),
          $(this).find("input").prop("checked", !0),
          $(this).css({ color: "#1EA362", "font-weight": "bold" }),
          $(this)
            .parent()
            .children("li")
            .each(function () {
              ($(this).find("input").attr("disabled", "disabled"),
                $(this).unbind("click"));
            }),
          $(this).parent().parent().attr("answer-index") == $(this).index())
        ) {
          var t = $("#answer-popup div").eq(0).html().split("/");
          ($("#answer-popup div")
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
              }));
        } else {
          t = $("#answer-popup div").eq(2).html().split("/");
          ($("#answer-popup div")
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
              }));
        }
        var i = $("#answer-popup div").eq(0).html().split("/"),
          n = $("#answer-popup div").eq(2).html().split("/"),
          o = JSON.parse(localStorage.getItem(e.toLowerCase()));
        if (null != o) {
          var s = {
            read: o.read,
            total: parseInt(i[1]),
            correct: parseInt(i[0]),
            wrong: parseInt(n[0]),
          };
          localStorage.setItem(e.toLowerCase(), JSON.stringify(s));
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
        ($(this).unbind("click"), practiceTimerAlert(e));
        var t = parseInt($(this).parent().attr("q")) - 1;
        if (
          (t >= 0 &&
            ($(this).parent().attr("q", t),
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
          0 == t)
        ) {
          var i = "";
          if (
            ($(this)
              .parent()
              .children("li")
              .each(function () {
                ($(this).find("input").attr("disabled", "disabled"),
                  $(this).unbind("click"),
                  "checked" == $(this).find("input").attr("checked") &&
                    (i += $(this).index() + ","));
              }),
            i.length > 0 && (i = i.substring(0, i.length - 1)),
            $(this).parent().parent().attr("answer-index") == i)
          ) {
            var n = $("#answer-popup div").eq(0).html().split("/");
            ($("#answer-popup div")
              .eq(0)
              .html(parseInt(n[0]) + 1 + "/" + n[1]),
              $(this)
                .parent()
                .css({
                  background: "#F5F5DC",
                  "border-radius": "7px",
                  padding: "8px",
                  border: "2px solid #1ea362",
                }));
          } else {
            n = $("#answer-popup div").eq(2).html().split("/");
            ($("#answer-popup div")
              .eq(2)
              .html(parseInt(n[0]) + 1 + "/" + n[1]),
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
    }));
  var t =
    '<select class="opt-fill-blank"><option></option><option>a</option><option>b</option><option>c</option><option>d</option><option>e</option></select>';
  ($(".answer-the-questions-section-char").each(function () {
    $(this).html(t);
  }),
    $(".opt-fill-blank").each(function () {
      $(this).html(t);
    }),
    $(".opt-fill-blank").change(function () {
      $.trim($(this).attr("answer")).toLowerCase() ==
      $.trim($(this).val().toLowerCase())
        ? ($(this).attr("disabled", "disabled"),
          $(this).css({ background: "#1EA362", color: "white", border: "" }),
          0 ==
            $("#nav-story").children("li").eq(0).find(".audio-play").length &&
            $("#nav-story").children("li").eq(0).html(""))
        : (0 ==
            $("#nav-story").children("li").eq(0).find(".audio-play").length &&
            $("#nav-story")
              .children("li")
              .eq(0)
              .html('<span style="color:red">wrong</span>'),
          $(this).css({ border: "2px dotted red" }));
    }),
    $(".answer-the-questions-word-free").each(function () {
      var e = $(this)
        .html()
        .replace(/______/g, ' <input class="txt-input-answer" />');
      $(this).html(e);
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
          $(this).css({ color: "gray", "font-style": "italic" }),
          $(this)
            .parent()
            .children("li")
            .each(function () {
              ($(this).find("input").attr("disabled", "disabled"),
                $(this).unbind("click"));
            }),
          $(this).parent().parent().attr("answer-index") == $(this).index())
        ) {
          if ($("#answer-popup").length > 0) {
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
        } else if ($("#answer-popup").length > 0) {
          e = $("#answer-popup div").eq(2).html().split("/");
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
        $(this).unbind("click");
        var e = parseInt($(this).parent().attr("q")) - 1;
        if (
          (e >= 0 &&
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
            t.length > 0 && (t = t.substring(0, t.length - 1)),
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
            i = $("#answer-popup div").eq(2).html().split("/");
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
        .replace(/__________/g, "");
      $(this).html(
        "<span>" +
          e +
          '</span> <select class="opt-fill-blank"><option></option></select>',
      );
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
    $(".word-blank-cover").length > 0 &&
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
    $(".the-questions-R-W").each(function () {
      var e = $(this)
        .html()
        .replace(
          /_____/,
          '<select class="opt-r-w"><option></option><option>Right</option><option>Wrong</option></select>',
        )
        .replace(
          /__________/,
          '<textarea class="txt-textarea-long-answer"></textarea>',
        );
      $(this).html(e);
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
    }),
    $(".word-or-phrase").each(function () {
      var e = $(this)
        .html()
        .replace(
          /______/g,
          '<select class="opt-word-phrase"><option></option></select>',
        );
      $(this).html(e);
      var t = "";
      ($(this)
        .children("table")
        .children("tbody")
        .children("tr")
        .each(function () {
          t += "<option>" + $(this).children("td").eq(1).html() + "</option>";
        }),
        $(".opt-word-phrase").each(function () {
          $(this).append(t);
        }));
    }),
    $(".opt-word-phrase").change(function () {
      ($(this).attr("disabled", "disabled"),
        $(this).css({ background: "#F3F3F3", border: "" }));
    }),
    $(".answer-the-questions-word-free").each(function () {
      var e = $(this)
        .html()
        .replace(/__________/g, ' <input class="txt-input-answer" />');
      $(this).html(e);
    }));
}
function practiceTimerAlert(e) {
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
        .append('<p>&nbsp;</p><div id="exercise-answer-block"></div>'),
    $("#exercise-answer-block").css({ display: "block" }),
    null == answerTimerInterval &&
      (answerTimerInterval = setInterval(function () {
        var t = $("#answer-popup div").eq(1).html().split(":"),
          i = parseInt(t[1]) + 1,
          n = parseInt(t[0]);
        i > 59 && ((n += 1), (i = 0));
        var o = $("#answer-popup div").eq(0).html().split("/"),
          s = $("#answer-popup div").eq(2).html().split("/"),
          r = parseInt(o[0]) + parseInt(s[0]),
          a = !1;
        ((n > 59 || r >= parseInt(o[1])) &&
          (clearInterval(answerTimerInterval),
          parseInt(s[0]) > 0
            ? ($(".exercise-section-red-answer-key").css({
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
              $("#exercise-answer-block").html("<p>&nbsp;</p><p>&nbsp;</p>"))
            : ($(".exercise-section-red-answer-key").html(
                '<div style="border-bottom: 1px solid; font-weight: bold; z-index: 9999; position: fixed; left: 0px; width: 100%; bottom: 100px; border-radius: 0px; padding: 10px 0px; display: block;vertical-align: middle;margin: auto;background: #1EA362;text-transform: uppercase;color: yellow;text-shadow: 1px 1px gray;">Fantastic!<br>100% Correct.</div>',
              ),
              $(".exercise-section-red-answer-key").css({
                display: "block",
                background: "none",
              }),
              $(".exercise-section-red-answer-key").unbind("click"),
              $("#exercise-answer-block").html("<p>&nbsp;</p><p>&nbsp;</p>")),
          (a = !0)),
          i < 10 && (i = "0" + i),
          n < 10 && (n = "0" + n),
          $("#answer-popup div")
            .eq(1)
            .html(n + ":" + i));
        var l = JSON.parse(localStorage.getItem(e.toLowerCase()));
        if (null != l) {
          1 == l.read && (a = !0);
          var c = {
            read: a,
            total: l.total,
            correct: l.correct,
            wrong: l.wrong,
            time: n + ":" + i,
          };
          localStorage.setItem(e.toLowerCase(), JSON.stringify(c));
        }
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
    e.parent().children(".word-note-cover").hide());
  var t = e.attr("word"),
    i = JSON.parse(localStorage.getItem(t)),
    n = "";
  null != i.note && (n = i.note);
  var o = e.attr("windex");
  (e
    .parent()
    .append(
      '<div id="word-note-cover"><textarea word="' +
        t +
        '">' +
        n +
        '</textarea><br/><input type="button"  word="' +
        t +
        '" windex="' +
        o +
        '" class="note-button" value="Save" /> <input type="button" word="' +
        t +
        '" windex="' +
        o +
        '" class="note-button" value="Close" /></div>',
    ),
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
          "" != e.note
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
                .html(e.note.replace(/\n/g, "<br/>")),
              $("#item" + $(this).attr("windex"))
                .find(".word-note-cover")
                .html(e.note.replace(/\n/g, "<br/>")),
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
        var e = JSON.parse(localStorage.getItem($(this).attr("word")));
        ("" != e.note
          ? (0 ==
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
            $("#word-note-cover").parent().children(".word-note-cover").show())
          : $("#word-note-cover").parent().children(".word-note-cover").hide(),
          $("#word-note-cover").parent().children(".word-note-cover").show(),
          $("#word-note-cover").remove());
      }));
}
function loadRead(e, t) {
  localStorage.getItem(e.toLowerCase());
}
function loadAnswerKey(e) {
  var t = "",
    i = JSON.parse(localStorage.getItem(e.toLowerCase()));
  return (
    null != i &&
      null != i.total &&
      ((t +=
        '<div class="your-answer"><button class="correct">' +
        i.correct +
        "/" +
        i.total +
        "</button>"),
      i.wrong > 0 &&
        (t += '<button class="wrong">' + i.wrong + "/" + i.total + "</button>"),
      "" != i.time &&
        (t += '<button class="time">' + i.time + "</button></div>")),
    t
  );
}
function sendLoginAction(e) {
  try {
    webkit.messageHandlers.loginAction.postMessage(e);
  } catch (e) {}
}
function mobileHeader() {
  document.querySelector("h1").innerHTML = "WKWebView Mobile";
}
$(function () {
  if (
    ($("#modal").css({ display: "block", opacity: "1" }),
    $("#extendedSplashProgress").css({
      left: ($(window).width() - $("#extendedSplashProgress").width()) / 2,
    }),
    resizeModal(),
    resize(),
    null == localStorage.getItem(lsetting))
  ) {
    var e = { next: !1, loop: 0 };
    localStorage.setItem(lsetting, JSON.stringify(e));
  }
  if (null == localStorage.getItem(lfontSetting)) {
    e = { fontSize: fontSize };
    localStorage.setItem(lfontSetting, JSON.stringify(e));
  } else {
    var t = JSON.parse(localStorage.getItem(lfontSetting));
    fontSize = t.fontSize;
  }
  ($.ajax({
    url: "data/data.json?n=" + new Date().getTime(),
    type: "GET",
    dataType: "text",
    success: function (e) {
      var t = $.parseJSON(e).flashcard;
      ($("#home-section").html(""),
        $("#home-section").append('<div style="padding-bottom:20px"></div>'),
        (loadedTime = t.length));
      for (
        var i = "#0D7F9B,#82823F,#D2462A,#4d2f82,#313271".split(","),
          n = 0,
          o = 0,
          s = 0;
        s < t.length;
        s++
      ) {
        var r = t[s].en,
          a = t[s].desc;
        null == a && (a = "Index");
        var l = urlFriendly(a.toLowerCase());
        if (0 == $("#div-" + l).length) {
          var c = 1;
          (s > 0 && (c = 0),
            $("#home-section").append(
              '<div id="div-' +
                l +
                '" class="section-cover"><div opened="' +
                c +
                '" style="font-weight: bold; text-align: left; background:' +
                i[n] +
                '"><div style="padding:13px 10px; color:white;">' +
                a +
                '</div></div><ul class="curriculum-item"></ul></div>',
            ),
            (n += 1));
        }
        for (var d = t[s].exercise, h = 0; h < d.length; h++) {
          var p = d[h].en,
            u = r + ": " + p;
          "" == r && (u = p);
          var m = "waiting",
            w = localStorage.getItem(u.toLocaleLowerCase());
          (null != w && (m = 1 == $.parseJSON(w).read ? "play" : "reading"),
            $("#div-" + l)
              .children("ul")
              .append(
                '<li class="item  word-list-session"  en="' +
                  u +
                  '" idx="' +
                  o +
                  '" wl="0" ><table id="tbl-last-session' +
                  o +
                  '"><tr><td><div class="' +
                  m +
                  '"></div></td><td><div class="title">' +
                  u +
                  loadAnswerKey(u) +
                  " </div></td></tr></table></li>",
              ),
            sessionStorage.setItem(u, JSON.stringify(d[h])),
            (loadedTime -= 1),
            (o += 1));
        }
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
          showCategorySection(
            $(this).attr("en"),
            $(this).attr("idx"),
            parseInt($(this).attr("wl")),
          );
        }),
        $(".section-cover>div").bind("click", function () {
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
      var e = $("#section-section").find(".title").html();
      switch (
        (resizeModal(), resize(), homeSectionResize(), swipeWindow(), e)
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
