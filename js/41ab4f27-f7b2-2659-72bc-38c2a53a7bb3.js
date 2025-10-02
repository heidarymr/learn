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
  path = "/apps-data/english-the-american-way/",
  lsession = "lastestSession-" + path.split("/")[2],
  lsetting = "settings-" + path.split("/")[2],
  lfontSetting = "fontSize-" + path.split("/")[2];
function succeded(e, t, i) {
  t;
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
            '<div class="app-name">English The American Way</div ><div class="app-slogan">A Fun ESL Guide To Language and Culture In The U.S.</div>',
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
          var e = { fontSize: fontSize };
          localStorage.setItem(lfontSetting, JSON.stringify(e));
        }));
    }),
    $("body").on("click", function (e) {
      0 === $(e.target).closest(".font-size").length &&
        ($(".font-size").css({ "border-radius": "" }),
        $(".font-size-cover,#setting-container").hide());
    }),
    $("body").on("touchstart", function (e) {
      0 === $(e.target).closest(".font-size").length &&
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
function panEnd(e) {
  ("left" == direction
    ? e > 100
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
    : e > 100
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
        var e = {
          next: $("#chkAuto").prop("checked"),
          loop: $("#optLoop").val(),
        };
        localStorage.setItem(lsetting, JSON.stringify(e));
      }));
  }
  var e = JSON.parse(localStorage.getItem(lsetting));
  ($("#optLoop").val(e.loop),
    1 == e.next
      ? $("#chkAuto").attr("checked", "checked")
      : $("#chkAuto").removeAttr("checked"));
}
function settings(e) {
  if (($("#setting-container").remove(), 1 == e)) {
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
  ($("#container").css({ width: e }), $("#category-section").css({ width: e }));
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
    $(".exercise-section-red-answer-key").length > 0 &&
      $(".exercise-section-red-answer-key").remove(),
    $(".show-ads-cover").length > 0 && $(".show-ads-cover").remove(),
    $(".font-size").attr("style", ""),
    $("#answer-popup").length > 0 &&
      ($("#answer-popup").remove(),
      clearInterval(answerTimerInterval),
      (answerTimerInterval = null)),
    $("#idiom-tip-popup").length > 0 && $("#idiom-tip-popup").remove(),
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
    if (
      ((remainAudioLoop = null != t && t.loop > 0 ? t.loop : 0),
      null == localStorage.getItem(path.split("/")[2] + ":" + e.toLowerCase()))
    ) {
      var i = { read: !1 };
      (localStorage.setItem(
        path.split("/")[2] + ":" + e.toLowerCase(),
        JSON.stringify(i),
      ),
        $("#tbl-last-session" + currentIndex)
          .find("div")
          .eq(0)
          .attr("class", "reading"));
    }
    $("#category-section").children(".section").children(".container").html("");
    var n = JSON.parse(
        sessionStorage.getItem(path.split("/")[2] + ":" + e),
      ).wordlist,
      s = JSON.parse(
        sessionStorage.getItem(path.split("/")[2] + ":" + e),
      ).exercise;
    if (null != s)
      if (
        ($("#category-section")
          .children(".section")
          .children(".container")
          .append(
            '<div id="exercise-block" class="box_shadow_yt_iframe seg-block"></div>',
          ),
        "index of idioms" == e.toLowerCase() ||
          "appendix: vocabulary" == e.toLowerCase())
      ) {
        for (var o = 0; o < 1; o++) {
          var r = s[o].en,
            a = s[o].story;
          if (0 == o) {
            var l = JSON.parse(localStorage.getItem(lsession)),
              d = 0;
            (null == n && null == n) || (d = n.length);
            i = {
              title: l.title,
              image: $("#home-section")
                .children("ul")
                .children("li")
                .eq(l.index)
                .find("img")
                .attr("src"),
              index: l.index,
              windex: 0,
              eindex: d,
              sindex: 0,
            };
            localStorage.setItem(lsession, JSON.stringify(i));
            var c =
              '<div><div class="en-story"><div class="faq-list-section"><div class="index-alphabet-item">' +
              r +
              "</div>" +
              a +
              "</div></div></div>";
            $("#exercise-block").append(c);
          }
        }
        setTimeout(function () {
          for (var e = 1; e < s.length; e++) {
            var t = s[e].en,
              i = s[e].story;
            $("#exercise-block").append(
              '<div class="faq-list-section"><div class="index-alphabet-item">' +
                t +
                "</div>" +
                i +
                "</div></div>",
            );
          }
          $(".index-block-item li").click(function () {
            ($("#idiom-tip-popup").length > 0 && $("#idiom-tip-popup").remove(),
              $("body").append(
                '<div id="idiom-tip-popup"><div id="close-idiom-tip-popup"><img src="icons/close-window-50.png" /></div><div id="idiom-tip-popup-cover">' +
                  $(this).children(".tool-index-idioms").html() +
                  "</div></div>",
              ),
              $("#idiom-tip-popup").find(".word-image").remove(),
              $("#close-idiom-tip-popup img").click(function () {
                $("#idiom-tip-popup").remove();
              }));
          });
        }, 200);
      } else {
        for (o = 0; o < s.length; o++) {
          ((r = s[o].en), (a = s[o].story));
          ("Answer Key" == r
            ? $("#exercise-block").append(
                '<div id="exercise-answer-key"><div class="exercise-section">' +
                  r +
                  '</div><div class="faq-list-section" title="' +
                  r +
                  '">' +
                  a +
                  "</div><p>&nbsp;</p></div></div>",
              )
            : $("#exercise-block").append(
                '<div class="exercise-section-title">' +
                  r +
                  '</div><div class="faq-list-section" title="' +
                  r +
                  '">' +
                  a +
                  "</div></div>",
              ),
            o == s.length - 1 &&
              "" != r &&
              ($("#exercise-block").append(
                '<div class="exercise-section-red-answer-key">Answer Key</div>',
              ),
              $(".exercise-section-red-answer-key").click(function () {
                ((adsNextUnit = !1),
                  $(".answer-key-remove-after").remove(),
                  $("#exercise-answer-key").css({ display: "block" }),
                  $(".exercise-section-red-answer-key").css({
                    display: "none",
                  }),
                  $(".answer-key-only").html(""),
                  $("#exercise-answer-key").html(
                    '<table><tr><td></td><td style="background: aliceblue; text-align:center; font-weight:bold; text-transform:uppercase; padding:7px; font-size:15px">Answer Key</td><td style="background: aliceblue; text-align:center; font-weight:bold; text-transform:uppercase; padding:7px; font-size:15px">Your Answer</td></tr></table>',
                  ),
                  $(this)
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
                                    $("#divAnswerKeyCover")
                                      .children("div")
                                      .eq(1)
                                      .html(""),
                                    n.each(function () {
                                      "checked" ==
                                        $(this)
                                          .children("input")
                                          .attr("checked") &&
                                        (e.length > 1
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
                                  var s = "",
                                    o = "";
                                  null != $(this).attr("explain") &&
                                    "" != $(this).attr("explain") &&
                                    ((s =
                                      "<br/>(" + $(this).attr("explain") + ")"),
                                    (o =
                                      "<br/>(" +
                                      $(this)
                                        .children(".txt-textarea-long-answer")
                                        .val() +
                                      ")"),
                                    $("#divAnswerKeyCover")
                                      .children("div")
                                      .eq(0)
                                      .append(s),
                                    $("#divAnswerKeyCover")
                                      .children("div")
                                      .eq(1)
                                      .append(o));
                                  var r = $.trim(
                                      $("#divAnswerKeyCover")
                                        .children("div")
                                        .eq(0)
                                        .html()
                                        .replace("____", ""),
                                    ),
                                    a = $.trim(
                                      $("#divAnswerKeyCover")
                                        .children("div")
                                        .eq(1)
                                        .html()
                                        .replace("____", ""),
                                    );
                                  r == a
                                    ? $("#exercise-answer-key table").append(
                                        '<tr style="background:#1EA362; color:white"><td>' +
                                          (parseInt($(this).index()) + 1) +
                                          "</td><td>" +
                                          r +
                                          "</td><td>" +
                                          a +
                                          "</td></tr>",
                                      )
                                    : $("#exercise-answer-key table").append(
                                        "<tr><td>" +
                                          (parseInt($(this).index()) + 1) +
                                          '</td><td style="background:#1EA362; color:white">' +
                                          r +
                                          '</td><td style="background:#D9433D; color:white">' +
                                          a +
                                          "</td></tr>",
                                      );
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
                                    ? $("#exercise-answer-key table").append(
                                        '<tr style="background:#1EA362; color:white"><td>' +
                                          (parseInt($(this).index()) + 1) +
                                          "</td><td>" +
                                          i +
                                          "</td><td>" +
                                          n +
                                          "</td></tr>",
                                      )
                                    : $("#exercise-answer-key table").append(
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
                                    ? $("#exercise-answer-key table").append(
                                        '<tr style="background:#1EA362; color:white"><td>' +
                                          (parseInt($(this).index()) + 1) +
                                          "</td><td>" +
                                          i +
                                          "</td><td>" +
                                          n +
                                          "</td></tr>",
                                      )
                                    : $("#exercise-answer-key table").append(
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
                                .children(".answer-the-questions-word-similar")
                                .each(function () {
                                  ($("#divAnswerKeyCover").remove(),
                                    0 == $("#divAnswerKeyCover").length &&
                                      $("body").append(
                                        '<div id="divAnswerKeyCover" style="display:none"><div></div><div></div></div>',
                                      ));
                                  var e = $(this).attr("value"),
                                    t = "",
                                    i = "";
                                  if (
                                    (null != $(this).attr("explain") &&
                                      ((t =
                                        "<br/><br/>" + $(this).attr("explain")),
                                      (i =
                                        "<br/><br/>" +
                                        $(this)
                                          .children(".txt-textarea-long-answer")
                                          .val())),
                                    $("#divAnswerKeyCover")
                                      .children("div")
                                      .eq(0)
                                      .html(e + t),
                                    null != $(this).attr("first"))
                                  ) {
                                    for (
                                      var n = $(this).attr("first").split(","),
                                        s = "",
                                        o = 0;
                                      o < n.length;
                                      o++
                                    )
                                      s +=
                                        n[o] +
                                        $(this)
                                          .children(".txt-input-answer")
                                          .eq(o)
                                          .val() +
                                        " ";
                                    $("#divAnswerKeyCover")
                                      .children("div")
                                      .eq(1)
                                      .html($.trim(s) + i);
                                  } else
                                    $("#divAnswerKeyCover")
                                      .children("div")
                                      .eq(1)
                                      .html(
                                        $(this)
                                          .children(".txt-input-answer")
                                          .val() + i,
                                      );
                                  var r = $.trim(
                                      $("#divAnswerKeyCover")
                                        .children("div")
                                        .eq(0)
                                        .html(),
                                    ),
                                    a = $.trim(
                                      $("#divAnswerKeyCover")
                                        .children("div")
                                        .eq(1)
                                        .html(),
                                    );
                                  r == a
                                    ? $("#exercise-answer-key table").append(
                                        '<tr style="background:#1EA362; color:white"><td>' +
                                          (parseInt($(this).index()) + 1) +
                                          "</td><td>" +
                                          r +
                                          "</td><td>" +
                                          a +
                                          "</td></tr>",
                                      )
                                    : $("#exercise-answer-key table").append(
                                        "<tr><td>" +
                                          (parseInt($(this).index()) + 1) +
                                          '</td><td style="background:#1EA362; color:white">' +
                                          r +
                                          '</td><td style="background:#D9433D; color:white">' +
                                          a +
                                          "</td></tr>",
                                      );
                                }),
                              $(this)
                                .children(".answer-the-questions-CI")
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
                                      .html($(this).children(".opt-ci").val()));
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
                                    ? $("#exercise-answer-key table").append(
                                        '<tr style="background:#1EA362; color:white"><td>' +
                                          (parseInt($(this).index()) + 1) +
                                          "</td><td>" +
                                          e +
                                          "</td><td>" +
                                          t +
                                          "</td></tr>",
                                      )
                                    : $("#exercise-answer-key table").append(
                                        "<tr><td>" +
                                          (parseInt($(this).index()) + 1) +
                                          '</td><td style="background:#1EA362; color:white">' +
                                          e +
                                          '</td><td style="background:#D9433D; color:white">' +
                                          t +
                                          "</td></tr>",
                                      );
                                }),
                              $(this)
                                .children(
                                  ".answer-the-questions-explain-expressions",
                                )
                                .each(function () {
                                  ($("#divAnswerKeyCover").remove(),
                                    0 == $("#divAnswerKeyCover").length &&
                                      $("body").append(
                                        '<div id="divAnswerKeyCover" style="display:none"><div></div><div></div></div>',
                                      ));
                                  var e = $(this).attr("expression"),
                                    t = $(this).attr("sentence"),
                                    i = $(this)
                                      .children(".txt-input-answer")
                                      .val(),
                                    n = $(this)
                                      .children(".txt-textarea-long-answer")
                                      .val();
                                  ($("#divAnswerKeyCover")
                                    .children("div")
                                    .eq(0)
                                    .html(
                                      $(this)
                                        .html()
                                        .replace(
                                          '<textarea class="txt-textarea-long-answer" placeholder="Can you explain?"></textarea>',
                                          t,
                                        )
                                        .replace(
                                          '<textarea class="txt-textarea-long-answer"></textarea>',
                                          t,
                                        )
                                        .replace(
                                          '<input class="txt-input-answer" />',
                                          e,
                                        )
                                        .replace(
                                          '<input class="txt-input-answer">',
                                          e,
                                        ),
                                    ),
                                    $("#divAnswerKeyCover")
                                      .children("div")
                                      .eq(1)
                                      .html(
                                        $(this)
                                          .html()
                                          .replace(
                                            '<textarea class="txt-textarea-long-answer" placeholder="Can you explain?"></textarea>',
                                            n,
                                          )
                                          .replace(
                                            '<textarea class="txt-textarea-long-answer"></textarea>',
                                            n,
                                          )
                                          .replace(
                                            '<input class="txt-input-answer" />',
                                            i,
                                          )
                                          .replace(
                                            '<input class="txt-input-answer">',
                                            i,
                                          ),
                                      ));
                                  var s = $.trim(
                                      $("#divAnswerKeyCover")
                                        .children("div")
                                        .eq(0)
                                        .html(),
                                    ),
                                    o = $.trim(
                                      $("#divAnswerKeyCover")
                                        .children("div")
                                        .eq(1)
                                        .html(),
                                    );
                                  s.toLowerCase() == o.toLowerCase()
                                    ? $("#exercise-answer-key table").append(
                                        '<tr style="background:#1EA362; color:white"><td>' +
                                          (parseInt($(this).index()) + 1) +
                                          "</td><td>" +
                                          s +
                                          "</td><td>" +
                                          o +
                                          "</td></tr>",
                                      )
                                    : $("#exercise-answer-key table").append(
                                        "<tr><td>" +
                                          (parseInt($(this).index()) + 1) +
                                          "</td><td>" +
                                          s +
                                          "</td><td>" +
                                          o +
                                          "</td></tr>",
                                      );
                                }),
                              $(this)
                                .children(".answer-the-questions-VX")
                                .each(function () {
                                  ($("#divAnswerKeyCover").remove(),
                                    0 == $("#divAnswerKeyCover").length &&
                                      $("body").append(
                                        '<div id="divAnswerKeyCover" style="display:none"><div></div><div></div></div>',
                                      ));
                                  var e = "";
                                  if (
                                    (null != $(this).attr("explain") &&
                                      "" != $(this).attr("explain") &&
                                      (e =
                                        " (" + $(this).attr("explain") + ")"),
                                    "V" == $(this).attr("value")
                                      ? $("#divAnswerKeyCover")
                                          .children("div")
                                          .eq(0)
                                          .html(
                                            "<b style='color:red'>" +
                                              $(this).attr("value") +
                                              "</b> This is correct.<br/><i>" +
                                              $(this).attr("correct") +
                                              e +
                                              "</i>",
                                          )
                                      : $("#divAnswerKeyCover")
                                          .children("div")
                                          .eq(0)
                                          .html(
                                            "<b style='color:red'>" +
                                              $(this).attr("value") +
                                              "</b> " +
                                              $(this).attr("wrong") +
                                              "<br/><i>Correct version: " +
                                              $(this).attr("correct") +
                                              e +
                                              "</i>",
                                          ),
                                    "" != $(this).children(".opt-v-x").val())
                                  )
                                    if (
                                      "V" == $(this).children(".opt-v-x").val()
                                    )
                                      $("#divAnswerKeyCover")
                                        .children("div")
                                        .eq(1)
                                        .html(
                                          "<b style='color:red'>" +
                                            $(this).children(".opt-v-x").val() +
                                            "</b> This is correct.<br/><i>" +
                                            $(this)
                                              .children(
                                                ".txt-textarea-long-answer",
                                              )
                                              .val() +
                                            "</i>",
                                        );
                                    else {
                                      var t = $(this)
                                        .children(".highlight-error")
                                        .attr("raw")
                                        .replace(
                                          $(this)
                                            .children(".highlight-error")
                                            .val(),
                                          "<u>" +
                                            $(this)
                                              .children(".highlight-error")
                                              .val() +
                                            "</u>",
                                        );
                                      $("#divAnswerKeyCover")
                                        .children("div")
                                        .eq(1)
                                        .html(
                                          "<b style='color:red'>" +
                                            $(this).children(".opt-v-x").val() +
                                            "</b> " +
                                            t +
                                            "<br/><i>Correct version: " +
                                            $(this)
                                              .children(
                                                ".txt-textarea-long-answer",
                                              )
                                              .val() +
                                            "</i>",
                                        );
                                    }
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
                                  $("#exercise-answer-key table").append(
                                    "<tr><td>" +
                                      (parseInt($(this).index()) + 1) +
                                      "</td><td>" +
                                      i +
                                      "</td><td>" +
                                      n +
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
                          .children(".underline-conversation-cover")
                          .each(function (e) {
                            var t = $(this).attr("h4index");
                            (null != t && (e = t),
                              $("#exercise-answer-key table").append(
                                '<tr><td></td><td colspan="2" style="font-weight:bold;">' +
                                  $(this).parent().children("h4").eq(e).html() +
                                  "</td></tr>",
                              ),
                              $(this)
                                .find(".underline-conversation")
                                .each(function (e) {
                                  ($("#divAnswerKeyCover").remove(),
                                    0 == $("#divAnswerKeyCover").length &&
                                      $("body").append(
                                        '<div id="divAnswerKeyCover" style="display:none"><div></div><div></div></div>',
                                      ));
                                  ($(this).attr("expression"),
                                    $(this).attr("sentence"));
                                  var t = $(this)
                                    .children(".txt-textarea-long-answer")
                                    .val();
                                  ($("#divAnswerKeyCover")
                                    .children("div")
                                    .eq(0)
                                    .html(
                                      $(this)
                                        .html()
                                        .replace(
                                          '<textarea placeholder="What should the person say?" class="txt-textarea-long-answer"></textarea>',
                                          $(this).attr("correct"),
                                        )
                                        .replace(
                                          '<input placeholder="Underline the errors" class="txt-input-answer"> <input placeholder="Underline the errors" class="txt-input-answer">',
                                          "",
                                        )
                                        .replace(
                                          '<input placeholder="Underline the errors" class="txt-input-answer" /> <input placeholder="Underline the errors" class="txt-input-answer" />',
                                          "",
                                        ),
                                    ),
                                    $("#divAnswerKeyCover")
                                      .children("div")
                                      .eq(0)
                                      .children("span")
                                      .eq(0)
                                      .html($(this).attr("wrong")),
                                    $("#divAnswerKeyCover")
                                      .children("div")
                                      .eq(1)
                                      .html(
                                        $(this)
                                          .html()
                                          .replace(
                                            '<textarea placeholder="What should the person say?" class="txt-textarea-long-answer"></textarea>',
                                            t,
                                          )
                                          .replace(
                                            '<input placeholder="Underline the errors" class="txt-input-answer"> <input placeholder="Underline the errors" class="txt-input-answer">',
                                            "",
                                          )
                                          .replace(
                                            '<input placeholder="Underline the errors" class="txt-input-answer" /> <input placeholder="Underline the errors" class="txt-input-answer" />',
                                            "",
                                          ),
                                      ));
                                  var i = $(this).attr("raw");
                                  ($(this)
                                    .children(".txt-input-answer")
                                    .each(function () {
                                      "" != $.trim($(this).val()) &&
                                        (i = i.replace(
                                          $.trim($(this).val()),
                                          "<u>" +
                                            $.trim($(this).val()) +
                                            "</u>",
                                        ));
                                    }),
                                    $("#divAnswerKeyCover")
                                      .children("div")
                                      .eq(1)
                                      .children("span")
                                      .eq(0)
                                      .html(i));
                                  var n = $.trim(
                                      $("#divAnswerKeyCover")
                                        .children("div")
                                        .eq(0)
                                        .html(),
                                    ),
                                    s = $.trim(
                                      $("#divAnswerKeyCover")
                                        .children("div")
                                        .eq(1)
                                        .html(),
                                    );
                                  n.toLowerCase() == s.toLowerCase()
                                    ? $("#exercise-answer-key table").append(
                                        '<tr style="background:#1EA362; color:white"><td>' +
                                          (parseInt($(this).index()) + 1) +
                                          "</td><td>" +
                                          n +
                                          "</td><td>" +
                                          s +
                                          "</td></tr>",
                                      )
                                    : $("#exercise-answer-key table").append(
                                        "<tr><td>" +
                                          (parseInt($(this).index()) + 1) +
                                          "</td><td>" +
                                          n +
                                          "</td><td>" +
                                          s +
                                          "</td></tr>",
                                      );
                                }));
                          }));
                    }),
                  $("#exercise-answer-key").css({ display: "block" }));
              })));
        }
        $(".index-block-item li").click(function () {
          ($("#idiom-tip-popup").length > 0 && $("#idiom-tip-popup").remove(),
            $("body").append(
              '<div id="idiom-tip-popup"><div id="close-idiom-tip-popup"><img src="icons/close-window-50.png" /></div><div id="idiom-tip-popup-cover">' +
                $(this).children(".tool-index-idioms").html() +
                "</div></div>",
            ),
            $("#idiom-tip-popup").find(".word-image").remove(),
            $("#close-idiom-tip-popup img").click(function () {
              $("#idiom-tip-popup").remove();
            }));
        });
      }
    var h = JSON.parse(
      sessionStorage.getItem(path.split("/")[2] + ":" + e),
    ).reading;
    if (null != h) {
      $("#category-section")
        .children(".section")
        .children(".container")
        .append('<div id="story-block"></div>');
      var p = 0;
      for (o = 0; o < h.length; o++) {
        var u = h[o].type,
          v = h[o].block,
          m = ((r = h[o].en), h[o].story),
          g = h[o].image,
          w = h[o].sound;
        if ("story" == u) {
          var x = "word-image",
            y = "";
          (r.indexOf("Pronunciation Pointer") > -1 ||
            r.indexOf("Fun Fact!") > -1 ||
            r.indexOf("Did you spot it?") > -1 ||
            r.indexOf("Fun Farm Fact!") > -1) &&
            ((x = "word-image-small"),
            (y = "clear-both pronunciation-pointer"));
          c =
            '<div title="' +
            r +
            '" source="data/' +
            urlFriendly(e) +
            "/reading/" +
            h[o].sound +
            '" idx="' +
            o +
            '" class="' +
            y +
            '">';
          ("" != g &&
            ((c +=
              '<div class="' +
              x +
              '"><img  nid="' +
              (p + 1) +
              '" title="' +
              r +
              '" source="data/' +
              urlFriendly(e) +
              "/reading/" +
              h[o].sound +
              '" idx="' +
              p +
              '" class="speaker-louder" story="1" src="data/' +
              urlFriendly(e) +
              "/reading/" +
              g +
              '" /></div>'),
            "" != w
              ? ((c +=
                  '<h3 class="en-story-title">' +
                  r +
                  ' <img id="item' +
                  p +
                  '" remainAudioLoop="' +
                  remainAudioLoop +
                  '" nid="' +
                  (p + 1) +
                  '" title="' +
                  r +
                  '" source="data/' +
                  urlFriendly(e) +
                  "/reading/" +
                  h[o].sound +
                  '" idx="' +
                  p +
                  '" class="speaker-louder" story="1"  src="icons/speaker_louder.png" /></h3>'),
                (p += 1))
              : (c += '<h3 class="en-story-title">' + r + "</h3>")),
            (c +=
              '<div class="en-story">' +
              m +
              '</div><div style="clear:both"></div>'),
            (c += "</div>"),
            0 == $("#" + v.replace(" ", "-")).length &&
              $("#story-block").append(
                '<div class="box_shadow_block" style="padding:10px;" id="' +
                  v.replace(" ", "-") +
                  '"></div>',
              ),
            $("#" + v.replace(" ", "-")).append(c));
        }
      }
      $(".idiom-tip").click(function () {
        ($("#idiom-tip-popup").length > 0 && $("#idiom-tip-popup").remove(),
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
    var f = JSON.parse(
      sessionStorage.getItem(path.split("/")[2] + ":" + e),
    ).idioms;
    if (null != f || null != f) {
      $("#category-section")
        .children(".section")
        .children(".container")
        .append(
          '<div class="box_shadow_block" style="padding:15px;" id="idioms-block"><div class="idioms-block-title">MORE FUN WITH IDIOMATIC EXPRESSIONS: ' +
            f[0].pron +
            '</div><ul class="wordlist"></ul></div>',
        );
      for (o = 0; o < f.length; o++) {
        (f[o].en.substring(0, 1), (r = f[o].en), f[o].vi, f[o].pron);
        var b = f[o].desc,
          k = f[o].exam;
        ((g = f[o].image), (w = f[o].sound), (c = '<li id="idioms' + o + '">'));
        ((c += '<div class="wordlist-cover">'),
          (c += '<div><span class="word">' + r + ":</span> " + b + "</div>"),
          (c +=
            '<div  class="exam"><span class="arrow">→</span> ' + k + "</div>"),
          (c += "</div>"),
          (c += "</li>"),
          $("#idioms-block .wordlist").append(c));
      }
    }
    if (null != n || null != n) {
      $("#category-section")
        .children(".section")
        .children(".container")
        .append(
          '<div class="box_shadow_block" style="padding:15px;" id="vocabulary-block"><div class="voca-block-title">VOCABULARY</div><ul class="wordlist"></ul></div>',
        );
      for (o = 0; o < n.length; o++) {
        (n[o].en.substring(0, 1),
          (r = n[o].en),
          n[o].vi,
          n[o].pron,
          (b = n[o].desc),
          (k = n[o].exam),
          (g = n[o].image),
          (w = n[o].sound),
          (c = '<li id="voca' + o + '">'));
        ((c += '<div class="wordlist-cover">'),
          (c += '<div><span class="word">' + r + ":</span> " + b + "</div>"),
          (c += "</div>"),
          (c += "</li>"),
          $("#vocabulary-block .wordlist").append(c));
      }
    } else readFlag();
    (replaceChooseAnswer(),
      $(".counter").each(function () {
        $(this).css({
          "margin-left": ($(window).width() - $(this).width() - 20) / 2,
        });
      }),
      $(".speaker-louder").click(function () {
        var e = $(this).attr("source");
        ((autoPlay = !0),
          playSound((currentReadingIndex = $(this).attr("idx")), e),
          $("#nav-story li")
            .eq(0)
            .children("span")
            .html($(this).attr("title")));
      }),
      homeSectionResize(),
      scaleFontSize(),
      playSeeking(0));
    var _ = window.location.hash.substring(1);
    if ("" != _) {
      var S = _.split("&");
      if (S.length > 1)
        switch (S[1].toLowerCase()) {
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
      (playSound(
        currentReadingIndex,
        $("#item" + currentReadingIndex).attr("source"),
      ),
        focusReading(currentReadingIndex));
    }, 1e3));
}
function playSound(e, t) {
  (clearInterval(audioInterval), (currentReadingIndex = e));
  if (
    (null != t &&
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
            }, 2e3)));
      })),
    1 == isExercise())
  ) {
    var i = JSON.parse(localStorage.getItem(lsession));
    if (
      ($("#bottom-section").css({ display: "block" }),
      (s = $("#tbl-last-session" + (parseInt(i.index) + 1))).length > 0)
    ) {
      i = JSON.parse(localStorage.getItem(lsession));
      var n = s.parent().attr("en");
      i.sindex > 0
        ? $("#bottom-section")
            .children(".container")
            .html(
              '<ul id="nav-exercise"><li>Idioms</li><li>Dialogues</li><li style="color:yellow">' +
                n +
                "</li></ul>",
            )
        : $("#bottom-section")
            .children(".container")
            .html(
              '<ul id="nav-exercise"><li style="width:0%"></li><li style="width:0%"></li><li  style="width: calc(100% - 10px); text-align:center; padding-left:5px; padding-right:5px; color:yellow">' +
                n +
                "</li></ul>",
            );
    } else
      $("#bottom-section")
        .children(".container")
        .html(
          '<div class="app-name">English The American Way</div><div class="app-slogan">A Fun ESL Guide To Language and Culture In The U.S.</div>',
        );
    ($("#nav-exercise")
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
            (elm.currentTime = 0),
            playSeeking(0));
        }),
      $("#nav-exercise")
        .children("li")
        .eq(2)
        .click(function () {
          s.length > 0
            ? 0 == checkUnitOpened(n)
              ? showAdsForNextLesson(n, n, parseInt(i.index) + 1, 0)
              : (elm.pause(),
                (autoPlay = !1),
                1 == showAds() &&
                  JSBridge.LoadStoryAnswerKeyVideoAds(
                    n.toUpperCase() + " loaded. Check it out!",
                  ),
                showCategorySection(n, parseInt(i.index) + 1, 0))
            : $("#section-section").trigger("click");
        }));
  } else if (1 == isStory()) {
    $("#bottom-section").css({ display: "block" });
    ((i = JSON.parse(localStorage.getItem(lsession))),
      (n = (s = $("#tbl-last-session" + (parseInt(i.index) + 1)))
        .parent()
        .attr("en")));
    (s.length,
      $("#bottom-section")
        .children(".container")
        .html(
          '<ul id="nav-story"><li source="' +
            t +
            '"><img class="audio-play" status="0" src="icons/play.png" /><span style="margin-left:5px; position:relative; top:-23px">' +
            $("#item" + currentReadingIndex).attr("title") +
            '</span></li><li>Idioms</li><li style="color:yellow">' +
            n +
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
          s.length > 0
            ? 0 == checkUnitOpened(n)
              ? showAdsForNextLesson(n, n, parseInt(i.index) + 1, 0)
              : (elm.pause(),
                (autoPlay = !1),
                1 == showAds() &&
                  JSBridge.LoadStoryAnswerKeyVideoAds(
                    n.toUpperCase() + " loaded. Check it out!",
                  ),
                showCategorySection(n, parseInt(i.index) + 1, 0))
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
          elm.play()));
  } else {
    $("#bottom-section").css({ display: "block" });
    var s;
    i = JSON.parse(localStorage.getItem(lsession));
    (s = $("#tbl-last-session" + (parseInt(i.index) + 1))).length > 0
      ? ((n = s.parent().attr("en")),
        $("#bottom-section")
          .children(".container")
          .html(
            '<ul id="nav-exercise"><li style="width:0%"></li><li style="width:0%"></li><li  style="width: calc(100% - 10px); text-align:center; padding-left:5px; padding-right:5px; color:yellow">' +
              n +
              "</li></ul>",
          ),
        $("#nav-exercise")
          .children("li")
          .eq(2)
          .click(function () {
            s.length > 0
              ? 0 == checkUnitOpened(n)
                ? showAdsForNextLesson(n, n, parseInt(i.index) + 1, 0)
                : (elm.pause(),
                  (autoPlay = !1),
                  1 == showAds() &&
                    JSBridge.LoadStoryAnswerKeyVideoAds(
                      n.toUpperCase() + " loaded. Check it out!",
                    ),
                  showCategorySection(n, parseInt(i.index) + 1, 0))
              : $("#section-section").trigger("click");
          }))
      : $("#bottom-section")
          .children(".container")
          .html(
            '<div class="app-name">English The American Way</div><div class="app-slogan">A Fun ESL Guide To Language and Culture In The U.S.</div>',
          );
  }
  resizeExerciseStory();
}
function showAds() {
  var e = new Date(),
    t = e.getDate() + "-" + (e.getMonth() + 1) + "-" + e.getFullYear(),
    i = { adsCurrentDay: t };
  try {
    var n = localStorage.getItem("adsCurrentDay");
    return (
      (null == n || t != JSON.parse(n).adsCurrentDay) &&
      (localStorage.setItem("adsCurrentDay", JSON.stringify(i)), !0)
    );
  } catch (e) {
    return (localStorage.setItem("adsCurrentDay", JSON.stringify(i)), !0);
  }
}
function readFlag() {
  var e = JSON.parse(localStorage.getItem(lsession)),
    t = $("#tbl-last-session" + e.index)
      .parent()
      .attr("en");
  if (
    (localStorage.removeItem(path.split("/")[2] + ":" + t.toLowerCase()),
    null == localStorage.getItem(path.split("/")[2] + ":" + t.toLowerCase()))
  ) {
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
function showAdsForNextLesson1(e, t, i, n) {
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
        showCategorySection(e, i, n),
        $(".show-ads-cover").remove());
    }));
}
function checkUnitOpened(e) {
  return (
    null != localStorage.getItem(path.split("/")[2] + ":" + e.toLowerCase())
  );
}
function nextWordReading() {
  try {
    var e = JSON.parse(localStorage.getItem(lsetting));
    null != e &&
      1 == e.next &&
      (nextTimeOut = setTimeout(function () {
        null != $("#item" + currentReadingIndex).attr("nid") &&
          ((currentReadingIndex = $("#item" + currentReadingIndex).attr("nid")),
          $("#item" + currentReadingIndex).length > 0 &&
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
  } catch (e) {}
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
function homeScroll(e) {
  ($(window).scroll(function () {
    (parseInt($("#home-section").height()),
      $("#home-section").offset(),
      $(window).height());
    var e = parseInt($(this).scrollTop());
    if (($("#home-section").attr("top", e), $("#story-block").length > 0)) {
      var t = $("#story-block").position().top;
      $("#home-section").attr("vb", n - parseInt($(window).height()) - 150);
      var i = $("#idioms-block").position().top,
        n = $("#vocabulary-block").position().top;
      (e >= t - parseInt($(window).height()) + 150 &&
        $("#bottom-section")
          .find("#nav-story")
          .children("li")
          .eq(1)
          .html("Idioms"),
        e >= i - parseInt($(window).height()) + 150 &&
          $("#bottom-section")
            .find("#nav-story")
            .children("li")
            .eq(1)
            .html("Vocabulary"),
        e >= n - parseInt($(window).height()) + 150 &&
          $("#bottom-section")
            .find("#nav-story")
            .children("li")
            .eq(1)
            .html("Dialogue"));
    }
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
  var e = $(window).width() - 20;
  isMobile.any() || (e -= 18);
  var t,
    i = 320,
    n = Math.floor(e / i);
  (0 == n && (n = 1),
    (t = n > 2 ? 2 * (n - 1) * 10 : 10 * n),
    1 == n && (t = 0),
    (i = Math.floor((e - t) / n)),
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
  var e = 786432;
  ($(".en-word").each(function () {
    var t = $(window).width() * $(window).height();
    (Math.sqrt(t), Math.sqrt(e));
  }),
    $(".alphabet").each(function () {
      var t = $(window).width() * $(window).height(),
        i = 300 * (Math.sqrt(t) / Math.sqrt(e));
      $(".alphabet").css("font-size", i + "%");
    }),
    $(".en-story-title").each(function () {
      var t = $(window).width() * $(window).height(),
        i = 150 * (Math.sqrt(t) / Math.sqrt(e));
      i < 120 && (i = 120);
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
        var e = 120;
        ($(window).width() < 400 && (e = 90),
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
        var e = $("#item" + $(this).index()).children("div");
        e.css({ height: "", width: "", "overflow-y": "", "overflow-x": "" });
        ($(window).height(),
          $(".header").height(),
          $("#bottom-section").height());
        (e.height(),
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
        ($(window).height(),
          $(".header").height(),
          $("#bottom-section").height());
        (e.height(),
          $("#item" + $(this).index())
            .find(".faq-list-section")
            .children("ol")
            .css({ margin: "", padding: "" }),
          $(window).width() < 400 &&
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
      (null != i && (t = 1 == $.parseJSON(i).read ? "play" : "reading"),
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
        $("html,body").animate(
          { scrollTop: $("#tbl-last-session" + e.index).offset().top - 50 },
          0,
        ),
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
    .css({ "padding-top": 15, "padding-bottom": 0 });
}
function resizeLastSession() {
  var e = $(window).width() - 130 - 40;
  (e > 130 && (e = 130), $("#img-last-session-unit").css({ width: e }));
}
function resizeUnitItem() {
  var e =
    $("#home-section").children("ul").children("li").eq(0).width() - 130 - 20;
  (e > 130 && (e = 130),
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
  var e = 320;
  isMobile.any()
    ? (e = 200)
    : $(window).width() < e && (e = $(window).width() - 40);
}
function replaceChooseAnswer() {
  ($(".answer-the-questions-section .ul-choose-answer")
    .children("li")
    .each(function () {
      var e = $(this).html();
      ($(this).html(
        '<input type="radio" name="rdo' +
          $(this).parent().parent().parent().parent().index() +
          $(this).parent().parent().index() +
          $(this).parent().index() +
          '" /> ' +
          e,
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
        .replace(
          /__________/g,
          '<select class="opt-fill-blank"><option></option></select>',
        )
        .replace(
          /______/g,
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
    $(".word-blank-cover").length > 0 &&
      ("" == t && (t = e),
      $(".word-blank-cover")
        .find(".answer-the-questions-section-word-blank")
        .each(function () {
          1 == $(this).children(".opt-fill-blank").length &&
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
      (null != $(this).attr("explain") &&
        (e +=
          '<br/><textarea placeholder="Can you explain what they mean?" class="txt-textarea-long-answer"></textarea>'),
        $(this).html(e));
    }),
    $(".answer-the-questions-CI").each(function () {
      var e = $(this)
        .html()
        .replace(
          /______/,
          '<select class="opt-ci"><option></option><option>A</option><option>B</option></select>',
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
    $(".answer-the-questions-explain-expressions").each(function () {
      var e = $(this)
        .html()
        .replace(
          /__________/g,
          '<textarea class="txt-textarea-long-answer" placeholder="Can you explain?"></textarea>',
        )
        .replace(/_____/g, '<input class="txt-input-answer" />');
      $(this).html(e);
    }),
    $(".answer-the-questions-VX").each(function () {
      var e = $.trim($(this).html().replace(/_____/, "")),
        t = $(this)
          .html()
          .replace(
            /_____/,
            '<select class="opt-v-x"><option></option><option>V</option><option>X</option></select>',
          );
      ($(this).html(t),
        $(this).append(
          '<input raw="' +
            e +
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
      var e = $(this)
        .html()
        .replace(
          /__________/g,
          '<textarea placeholder="What should the person say?" class="txt-textarea-long-answer"></textarea>',
        )
        .replace(
          /_____/g,
          '<input placeholder="Underline the errors" class="txt-input-answer" /> <input placeholder="Underline the errors" class="txt-input-answer" />',
        );
      $(this).html(e);
    }));
}
function resizeTextareaAnswer() {
  ($(".txt-textarea-long-answer").css({ width: "" }),
    $(window).width() < 330 &&
      $(".txt-textarea-long-answer").css({ width: 230 }));
}
function loadAnswerKey(e) {
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
$(function () {
  if (
    ((elm = document.getElementById("sound")),
    $("#modal").css({ display: "block", opacity: "1" }),
    resizeModal(),
    resizeHomeSection(),
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
    url: "data/data.json",
    type: "GET",
    dataType: "text",
    success: function (e) {
      var t = $.parseJSON(e).flashcard;
      loadedTime = t.length;
      for (
        var i =
            "#0D7F9B,#82823F,#D2462A,#4d2f82,#0F505B,#485A90,#82823F,#2E3A98,#985154,#6c5658,#2d7d6e".split(
              ",",
            ),
          n = 0,
          s = 0;
        s < t.length;
        s++
      ) {
        var o = t[s].en,
          r = t[s].desc;
        null == r && (r = "Unit");
        var a = urlFriendlyFull(r.toLowerCase());
        0 == $("#div-" + a).length &&
          ($("#home-section").append(
            '<div id="div-' +
              a +
              '"><div class="section-cover" style="display:none;font-weight: bold; text-align: left; background:' +
              i[n] +
              '"><div style="padding:13px 10px; color:white;">' +
              r +
              '</div></div><ul class="curriculum-item"></ul></div>',
          ),
          (n += 1));
        var l = "waiting",
          d = localStorage.getItem(path.split("/")[2] + ":" + o.toLowerCase());
        null != d && (l = 1 == $.parseJSON(d).read ? "play" : "reading");
        (path.split("/")[2], urlFriendlyFull(o.toLowerCase()));
        if (null != t[s].wordlist) {
          var c = t[s].wordlist.length,
            h = t[s].reading[0].en;
          ("/apps/" +
            path.split("/")[2] +
            "/" +
            urlFriendlyFull(o).toLowerCase() +
            "/#" +
            s,
            $("#div-" + a)
              .children("ul")
              .append(
                '<li class="item  word-list-session" story-title="' +
                  h +
                  '"  en="' +
                  o +
                  '" idx="' +
                  s +
                  '" wl="' +
                  c +
                  '"><table id="tbl-last-session' +
                  s +
                  '"><tr><td><div class="' +
                  l +
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
                s +
                '" wl="0" ><table id="tbl-last-session' +
                s +
                '"><tr><td><div class="' +
                l +
                '"></div></td><td><div class="title">' +
                o +
                "</div></td></tr></table></li>",
            );
        (sessionStorage.setItem(
          path.split("/")[2] + ":" + o,
          JSON.stringify(t[s]),
        ),
          (loadedTime -= 1),
          s == t.length - 1 &&
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
