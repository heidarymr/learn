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
  tmp = "",
  audioLoop = 0,
  currentTime = 0,
  autoPlay = !1,
  fontSize = 100;
function succeded(e, t) {
  switch (t) {
  }
}
var intervalInit,
  audioTimeout,
  adsFirstTimeLoadedInterval,
  loadedTime = 0,
  ads = !1,
  adsFirstTime = !1,
  countUnitLearned = 0;
$(function () {
  ((elm = document.getElementById("sound")),
    $("#modal").css({ display: "block", opacity: "1" }),
    $("#extendedSplashProgress").css({
      left: ($(window).width() - $("#extendedSplashProgress").width()) / 2,
    }),
    resizeModal(),
    resize());
  var e = localStorage.getItem("settings");
  if (null == e) {
    var t = { next: !1, loop: 0 };
    localStorage.setItem("settings", JSON.stringify(t));
  }
  var i = localStorage.getItem("fontSize");
  if (null == i) {
    var t = { fontSize: fontSize };
    localStorage.setItem("fontSize", JSON.stringify(t));
  } else {
    var n = JSON.parse(localStorage.getItem("fontSize"));
    fontSize = n.fontSize;
  }
  ($.ajax({
    url: "data/data.json",
    type: "GET",
    dataType: "text",
    success: function (e) {
      var t = $.parseJSON(e),
        n = t.flashcard;
      ($("#home-section").html(""), (loadedTime = n.length));
      for (
        var d = [
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
          s = 0,
          r = 0;
        r < n.length;
        r++
      ) {
        var o = n[r].en,
          a = n[r].desc;
        a == null && (a = "abc");
        var l = urlFriendlyFull(a.toLowerCase());
        0 == $("#div-" + l).length &&
          ($("#home-section").append(
            '<div id="div-' +
              l +
              '"><div class="section-cover" style="font-weight: bold; text-align: left; background:' +
              d[s] +
              '"><div style="padding:13px 10px; color:white;">' +
              a +
              '</div></div><ul class="curriculum-item"></ul></div>',
          ),
          (s += 1),
          10 < s && (s = 0));
        var c = "waiting",
          p = localStorage.getItem(o.toLowerCase());
        null != p &&
          (!0 == $.parseJSON(p).read ? (c = "play") : (c = "reading"));
        var h = 0;
        (n[r].wordlist != null && (h = n[r].wordlist.length),
          $("#div-" + l)
            .children("ul")
            .append(
              '<li class="item  word-list-session"  en="' +
                o +
                '" idx="' +
                r +
                '" wl="' +
                h +
                '" ><table id="tbl-last-session' +
                r +
                '"><tr><td><div class="' +
                c +
                '"></div></td><td><div class="title">' +
                o +
                "</div></td></tr></table></li>",
            ),
          sessionStorage.setItem(o, JSON.stringify(n[r])),
          (loadedTime -= 1));
      }
      ($(".word-list-session").click(function () {
        !1 == checkUnitOpened($(this).attr("en"))
          ? (showAds(),
            showAdsForNextLesson(
              $(this).attr("en"),
              $(this).attr("idx"),
              parseInt($(this).attr("wl")),
            ))
          : (!0 == showAds() && JSBridge.LoadStoryAnswerKeyVideoAds(""),
            showCategorySection(
              $(this).attr("en"),
              $(this).attr("idx"),
              parseInt($(this).attr("wl")),
            ));
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
        $(".reading-lastest-session, .session-play-button").click(function () {
          showCategorySection(
            $(this).attr("en"),
            $(this).attr("idx"),
            parseInt($(this).attr("wl")),
          );
          var e = $("#item" + currentReadingIndex).children("div");
          (e.animate({ scrollTop: 0 }, 0),
            setTimeout(function () {
              e.animate({ scrollTop: $("#story-block").offset().top - 70 });
            }, 0));
        }),
        $(".section-cover").bind("click", function () {
          ($(".section-cover").each(function () {
            $(this).attr("opened", "0");
          }),
            $(".curriculum-item").each(function () {
              $(this).css({ display: "" });
            }),
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
                $(this).attr("opened", "1")));
        }),
        init());
    },
  }),
    (intervalInit = setInterval(function () {
      0 >= loadedTime &&
        (clearInterval(intervalInit),
        resizeModal(),
        resize(),
        homeSectionResize(),
        swipeWindow(),
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
      (resizeLastSession(),
        $(".word-image")
          .find(".reading")
          .each(function () {
            var e = $(window).width();
            $(this).css({
              width: (e - 20) / 2,
              height: $("#item" + $(this).index()).height() - 60,
              top: 0,
              left: (e - (e - 20) / 2) / 2 - 10,
            });
          }),
        $(".counter").each(function () {
          $(this).css({
            "margin-left": ($(window).width() - $(this).width() - 20) / 2,
          });
        }));
    }),
    $("body").css({ "font-size": fontSize + "%" }),
    delete Hammer.defaults.cssProps.userSelect,
    (mc = new Hammer(document.getElementById("category-section"))),
    mc.on("panleft", function () {
      (clearTimeout(nextTimeOut),
        clearTimeout(loopTimeOut),
        clearTimeout(autoNextTimeOut),
        !1 == isStory() && !1 == isExercise() && panLeft());
    }),
    mc.on("panright", function () {
      (clearTimeout(nextTimeOut),
        clearTimeout(loopTimeOut),
        clearTimeout(autoNextTimeOut),
        !1 == isStory() && !1 == isExercise() && panRight());
    }),
    mc.on("panend", function (e) {
      (clearTimeout(nextTimeOut),
        clearTimeout(loopTimeOut),
        clearTimeout(autoNextTimeOut),
        !1 == isStory() && !1 == isExercise() && panEnd(e.distance));
    }));
});
function init() {
  (loadLastSession(),
    $("#home-section").attr("top", $("#home-section").attr("top")),
    $("#home-section").css({ position: "absolute", top: 55 }),
    $("#category-section").attr("top", $("#home-section").attr("top")),
    $("#category-section").css({ top: 55 }),
    $("#section-section").click(function () {
      ($(".exercise-section-red-answer-key").remove(),
        elm.pause(),
        loadLastSession(),
        clearTimeout(nextTimeOut),
        clearTimeout(loopTimeOut),
        $("#bottom-section")
          .children(".container")
          .html(
            '<div class="app-name">\u201CBarron\'s 1100 Words You Need to Know\u201D</div > <div class="app-slogan">Sixth Edition</div>',
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
        $(".font-size-cover").css({ display: "block" }),
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
          ? (1 == $("#item" + next).attr("exercise") && elm.pause(),
            $("#item" + next).animate({ left: 0 }, 400, function () {
              (playSound(next, $("#item" + next).attr("source")),
                focusReading(next),
                swipeWindow());
            }))
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
          ? (1 == $("#item" + next).attr("exercise") && elm.pause(),
            $("#item" + next).animate({ left: 0 }, 400, function () {
              (playSound(next, $("#item" + next).attr("source")),
                focusReading(next),
                swipeWindow());
            }))
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
        localStorage.setItem("settings", JSON.stringify(t));
      }));
  }
  var t = JSON.parse(localStorage.getItem("settings"));
  null == t
    ? $("#optLoop").val(0)
    : ($("#optLoop").val(t.loop),
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
          localStorage.setItem("settings", JSON.stringify(t));
        }));
    }
    var i = JSON.parse(localStorage.getItem("settings"));
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
    var n = JSON.parse(localStorage.getItem(e));
    if (null != n) {
      var d = n.reading[0].en;
      "" == d
        ? $("#section-section").children(".title").html(e)
        : $("#section-section")
            .children(".title")
            .html(e + ": " + d);
    } else $("#section-section").children(".title").html(e);
  } else $("#section-section").children(".title").html(e);
  ($("#category-section").css({ position: "fixed" }),
    $("html,body").animate({ scrollTop: 0 }, 0),
    $("#home-section").animate({ opacity: "0" }, 0, function () {}),
    $("#category-section").css({
      left: $(window).width() - 4,
      display: "block",
    }),
    $("#category-section").animate({ left: 0, opacity: "1" }, 500, function () {
      ($("#category-section").find(".section-more").css({ display: "block" }),
        $("#category-section").css({ position: "absolute" }),
        $("#home-section").css({ display: "none" }));
    }));
  var s = JSON.parse(localStorage.getItem("settings"));
  ((audioLoop = null == s ? 0 : s.loop),
    (currentReadingIndex = i),
    (currentIndex = t),
    getSectionItem(e));
}
function getSectionItem(e) {
  if (null != sessionStorage[e]) {
    var t = JSON.parse(localStorage.getItem("settings"));
    remainAudioLoop = null != t && 0 < t.loop ? t.loop : 0;
    var n = localStorage.getItem(e.toLowerCase());
    if (null == n) {
      var d = { read: !1 };
      (localStorage.setItem(e.toLowerCase(), JSON.stringify(d)),
        $("#tbl-last-session" + currentIndex)
          .find("div")
          .eq(0)
          .attr("class", "reading"));
    }
    $("#category-section").children(".section").children(".container").html("");
    var s = JSON.parse(sessionStorage.getItem(e)).wordlist;
    if (s != null || null != s)
      for (var r = 0; r < s.length; r++) {
        var o = s[r].en.substring(0, 1),
          a = s[r].en,
          l = s[r].vi,
          c = s[r].pron,
          p = s[r].desc,
          h = s[r].exam,
          m = s[r].image,
          w = s[r].sound,
          v =
            '<li remainAudioLoop="' +
            remainAudioLoop +
            '" word="' +
            a +
            '" id="item' +
            r +
            '">';
        ((v += '<div class="word-image"><img src="" /></div>'),
          (v +=
            '<div class="en-word">' +
            a +
            ' <span class="en-pron">' +
            c +
            '</span> <img source="data/' +
            e.replace(/ /g, "-") +
            "/wordlist/" +
            w +
            '" class="speaker-louder" style="width:20px" src="icons/speaker_louder.png" /></div>'));
        var g = JSON.parse(localStorage.getItem(a));
        ((v +=
          null == g
            ? '<div class="en-desc" style="display:none"></div>'
            : "" == g.note
              ? '<div class="en-desc"><span class="arrow">\u2192</span> ' +
                p +
                ' <img src="icons/note_app.jpg" word="' +
                a +
                '" windex="' +
                r +
                '" onclick="wordnote($(this))" class="word-note" /></div>'
              : '<div class="en-desc"><span class="arrow">\u2192</span> ' +
                p +
                ' <img src="icons/note_app.jpg" word="' +
                a +
                '" windex="' +
                r +
                '" onclick="wordnote($(this))" class="word-note" /><div class="word-note-cover">' +
                g.note.replace(/\n/g, "<br/>") +
                "</div></div>"),
          (v += '<div class="en-exam">' + h + "</div>"),
          (v +=
            '<div style="text-align:center; padding-top:20px; width:100%; display:none"><div class="counter reading"><div></div></div><div style="clear:both"></div></div>'),
          (v += "</li>"),
          $("#category-section")
            .children(".section")
            .children(".container")
            .append(v),
          "" != w &&
            $("#item" + r).attr(
              "source",
              "data/" + e.replace(/ /g, "-") + "/wordlist/" + w + "",
            ),
          $("#item" + r)
            .find(".speaker-louder")
            .click(function () {
              (clearTimeout(nextTimeOut),
                clearTimeout(loopTimeOut),
                clearTimeout(autoNextTimeOut),
                (autoPlay = !0),
                playSound(currentReadingIndex, $(this).attr("source")));
            }));
      }
    else readFlag();
    var u = JSON.parse(sessionStorage.getItem(e)).exercise;
    if (null != u)
      if ("index" == e.toLowerCase()) {
        for (var r = 0; 1 > r; r++) {
          var a = u[r].en,
            y = u[r].story;
          if (0 == r) {
            var f = JSON.parse(localStorage.getItem("lastestSession")),
              x = 0;
            (null != s || null != s) && (x = s.length);
            var d = {
              title: f.title,
              image: $("#home-section")
                .children("ul")
                .children("li")
                .eq(f.index)
                .find("img")
                .attr("src"),
              index: f.index,
              windex: 0,
              eindex: x,
              sindex: 0,
            };
            localStorage.setItem("lastestSession", JSON.stringify(d));
            var v = '<li exercise="1" id="item' + x + '"><div>';
            ((v +=
              '<div class="en-story"><div class="faq-list-section"><div class="index-alphabet-item">' +
              a +
              "</div>" +
              y +
              "</div></div>"),
              (v += "</div></li>"),
              $("#category-section")
                .children(".section")
                .children(".container")
                .append(v));
          }
        }
        setTimeout(function () {
          for (var e = 1; e < u.length; e++) {
            var t = u[e].en,
              n = u[e].story;
            ($("#item" + x)
              .find(".en-story")
              .append(
                '<div class="faq-list-section"><div class="index-alphabet-item">' +
                  t +
                  "</div>" +
                  n +
                  "</div></div>",
              ),
              e == u.length - 1 &&
                $("#item" + x)
                  .find(".en-story")
                  .append('<p class="answer-key-remove-after">&nbsp;</p>'));
          }
          $(".index-block-item li").click(function () {
            (0 < $("#idiom-tip-popup").length && $("#idiom-tip-popup").remove(),
              $("body").append(
                '<div id="idiom-tip-popup"><div id="close-idiom-tip-popup"><img src="icons/close-window-50.png" /></div><div id="idiom-tip-popup-cover">' +
                  $(this).children(".tool-index-idioms").html() +
                  "</div></div>",
              ),
              $("#idiom-tip-popup-cover")
                .find(".en-exam")
                .children(".arrow")
                .remove(),
              $("#divTempWord").remove(),
              0 == $("#divTempWord").length &&
                $("body").append(
                  '<div id="divTempWord" style="display:none">' +
                    $("#idiom-tip-popup-cover").find(".en-word").html() +
                    "</div>",
                ),
              $("#idiom-tip-popup-cover")
                .find(".en-desc")
                .prepend('<span class="arrow">\u2192</span> '),
              $("#divTempWord").find(".en-pron").remove());
            var e = $.trim($("#divTempWord").html()),
              t = JSON.parse(localStorage.getItem(e));
            (null != t &&
              "" != t.note &&
              $("#idiom-tip-popup-cover")
                .find(".en-desc")
                .append(
                  '<div class="word-note-cover">' +
                    t.note.replace(/\n/g, "<br/>") +
                    "</div>",
                ),
              $("#idiom-tip-popup").find(".word-image").remove(),
              $("#close-idiom-tip-popup img").click(function () {
                $("#idiom-tip-popup").remove();
              }));
          });
        }, 200);
      } else
        for (var r = 0; r < u.length; r++) {
          var a = u[r].en,
            y = u[r].story;
          if (0 == r) {
            var f = JSON.parse(localStorage.getItem("lastestSession")),
              x = 0;
            (null != s || null != s) && (x = s.length);
            var d = {
              title: f.title,
              image: $("#home-section")
                .children("ul")
                .children("li")
                .eq(f.index)
                .find("img")
                .attr("src"),
              index: f.index,
              windex: 0,
              eindex: x,
              sindex: 0,
            };
            localStorage.setItem("lastestSession", JSON.stringify(d));
            var v = '<li exercise="1" id="item' + x + '"><div>';
            ((v +=
              '<div class="en-story"><div class="exercise-section-red">' +
              a +
              '</div><div class="faq-list-section" title="' +
              a +
              '">' +
              y +
              "</div></div>"),
              (v += "</div></li>"),
              $("#category-section")
                .children(".section")
                .children(".container")
                .append(v),
              $(".index-block-item li").click(function () {
                (0 < $("#idiom-tip-popup").length &&
                  $("#idiom-tip-popup").remove(),
                  $("body").append(
                    '<div id="idiom-tip-popup"><div id="close-idiom-tip-popup"><img src="icons/close-window-50.png" /></div><div id="idiom-tip-popup-cover">' +
                      $(this).children(".tool-index-idioms").html() +
                      "</div></div>",
                  ),
                  $("#idiom-tip-popup").find(".word-image").remove(),
                  $("#close-idiom-tip-popup img").click(function () {
                    $("#idiom-tip-popup").remove();
                  }));
              }));
          } else
            "Answer Key" == a
              ? $("#item" + x)
                  .find(".en-story")
                  .append(
                    '<div id="exercise-answer-key"><div class="exercise-section">' +
                      a +
                      '</div><div class="faq-list-section" title="' +
                      a +
                      '">' +
                      y +
                      "</div><p>&nbsp;</p></div></div>",
                  )
              : $("#item" + x)
                  .find(".en-story")
                  .append(
                    '<div class="exercise-section-red">' +
                      a +
                      '</div><div class="faq-list-section" title="' +
                      a +
                      '">' +
                      y +
                      "</div></div>",
                  );
          r == u.length - 1 &&
            ("" == a
              ? $("#item" + x)
                  .find(".en-story")
                  .append('<p class="answer-key-remove-after">&nbsp;</p>')
              : ($("#item" + x)
                  .find(".en-story")
                  .append(
                    '<div class="exercise-section-red-answer-key">Answer Key</div><p class="answer-key-remove-after">&nbsp;</p>',
                  ),
                $(".exercise-section-red-answer-key").click(function () {})));
        }
    var b = JSON.parse(sessionStorage.getItem(e)).reading;
    if (null != b) {
      var x = 0;
      ((null != s || null != s) && (x = s.length),
        (null != u || null != u) && (x = s.length + 1));
      var v =
        '<li  story="1" remainAudioLoop="' +
        remainAudioLoop +
        '" id="item' +
        x +
        '"><div></div></li>';
      if (
        ($("#category-section")
          .children(".section")
          .children(".container")
          .append(v),
        null != s || null != s)
      ) {
        $("#item" + x)
          .children("div")
          .append(
            '<div id="vocabulary-block" class="box_shadow_yt_iframe seg-block"><div class="wordlist-rotate">New Words</div><ul class="wordlist"></ul></div>',
          );
        for (var r = 0; r < s.length; r++) {
          var o = s[r].en.substring(0, 1),
            a = s[r].en,
            l = s[r].vi,
            c = s[r].pron,
            p = s[r].desc,
            h = s[r].exam,
            m = s[r].image,
            w = s[r].sound,
            v =
              '<li word="' +
              a +
              '" pron="' +
              c +
              '" desc="' +
              p +
              '" exam="' +
              h +
              '" sound="' +
              w +
              '">';
          ((v += '<div class="wordlist-cover">'),
            (v +=
              '<div class="en-word"><b>' +
              a +
              '</b> <span class="en-pron">' +
              c +
              '</span> <img source="data/' +
              e.replace(/ /g, "-") +
              "/wordlist/" +
              w +
              '"  title="' +
              a +
              '"  idx="' +
              x +
              '" class="wordlist-sound speaker-louder" src="icons/speaker_louder.png" /></div>'));
          var g = JSON.parse(localStorage.getItem(a));
          ((v +=
            null == g
              ? '<div class="en-desc" style="display:none"></div>'
              : "" == g.note
                ? '<div class="en-desc"><span class="arrow">\u2192</span> ' +
                  p +
                  ' <img src="icons/note_app.jpg" word="' +
                  a +
                  '" windex="' +
                  r +
                  '" onclick="wordnote($(this))" class="word-note" /></div>'
                : '<div class="en-desc"><span class="arrow">\u2192</span> ' +
                  p +
                  ' <img src="icons/note_app.jpg" word="' +
                  a +
                  '" windex="' +
                  r +
                  '" onclick="wordnote($(this))" class="word-note" /><div class="word-note-cover">' +
                  g.note.replace(/\n/g, "<br/>") +
                  "</div></div>"),
            (v += '<div class="en-exam">' + h + "</div>"),
            (v += "</div>"),
            (v += "</li>"),
            $("#vocabulary-block").find(".wordlist").append(v));
        }
        ($(".speaker-louder").unbind("click"),
          $(".speaker-louder").click(function () {
            autoPlay = !0;
            var e = $(this).attr("source");
            ((currentReadingIndex = $(this).attr("idx")),
              playSound(currentReadingIndex, e),
              $("#nav-story li")
                .eq(0)
                .children("span")
                .html($(this).attr("title")));
          }));
      }
      for (var r = 0; r < b.length; r++) {
        var k = b[r].type,
          a = b[r].en,
          l = b[r].vi,
          q = b[r].story,
          m = b[r].image,
          w = b[r].sound;
        switch (k.toLowerCase()) {
          case "story":
            var f = JSON.parse(localStorage.getItem("lastestSession")),
              d = {
                title: f.title,
                image: $("#home-section")
                  .children("ul")
                  .children("li")
                  .eq(f.index)
                  .find("img")
                  .attr("src"),
                index: f.index,
                windex: 0,
                eindex: f.eindex,
                sindex: x,
              };
            localStorage.setItem("lastestSession", JSON.stringify(d));
            var v = '<h3 class="h3-story-title">' + a + "</h3>";
            ((v += '<div class="en-story">' + q + "</div>"),
              (v +=
                '<div style="text-align:center; padding-top:20px; width:100%; display:none"><div class="counter reading"><div></div></div><div style="clear:both"></div></div>'),
              $("#item" + x)
                .children("div")
                .append('<div id="story-block">' + v + "</div>"),
              "" != w &&
                $("#item" + x).attr(
                  "source",
                  "data/" + e.replace(/ /g, "-") + "/reading/" + w + "",
                ),
              $(".idiom-tip").click(function () {
                (0 < $("#idiom-tip-popup").length &&
                  $("#idiom-tip-popup").remove(),
                  $("body").append(
                    '<div id="idiom-tip-popup"><div id="close-idiom-tip-popup"><img src="icons/close-window-50.png" /></div><div id="idiom-tip-popup-cover">' +
                      $("#item" + $(this).attr("idx")).html() +
                      "</div></div>",
                  ),
                  $("#idiom-tip-popup").find(".word-image").remove(),
                  $("#close-idiom-tip-popup img").click(function () {
                    $("#idiom-tip-popup").remove();
                  }));
              }));
            break;
          case "idiom":
            $("#story-block")
              .find(".en-story")
              .append(
                '<div class="todays-idiom-section"><fieldset><legend>Today\u2019s Idiom</legend>' +
                  q +
                  "</fieldset></div>",
              );
            break;
          case "faq":
            $("#story-block")
              .find(".en-story")
              .append(
                '<div class="faq-list-section" title="' +
                  a +
                  '">' +
                  q +
                  "</div>",
              );
            break;
          case "answer key":
            ($("#story-block")
              .find(".en-story")
              .append(
                '<div id="reading-answer-key"><div class="reading-comprehension-section">' +
                  a +
                  '</div><div class="faq-list-section" title="' +
                  a +
                  '">' +
                  q +
                  "</div></div>",
              ),
              $("#story-block")
                .find(".en-story")
                .append(
                  '<div class="reading-section-red-answer-key">Answer Key</div><p class="reading-answer-key-remove-after">&nbsp;</p>',
                ),
              $(".reading-section-red-answer-key").click(function () {
                (readFlag(),
                  $("#reading-answer-key").find(".answer-key-only").html(""),
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
                      ("Sample & Definitions" != $(this).attr("title") &&
                        "" != $(this).attr("title") &&
                        $("#reading-answer-key table").append(
                          '<tr><td colspan="3" style="font-weight:bold; text-align:left; text-transform:uppercase">' +
                            $(this).attr("title") +
                            "</td></tr>",
                        ),
                        $(this)
                          .children("ol")
                          .each(function (e) {
                            var t = 1;
                            (null != $(this).attr("start") &&
                              (t = parseInt($(this).attr("start"))),
                              $("#reading-answer-key table").append(
                                '<tr><td></td><td colspan="2">' +
                                  $(this).parent().children("h4").eq(e).html() +
                                  "</td></tr>",
                              ),
                              $(this)
                                .children(".answer-the-questions-section")
                                .each(function () {
                                  ($("#divAnswerKeyCover").remove(),
                                    0 == $("#divAnswerKeyCover").length &&
                                      $("body").append(
                                        '<div id="divAnswerKeyCover" style="display:none"><div></div><div></div></div>',
                                      ));
                                  var e = $(this)
                                    .attr("answer-index")
                                    .split(",");
                                  if (1 < e.length)
                                    for (var n = 0; n < e.length; n++)
                                      ($("#divAnswerKeyCover")
                                        .children("div")
                                        .eq(0)
                                        .append(
                                          $(this)
                                            .children(".ul-multi-choose-answer")
                                            .children("li")
                                            .eq(e[n])
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
                                              .eq(e[n])
                                              .html() + "<br/>",
                                          ));
                                  var d = $(this)
                                    .children(".ul-choose-answer")
                                    .children("li")
                                    .eq($(this).attr("answer-index"));
                                  ($("#divAnswerKeyCover")
                                    .children("div")
                                    .eq(0)
                                    .html(d.html()),
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
                                        $(this)
                                          .children("input")
                                          .attr("checked") &&
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
                                  var r = $.trim(
                                      $("#divAnswerKeyCover")
                                        .children("div")
                                        .eq(0)
                                        .html()
                                        .replace("____", ""),
                                    ),
                                    o = $.trim(
                                      $("#divAnswerKeyCover")
                                        .children("div")
                                        .eq(1)
                                        .html()
                                        .replace("____", ""),
                                    );
                                  (r == o
                                    ? $("#reading-answer-key table").append(
                                        '<tr style="background:#1EA362; color:white"><td>' +
                                          t +
                                          "</td><td>" +
                                          r +
                                          "</td><td>" +
                                          o +
                                          "</td></tr>",
                                      )
                                    : $("#reading-answer-key table").append(
                                        "<tr><td>" +
                                          t +
                                          '</td><td style="background:#1EA362; color:white">' +
                                          r +
                                          '</td><td style="background:#D9433D; color:white">' +
                                          o +
                                          "</td></tr>",
                                      ),
                                    (t += 1));
                                }),
                              $(this)
                                .children(".answer-the-questions-section-char")
                                .each(function () {
                                  ($("#divAnswerKeyCover").remove(),
                                    0 == $("#divAnswerKeyCover").length &&
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
                                  i == n
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
                                  (i == n
                                    ? $("#reading-answer-key table").append(
                                        '<tr style="background:#1EA362; color:white"><td>' +
                                          t +
                                          "</td><td>" +
                                          i +
                                          "</td><td>" +
                                          n +
                                          "</td></tr>",
                                      )
                                    : $("#reading-answer-key table").append(
                                        "<tr><td>" +
                                          t +
                                          '</td><td style="background:#1EA362; color:white">' +
                                          i +
                                          '</td><td style="background:#D9433D; color:white">' +
                                          n +
                                          "</td></tr>",
                                      ),
                                    (t += 1));
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
                                }));
                          }),
                        $(this)
                          .children(".word-blank-cover")
                          .each(function (e) {
                            var t = $(this).attr("h4index");
                            (null != t && (e = t),
                              $("#reading-answer-key table").append(
                                '<tr><td></td><td colspan="2" style="font-weight:bold;">' +
                                  $(this).parent().children("h4").eq(e).html() +
                                  "</td></tr>",
                              ),
                              $(this)
                                .find(
                                  ".answer-the-questions-section-word-blank",
                                )
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
                                    ? $("#reading-answer-key table").append(
                                        '<tr style="background:#1EA362; color:white"><td>' +
                                          (e + 1) +
                                          "</td><td>" +
                                          i +
                                          "</td><td>" +
                                          n +
                                          "</td></tr>",
                                      )
                                    : $("#reading-answer-key table").append(
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
                            (null != t && (e = t),
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
                          .children(".word-free-cover")
                          .each(function (e) {
                            var t = $(this).attr("h4index");
                            (null != t && (e = t),
                              $("#reading-answer-key table").append(
                                '<tr><td></td><td colspan="2">' +
                                  $(this).parent().children("h4").eq(e).html() +
                                  "</td></tr>",
                              ),
                              $(this)
                                .find(".answer-the-questions-word-free")
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
                                        $(this)
                                          .children(".txt-input-answer")
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
                                    ? $("#reading-answer-key table").append(
                                        '<tr style="background:#1EA362; color:white"><td>' +
                                          (e + 1) +
                                          "</td><td>" +
                                          i +
                                          "</td><td>" +
                                          n +
                                          "</td></tr>",
                                      )
                                    : $("#reading-answer-key table").append(
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
                  $("#reading-answer-key").append("<p>&nbsp;</p>"),
                  $("#reading-answer-key").css({ display: "block" }),
                  0 < $("#vocabulary-block").length &&
                    $("#vocabulary-block")
                      .children(".wordlist")
                      .children("li")
                      .each(function () {
                        var e = JSON.parse(
                          localStorage.getItem($(this).attr("word")),
                        );
                        if (null == e) {
                          var t = {};
                          ((t.note = ""),
                            localStorage.setItem(
                              $(this).attr("word"),
                              JSON.stringify(t),
                            ),
                            $(this)
                              .find(".en-desc")
                              .html(
                                '<span class="arrow">\u2192</span> ' +
                                  $(this).attr("desc") +
                                  ' <img word="' +
                                  $(this).attr("word") +
                                  '" windex="' +
                                  $(this).index() +
                                  '" onclick="wordnote($(this))" src="icons/note_app.jpg" class="word-note" />',
                              ),
                            $("#item" + $(this).index())
                              .find(".en-desc")
                              .html(
                                '<span class="arrow">\u2192</span> ' +
                                  $(this).attr("desc") +
                                  ' <img word="' +
                                  $(this).attr("word") +
                                  '" windex="' +
                                  $(this).index() +
                                  '" onclick="wordnote($(this))" src="icons/note_app.jpg" class="word-note" />',
                              ));
                        } else
                          "" == e.note
                            ? ($(this)
                                .find(".en-desc")
                                .html(
                                  '<span class="arrow">\u2192</span> ' +
                                    $(this).attr("desc") +
                                    ' <img word="' +
                                    $(this).attr("word") +
                                    '" src="icons/note_app.jpg" windex="' +
                                    $(this).index() +
                                    '" onclick="wordnote($(this))" class="word-note" />',
                                ),
                              $("#item" + $(this).index())
                                .find(".en-desc")
                                .html(
                                  '<span class="arrow">\u2192</span> ' +
                                    $(this).attr("desc") +
                                    ' <img word="' +
                                    $(this).attr("word") +
                                    '" src="icons/note_app.jpg" windex="' +
                                    $(this).index() +
                                    '" onclick="wordnote($(this))" class="word-note" />',
                                ))
                            : ($(this)
                                .find(".en-desc")
                                .html(
                                  '<span class="arrow">\u2192</span> ' +
                                    $(this).attr("desc") +
                                    ' <img word="' +
                                    $(this).attr("word") +
                                    '" src="icons/note_app.jpg" windex="' +
                                    $(this).index() +
                                    '" onclick="wordnote($(this))" class="word-note" /><div class="word-note-cover">' +
                                    e.note.replace(/\n/g, "<br/>") +
                                    "</div>",
                                ),
                              $("#item" + $(this).index())
                                .find(".en-desc")
                                .html(
                                  '<span class="arrow">\u2192</span> ' +
                                    $(this).attr("desc") +
                                    ' <img word="' +
                                    $(this).attr("word") +
                                    '" src="icons/note_app.jpg" windex="' +
                                    $(this).index() +
                                    '" onclick="wordnote($(this))" class="word-note" /><div class="word-note-cover">' +
                                    e.note.replace(/\n/g, "<br/>") +
                                    "</div>",
                                ));
                        ($(this).find(".en-desc").css({ display: "" }),
                          $("#item" + $(this).index())
                            .find(".en-desc")
                            .css({ display: "" }));
                      }));
              }));
        }
      }
    }
    (replaceChooseAnswer2(),
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
  (0 < $("#idiom-tip-popup").length && $("#idiom-tip-popup").remove(),
    (currentReadingIndex = e),
    swipeWindow(),
    (elm_index = e),
    (hold = !1),
    (next = 0),
    setTimeout(function () {
      (playSound(
        currentReadingIndex,
        $("#item" + currentReadingIndex).attr("source"),
      ),
        focusReading(currentReadingIndex));
    }, 1e3));
}
function playSound(t, e) {
  (clearInterval(audioInterval), (currentReadingIndex = t));
  if (!0 == isExercise()) {
    var i = JSON.parse(localStorage.getItem("lastestSession"));
    $("#bottom-section").css({ display: "block" });
    var n = $("#tbl-last-session" + (parseInt(i.index) + 1));
    if (0 < n.length) {
      var i = JSON.parse(localStorage.getItem("lastestSession")),
        d = n.parent().attr("en");
      0 < i.sindex
        ? $("#bottom-section")
            .children(".container")
            .html(
              '<ul id="nav-exercise"><li>New Words</li><li>Reading</li><li style="color:yellow">' +
                d +
                "</li></ul>",
            )
        : $("#bottom-section")
            .children(".container")
            .html(
              '<ul id="nav-exercise"><li style="width:0%"></li><li style="width:0%"></li><li  style="width: calc(100% - 10px); text-align:center; padding-left:5px; padding-right:5px; color:yellow">' +
                d +
                "</li></ul>",
            );
    } else
      $("#bottom-section")
        .children(".container")
        .html(
          '<div class="app-name">\u201CBarron\'s 1100 Words You Need to Know\u201D</div > <div class="app-slogan">Sixth Edition</div>',
        );
    ($("#nav-exercise")
      .children("li")
      .eq(2)
      .click(function () {
        var e = JSON.parse(localStorage.getItem("lastestSession")),
          t = $("#tbl-last-session" + (parseInt(e.index) + 1));
        if (0 < t.length) {
          var i = t.parent().attr("en");
          isNaN(parseInt(t.parent().attr("wl")))
            ? showCategorySection(i, parseInt(e.index) + 1, 0)
            : showCategorySection(
                i,
                parseInt(e.index) + 1,
                parseInt(t.parent().attr("wl")) + 1,
              );
        }
      }),
      $("#nav-exercise")
        .children("li")
        .eq(1)
        .click(function () {
          (panLeft(),
            panEnd(110),
            setTimeout(function () {
              var e = $("#item" + currentReadingIndex).children("div");
              e.animate({ scrollTop: 0 });
            }, 200));
        }),
      $("#nav-exercise")
        .children("li")
        .eq(0)
        .click(function () {
          ($("#bottom-section").css({ display: "none" }),
            playSeeking(0),
            setTimeout(function () {
              var e = $("#item" + currentReadingIndex).children("div");
              e.animate({ scrollTop: 0 });
            }, 200));
        }),
      scaleFontSizeIndexToolTips());
  } else if (!0 == isStory()) {
    var i = JSON.parse(localStorage.getItem("lastestSession"));
    $("#bottom-section").css({ display: "block" });
    var n = $("#tbl-last-session" + (parseInt(i.index) + 1));
    if (0 < n.length) {
      var i = JSON.parse(localStorage.getItem("lastestSession")),
        d = n.parent().attr("en");
      0 < i.sindex
        ? $("#bottom-section")
            .children(".container")
            .html(
              '<ul id="nav-story"><li style="width:40%; display:none" source="' +
                e +
                '"><img class="audio-play" status="1" src="icons/pause.png" /><span style="margin-left:5px; position:relative; top:-23px"></span></li><li>New Words</li><li style="color:yellow; width:calc(65% - 20px); padding-left:10px; padding-right:10px">' +
                d +
                "</li></ul>",
            )
        : $("#bottom-section")
            .children(".container")
            .html(
              '<ul id="nav-story"><li style="width:0%"></li><li style="width:0%"></li><li  style="width: calc(100% - 10px); text-align:center; padding-left:5px; padding-right:5px; color:yellow">' +
                d +
                "</li></ul>",
            );
    } else
      $("#bottom-section")
        .children(".container")
        .html(
          '<div class="app-name">\u201CBarron\'s 1100 Words You Need to Know\u201D</div > <div class="app-slogan">Sixth Edition</div>',
        );
    ($("#nav-story")
      .children("li")
      .eq(0)
      .click(function () {
        1 ==
        parseInt(
          $("#nav-story").children("li").eq(0).children("img").attr("status"),
        )
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
        .click(function () {
          ($(".exercise-section-red-answer-key").remove(),
            $("#bottom-section").css({ display: "none" }),
            elm.pause());
          var e = $("#item" + currentReadingIndex).children("div");
          (e.animate({ scrollTop: 0 }), playSeeking(0));
        }),
      $("#nav-story")
        .children("li")
        .eq(2)
        .click(function () {
          elm.pause();
          var e = JSON.parse(localStorage.getItem("lastestSession")),
            t = $("#tbl-last-session" + (parseInt(e.index) + 1));
          if (0 < t.length) {
            var i = t.parent().attr("en");
            !1 == checkUnitOpened(i)
              ? showAdsForNextLesson(
                  i,
                  parseInt(e.index) + 1,
                  parseInt(t.parent().attr("wl")),
                )
              : (!0 == showAds() &&
                  JSBridge.LoadStoryAnswerKeyVideoAds(
                    i + " loaded. Check it out!",
                  ),
                showCategorySection(
                  i,
                  parseInt(e.index) + 1,
                  parseInt(t.parent().attr("wl")),
                ));
          }
        }));
  } else {
    var i = JSON.parse(localStorage.getItem("lastestSession"));
    $("#bottom-section").css({ display: "block" });
    var n = $("#tbl-last-session" + (parseInt(i.index) + 1));
    if (0 < n.length) {
      var d = n.parent().attr("en");
      $("#bottom-section")
        .children(".container")
        .html(
          '<ul id="nav-wordlist"><li style="display:none">Exercise</li><li>Reading</li><li style="color:yellow; width:calc(65% - 20px); padding-left:10px;">' +
            d +
            "</li></ul>",
        );
    } else
      $("#bottom-section")
        .children(".container")
        .html(
          '<ul id="nav-wordlist"><li>Exercise</li><li>Story</li><li>INDEX</li></ul>',
        );
    ($("#nav-wordlist")
      .children("li")
      .eq(0)
      .click(function () {
        ($("#bottom-section").css({ display: "none" }),
          clearTimeout(nextTimeOut),
          clearTimeout(loopTimeOut),
          clearTimeout(autoNextTimeOut),
          elm.pause(),
          playSeeking(20));
      }),
      $("#nav-wordlist")
        .children("li")
        .eq(1)
        .click(function () {
          ($(".exercise-section-red-answer-key").remove(),
            $("#bottom-section").css({ display: "none" }),
            clearTimeout(nextTimeOut),
            clearTimeout(loopTimeOut),
            clearTimeout(autoNextTimeOut),
            elm.pause());
          var e = JSON.parse(localStorage.getItem("lastestSession"));
          playSeeking(e.sindex);
          var t = $("#item" + currentReadingIndex).children("div");
          (t.animate({ scrollTop: 0 }, 0),
            setTimeout(function () {
              $("html, body").animate(
                { scrollTop: $("#story-block").offset().top - 70 },
                400,
              );
            }, 0));
        }),
      $("#nav-wordlist")
        .children("li")
        .eq(2)
        .click(function () {
          (clearTimeout(nextTimeOut),
            clearTimeout(loopTimeOut),
            clearTimeout(autoNextTimeOut),
            elm.pause());
          var e = JSON.parse(localStorage.getItem("lastestSession")),
            t = $("#tbl-last-session" + (parseInt(e.index) + 1));
          if (0 < t.length) {
            var i = t.parent().attr("en");
            !1 == checkUnitOpened(i)
              ? showAdsForNextLesson(
                  i,
                  parseInt(e.index) + 1,
                  parseInt(t.parent().attr("wl")),
                )
              : (!0 == showAds() &&
                  JSBridge.LoadStoryAnswerKeyVideoAds(
                    i + " loaded. Check it out!",
                  ),
                showCategorySection(
                  i,
                  parseInt(e.index) + 1,
                  parseInt(t.parent().attr("wl")),
                ));
          }
        }));
  }
  ($("#item" + t)
    .find(".reading")
    .unbind("click"),
    e != null &&
      ((elm.src = e),
      (elm.onloadedmetadata = function () {
        (localStorage.setItem("currentIndex", currentReadingIndex),
          !0 == autoPlay ? elm.play() : (autoPlay = !0));
      }),
      (elm.onended = function () {
        !0 == isStory() &&
          ($("#nav-story")
            .children("li")
            .eq(0)
            .children("img")
            .attr("status", 0),
          $("#nav-story")
            .children("li")
            .eq(0)
            .children("img")
            .attr("src", "icons/play.png"));
        var e = parseInt(
          $("#item" + currentReadingIndex).attr("remainAudioLoop"),
        );
        0 < e
          ? (loopTimeOut = setTimeout(function () {
              ($("#item" + currentReadingIndex).attr("remainAudioLoop", e - 1),
                playSound(
                  currentReadingIndex,
                  $("#item" + currentReadingIndex)
                    .find(".reading")
                    .parent()
                    .parent()
                    .attr("source"),
                ),
                clearTimeout(nextTimeOut),
                clearTimeout(loopTimeOut),
                clearTimeout(autoNextTimeOut));
            }, 2e3))
          : (clearTimeout(nextTimeOut),
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
                nextWordReading());
            }, 200)));
      })));
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
  localStorage.removeItem(
    $("#section-section").find(".title").html().toLowerCase(),
  );
  var e = localStorage.getItem(
    $("#section-section").find(".title").html().toLowerCase(),
  );
  if (null == e) {
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
function showAdsForNextLesson(e, t, i) {
  ($(".exercise-section-red-answer-key").remove(),
    $(document).off("click"),
    0 == $(".exercise-section-red-answer-key").length &&
      $("body").append(
        '<div class="exercise-section-red-answer-key" opened="1">Watch an AD to open new lesson: ' +
          e.toUpperCase() +
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
        JSBridge.LoadStoryAnswerKeyVideoAds(
          e.toUpperCase() + " loaded. Check it out!",
        ),
        showCategorySection(e, t, i),
        $(".exercise-section-red-answer-key").remove());
    }),
    setTimeout(function () {
      ($(document).on("click", function (t) {
        0 === $(t.target).closest(".exercise-section-red-answer-key").length &&
          $(".exercise-section-red-answer-key").attr("opened") != null &&
          $(".exercise-section-red-answer-key").remove();
      }),
        $(document).on("touchstart", function (t) {
          0 ===
            $(t.target).closest(".exercise-section-red-answer-key").length &&
            $(".exercise-section-red-answer-key").attr("opened") != null &&
            $(".exercise-section-red-answer-key").remove();
        }));
    }, 300));
}
function checkUnitOpened(e) {
  var t = localStorage.getItem(e.toLowerCase());
  return null != t;
}
function nextWordReading() {
  var e = JSON.parse(localStorage.getItem("settings"));
  null != e &&
    !0 == e.next &&
    (nextTimeOut = setTimeout(function () {
      (panLeft(), panEnd(110));
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
        display: "none",
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
    $("#home-section").attr("top", n);
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
    $(".en-word").css("font-size", 300 * t + "%");
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
      (120 > i && (i = 120), $(".en-story-title").css("font-size", i + "%"));
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
    resizeUsageTipsSeg());
}
function scaleFontSizeIndexToolTips() {
  ($(".tool-index-idioms")
    .find(".en-word")
    .each(function () {
      var e = $(window).width() * $(window).height(),
        t = Math.sqrt(e) / Math.sqrt(786432);
      $(this).css("font-size", 300 * t + "%");
    }),
    resizeUsageTipsSeg());
}
function swipeWindow() {
  ($("#category-section")
    .find(".container")
    .children("li")
    .each(function () {
      $(this).css({ width: $(window).width() - 20 });
    }),
    (elm_length = $("#category-section")
      .find(".container")
      .children("li").length));
  for (var e = 0; e < elm_length; e++)
    $("#item" + e).css({ position: "fixed", left: -$(window).width() });
  (1 == $("#item" + currentReadingIndex).attr("story") ||
  1 == $("#item" + currentReadingIndex).attr("exercise")
    ? ($("#item" + currentReadingIndex).attr("style", "width: 100%"),
      $("#item" + currentReadingIndex)
        .children("div")
        .attr("style", ""))
    : $("#item" + currentReadingIndex).css({ position: "fixed", left: 10 }),
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
        var e = $("#item" + $(this).index()).children("div");
        e.css({ height: "", width: "", "overflow-y": "", "overflow-x": "" });
        var t =
          $(window).height() -
          $(".header").height() -
          $("#bottom-section").height();
        (e.height() > t &&
          e.css({
            height: t,
            width: $("#item" + $(this).index()).width(),
            "overflow-y": "scroll",
            "overflow-x": "hidden",
            padding: 10,
          }),
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
    $(".answer-the-questions-section-word-blank").each(function () {
      var e = $(this).width() - $(this).children("span").width() - 5;
      (50 > e && (e = 50),
        $(this).children(".opt-fill-blank").css({ "max-width": e }));
    }));
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
        (e.height() > t &&
          e.css({
            height: t,
            width: $("#item" + $(this).index()).width() + 30,
          }),
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
function resizeExercise() {
  $("#category-section")
    .find(".container")
    .children("li")
    .each(function () {
      if (1 == $(this).attr("exercise")) {
        var e = $("#item" + $(this).index()).children("div");
        (e.css({ height: "", width: "" }), e.mCustomScrollbar("destroy"));
        var t =
          $(window).height() -
          $(".header").height() -
          $("#bottom-section").height();
        (e.height() > t
          ? (e.css({
              height: t,
              width: $("#item" + $(this).index()).width() + 30,
            }),
            e.mCustomScrollbar({
              theme: "dark",
              keyboard: { enable: !0 },
              documentTouchScroll: !0,
              mouseWheel: { scrollAmount: 60 },
              scrollButtons: { scrollAmount: 60 },
              keyboard: { scrollAmount: 45 },
            }))
          : e.mCustomScrollbar("destroy"),
          $(".mCSB_draggerContainer").css({ display: "none" }),
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
    ($(this).css({ "padding-top": 5 }),
      $(this).children("div").css({ width: "", float: "" }),
      $(this)
        .children("div")
        .css({
          "font-size": "13px",
          "font-style": "normal",
          "padding-top": 10,
          display: "inline-block",
          float: "left",
          "text-align": "left",
          "line-height": "17px",
        }),
      $(this).children("div").children("div").eq(0).css({ "padding-top": 5 }),
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
function loadLastSession() {
  try {
    var e = JSON.parse(localStorage.getItem("lastestSession"));
    if (null != e) {
      var t = "waiting",
        i = localStorage.getItem(e.title.toLowerCase());
      (null != i &&
        (!0 == $.parseJSON(i).read ? (t = "play") : (t = "reading")),
        $("#tbl-last-session" + e.index)
          .parent()
          .parent()
          .css({ display: "block" }),
        $("#tbl-last-session" + e.index)
          .parent()
          .parent()
          .parent()
          .attr("opened", "1"),
        $("html,body").animate(
          { scrollTop: $("#tbl-last-session" + e.index).offset().top - 100 },
          0,
        ),
        $("#home-section")
          .children("div")
          .eq(0)
          .css({ "padding-top": 15, "padding-bottom": 0 }),
        $("#word-list-session").click(function () {
          showCategorySection(e.title, e.index, 0);
        }),
        $("#img-last-session-unit").click(function () {
          var e = JSON.parse(localStorage.getItem("lastestSession"));
          showCategorySection(e.title, e.index, e.sindex);
        }),
        $("#exercise-lastest-session").click(function () {
          var e = JSON.parse(localStorage.getItem("lastestSession"));
          showCategorySection(e.title, e.index, e.eindex);
        }),
        $("#story-lastest-session, #story-lastest-session-play-button").click(
          function () {
            var e = JSON.parse(localStorage.getItem("lastestSession"));
            showCategorySection(e.title, e.index, e.sindex);
          },
        ),
        $("#reading-lastest-session").click(function () {
          var e = JSON.parse(localStorage.getItem("lastestSession"));
          showCategorySection(e.title, e.index, e.sindex);
          var t = $("#item" + currentReadingIndex).children("div");
          (t.animate({ scrollTop: 0 }, 0),
            setTimeout(function () {
              t.animate({ scrollTop: $("#story-block").offset().top - 70 });
            }, 0));
        }),
        resizeLastSession(),
        resizeUnitItem());
    } else
      ($("#tbl-last-session0").parent().parent().parent().attr("opened", "1"),
        $("#tbl-last-session0")
          .parent()
          .parent()
          .parent()
          .find(".section-cover")
          .attr("opened", "1"),
        $("#tbl-last-session0").parent().parent().css({ display: "block" }));
  } catch (e) {}
}
function resizeLastSession() {
  var e = $(window).width() - 130 - 40;
  (120 < e && (e = 120), $("#img-last-session-unit").css({ width: e }));
}
function resizeUnitItem() {
  var e =
    $("#home-section").children("ul").children("li").eq(0).width() - 130 - 20;
  (120 < e && (e = 120),
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
function setStoreLastSession(e, t, i) {
  var n = {
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
    sindex: i,
  };
  localStorage.setItem("lastestSession", JSON.stringify(n));
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
    0 < $(".word-blank-cover").length &&
      ("" == t && (t = e),
      $(".word-blank-cover")
        .find(".answer-the-questions-section-word-blank")
        .each(function () {
          ($(this).children(".opt-fill-blank").html("<option></option>"),
            $(this).children(".opt-fill-blank").append(t));
        })),
    $(".opt-fill-blank").change(function () {}),
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
function replaceChooseAnswer() {
  ($(".answer-the-questions-section .ul-choose-answer")
    .children("li")
    .each(function () {
      if (
        -1 < $(this).html().indexOf("_______________") ||
        -1 < $(this).html().indexOf("____________")
      ) {
        var e = $(this)
          .html()
          .replace(/_______________/gi, ' <input class="txt-input-answer" /> ')
          .replace(/____________/gi, ' <input class="txt-input-answer" /> ');
        $(this).html(e);
      } else {
        var e = $(this).html();
        $(this).html(
          '<input type="radio" name="rdo' +
            $(this).parent().parent().index() +
            $(this).parent().index() +
            '" /> ' +
            e,
        );
      }
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
          $(this).css({ color: "#1DA362", "font-weight": "bold" }));
      }),
    $(".answer-the-questions-section .ul-choose-answer-2-match")
      .children("li")
      .each(function () {
        var e = $(this).html();
        $(this).html('<input type="checkbox" /> ' + e);
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
    $(".txt-input-one-new-line").each(function () {
      var e = $(this)
        .html()
        .replace(
          /_____/g,
          ' <textarea class="txt-textarea-answer"></textarea> ',
        );
      $(this).html(e);
    }),
    $(".answer-the-questions-section").each(function () {
      var e = $(this)
        .html()
        .replace(/______________/g, ' <input class="txt-input-answer" /> ')
        .replace(/____________/g, ' <input class="txt-input-answer" /> ');
      $(this).html(e);
    }),
    $(".answer-the-questions-section-txt").each(function () {
      var e = $(this)
        .html()
        .replace(/_____________/g, ' <input class="txt-input-answer" /> ');
      $(this).html(e);
    }),
    $(".fill-in-the-blank").each(function () {
      var e = $(this)
        .html()
        .replace(/___________/g, ' <input class="txt-input-answer" /> ');
      $(this).html(e);
    }),
    $(".answer-the-questions-textarea").each(function () {
      var e = $(this)
        .html()
        .replace(
          /_____________/g,
          ' <textarea class="txt-textarea-long-answer"></textarea> ',
        );
      $(this).html(e);
    }),
    $(".answer-the-questions-section-char").each(function () {
      var e = $(this)
        .html()
        .replace(/______/g, ' <input class="txt-input-answer-char" /> ')
        .replace(/_/g, ' <input class="txt-input-answer-char" /> ');
      $(this).html(e);
    }),
    $(".answer-the-questions-match-pharse").each(function () {
      var e = $(this)
        .html()
        .replace(/______/g, ' <input class="txt-input-answer-char" /> ');
      $(this).html(e);
    }),
    $(".mark-true-false-rewrite").each(function () {
      var e = $(this)
        .html()
        .replace(/_____/, ' <input class="txt-input-answer-true-false" /> ')
        .replace(
          /_____________________________________________________/,
          ' <textarea class="txt-textarea-long-answer"></textarea> ',
        );
      $(this).html(e);
    }),
    resizeTextareaAnswer());
}
function resizeTextareaAnswer() {
  ($(".txt-textarea-long-answer").css({ width: "" }),
    330 > $(window).width() &&
      $(".txt-textarea-long-answer").css({ width: 250 }));
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
          d = $("#answer-popup div").eq(2).html().split("/"),
          s = parseInt(n[0]) + parseInt(d[0]);
        ((59 < i || s >= parseInt(n[1])) &&
          (clearInterval(answerTimerInterval),
          0 < parseInt(d[0]) &&
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
    e.parent().children(".word-note-cover").hide());
  var t = e.attr("word"),
    i = JSON.parse(localStorage.getItem(t)),
    n = "";
  if (null == i) {
    var d = {};
    ((d.note = ""), localStorage.setItem(t, JSON.stringify(d)));
  }
  null != i && i.note != null && (n = i.note);
  var s = e.attr("windex");
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
        s +
        '" class="note-button" value="Save" /> <input type="button" word="' +
        t +
        '" windex="' +
        s +
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
