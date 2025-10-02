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
  path = "/apps-data/illustrated-everyday-expressions-with-stories-2/",
  lsession = "lastestSession-" + path.split("/")[2],
  lsetting = "settings-" + path.split("/")[2],
  lfontSetting = "fontSize-" + path.split("/")[2];
function succeded(t, e, i) {
  e;
}
var intervalInit,
  audioTimeout,
  loadedTime = 0,
  ads = !1,
  countUnitLearned = 0;
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
            '<div class="app-name">illustrated Everyday Expressions</div><div class="app-slogan">with Stories 2</div>',
          ),
        $("#bottom-section").css({ display: "block" }),
        $("#idiom-tip-popup").length > 0 && $("#idiom-tip-popup").remove(),
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
    ? t > 100
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
    : t > 100
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
    ('<tr><td>Auto next</td><td><label class="switch"><input id="chkAuto" type="checkbox"><div class="slider round"></div></label></td></tr>',
      '<tr><td>Number of repeat</td><td><select id="optLoop"><option value="0">0</option><option value="1">1</option><option value="2">2</option><option value="3">3</option><option value="4">4</option><option value="5">5</option></select></td></tr>',
      "</table>",
      $(".font-size").append(
        '<div id="setting-container"><div><table><tr><td>Auto next</td><td><label class="switch"><input id="chkAuto" type="checkbox"><div class="slider round"></div></label></td></tr><tr><td>Number of repeat</td><td><select id="optLoop"><option value="0">0</option><option value="1">1</option><option value="2">2</option><option value="3">3</option><option value="4">4</option><option value="5">5</option></select></td></tr></table></div></div>',
      ),
      $("#setting-container").children("div").css({ padding: 10 }),
      $("#chkAuto, #optLoop").change(function () {
        var t = {
          next: $("#chkAuto").prop("checked"),
          loop: $("#optLoop").val(),
        };
        localStorage.setItem(lsetting, JSON.stringify(t));
      }));
  }
  var t = JSON.parse(localStorage.getItem(lsetting));
  ($("#optLoop").val(t.loop),
    1 == t.next
      ? $("#chkAuto").attr("checked", "checked")
      : $("#chkAuto").removeAttr("checked"));
}
function settings(t) {
  if (($("#setting-container").remove(), 1 == t)) {
    if (
      ($("#settings img").attr("src", "icons/close-window-50.png"),
      0 == $("#setting-container").length)
    ) {
      ('<tr><td>Auto next words</td><td><label class="switch"><input id="chkAuto" type="checkbox"><div class="slider round"></div></label></td></tr>',
        '<tr><td>Number of repeat</td><td><select id="optLoop"><option value="0">0</option><option value="1">1</option><option value="2">2</option><option value="3">3</option><option value="4">4</option><option value="5">5</option></select></td></tr>',
        "</table>",
        $("body").append(
          '<div id="setting-container"><div><table><tr><td>Auto next words</td><td><label class="switch"><input id="chkAuto" type="checkbox"><div class="slider round"></div></label></td></tr><tr><td>Number of repeat</td><td><select id="optLoop"><option value="0">0</option><option value="1">1</option><option value="2">2</option><option value="3">3</option><option value="4">4</option><option value="5">5</option></select></td></tr></table></div></div>',
        ),
        $("#setting-container").css({
          height: $(window).height(),
          width: 250,
          right: -300,
        }),
        $("#setting-container").children("div").css({ padding: 20 }),
        $("#chkAuto, #optLoop").change(function () {
          var t = {
            next: $("#chkAuto").prop("checked"),
            loop: $("#optLoop").val(),
          };
          localStorage.setItem(lsetting, JSON.stringify(t));
        }));
    }
    var e = JSON.parse(localStorage.getItem(lsetting));
    ($("#optLoop").val(e.loop),
      1 == e.next
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
  var t = $(window).width();
  ($("#container").css({ width: t }), $("#category-section").css({ width: t }));
}
function resizeHomeSection() {
  ($(window).height(),
    $(".header").height(),
    $("#bottom-section").height(),
    $(".header").css("height"),
    $("#home-section"));
}
function showCategorySection(t, e, i) {
  ((autoPlay = !1),
    $(".exercise-section-red-answer-key").length > 0 &&
      $(".exercise-section-red-answer-key").remove(),
    $(".show-ads-cover").length > 0 && $(".show-ads-cover").remove(),
    $(".font-size").attr("style", ""),
    $("#answer-popup").length > 0 &&
      ($("#answer-popup").remove(),
      clearInterval(answerTimerInterval),
      (answerTimerInterval = null)),
    $("#idiom-tip-popup").length > 0 && $("#idiom-tip-popup").remove(),
    setStoreLastSession(t, e, i),
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
    $("#section-section").children(".title").html(t),
    $("html,body").animate({ scrollTop: 0 }, 0),
    $("#home-section").css({ display: "none", opacity: "0" }),
    $("#category-section").css({ left: "", display: "block", opacity: "1" }),
    $("#home-section").attr("home", "0"));
  var n = JSON.parse(localStorage.getItem(lsetting));
  (null != n && (audioLoop = n.loop),
    (currentReadingIndex = i),
    (currentIndex = e),
    getSectionItem(t));
}
function getSectionItem(t) {
  if (null != sessionStorage[path.split("/")[2] + ":" + t]) {
    var e = JSON.parse(localStorage.getItem(lsetting));
    if (
      ((remainAudioLoop = null != e && e.loop > 0 ? e.loop : 0),
      null == localStorage.getItem(path.split("/")[2] + ":" + t.toLowerCase()))
    ) {
      (localStorage.setItem(
        path.split("/")[2] + ":" + t.toLowerCase(),
        JSON.stringify({ read: !1 }),
      ),
        $("#tbl-last-session" + currentIndex)
          .find("div")
          .eq(0)
          .attr("class", "reading"));
    }
    $("#category-section").children(".section").children(".container").html("");
    var i = JSON.parse(
      sessionStorage.getItem(path.split("/")[2] + ":" + t),
    ).wordlist;
    if (null != i || null != i) {
      $("#category-section")
        .children(".section")
        .children(".container")
        .append(
          '<div id="idioms-block" class="box_shadow_yt_iframe seg-block"><div class="wordlist-rotate">Idioms</div><ul class="wordlist"></ul></div>',
        );
      for (var n = 0; n < i.length; n++) {
        i[n].en.substring(0, 1);
        var o = i[n].en,
          s = (i[n].vi, i[n].pron, i[n].desc),
          a = i[n].exam,
          r = i[n].image,
          l = i[n].sound,
          d =
            '<li remainAudioLoop="' + remainAudioLoop + '" id="item' + n + '">';
        ((d +=
          '<div class="wordlist-image"><img class="speaker-louder" idx="' +
          n +
          '" source="data/' +
          urlFriendly(t) +
          "/wordlist/" +
          l +
          '" title="' +
          o +
          '" src="data/' +
          urlFriendly(t) +
          "/wordlist/" +
          r +
          '" /></div>'),
          (d += '<div class="wordlist-cover">'),
          (d +=
            '<div class="en-word">' +
            o +
            ' <span class="en-pron">= ' +
            s +
            '</span><img class="wordlist-sound speaker-louder" idx="' +
            n +
            '" source="data/' +
            urlFriendly(t) +
            "/wordlist/" +
            l +
            '" title="' +
            o +
            '" src="icons/speaker_louder.png" /></div>'),
          (d += '<div class="en-exam">' + a + "</div>"),
          (d += "</div>"),
          (d += "</li>"),
          $("#idioms-block").find(".wordlist").append(d),
          $("#item" + n).attr(
            "source",
            "data/" + urlFriendly(t) + "/wordlist/" + l,
          ),
          $("#item" + n).attr("title", o),
          $("#item" + n).attr("nid", n + 1));
      }
    } else readFlag();
    var c = JSON.parse(
      sessionStorage.getItem(path.split("/")[2] + ":" + t),
    ).exercise;
    if (null != c)
      if (
        ($("#category-section")
          .children(".section")
          .children(".container")
          .append(
            '<div id="exercise-block" class="box_shadow_yt_iframe seg-block"></div>',
          ),
        "index" == t.toLowerCase())
      ) {
        for (n = 0; n < 1; n++) {
          o = c[n].en;
          var h = c[n].story;
          if (0 == n) {
            d = "<div>";
            ((d +=
              '<div class="en-story"><div class="faq-list-section"><div class="index-alphabet-item">' +
              o +
              "</div>" +
              h +
              "</div></div>"),
              (d += "</div>"),
              $("#exercise-block").append(d));
          }
        }
        setTimeout(function () {
          for (var t = 1; t < c.length; t++) {
            var e = c[t].en,
              i = c[t].story;
            $("#exercise-block").append(
              '<div class="faq-list-section"><div class="index-alphabet-item">' +
                e +
                "</div>" +
                i +
                "</div></div>",
            );
          }
          $(".index-block-item li").click(function () {
            var t = $(this).children(".tool-index-idioms").html();
            ($(this).html('<div class="tool-index-idioms">' + t + "</div>"),
              $(this).css({ display: "table", margin: "20px 0px 20px 0px" }),
              $(this).children(".tool-index-idioms").find(".arrow").remove(),
              $(this)
                .children(".tool-index-idioms")
                .find(".en-pron")
                .html(
                  " = " +
                    $(this)
                      .children(".tool-index-idioms")
                      .find(".en-desc")
                      .html(),
                ),
              $(this).children(".tool-index-idioms").find(".en-desc").remove(),
              $(this)
                .children(".tool-index-idioms")
                .attr(
                  "style",
                  "display: table-cell;background:antiquewhite; padding:10px; border-radius:5px; color:black",
                ),
              scaleFontSize());
          });
        }, 200);
      } else {
        $("#category-section")
          .children(".section")
          .children(".container")
          .append('<div id="article-ads"></div>');
        for (n = 0; n < c.length; n++) {
          ((o = c[n].en), (h = c[n].story));
          ("Answer Key" == o
            ? $("#exercise-block").append(
                '<div id="exercise-answer-key"><div class="exercise-section">' +
                  o +
                  '</div><div title="' +
                  o +
                  '" class="faq-list-section">' +
                  h +
                  "</div></div></div>",
              )
            : $("#exercise-block").append(
                '<div class="voca-block-title">' +
                  o +
                  '</div><div title="' +
                  o +
                  '" class="faq-list-section">' +
                  h +
                  "</div></div>",
              ),
            n == c.length - 1 &&
              ("" != o
                ? ($("#exercise-block").append(
                    '<div class="exercise-section-red-answer-key">Answer Key</div><p style="display:none" class="answer-key-remove-after">&nbsp;</p>',
                  ),
                  $(".exercise-section-red-answer-key").click(function () {
                    ($("#exercise-answer-key").css({ display: "block" }),
                      $(".exercise-section-red-answer-key").css({
                        display: "none",
                      }));
                  }))
                : $("#exercise-block").append(
                    '<p style="display:none" class="answer-key-remove-after">&nbsp;</p>',
                  )));
        }
      }
    var p = JSON.parse(
      sessionStorage.getItem(path.split("/")[2] + ":" + t),
    ).reading;
    if (null != p) {
      $("#category-section")
        .children(".section")
        .children(".container")
        .append('<div id="story-block"></div>');
      for (n = 0; n < p.length; n++) {
        var m = p[n].type,
          u = ((o = p[n].en), p[n].vi, p[n].story);
        ((r = p[n].image), (l = p[n].sound));
        if ("story" == m) {
          d =
            '<div id="item' +
            (i.length + n) +
            '" story="1"  nid="' +
            (i.length + n + 1) +
            '" class="box_shadow_yt_iframe seg-block" source="data/' +
            urlFriendly(t) +
            "/reading/" +
            l +
            '" title="' +
            o +
            '" >';
          ((d +=
            '<div class="story-image"><img class="speaker-louder" idx="' +
            (i.length + n) +
            '" source="data/' +
            urlFriendly(t) +
            "/reading/" +
            l +
            '" title="' +
            o +
            '" story="1" src="data/' +
            urlFriendly(t) +
            "/reading/" +
            r +
            '" /></div>'),
            (d +=
              '<h3 class="h3-en-story-title">' +
              o +
              ' <img class="wordlist-sound speaker-louder" idx="' +
              (i.length + n) +
              '" source="data/' +
              urlFriendly(t) +
              "/reading/" +
              l +
              '" title="' +
              o +
              '" src="icons/speaker_louder.png" /></h3>'),
            o.indexOf("Dialog") > -1
              ? (d +=
                  '<div style="clear:both" class="en-story">' + u + "</div>")
              : (d += '<div class="en-story text-indent-para">' + u + "</div>"),
            (d += "</div>"),
            $("#story-block").append(d));
        } else
          "Answer Key" == o
            ? $("#story-block").append(
                '<div id="reading-answer-key"><div class="exercise-section">' +
                  o +
                  '</div><div class="faq-list-section">' +
                  u +
                  "</div></div>",
              )
            : $("#story-block").append(
                '<div class="reading-comprehension-section">Reading  Comprehension</div><div class="faq-list-section">' +
                  u +
                  "</div>",
              );
      }
    }
    (replaceChooseAnswer(),
      $(".idiom-tip").click(function () {
        ($("#idiom-tip-popup").length > 0 && $("#idiom-tip-popup").remove(),
          $("body").append(
            '<div id="idiom-tip-popup"><div style="display:none"><audio id="sound-tool-tip"></audio></div><div id="close-idiom-tip-popup"><img src="icons/close-window-50.png" /></div><div id="idiom-tip-popup-cover">' +
              $("#item" + $(this).attr("idx")).html() +
              "</div></div>",
          ),
          $("#idiom-tip-popup").find(".word-image").remove());
        var t = document.getElementById("sound-tool-tip");
        ($("#close-idiom-tip-popup img").click(function () {
          (t.pause(), $("#idiom-tip-popup").remove());
        }),
          $("#idiom-tip-popup-cover")
            .find(".speaker-louder")
            .click(function () {
              (clearTimeout(nextTimeOut),
                clearTimeout(loopTimeOut),
                clearTimeout(autoNextTimeOut));
              var e = $(this).attr("source");
              null != e &&
                (1 ==
                  parseInt(
                    $("#nav-story")
                      .children("li")
                      .eq(0)
                      .children("img")
                      .attr("status"),
                  ) && $("#nav-story").children("li").eq(0).trigger("click"),
                (t.src = e),
                (t.onloadedmetadata = function () {
                  t.play();
                }),
                (t.onended = function () {}));
            }));
      }),
      $(".counter").each(function () {
        $(this).css({
          "margin-left": ($(window).width() - $(this).width() - 20) / 2,
        });
      }),
      $(".speaker-louder").click(function () {
        (clearTimeout(nextTimeOut),
          clearTimeout(loopTimeOut),
          clearTimeout(autoNextTimeOut));
        var t = document.getElementById("sound-tool-tip");
        null != t && t.pause();
        var e = $(this).attr("source");
        ((currentReadingIndex = $(this).attr("idx")),
          (autoPlay = !0),
          playSound(currentReadingIndex, e),
          $("#nav-story li")
            .eq(0)
            .children("span")
            .html($(this).attr("title")));
      }),
      homeSectionResize(),
      scaleFontSize(),
      playSeeking(0));
    var g = window.location.hash.substring(1);
    if ("" != g) {
      var f = g.split("&");
      if (f.length > 1)
        switch (f[1].toLowerCase()) {
          case "idioms":
            $(window).scrollTop($("#idioms-block").offset().top - 60);
            break;
          case "story":
            $(window).scrollTop($("#story-block").offset().top - 60);
            break;
          case "practice":
            $(window).scrollTop($("#exercise-block").offset().top - 60);
        }
    }
  }
}
function playSeeking(t) {
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
  ((currentReadingIndex = t),
    (elm_index = t),
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
  (null != e &&
    ((elm.src = e),
    (elm.onloadedmetadata = function () {
      (localStorage.setItem("currentIndex", currentReadingIndex),
        $("#player-loading").remove(),
        1 == autoPlay ? elm.play() : (autoPlay = !0));
    }),
    (elm.onended = function () {
      ($("#nav-story").children("li").eq(0).children("img").attr("status", 0),
        $("#nav-story")
          .children("li")
          .eq(0)
          .children("img")
          .attr("src", "icons/play.png"),
        1 == isStory() && readFlag());
      var e = parseInt(
        $("#item" + currentReadingIndex).attr("remainAudioLoop"),
      );
      e > 0
        ? (loopTimeOut = setTimeout(function () {
            ($("#item" + currentReadingIndex).attr("remainAudioLoop", e - 1),
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
          }, 2e3)));
    })),
    $("#bottom-section").css({ display: "block" }));
  var i = JSON.parse(localStorage.getItem(lsession)),
    n = $("#tbl-last-session" + (parseInt(i.index) + 1)),
    o = n.parent().attr("en");
  (n.length > 0
    ? ($("#bottom-section")
        .children(".container")
        .html(
          '<ul id="nav-story"><li source="' +
            e +
            '"><img class="audio-play" status="0" src="icons/play.png" /><span style="margin-left:5px; position:relative; top:-23px">' +
            $("#item" + currentReadingIndex).attr("title") +
            '</span></li><li>Practice</li><li style="color:yellow">' +
            o +
            "</li></ul>",
        ),
      $("#nav-story")
        .children("li")
        .eq(0)
        .click(function () {
          var t = document.getElementById("sound-tool-tip");
          (null != t && t.pause(),
            $(".show-ads-cover").remove(),
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
          switch (($(".show-ads-cover").remove(), $(this).html())) {
            case "Idioms":
              $(window).scrollTop($("#idioms-block").offset().top - 60);
              break;
            case "Story":
              $(window).scrollTop($("#story-block").offset().top - 60);
              break;
            case "Practice":
              $(window).scrollTop($("#exercise-block").offset().top - 60);
          }
        }),
      $("#nav-story")
        .children("li")
        .eq(2)
        .click(function () {
          n.length > 0
            ? 0 == checkUnitOpened(o)
              ? showAdsForNextLesson(o, o, parseInt(i.index) + 1, 0)
              : (elm.pause(),
                (autoPlay = !1),
                1 == showAds() &&
                  JSBridge.LoadStoryAnswerKeyVideoAds(
                    o + " loaded. Check it out!",
                  ),
                showCategorySection(o, parseInt(i.index) + 1, 0))
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
      "" == $("#nav-story li").eq(0).children("span").html() &&
        $("#nav-story li")
          .eq(0)
          .children("span")
          .html($(".speaker-louder").eq(0).attr("title")))
    : $("#bottom-section")
        .children(".container")
        .html(
          '<div class="app-name">illustrated Everyday Expressions</div><div class="app-slogan">with Stories 2</div>',
        ),
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
  var t = JSON.parse(localStorage.getItem(lsession)),
    e = $("#tbl-last-session" + t.index)
      .parent()
      .attr("en");
  if (
    (localStorage.removeItem(path.split("/")[2] + ":" + e.toLowerCase()),
    null == localStorage.getItem(path.split("/")[2] + ":" + e.toLowerCase()))
  ) {
    localStorage.setItem(
      path.split("/")[2] + ":" + e.toLowerCase(),
      JSON.stringify({ read: !0 }),
    );
  }
  $("#tbl-last-session" + currentIndex)
    .find("div")
    .eq(0)
    .attr("class", "play");
}
function showAdsForNextLesson(t, e, i, n) {
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
        JSBridge.LoadStoryAnswerKeyVideoAds(e + " loaded. Check it out!"),
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
function checkUnitOpened(t) {
  return (
    null != localStorage.getItem(path.split("/")[2] + ":" + t.toLowerCase())
  );
}
function nextWordReading() {
  var t = JSON.parse(localStorage.getItem(lsetting));
  null != t &&
    1 == t.next &&
    (nextTimeOut = setTimeout(function () {
      null != $("#item" + currentReadingIndex).attr("nid") &&
        ((currentReadingIndex = $("#item" + currentReadingIndex).attr("nid")),
        $("#item" + currentReadingIndex).length > 0 &&
          $("#item" + currentReadingIndex).length > 0 &&
          $("html, body").animate(
            { scrollTop: $("#item" + currentReadingIndex).offset().top - 60 },
            {
              complete: function () {
                ($("#nav-story li")
                  .eq(0)
                  .children("span")
                  .html($("#item" + currentReadingIndex).attr("title")),
                  playSound(
                    currentReadingIndex,
                    $("#item" + currentReadingIndex).attr("source"),
                  ));
              },
            },
          ));
    }, 3e3));
}
function focusReading(t) {
  if (
    0 ==
    $("#item" + t)
      .find(".word-image")
      .find(".reading").length
  ) {
    $("#item" + next)
      .find(".word-image")
      .append("<div class='reading' style='position:absolute;'></div>");
    var e = $(window).width();
    $("#item" + t)
      .find(".word-image")
      .find(".reading")
      .css({
        width: (e - 20) / 2,
        height: "100%",
        top: 0,
        left: (e - (e - 20) / 2) / 2 - 10,
      });
  }
}
function homeScroll(t) {
  ($(window).scroll(function () {
    (parseInt($("#home-section").height()),
      $("#home-section").offset(),
      $(window).height());
    var t = parseInt($(this).scrollTop());
    if (($("#home-section").attr("top", t), $("#exercise-block").length > 0)) {
      var e = $("#exercise-block").position().top;
      $("#home-section").attr("vb", e - parseInt($(window).height()) - 150);
      var i = $("#story-block").position().top;
      (t >= e - parseInt($(window).height()) + 150 &&
        $("#bottom-section")
          .find("#nav-story")
          .children("li")
          .eq(1)
          .html("Story"),
        t >= i - parseInt($(window).height()) + 150 &&
          $("#bottom-section")
            .find("#nav-story")
            .children("li")
            .eq(1)
            .html("Idioms"),
        t < e - parseInt($(window).height()) + 150 &&
          $("#bottom-section")
            .find("#nav-story")
            .children("li")
            .eq(1)
            .html("Practice"));
    }
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
  var t = $(window).width() - 20;
  isMobile.any() || (t -= 18);
  var e,
    i = 320,
    n = Math.floor(t / i);
  (0 == n && (n = 1),
    (e = n > 2 ? 2 * (n - 1) * 10 : 10 * n),
    1 == n && (e = 0),
    (i = Math.floor((t - e) / n)),
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
        (($(this).index() > 0) & ($(this).index() % n == 0) &&
          $(this).css({ clear: "both" }),
          $(this).eq(n).css({ clear: "both" }),
          $(this).css({ width: i }),
          $(this).find("img").css({ width: i }));
      }),
    $(window).width() <= $(window).height()
      ? $(".counter").parent().css({ "padding-top": 20 })
      : $(".counter").parent().css({ "padding-top": 30 }),
    resizeHomeSection(),
    resizeUnitItem());
}
function scaleFontSize() {
  var t = 786432;
  ($(".en-word").each(function () {
    var e = $(window).width() * $(window).height();
    (Math.sqrt(e), Math.sqrt(t));
  }),
    $(".alphabet").each(function () {
      var e = $(window).width() * $(window).height(),
        i = 300 * (Math.sqrt(e) / Math.sqrt(t));
      $(".alphabet").css("font-size", i + "%");
    }),
    $(".en-story-title").each(function () {
      var e = $(window).width() * $(window).height(),
        i = 150 * (Math.sqrt(e) / Math.sqrt(t));
      i < 120 && (i = 120);
    }),
    $("#section-section")
      .children(".title")
      .css({ "max-width": $(window).width() - 80 }),
    resizeWordImage(),
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
        hImage >= 300 && (hImage = 300),
        hImage <= 120 && (hImage = 120),
        $(this).css({ height: hImage, width: hImage }),
        1 == parseInt($(this).attr("story")) &&
          ($(this).css({ "margin-top": "0px" }),
          hImage >= 220 && $(this).css({ height: 220, width: 220 }),
          hImage <= 120 && $(this).css({ height: 120, width: 120 }),
          $(this).parent().css({ float: "", "padding-right": "" }),
          $(window).width() < 600 &&
            $(this)
              .parent()
              .css({ float: "none", "padding-right": "initial" })));
    }),
    $(".wordlist-image")
      .find("img")
      .each(function () {
        ($(this).css({ margin: "8px 0px 0px 0px" }),
          $(this).css({ height: "", width: "" }));
        var t = 120;
        ($(window).width() < 400 && (t = 90),
          $(this).css({ height: t, width: t }),
          $(this)
            .parent()
            .parent()
            .find(".wordlist-cover")
            .css({
              "max-width":
                $("#category-section").width() - ($(this).width() + 70),
            }));
      }),
    $(".story-image")
      .find("img")
      .each(function () {
        ((hImage =
          $(window).height() -
          $(".en-word").height() -
          $(".vn-word").height() -
          $(".alphabet").height() -
          $("#bottom-section").height() -
          230),
          $(this).css({ margin: "0px 0px 10px 0px" }),
          hImage >= 150 && (hImage = 150),
          hImage <= 120 &&
            ((hImage = 120), $(this).css({ margin: "0px 0px 10px 0px" })),
          $(this).css({ height: hImage, width: hImage }),
          $(this).parent().css({ float: "", padding: "" }),
          $("#item" + currentReadingIndex)
            .find(".en-story-title")
            .css({ "padding-bottom": "" }),
          $(window).width() < 400 && (hImage = 120),
          hImage >= 250 && $(this).css({ height: 250, width: 250 }),
          hImage <= 120 && $(this).css({ height: 120, width: 120 }),
          $(window).width());
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
  for (var t = 0; t < elm_length; t++);
  1 == $("#item" + currentReadingIndex).attr("story") ||
    $("#item" + currentReadingIndex).attr("exercise");
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
        var t = $("#item" + $(this).index()).children("div");
        t.css({ height: "", width: "", "overflow-y": "", "overflow-x": "" });
        ($(window).height(),
          $(".header").height(),
          $("#bottom-section").height());
        (t.height(),
          $("#item" + $(this).index())
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
    $(window).width() < 500 &&
      ($(".story-image").attr("style", "float: none;padding-right: 0px;"),
      $(".h3-en-story-title").attr("style", "text-align:center"),
      $(".story-image img").attr("style", "width: 160px")));
}
function resizeUsageTipsSeg() {
  ($(".en-exam").each(function () {
    ($(this).css({ "padding-top": 5 }),
      $(this).children("div").css({ width: "", float: "" }),
      $(this)
        .children("div")
        .css({
          "font-style": "normal",
          display: "inline-block",
          float: "left",
          "text-align": "left",
        }),
      $(this).children("div").children("div").eq(1).css({ "padding-top": 5 }),
      $(this).children("div").width() >= $(window).width()
        ? $(this).children("div").css({ float: "" })
        : ($(this).children("div").width(),
          $(this).children("div").css({ width: "", float: "" })));
  }),
    $(".toefl-prep-para").each(function () {
      $(this).parent().css({ "font-weight": "normal" });
    }));
}
function setStoreLastSession(t, e) {
  var i = {
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
  localStorage.setItem(lsession, JSON.stringify(i));
}
function loadLastSession() {
  try {
    var t = JSON.parse(localStorage.getItem(lsession));
    if (null != t) {
      var e = "waiting",
        i = localStorage.getItem(
          path.split("/")[2] + ":" + t.title.toLowerCase(),
        );
      (null != i && (e = 1 == $.parseJSON(i).read ? "play" : "reading"),
        $("#tbl-last-session" + t.index)
          .parent()
          .parent()
          .parent()
          .children(".section-cover")
          .attr("opened", "1"),
        $("#tbl-last-session" + t.index)
          .parent()
          .parent()
          .css({ display: "block" }),
        $("#tbl-last-session" + t.index)
          .find("td")
          .eq(0)
          .children("div")
          .attr("class", e),
        $("html,body").animate(
          { scrollTop: $("#tbl-last-session" + t.index).offset().top - 50 },
          0,
        ),
        $("#tbl-last-session" + t.index)
          .find("td")
          .eq(1)
          .find(".your-answer").length > 0 &&
          $("#tbl-last-session" + t.index)
            .find("td")
            .eq(1)
            .find(".your-answer")
            .remove(),
        $("#tbl-last-session" + t.index)
          .find("td")
          .eq(1)
          .children(".title")
          .append(loadAnswerKey(t.title)),
        "Index" != t.title &&
          $("#home-section")
            .children("#last-session-segment")
            .html(
              '<ul class="curriculum-item" style="background:#1DA362"><li class="item" id="word-list-session" style="color:white"><table><tr><td><div class="' +
                e +
                '"></div></td><td><div class="title">' +
                t.title +
                loadAnswerKey(t.title) +
                " </div></td></tr></table></li></ul>",
            ),
        $("#word-list-session, #img-last-session-unit").click(function () {
          showCategorySection(t.title, t.index, 0);
        }),
        $("#exercise-lastest-session").click(function () {
          var t = JSON.parse(localStorage.getItem(lsession));
          showCategorySection(t.title, t.index, t.eindex);
        }),
        $("#story-lastest-session, #story-lastest-session-play-button").click(
          function () {
            var t = JSON.parse(localStorage.getItem(lsession));
            showCategorySection(t.title, t.index, t.sindex);
          },
        ),
        resizeLastSession(),
        resizeUnitItem());
    } else
      ($("#tbl-last-session0").parent().parent().parent().attr("opened", "1"),
        $("#tbl-last-session0").parent().parent().css({ display: "block" }));
  } catch (t) {}
  $("#home-section")
    .children("div")
    .eq(0)
    .css({ "padding-top": 15, "padding-bottom": 0 });
}
function resizeLastSession() {
  var t = $(window).width() - 130 - 40;
  (t > 130 && (t = 130), $("#img-last-session-unit").css({ width: t }));
}
function resizeUnitItem() {
  var t =
    $("#home-section").children("ul").children("li").eq(0).width() - 130 - 20;
  (t > 130 && (t = 130),
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
function replaceChooseAnswer() {
  ($(".answer-the-questions-section .ul-choose-answer")
    .children("li")
    .each(function () {
      var t = $(this).html();
      $(this).html(
        '<input type="radio" name="rdo' +
          $(this).parent().parent().index() +
          $(this).parent().index() +
          '" /> ' +
          t,
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
          $(this).find("input").prop("checked", !0),
          $(this).find("input").attr("checked", "checked"),
          $(this).css({ color: "#229ABF", "font-weight": "bold" }),
          $(this).parent().parent().attr("answer-index") == $(this).index())
        ) {
          ($(this)
            .parent()
            .children("li")
            .each(function () {
              $(this).find("input").attr("disabled", "disabled");
            }),
            $(this).find("input").attr("checked", "checked"),
            $(this)
              .parent()
              .css({ background: "#F5F5DC", "border-radius": "7px" }),
            $("#tmpElm").remove(),
            0 == $("#tmpElm").length &&
              $("body").append("<div id='tmpElm' style='display:none'></div>"),
            $("#tmpElm").html($(this).html()).find("input").remove());
          var t = $(this)
            .parent()
            .parent()
            .html()
            .replace(
              "________",
              '<b style="color:#229ABF; font-style:italic">' +
                $.trim(
                  $("#tmpElm")
                    .html()
                    .replace("a.", "")
                    .replace("b.", "")
                    .replace("c.", ""),
                ) +
                "</b>",
            );
          $(this).parent().parent().html(t);
        }
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
          $(this).css({ background: "#229ABF", color: "white", border: "" }),
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
    }));
}
function loadAnswerKey(t) {
  return "";
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
  if (
    ((elm = document.getElementById("sound")),
    $("#modal").css({ display: "block", opacity: "1" }),
    resizeModal(),
    resizeHomeSection(),
    null == localStorage.getItem(lsetting))
  ) {
    var t = { next: !1, loop: 0 };
    localStorage.setItem(lsetting, JSON.stringify(t));
  }
  if (null == localStorage.getItem(lfontSetting)) {
    t = { fontSize: fontSize };
    localStorage.setItem(lfontSetting, JSON.stringify(t));
  } else {
    var e = JSON.parse(localStorage.getItem(lfontSetting));
    fontSize = e.fontSize;
  }
  ($.ajax({
    url: "data/data.json",
    type: "GET",
    dataType: "text",
    success: function (t) {
      var e = $.parseJSON(t).flashcard;
      loadedTime = e.length;
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
        null == a && (a = "Unit");
        var r = urlFriendlyFull(a.toLowerCase());
        0 == $("#div-" + r).length &&
          ($("#home-section").append(
            '<div id="div-' +
              r +
              '"><div class="section-cover" style="display:none;font-weight: bold; text-align: left; background:' +
              i[n] +
              '"><div style="padding:13px 10px; color:white;">' +
              a +
              '</div></div><ul class="curriculum-item"></ul></div>',
          ),
          (n += 1));
        var l = "waiting",
          d = localStorage.getItem(path.split("/")[2] + ":" + s.toLowerCase());
        null != d && (l = 1 == $.parseJSON(d).read ? "play" : "reading");
        (path.split("/")[2], urlFriendlyFull(s.toLowerCase()));
        if (null != e[o].wordlist) {
          var c = e[o].wordlist.length,
            h = e[o].reading[0].en;
          ("/apps/" +
            path.split("/")[2] +
            "/" +
            urlFriendlyFull(s).toLowerCase() +
            "/#" +
            o,
            $("#div-" + r)
              .children("ul")
              .append(
                '<li class="item  word-list-session" story-title="' +
                  h +
                  '"  en="' +
                  s +
                  '" idx="' +
                  o +
                  '" wl="' +
                  c +
                  '"><table id="tbl-last-session' +
                  o +
                  '"><tr><td><div class="' +
                  l +
                  '"></div></td><td><div class="title">' +
                  s +
                  "</div></td></tr></table></li>",
              ));
        } else
          $("#div-" + r)
            .children("ul")
            .append(
              '<li class="item  word-list-session"  story-title="" en="' +
                s +
                '" idx="' +
                o +
                '" wl="0" ><table id="tbl-last-session' +
                o +
                '"><tr><td><div class="' +
                l +
                '"></div></td><td><div class="title">' +
                s +
                "</div></td></tr></table></li>",
            );
        (sessionStorage.setItem(
          path.split("/")[2] + ":" + s,
          JSON.stringify(e[o]),
        ),
          (loadedTime -= 1),
          o == e.length - 1 &&
            (homeSectionResize(),
            resizeLastSession(),
            $("#container").css({ opacity: "1" }),
            $("#modal").animate({ opacity: "0" }, 1e3, function () {
              ($(".header").css({ display: "block" }), $("#modal").remove());
            })));
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
      var t = $("#section-section").find(".title").html();
      switch ((resizeModal(), homeSectionResize(), t)) {
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
