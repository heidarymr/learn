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
  path = "/apps-data/250-ways-to-say-it-in-business-english/",
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
            '<div class="app-name">250 Ways to Say It in Business English</div ><div class="app-slogan">A Fun ESL Guide To Language and Culture In The U.S.</div>',
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
    ? 100 < t
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
    : 100 < t
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
  ($("#setting-container").remove(),
    0 == $("#setting-container").length &&
      ((t = "<table>"),
      (t +=
        '<tr><td>Auto next</td><td><label class="switch"><input id="chkAuto" type="checkbox"><div class="slider round"></div></label></td></tr>'),
      (t +=
        '<tr><td>Number of repeat</td><td><select id="optLoop"><option value="0">0</option><option value="1">1</option><option value="2">2</option><option value="3">3</option><option value="4">4</option><option value="5">5</option></select></td></tr>'),
      (t += "</table>"),
      $(".font-size").append(
        '<div id="setting-container"><div style="display:none"><table><tr><td>Auto next</td><td><label class="switch"><input id="chkAuto" type="checkbox"><div class="slider round"></div></label></td></tr><tr><td>Number of repeat</td><td><select id="optLoop"><option value="0">0</option><option value="1">1</option><option value="2">2</option><option value="3">3</option><option value="4">4</option><option value="5">5</option></select></td></tr></table></div></div>',
      ),
      $("#setting-container").children("div").css({ padding: 10 }),
      $("#chkAuto, #optLoop").change(function () {
        var t = {
          next: $("#chkAuto").prop("checked"),
          loop: $("#optLoop").val(),
        };
        localStorage.setItem(lsetting, JSON.stringify(t));
      })));
  var t = JSON.parse(localStorage.getItem(lsetting));
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
            '<tr><td>Auto next words</td><td><label class="switch"><input id="chkAuto" type="checkbox"><div class="slider round"></div></label></td></tr>'),
          (e +=
            '<tr><td>Number of repeat</td><td><select id="optLoop"><option value="0">0</option><option value="1">1</option><option value="2">2</option><option value="3">3</option><option value="4">4</option><option value="5">5</option></select></td></tr>'),
          (e += "</table>"),
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
          })),
        (e = JSON.parse(localStorage.getItem(lsetting))),
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
    0 < $(".exercise-section-red-answer-key").length &&
      $(".exercise-section-red-answer-key").remove(),
    $(".font-size").attr("style", ""),
    0 < $("#answer-popup").length &&
      ($("#answer-popup").remove(),
      clearInterval(answerTimerInterval),
      (answerTimerInterval = null)),
    0 < $("#idiom-tip-popup").length && $("#idiom-tip-popup").remove(),
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
    ((remainAudioLoop = null != e && 0 < e.loop ? e.loop : 0),
      null ==
        localStorage.getItem(path.split("/")[2] + ":" + t.toLowerCase()) &&
        (localStorage.setItem(
          path.split("/")[2] + ":" + t.toLowerCase(),
          JSON.stringify({ read: !1 }),
        ),
        $("#tbl-last-session" + currentIndex)
          .find("div")
          .eq(0)
          .attr("class", "reading")),
      $("#category-section")
        .children(".section")
        .children(".container")
        .html(""));
    var i = JSON.parse(
      sessionStorage.getItem(path.split("/")[2] + ":" + t),
    ).reading;
    if (null != i) {
      $("#category-section")
        .children(".section")
        .children(".container")
        .append('<div id="story-block"></div>');
      for (var n = 0; n < i.length; n++) {
        var o = i[n].type,
          s = (i[n].block, i[n].en),
          a = i[n].story;
        (i[n].image, i[n].sound);
        "story" == o &&
          $("#story-block").append(
            '<div class="en-story box_shadow_block" style="padding:10px;"><h3 class="en-story-title">' +
              s +
              '</h3><div class="story-content-cover">' +
              a +
              "</div></div>",
          );
      }
      $(".idiom-tip").click(function () {
        (0 < $("#idiom-tip-popup").length && $("#idiom-tip-popup").remove(),
          $("body").append(
            '<div id="idiom-tip-popup"><div id="close-idiom-tip-popup"><img src="icons/close-window-50.png" /></div><div id="idiom-tip-popup-cover">' +
              $("#voca" + $(this).attr("idx")).html() +
              "</div></div>",
          ),
          $("#idiom-tip-popup").find(".word-image").remove(),
          $("#close-idiom-tip-popup img").click(function () {
            $("#idiom-tip-popup").remove();
          }));
      });
    }
    (readFlag(),
      replaceChooseAnswer(),
      $(".counter").each(function () {
        $(this).css({
          "margin-left": ($(window).width() - $(this).width() - 20) / 2,
        });
      }),
      $(".speaker-louder").click(function () {
        var t = $(this).attr("source");
        (playSound((currentReadingIndex = $(this).attr("idx")), t),
          $("#nav-story li")
            .eq(0)
            .children("span")
            .html($(this).attr("title")));
      }),
      $(".en-story-title").click(function () {
        null == $(this).attr("opened") || "0" == $(this).attr("opened")
          ? ($(this).attr("opened", "1"),
            $(this)
              .parent()
              .children(".story-content-cover")
              .css({ display: "block" }))
          : ($(this).attr("opened", "0"),
            $(this)
              .parent()
              .children(".story-content-cover")
              .css({ display: "none" }));
      }),
      $("#story-block .en-story")
        .eq(0)
        .children(".story-content-cover")
        .css({ display: "block" }),
      $("#story-block .en-story")
        .eq(0)
        .children(".en-story-title")
        .attr("opened", "1"),
      homeSectionResize(),
      scaleFontSize(),
      playSeeking(0));
    t = window.location.hash.substring(1);
    if ("" != t) {
      t = t.split("&");
      if (1 < t.length)
        switch (t[1].toLowerCase()) {
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
  ((elm_index = currentReadingIndex = t),
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
function playSound(e, t) {
  (clearInterval(audioInterval), (currentReadingIndex = e));
  var i, n, o;
  (1 == isExercise()
    ? ((n = JSON.parse(localStorage.getItem(lsession))),
      $("#bottom-section").css({ display: "block" }),
      0 < (o = $("#tbl-last-session" + (parseInt(n.index) + 1))).length
        ? ((n = JSON.parse(localStorage.getItem(lsession))),
          (i = o.parent().attr("en")),
          0 < n.sindex
            ? $("#bottom-section")
                .children(".container")
                .html(
                  '<ul id="nav-exercise"><li>Idioms</li><li>Dialogues</li><li style="color:yellow">' +
                    i +
                    "</li></ul>",
                )
            : $("#bottom-section")
                .children(".container")
                .html(
                  '<ul id="nav-exercise"><li style="width:0%"></li><li style="width:0%"></li><li  style="width: calc(100% - 10px); text-align:center; padding-left:5px; padding-right:5px; color:yellow">' +
                    i +
                    "</li></ul>",
                ))
        : $("#bottom-section")
            .children(".container")
            .html(
              '<div class="app-name">250 Ways to Say It in Business English</div><div class="app-slogan">A Fun ESL Guide To Language and Culture In The U.S.</div>',
            ),
      $("#nav-exercise")
        .children("li")
        .eq(1)
        .click(function () {
          (panLeft(),
            panEnd(110),
            setTimeout(function () {
              ($("#item" + currentReadingIndex)
                .children("div")
                .animate({ scrollTop: 0 }),
                $("#exercise-answer-key").css({ display: "none" }));
            }, 200));
        }),
      $("#nav-exercise")
        .children("li")
        .eq(0)
        .click(function () {
          ($("#bottom-section").css({ display: "none" }),
            elm.pause(),
            playSeeking((elm.currentTime = 0)));
        }),
      $("#nav-exercise")
        .children("li")
        .eq(2)
        .click(function () {
          0 < o.length
            ? 0 == checkUnitOpened(i)
              ? showAdsForNextLesson(i, i, parseInt(n.index) + 1, 0)
              : (elm.pause(),
                (autoPlay = !1),
                showAds(),
                showCategorySection(i, parseInt(n.index) + 1, 0))
            : $("#section-section").trigger("click");
        }))
    : 1 == isStory()
      ? ($("#bottom-section").css({ display: "block" }),
        (n = JSON.parse(localStorage.getItem(lsession))),
        (i = (o = $("#tbl-last-session" + (parseInt(n.index) + 1)))
          .parent()
          .attr("en")),
        o.length,
        $("#bottom-section")
          .children(".container")
          .html(
            '<ul id="nav-story"><li source="' +
              t +
              '"><img class="audio-play" status="0" src="icons/play.png" /><span style="margin-left:5px; position:relative; top:-23px">' +
              $("#item" + currentReadingIndex).attr("title") +
              '</span></li><li>Idioms</li><li style="color:yellow">' +
              i +
              "</li></ul>",
          ),
        $("#nav-story")
          .children("li")
          .eq(0)
          .click(function () {
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
                elm.play());
          }),
        $("#nav-story")
          .children("li")
          .eq(1)
          .click(function () {
            switch ($(this).html()) {
              case "Idioms":
                $(window).scrollTop($("#idioms-block").offset().top - 60);
                break;
              case "Dialogue":
                $(window).scrollTop($("#story-block").offset().top - 60);
                break;
              case "Vocabulary":
                $(window).scrollTop($("#vocabulary-block").offset().top - 60);
            }
          }),
        $("#nav-story")
          .children("li")
          .eq(2)
          .click(function () {
            0 < o.length
              ? 0 == checkUnitOpened(i)
                ? showAdsForNextLesson(i, i, parseInt(n.index) + 1, 0)
                : (elm.pause(),
                  (autoPlay = !1),
                  1 == showAds() &&
                    JSBridge.LoadStoryAnswerKeyVideoAds(
                      i.toUpperCase() + " loaded. Check it out!",
                    ),
                  showCategorySection(i, parseInt(n.index) + 1, 0))
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
              .attr("src", "icons/pause.png")))
      : ($("#bottom-section").css({ display: "block" }),
        (n = JSON.parse(localStorage.getItem(lsession))),
        0 < (o = $("#tbl-last-session" + (parseInt(n.index) + 1))).length
          ? ((i = o.parent().attr("en")),
            $("#bottom-section")
              .children(".container")
              .html(
                '<ul id="nav-exercise"><li style="width:0%"></li><li style="width:0%"></li><li  style="width: calc(100% - 10px); text-align:center; padding-left:5px; padding-right:5px; color:yellow">' +
                  i +
                  "</li></ul>",
              ),
            $("#nav-exercise")
              .children("li")
              .eq(2)
              .click(function () {
                0 < o.length
                  ? 0 == checkUnitOpened(i)
                    ? showAdsForNextLesson(i, i, parseInt(n.index) + 1, 0)
                    : (elm.pause(),
                      (autoPlay = !1),
                      showAds(),
                      showCategorySection(i, parseInt(n.index) + 1, 0))
                  : $("#section-section").trigger("click");
              }))
          : $("#bottom-section")
              .children(".container")
              .html(
                '<div class="app-name">250 Ways to Say It in Business English</div><div class="app-slogan">A Fun ESL Guide To Language and Culture In The U.S.</div>',
              )),
    null != t &&
      ((elm.src = t),
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
        var t = parseInt(
          $("#item" + currentReadingIndex).attr("remainAudioLoop"),
        );
        0 < t
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
            }, 2e3)));
      })),
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
    t = $("#tbl-last-session" + t.index)
      .parent()
      .attr("en");
  (localStorage.removeItem(path.split("/")[2] + ":" + t.toLowerCase()),
    null == localStorage.getItem(path.split("/")[2] + ":" + t.toLowerCase()) &&
      localStorage.setItem(
        path.split("/")[2] + ":" + t.toLowerCase(),
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
  (0 == $(".show-ads-cover").length &&
    $("body").append(
      '<div class="show-ads-cover">Watch an AD to open ' +
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
    }));
}
function checkUnitOpened(t) {
  return (
    null != localStorage.getItem(path.split("/")[2] + ":" + t.toLowerCase())
  );
}
function nextWordReading() {
  try {
    var t = JSON.parse(localStorage.getItem(lsetting));
    null != t &&
      1 == t.next &&
      (nextTimeOut = setTimeout(function () {
        null != $("#item" + currentReadingIndex).attr("nid") &&
          ((currentReadingIndex = $("#item" + currentReadingIndex).attr("nid")),
          0 < $("#item" + currentReadingIndex).length &&
            $("html, body").animate(
              {
                scrollTop: $("#item" + currentReadingIndex).offset().top - 100,
              },
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
  } catch (t) {}
}
function focusReading(t) {
  var e;
  0 ==
    $("#item" + t)
      .find(".word-image")
      .find(".reading").length &&
    ($("#item" + next)
      .find(".word-image")
      .append("<div class='reading' style='position:absolute;'></div>"),
    (e = $(window).width()),
    $("#item" + t)
      .find(".word-image")
      .find(".reading")
      .css({
        width: (e - 20) / 2,
        height: "100%",
        top: 0,
        left: (e - (e - 20) / 2) / 2 - 10,
      }));
}
function homeScroll(t) {
  ($(window).scroll(function () {
    (parseInt($("#home-section").height()),
      $("#home-section").offset(),
      $(window).height());
    var t = parseInt($(this).scrollTop());
    ($("#home-section").attr("top", t),
      0 < $("#story-block").length && $("#story-block").position().top);
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
    i,
    n = Math.floor(t / 320);
  (0 == n && (n = 1),
    (i = 1 == n ? 0 : 2 < n ? 2 * (n - 1) * 10 : 10 * n),
    (e = Math.floor((t - i) / n)),
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
        ((0 < $(this).index()) & ($(this).index() % n == 0) &&
          $(this).css({ clear: "both" }),
          $(this).eq(n).css({ clear: "both" }),
          $(this).css({ width: e }),
          $(this).find("img").css({ width: e }));
      }),
    $(window).width() <= $(window).height()
      ? $(".counter").parent().css({ "padding-top": 20 })
      : $(".counter").parent().css({ "padding-top": 30 }),
    resizeHomeSection(),
    resizeUnitItem());
}
function scaleFontSize() {
  var e = 786432;
  ($(".en-word").each(function () {
    var t = $(window).width() * $(window).height();
    (Math.sqrt(t), Math.sqrt(e));
  }),
    $(".alphabet").each(function () {
      var t = $(window).width() * $(window).height(),
        t = 300 * (Math.sqrt(t) / Math.sqrt(e));
      $(".alphabet").css("font-size", t + "%");
    }),
    $(".en-story-title").each(function () {
      var t = $(window).width() * $(window).height();
      (Math.sqrt(t), Math.sqrt(e));
    }),
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
        300 <= hImage && (hImage = 300),
        hImage <= 120 && (hImage = 120),
        $(this).css({ height: hImage, width: hImage }),
        1 == parseInt($(this).attr("story")) &&
          ($(this).css({ "margin-top": "0px" }),
          220 <= hImage && $(this).css({ height: 220, width: 220 }),
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
      var t;
      (1 != $(this).attr("story") && 1 != $(this).attr("exercise")) ||
        ((t = $("#item" + $(this).index()).children("div")).css({
          height: "",
          width: "",
          "overflow-y": "",
          "overflow-x": "",
        }),
        $(window).height(),
        $(".header").height(),
        $("#bottom-section").height(),
        t.height(),
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
      $(".story-image img").attr("style", "width: 160px")),
    resizeTextareaAnswer());
}
function resizeStory() {
  $("#category-section")
    .find(".container")
    .children("li")
    .each(function () {
      var t;
      (1 != $(this).attr("story") && 1 != $(this).attr("exercise")) ||
        ((t = $("#item" + $(this).index()).children("div")).css({
          height: "",
          width: "",
        }),
        $(window).height(),
        $(".header").height(),
        $("#bottom-section").height(),
        t.height(),
        $("#item" + $(this).index())
          .find(".faq-list-section")
          .children("ol")
          .css({ margin: "", padding: "" }),
        $(window).width() < 400 &&
          $("#item" + $(this).index())
            .find(".faq-list-section")
            .children("ol")
            .css({ margin: "0px", padding: "0px 0px 0px 20px" }));
    });
}
function resizeUsageTipsSeg() {
  ($(".en-exam").each(function () {
    ($(this).css({ "padding-top": 5 }),
      $(this).children("div").css({ width: "", float: "" }),
      $(this)
        .children("div")
        .css({
          "font-size": "15px",
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
  localStorage.setItem(lsession, JSON.stringify(e));
}
function loadLastSession() {
  try {
    var t,
      e,
      i = JSON.parse(localStorage.getItem(lsession));
    null != i
      ? ((t = "waiting"),
        null !=
          (e = localStorage.getItem(
            path.split("/")[2] + ":" + i.title.toLowerCase(),
          )) && (t = 1 == $.parseJSON(e).read ? "play" : "reading"),
        $("#tbl-last-session" + i.index)
          .parent()
          .parent()
          .parent()
          .children(".section-cover")
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
        0 <
          $("#tbl-last-session" + i.index)
            .find("td")
            .eq(1)
            .find(".your-answer").length &&
          $("#tbl-last-session" + i.index)
            .find("td")
            .eq(1)
            .find(".your-answer")
            .remove(),
        $("#tbl-last-session" + i.index)
          .find("td")
          .eq(1)
          .children(".title")
          .append(loadAnswerKey(i.title)),
        "Index" != i.title &&
          $("#home-section")
            .children("#last-session-segment")
            .html(
              '<ul class="curriculum-item" style="background:#1DA362"><li class="item" id="word-list-session" style="color:white"><table><tr><td><div class="' +
                t +
                '"></div></td><td><div class="title">' +
                i.title +
                loadAnswerKey(i.title) +
                " </div></td></tr></table></li></ul>",
            ),
        $("#word-list-session, #img-last-session-unit").click(function () {
          showCategorySection(i.title, i.index, 0);
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
        resizeUnitItem())
      : ($("#tbl-last-session0").parent().parent().parent().attr("opened", "1"),
        $("#tbl-last-session0").parent().parent().css({ display: "block" }));
  } catch (t) {}
  $("#home-section")
    .children("div")
    .eq(0)
    .css({ "padding-top": 15, "padding-bottom": 0 });
}
function resizeLastSession() {
  var t = $(window).width() - 130 - 40;
  (130 < t && (t = 130), $("#img-last-session-unit").css({ width: t }));
}
function resizeUnitItem() {
  var t =
    $("#home-section").children("ul").children("li").eq(0).width() - 130 - 20;
  (130 < t && (t = 130),
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
  var t = 320;
  isMobile.any()
    ? (t = 200)
    : $(window).width() < t && (t = $(window).width() - 40);
}
function replaceChooseAnswer() {
  ($(".answer-the-questions-section .ul-choose-answer")
    .children("li")
    .each(function () {
      var t = $(this).html();
      ($(this).html(
        '<input type="radio" name="rdo' +
          $(this).parent().parent().parent().parent().index() +
          $(this).parent().parent().index() +
          $(this).parent().index() +
          '" /> ' +
          t,
      ),
        null != $(this).parent().parent().attr("explain") &&
          0 ==
            $(this).parent().parent().children(".txt-textarea-long-answer")
              .length &&
          $(this)
            .parent()
            .parent()
            .append(
              '<textarea placeholder="Can you explain why you need that one?" class="txt-textarea-long-answer"></textarea>',
            ));
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
        .replace(
          /__________/g,
          '<select class="opt-fill-blank"><option></option></select>',
        )
        .replace(
          /______/g,
          '<select class="opt-fill-blank"><option></option></select>',
        );
      $(this).html(t);
    }));
  var t = "";
  ($("#ul-free-option li").each(function () {
    t += "<option>" + $.trim($(this).html()) + "</option>";
  }),
    $(".opt-fill-blank").each(function () {
      $(this).append(t);
    }));
  var e = "";
  ($(".ul-free-option li").each(function () {
    e += "<option>" + $.trim($(this).html()) + "</option>";
  }),
    0 < $(".word-blank-cover").length &&
      ("" == e && (e = t),
      $(".word-blank-cover")
        .find(".answer-the-questions-section-word-blank")
        .each(function () {
          1 == $(this).children(".opt-fill-blank").length &&
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
    $(".answer-the-questions-word-similar").each(function () {
      var t = $(this)
        .html()
        .replace(/__________/g, '<input class="txt-input-answer" />');
      (null != $(this).attr("explain") &&
        (t +=
          '<br/><textarea placeholder="Can you explain what they mean?" class="txt-textarea-long-answer"></textarea>'),
        $(this).html(t));
    }),
    $(".answer-the-questions-CI").each(function () {
      var t = $(this)
        .html()
        .replace(
          /______/,
          '<select class="opt-ci"><option></option><option>A</option><option>B</option></select>',
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
    $(".answer-the-questions-explain-expressions").each(function () {
      var t = $(this)
        .html()
        .replace(
          /__________/g,
          '<textarea class="txt-textarea-long-answer" placeholder="Can you explain?"></textarea>',
        )
        .replace(/_____/g, '<input class="txt-input-answer" />');
      $(this).html(t);
    }),
    $(".answer-the-questions-VX").each(function () {
      var t = $.trim($(this).html().replace(/_____/, "")),
        e = $(this)
          .html()
          .replace(
            /_____/,
            '<select class="opt-v-x"><option></option><option>V</option><option>X</option></select>',
          );
      ($(this).html(e),
        $(this).append(
          '<input raw="' +
            t +
            '" class="highlight-error" placeholder="Can you highlight the error?" /><textarea placeholder="Correct version? (Can you explain why it\'s wrong?)" class="txt-textarea-long-answer"></textarea>',
        ));
    }),
    $(".opt-v-x").change(function () {
      switch (
        ($(this).attr("disabled", "disabled"),
        $(this).css({ background: "#F3F3F3", border: "" }),
        $(this).val())
      ) {
        case "X":
          ($(this)
            .parent()
            .children(".txt-textarea-long-answer")
            .css({ display: "block" }),
            $(this)
              .parent()
              .children(".highlight-error")
              .css({ display: "block" }));
          break;
        case "V":
          ($(this)
            .parent()
            .children(".txt-textarea-long-answer")
            .css({ display: "block" }),
            $(this)
              .parent()
              .children(".txt-textarea-long-answer")
              .attr("placeholder", "Can you explain why it's correct?"));
      }
    }),
    $(".underline-conversation").each(function () {
      var t = $(this)
        .html()
        .replace(
          /__________/g,
          '<textarea placeholder="What should the person say?" class="txt-textarea-long-answer"></textarea>',
        )
        .replace(
          /_____/g,
          '<input placeholder="Underline the errors" class="txt-input-answer" /> <input placeholder="Underline the errors" class="txt-input-answer" />',
        );
      $(this).html(t);
    }));
}
function resizeTextareaAnswer() {
  ($(".txt-textarea-long-answer").css({ width: "" }),
    $(window).width() < 330 &&
      $(".txt-textarea-long-answer").css({ width: 230 }));
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
  var t;
  ((elm = document.getElementById("sound")),
    $("#modal").css({ display: "block", opacity: "1" }),
    resizeModal(),
    resizeHomeSection(),
    null == localStorage.getItem(lsetting) &&
      ((t = { next: !1, loop: 0 }),
      localStorage.setItem(lsetting, JSON.stringify(t))),
    null == localStorage.getItem(lfontSetting)
      ? ((t = { fontSize: fontSize }),
        localStorage.setItem(lfontSetting, JSON.stringify(t)))
      : ((t = JSON.parse(localStorage.getItem(lfontSetting))),
        (fontSize = t.fontSize)),
    $.ajax({
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
            n = 0;
          n < e.length;
          n++
        ) {
          var o = e[n].en,
            s = e[n].desc;
          null == s && (s = "Unit");
          var a = urlFriendlyFull(s.toLowerCase());
          0 == $("#div-" + a).length &&
            ($("#home-section").append(
              '<div id="div-' +
                a +
                '"><div class="section-cover" style="display:none;font-weight: bold; text-align: left; background:' +
                i[0] +
                '"><div style="padding:13px 10px; color:white;">' +
                s +
                '</div></div><ul class="curriculum-item"></ul></div>',
            ),
            0);
          var r = "waiting",
            l = localStorage.getItem(
              path.split("/")[2] + ":" + o.toLowerCase(),
            );
          null != l && (r = 1 == $.parseJSON(l).read ? "play" : "reading");
          (path.split("/")[2], urlFriendlyFull(o.toLowerCase()));
          (null != e[n].wordlist
            ? ((s = e[n].wordlist.length),
              (l = e[n].reading[0].en),
              path.split("/")[2],
              urlFriendlyFull(o).toLowerCase(),
              $("#div-" + a)
                .children("ul")
                .append(
                  '<li class="item  word-list-session" story-title="' +
                    l +
                    '"  en="' +
                    o +
                    '" idx="' +
                    n +
                    '" wl="' +
                    s +
                    '"><table id="tbl-last-session' +
                    n +
                    '"><tr><td><div class="' +
                    r +
                    '"></div></td><td><div class="title">' +
                    o +
                    "</div></td></tr></table></li>",
                ))
            : $("#div-" + a)
                .children("ul")
                .append(
                  '<li class="item  word-list-session"  story-title="" en="' +
                    o +
                    '" idx="' +
                    n +
                    '" wl="0" ><table id="tbl-last-session' +
                    n +
                    '"><tr><td><div class="' +
                    r +
                    '"></div></td><td><div class="title">' +
                    o +
                    "</div></td></tr></table></li>",
                ),
            sessionStorage.setItem(
              path.split("/")[2] + ":" + o,
              JSON.stringify(e[n]),
            ),
            --loadedTime,
            n == e.length - 1 &&
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
