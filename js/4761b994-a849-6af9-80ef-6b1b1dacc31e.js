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
  answerTimerInterval,
  win_width = $(window).width(),
  win_height = $(window).height(),
  lang = 2,
  tmp = "",
  audioLoop = 0,
  currentTime = 0;
function succeded(e, t, i) {
  t;
}
var intervalInit,
  audioTimeout,
  elm,
  loadedTime = 0,
  ads = !1,
  countUnitLearned = 0,
  adsNextUnit = !0,
  autoPlay = !1;
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
      (0 < $("#answer-popup").length &&
        ($("#answer-popup").remove(),
        clearInterval(answerTimerInterval),
        (answerTimerInterval = null)),
        0 < $("#idiom-tip-popup").length && $("#idiom-tip-popup").remove(),
        null != elm && (elm.pause(), (elm.currentTime = 0)),
        loadLastSession(),
        clearTimeout(nextTimeOut),
        clearTimeout(loopTimeOut),
        $("#bottom-section")
          .children(".container")
          .html(
            '<div class="app-name">“400 Must Have Words for the TOEFL”</div><div class="app-slogan">Lynn Stafford-Yilmaz Lawrence J. Zwier</div>',
          ),
        $("#bottom-section").css({ display: "block" }),
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
        $("#home-section").animate(
          { scrollTop: $("#category-section").attr("top") },
          0,
        ),
        $("#home-section").animate({ opacity: 1, left: 0 }, 0, function () {}));
    }),
    $("#settings").click(function () {
      settings($("#settings").attr("itemid"));
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
    ? 100 < e
      ? ($("#item" + elm_index).animate(
          { left: -$(window).width() },
          400,
          function () {},
        ),
        1 == $("#item" + next).attr("story") ||
        1 == $("#item" + next).attr("exercise")
          ? (elm.pause(),
            (autoPlay = !1),
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
          ? (elm.pause(),
            (autoPlay = !1),
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
          localStorage.setItem("settings", JSON.stringify(e));
        }));
    }
    var t = JSON.parse(localStorage.getItem("settings"));
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
    $("#category-section").css({ width: e }),
    $("#modal").css({ width: $(window).width(), height: $(window).height() }));
}
function resizeHomeSection() {
  var e =
      $(window).height() -
      $(".header").height() -
      $("#bottom-section").height(),
    t = $(".header").css("height"),
    i = $("#home-section");
  (i.css({ height: e, top: t }),
    i.css({ height: "", width: "", "overflow-y": "", "overflow-x": "" }),
    i.height() > e &&
      i.css({ height: e, "overflow-y": "overlay", "overflow-x": "hidden" }),
    $("#category-section").css({ height: e, top: t }));
}
function showCategorySection(e, t, i) {
  ((autoPlay = !1),
    0 < $("#answer-popup").length &&
      ($("#answer-popup").remove(),
      clearInterval(answerTimerInterval),
      (answerTimerInterval = null)),
    0 < $("#idiom-tip-popup").length && $("#idiom-tip-popup").remove(),
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
    $("#category-section").css({ position: "fixed" }),
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
  var n = JSON.parse(localStorage.getItem("settings"));
  ((audioLoop = n.loop), (currentReadingIndex = i), getSectionItem(e));
}
function getSectionItem(e) {
  if (null != sessionStorage[e]) {
    var t = JSON.parse(localStorage.getItem("settings"));
    ((remainAudioLoop = null != t && 0 < t.loop ? t.loop : 0),
      $("#category-section")
        .children(".section")
        .children(".container")
        .html(""));
    var i = JSON.parse(sessionStorage.getItem(e)).wordlist;
    if (null != i)
      for (var n = 0; n < i.length; n++) {
        i[n].en.substring(0, 1);
        var s = i[n].en,
          o = (i[n].vi, i[n].pron),
          d = i[n].desc,
          r = i[n].exam,
          a = i[n].image,
          l = i[n].sound,
          c =
            '<li remainAudioLoop="' + remainAudioLoop + '" id="item' + n + '">';
        ((c +=
          '<div class="word-image"><img src="data/' +
          e.replace(/ /g, "-") +
          "/wordlist/" +
          a +
          '" /></div>'),
          (c +=
            '<div class="en-word">' +
            s +
            ' <span class="en-pron">' +
            o +
            '</span>  <img source="data/' +
            e.replace(/ /g, "-") +
            "/wordlist/" +
            l +
            '" class="speaker-louder" style="width:20px" src="icons/speaker_louder.png" /></div>'),
          (c += '<div class="en-desc">' + d + "</div>"),
          (c +=
            '<div class="en-exam"><span class="arrow">→</span>  ' +
            r +
            "</div>"),
          (c +=
            '<div style="text-align:center; padding-top:20px; width:100%; display:none"><div class="counter reading"><div></div></div><div style="clear:both"></div></div>'),
          (c += "</li>"),
          $("#category-section")
            .children(".section")
            .children(".container")
            .append(c),
          $("#item" + n).attr(
            "source",
            "data/" + e.replace(/ /g, "-") + "/wordlist/" + l,
          ),
          $("#item" + n)
            .find(".speaker-louder")
            .click(function () {
              ((autoPlay = !0),
                clearTimeout(nextTimeOut),
                clearTimeout(loopTimeOut),
                clearTimeout(autoNextTimeOut),
                playSound(currentReadingIndex, $(this).attr("source")));
            }));
      }
    var h = JSON.parse(sessionStorage.getItem(e)).exercise;
    if (null != h)
      if ("index" == e.toLowerCase()) {
        for (n = 0; n < 1; n++) {
          s = h[n].en;
          var p = h[n].story;
          if (0 == n) {
            var v = JSON.parse(localStorage.getItem("lastestSession")),
              m = 0;
            (null == i && null == i) || (m = i.length);
            var u = {
              title: v.title,
              image: $("#home-section")
                .children("ul")
                .children("li")
                .eq(v.index)
                .find("img")
                .attr("src"),
              index: v.index,
              windex: 0,
              eindex: m,
              sindex: 0,
            };
            localStorage.setItem("lastestSession", JSON.stringify(u));
            c = '<li exercise="1" id="item' + m + '"><div>';
            ((c +=
              '<div class="en-story"><div class="faq-list-section"><div class="index-alphabet-item">' +
              s +
              "</div>" +
              p +
              "</div></div>"),
              (c += "</div></li>"),
              $("#category-section")
                .children(".section")
                .children(".container")
                .append(c));
          }
        }
        setTimeout(function () {
          for (var e = 1; e < h.length; e++) {
            var t = h[e].en,
              i = h[e].story;
            ($("#item" + m)
              .find(".en-story")
              .append(
                '<div class="faq-list-section"><div class="index-alphabet-item">' +
                  t +
                  "</div>" +
                  i +
                  "</div></div>",
              ),
              e == h.length - 1 &&
                $("#item" + m)
                  .find(".en-story")
                  .append(
                    '<p class="answer-key-remove-after">&nbsp;</p><p>&nbsp;</p>',
                  ));
          }
          ($(".index-block-item li").click(function () {
            (0 < $("#idiom-tip-popup").length && $("#idiom-tip-popup").remove(),
              $("body").append(
                '<div id="idiom-tip-popup"><div id="close-idiom-tip-popup"><img src="icons/close-window-50.png" /></div><div id="idiom-tip-popup-cover">' +
                  $(this).children(".tool-index-idioms").html() +
                  "</div></div>",
              ),
              $("#idiom-tip-popup").find(".word-image").remove(),
              $("#close-idiom-tip-popup img").click(function () {
                $("#idiom-tip-popup").remove();
              }));
          }),
            scaleFontSizeIndexToolTips());
        }, 200);
      } else
        for (n = 0; n < h.length; n++) {
          ((s = h[n].en), (p = h[n].story));
          if (0 == n) {
            ((v = JSON.parse(localStorage.getItem("lastestSession"))), (m = 0));
            (null == i && null == i) || (m = i.length);
            u = {
              title: v.title,
              image: $("#home-section")
                .children("ul")
                .children("li")
                .eq(v.index)
                .find("img")
                .attr("src"),
              index: v.index,
              windex: 0,
              eindex: m,
              sindex: 0,
            };
            localStorage.setItem("lastestSession", JSON.stringify(u));
            c = '<li exercise="1" id="item' + m + '"><div>';
            ((c +=
              '<div class="en-story"><div class="exercise-section-red">' +
              s +
              '</div><div class="faq-list-section" title="' +
              s +
              '">' +
              p +
              "</div></div>"),
              (c += "</div></li>"),
              $("#category-section")
                .children(".section")
                .children(".container")
                .append(c),
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
            "Answer Key" == s
              ? $("#item" + m)
                  .find(".en-story")
                  .append(
                    '<div id="exercise-answer-key"><div class="exercise-section">' +
                      s +
                      '</div><div class="faq-list-section" title="' +
                      s +
                      '">' +
                      p +
                      "</div><p>&nbsp;</p></div></div>",
                  )
              : $("#item" + m)
                  .find(".en-story")
                  .append(
                    '<div class="exercise-section-red">' +
                      s +
                      '</div><div class="faq-list-section" title="' +
                      s +
                      '">' +
                      p +
                      "</div></div>",
                  );
          n == h.length - 1 &&
            ("" != s
              ? ($("#item" + m)
                  .find(".en-story")
                  .append(
                    '<div class="exercise-section-red-answer-key">Answer Key</div><p class="answer-key-remove-after">&nbsp;</p><p>&nbsp;</p>',
                  ),
                $(".exercise-section-red-answer-key").click(function () {
                  (sendLoginAction("Answer Key. Check it out!"),
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
                        ($(this)
                          .children("ol")
                          .each(function (e) {
                            ($("#exercise-answer-key table").append(
                              '<tr><td colspan="3" style="font-weight:bold; text-align:left">' +
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
                                  (1 < e.length &&
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
                                  var s = $.trim(
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
                                  s == o
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
                                          '</td><td style="background:#1EA362; color:white">' +
                                          s +
                                          '</td><td style="background:#D9433D; color:white">' +
                                          o +
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
                                }));
                          }),
                          $(this)
                            .children(".word-blank-cover")
                            .each(function (e) {
                              var t = $(this).attr("h4index");
                              (null != t && (e = t),
                                $("#exercise-answer-key table").append(
                                  '<tr><td colspan="3" style="font-weight:bold; text-align:left">' +
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
                            .children(".word-or-phrase")
                            .each(function (e) {
                              var t = $(this).attr("h4index");
                              (null != t && (e = t),
                                $("#exercise-answer-key table").append(
                                  '<tr><td colspan="3" style="font-weight:bold; text-align:left">' +
                                    $(this)
                                      .parent()
                                      .children("h4")
                                      .eq(e)
                                      .html() +
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
                                          $(this)
                                            .find(".opt-word-phrase")
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
                            }));
                      }),
                    $("#exercise-answer-key").append("<p>&nbsp;</p>"),
                    $("#exercise-answer-key").css({ display: "block" }));
                }))
              : $("#item" + m)
                  .find(".en-story")
                  .append('<p class="answer-key-remove-after">&nbsp;</p>'));
        }
    var w = JSON.parse(sessionStorage.getItem(e)).reading;
    if (null != w)
      for (n = 0; n < w.length; n++) {
        var g = w[n].type,
          f = ((s = w[n].en), w[n].vi, w[n].story);
        ((a = w[n].image), (l = w[n].sound));
        if ("story" == g) {
          u = {
            title: (v = JSON.parse(localStorage.getItem("lastestSession")))
              .title,
            image: $("#home-section")
              .children("ul")
              .children("li")
              .eq(v.index)
              .find("img")
              .attr("src"),
            index: v.index,
            windex: 0,
            eindex: v.eindex,
            sindex: i.length + 1,
          };
          localStorage.setItem("lastestSession", JSON.stringify(u));
          c =
            '<li  story="1" remainAudioLoop="' +
            remainAudioLoop +
            '" id="item' +
            (i.length + 1) +
            '"><div style="padding:10px">';
          ((c += '<div class="en-story-title">' + s + "</div>"),
            (c += '<div class="en-story">' + f + "</div>"),
            (c +=
              '<div style="text-align:center; padding-top:20px; width:100%; display:none"><div class="counter reading"><div></div></div><div style="clear:both"></div></div>'),
            (c += "</div></li>"),
            $("#category-section")
              .children(".section")
              .children(".container")
              .append(c));
        } else
          "Answer Key" == s
            ? $("#item" + (i.length + 1))
                .find(".en-story")
                .append(
                  '<div id="reading-answer-key"><div class="reading-comprehension-section">' +
                    s +
                    '</div><div class="faq-list-section" title="' +
                    s +
                    '">' +
                    f +
                    "</div></div>",
                )
            : $("#item" + (i.length + 1))
                .find(".en-story")
                .append(
                  '<p></p><div class="faq-list-section" title="' +
                    s +
                    '">' +
                    f +
                    "</div>",
                );
        n == w.length - 1 &&
          ("" != s
            ? ($("#item" + (i.length + 1))
                .find(".en-story")
                .append(
                  '<div class="reading-section-red-answer-key">Answer Key</div><p class="reading-answer-key-remove-after">&nbsp;</p><p>&nbsp;</p>',
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
                      $(this)
                        .children("ol")
                        .each(function (e) {
                          ($(this)
                            .children(
                              ".answer-the-questions-section-true-false",
                            )
                            .each(function (e) {
                              ($("#exercise-answer-key table").append(
                                '<tr><td colspan="3" style="font-weight:bold; text-align:left">' +
                                  $(this).parent().children("h4").eq(e).html() +
                                  "</td></tr>",
                              ),
                                $("#divAnswerKeyCover").remove(),
                                0 == $("#divAnswerKeyCover").length &&
                                  $("body").append(
                                    '<div id="divAnswerKeyCover" style="display:none"><div></div><div></div></div>',
                                  ),
                                "" != $(this).attr("fvalue")
                                  ? ($("#divAnswerKeyCover")
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
                                      ))
                                  : ($("#divAnswerKeyCover")
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
                                (1 < e.length &&
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
                                s == o
                                  ? $("#reading-answer-key table").append(
                                      '<tr style="background:#1EA362; color:white"><td>' +
                                        (parseInt($(this).index()) + 1) +
                                        "</td><td>" +
                                        s +
                                        "</td><td>" +
                                        o +
                                        "</td></tr>",
                                    )
                                  : $("#reading-answer-key table").append(
                                      "<tr><td>" +
                                        (parseInt($(this).index()) + 1) +
                                        '</td><td style="background:#1EA362; color:white">' +
                                        s +
                                        '</td><td style="background:#D9433D; color:white">' +
                                        o +
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
                              }),
                            $(this)
                              .children(".answer-the-questions-CI")
                              .each(function () {
                                (0 == $("#trAB").length &&
                                  $("#reading-answer-key table").append(
                                    '<tr id="trAB"><td>2</td><td colspan="2">Schematic table: Write the letter of each phrase in either column A or column B, based on which one it relates to according to the reading.</td></tr>',
                                  ),
                                  $("#divAnswerKeyCover").remove(),
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
                                  ? $("#reading-answer-key table").append(
                                      '<tr style="background:#1EA362; color:white"><td></td><td>' +
                                        e +
                                        "</td><td>" +
                                        t +
                                        "</td></tr>",
                                    )
                                  : $("#reading-answer-key table").append(
                                      '<tr><td></td><td style="background:#1EA362; color:white">' +
                                        e +
                                        '</td><td style="background:#D9433D; color:white">' +
                                        t +
                                        "</td></tr>",
                                    );
                              }));
                        });
                    }),
                  $("#reading-answer-key").append("<p>&nbsp;</p>"),
                  $("#reading-answer-key").css({ display: "block" }));
              }))
            : $("#item" + (i.length + 1))
                .find(".en-story")
                .append("<div>&nbsp;</div>"));
      }
    (replaceChooseAnswer(),
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
  ((currentReadingIndex = e),
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
function playSound(i, e) {
  (clearInterval(audioInterval), (currentReadingIndex = i));
  if (
    ($("#adContainerItemDetail").css({ display: "block" }), 1 == isExercise())
  ) {
    $("#bottom-section").css({ display: "block" });
    var n = JSON.parse(localStorage.getItem("lastestSession"));
    if (
      ($("#bottom-section").css({ display: "block" }),
      0 < (o = $("#tbl-last-session" + (parseInt(n.index) + 1))).length)
    ) {
      var s = o.find("div").eq(0).attr("en");
      0 < n.sindex
        ? $("#bottom-section")
            .children(".container")
            .html(
              '<ul id="nav-exercise"><li>Target Words</li><li>TOEFL Success</li><li style="color:yellow">' +
                s +
                "</li></ul>",
            )
        : $("#bottom-section")
            .children(".container")
            .html(
              '<ul id="nav-exercise"><li style="width:0%"></li><li style="width:0%"></li><li  style="width: calc(100% - 10px); text-align:center; padding-left:5px; padding-right:5px; color:yellow">' +
                s +
                "</li></ul>",
            );
    } else
      $("#bottom-section")
        .children(".container")
        .html(
          '<div class="app-name">“400 Must Have Words for the TOEFL”</div><div class="app-slogan">Lynn Stafford-Yilmaz Lawrence J. Zwier</div>',
        );
    ($("#nav-exercise")
      .children("li")
      .eq(2)
      .click(function () {
        var e = JSON.parse(localStorage.getItem("lastestSession")),
          t = $("#tbl-last-session" + (parseInt(e.index) + 1));
        if (0 < t.length) {
          var i = t.find("div").eq(0).attr("en");
          (0 == adsNextUnit && (adsNextUnit = !0),
            isNaN(parseInt(t.find("td").eq(1).children("div").attr("wl")))
              ? showCategorySection(i, parseInt(e.index) + 1, 0)
              : showCategorySection(
                  i,
                  parseInt(e.index) + 1,
                  parseInt(t.find("td").eq(1).children("div").attr("wl")) + 1,
                ));
        }
      }),
      $("#nav-exercise")
        .children("li")
        .eq(1)
        .click(function () {
          (panLeft(),
            panEnd(110),
            setTimeout(function () {
              $("#item" + currentReadingIndex)
                .children("div")
                .animate({ scrollTop: 0 });
            }, 200));
        }),
      $("#nav-exercise")
        .children("li")
        .eq(0)
        .click(function () {
          ($("#bottom-section").css({ display: "none" }),
            (autoPlay = !0),
            elm.pause(),
            playSeeking(0),
            setTimeout(function () {
              $("#item" + currentReadingIndex)
                .children("div")
                .animate({ scrollTop: 0 });
            }, 200));
        }),
      swipeWindow());
  } else if (1 == isStory()) {
    $("#bottom-section").css({ display: "block" });
    n = JSON.parse(localStorage.getItem("lastestSession"));
    if (0 < (o = $("#tbl-last-session" + (parseInt(n.index) + 1))).length) {
      ((n = JSON.parse(localStorage.getItem("lastestSession"))),
        (s = o.find("div").eq(0).attr("en")));
      0 < n.sindex
        ? $("#bottom-section")
            .children(".container")
            .html(
              '<ul id="nav-story"><li>Target Words</li><li>TOEFL Prep</li><li style="color:yellow">' +
                s +
                "</li></ul>",
            )
        : $("#bottom-section")
            .children(".container")
            .html(
              '<ul id="nav-story"><li style="width:0%"></li><li style="width:0%"></li><li  style="width: calc(100% - 10px); text-align:center; padding-left:5px; padding-right:5px; color:yellow">' +
                s +
                "</li></ul>",
            );
    } else
      $("#bottom-section")
        .children(".container")
        .html(
          '<div class="app-name">“400 Must Have Words for the TOEFL”</div><div class="app-slogan">Lynn Stafford-Yilmaz Lawrence J. Zwier</div>',
        );
    ($("#nav-story")
      .children("li")
      .eq(0)
      .click(function () {
        ($("#bottom-section").css({ display: "none" }),
          (autoPlay = !0),
          elm.pause(),
          playSeeking(0),
          setTimeout(function () {
            $("#item" + currentReadingIndex)
              .children("div")
              .animate({ scrollTop: 0 });
          }, 200));
      }),
      $("#nav-story")
        .children("li")
        .eq(1)
        .click(function () {
          ($("#bottom-section").css({ display: "none" }),
            clearTimeout(nextTimeOut),
            clearTimeout(loopTimeOut),
            clearTimeout(autoNextTimeOut),
            elm.pause(),
            playSeeking(n.sindex - 1));
        }),
      $("#nav-story")
        .children("li")
        .eq(2)
        .click(function () {
          elm.pause();
          var e = JSON.parse(localStorage.getItem("lastestSession")),
            t = $("#tbl-last-session" + (parseInt(e.index) + 1));
          if (0 < t.length) {
            var i = t.find("div").eq(0).attr("en");
            (0 == adsNextUnit && (adsNextUnit = !0),
              isNaN(parseInt(t.find("td").eq(1).children("div").attr("wl")))
                ? showCategorySection(i, parseInt(e.index) + 1, 0)
                : showCategorySection(
                    i,
                    parseInt(e.index) + 1,
                    parseInt(t.find("td").eq(1).children("div").attr("wl")) + 1,
                  ));
          }
        }),
      swipeWindow());
  } else {
    var o;
    n = JSON.parse(localStorage.getItem("lastestSession"));
    if (
      ($("#bottom-section").css({ display: "block" }),
      0 < (o = $("#tbl-last-session" + (parseInt(n.index) + 1))).length)
    ) {
      s = o.find("div").eq(0).attr("en");
      $("#bottom-section")
        .children(".container")
        .html(
          '<ul id="nav-wordlist"><li>TOEFL Prep</li><li>TOEFL Success</li><li style="color:yellow">' +
            s +
            "</li></ul>",
        );
    } else
      $("#bottom-section")
        .children(".container")
        .html(
          '<ul id="nav-wordlist"><li>TOEFL Prep</li><li>TOEFL Success</li><li>INDEX</li></ul>',
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
          playSeeking(n.sindex - 1));
      }),
      $("#nav-wordlist")
        .children("li")
        .eq(1)
        .click(function () {
          ($("#bottom-section").css({ display: "none" }),
            clearTimeout(nextTimeOut),
            clearTimeout(loopTimeOut),
            clearTimeout(autoNextTimeOut),
            elm.pause(),
            playSeeking(n.sindex));
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
            var i = t.find("div").eq(0).attr("en");
            (0 == adsNextUnit && (adsNextUnit = !0),
              isNaN(parseInt(t.find("td").eq(1).children("div").attr("wl")))
                ? showCategorySection(i, parseInt(e.index) + 1, 0)
                : showCategorySection(
                    i,
                    parseInt(e.index) + 1,
                    parseInt(t.find("td").eq(1).children("div").attr("wl")) + 1,
                  ));
          }
        }));
  }
  ($("#item" + i)
    .find(".reading")
    .unbind("click"),
    null != e &&
      ((elm.src = e),
      (elm.onloadedmetadata = function () {
        (null != localStorage[e]
          ? ((t = localStorage.getItem(e)),
            parseInt(t) < 1e3 && localStorage.setItem(e, parseInt(t) + 1),
            $("#item" + i)
              .find(".counter")
              .children("div")
              .html(localStorage.getItem(e)))
          : ($("#item" + i)
              .find(".counter")
              .children("div")
              .html(1),
            localStorage.setItem(e, "1")),
          localStorage.setItem("currentIndex", currentReadingIndex),
          1 == autoPlay ? elm.play() : (autoPlay = !0));
      }),
      (elm.onended = function () {
        if (1 == isStory())
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
        else {
          var e = parseInt(
            $("#item" + currentReadingIndex).attr("remainAudioLoop"),
          );
          0 < e
            ? (loopTimeOut = setTimeout(function () {
                ($("#item" + currentReadingIndex).attr(
                  "remainAudioLoop",
                  e - 1,
                ),
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
                ($("#item" + i)
                  .find(".reading")
                  .click(function () {
                    (clearTimeout(nextTimeOut),
                      clearTimeout(loopTimeOut),
                      clearTimeout(autoNextTimeOut),
                      playSound(i, $(this).parent().parent().attr("source")));
                  }),
                  $("#item" + currentReadingIndex).attr(
                    "remainAudioLoop",
                    remainAudioLoop,
                  ),
                  nextWordReading());
              }, 200)));
        }
      })));
}
function nextWordReading() {
  var e = JSON.parse(localStorage.getItem("settings"));
  null != e &&
    1 == e.next &&
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
        height:
          $("#item" + e)
            .find(".word-image")
            .children("img")
            .height() + 30,
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
  var e = $(window).width() - 20;
  isMobile.any() || (e -= 18);
  var t,
    i = 320,
    n = Math.floor(e / i);
  (0 == n && (n = 1),
    (t = 2 < n ? 2 * (n - 1) * 10 : 10 * n),
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
        ((0 < $(this).index()) & ($(this).index() % n == 0) &&
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
  var i = 786432;
  ($(".en-word").each(function () {
    var e = $(window).width() * $(window).height(),
      t = 270 * (Math.sqrt(e) / Math.sqrt(i));
    $(".en-word").css("font-size", t + "%");
  }),
    $(".vn-word").each(function () {
      var e = $(window).width() * $(window).height(),
        t = 140 * (Math.sqrt(e) / Math.sqrt(i));
      $(".vn-word").css("font-size", t + "%");
    }),
    $(".alphabet").each(function () {
      var e = $(window).width() * $(window).height(),
        t = 300 * (Math.sqrt(e) / Math.sqrt(i));
      $(".alphabet").css("font-size", t + "%");
    }),
    $(".en-story-title").each(function () {
      var e = $(window).width() * $(window).height(),
        t = 160 * (Math.sqrt(e) / Math.sqrt(i));
      (150 < t && (t = 150),
        t < 120 && (t = 120),
        $(".en-story-title").css("font-size", t + "%"));
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
          300 <= hImage && (hImage = 300),
          hImage <= 120 &&
            ((hImage = 120), $(this).css({ margin: "10px 0px 10px 0px" })),
          $(this).css({ height: hImage, width: hImage }),
          $(this).parent().css({ float: "", padding: "" }),
          $("#item" + currentReadingIndex)
            .find(".en-story-title")
            .css({ "padding-bottom": "" }),
          1 == parseInt($(this).attr("story"))
            ? (180 < hImage && $(this).css({ height: 180, width: 180 }),
              hImage < 100 && $(this).css({ height: 100, width: 100 }),
              450 <= $(window).width() &&
                $("#item" + currentReadingIndex)
                  .find(".en-story-title")
                  .css({ "padding-bottom": 10 }))
            : (180 <
                (hImage =
                  ($(window).height() -
                    $(this).parent().parent().find(".en-word").height() -
                    $(this).parent().parent().find(".en-exam").height() -
                    $(this).parent().parent().find(".en-desc").height() -
                    $("#bottom-section").height()) /
                  2) && (hImage = 180),
              $(this).css({ height: hImage, width: hImage })));
      }),
    $("#category-section")
      .children(".section")
      .children(".container")
      .find(".story-image")
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
          150 <= hImage && (hImage = 150),
          hImage <= 120 &&
            ((hImage = 120), $(this).css({ margin: "0px 0px 10px 0px" })),
          $(this).css({ height: hImage, width: hImage }),
          $(this).parent().css({ float: "", padding: "" }),
          $("#item" + currentReadingIndex)
            .find(".en-story-title")
            .css({ "padding-bottom": "" }),
          $(window).width() < 400 && (hImage = 120),
          250 <= hImage && $(this).css({ height: 250, width: 250 }),
          hImage <= 120 && $(this).css({ height: 120, width: 120 }),
          $(window).width());
      }),
    $("#section-section")
      .children(".title")
      .css({ width: $(window).width() - 80 }),
    resizeUsageTipsSeg());
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
  1 == $("#item" + currentReadingIndex).attr("story") ||
  1 == $("#item" + currentReadingIndex).attr("exercise")
    ? ($("#item" + currentReadingIndex).attr("style", "width: 100%"),
      $("#item" + currentReadingIndex)
        .children("div")
        .attr("style", ""))
    : $("#item" + currentReadingIndex).css({ position: "fixed", left: 10 });
}
function isStory() {
  return 1 == parseInt($("#item" + currentReadingIndex).attr("story"));
}
function isExercise() {
  return 1 == parseInt($("#item" + currentReadingIndex).attr("exercise"));
}
function resizeExerciseStory() {
  $("#category-section")
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
          $(window).width() < 400 &&
            $("#item" + $(this).index())
              .find(".faq-list-section")
              .children("ol")
              .css({ margin: "0px", padding: "0px 0px 0px 20px" }));
      }
    });
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
          $(window).width() < 400 &&
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
        : ($(this).children("div").width(),
          $(this).children("div").css({ width: "", float: "" })));
  }),
    $(".toefl-prep-para").each(function () {
      $(this).parent().css({ "font-weight": "normal" });
    }));
}
function loadLastSession() {
  try {
    var e = JSON.parse(localStorage.getItem("lastestSession"));
    if (null != e) {
      if ("Index" != e.title) {
        var t = e.title.substring(e.title.indexOf(" - ") + 3, e.title.length);
        $("#home-section")
          .children("div")
          .html(
            '<table id="tbl-last-session"><tr><td><img id="img-last-session-unit" src="' +
              e.image +
              '" /></td><td><div id="word-list-session" class="button-lastest-session">Target Words</div><div style="padding:3px"></div><div id="exercise-lastest-session" class="button-lastest-session">TOEFL Prep</div><div style="padding:3px"></div><div id="story-lastest-session" class="button-lastest-session">TOEFL Success</div></td></tr><tr><td colspan="2"><div class="button-lastest-lesson">' +
              t +
              "</div></td></tr></table>",
          );
      } else
        $("#home-section")
          .children("div")
          .html(
            '<table id="tbl-last-session"><tr><td style="position:relative"><img id="word-list-session" class="word-list-session img-last-session-unit" style="border:0px" src="' +
              e.image +
              '" /></td></tr></table><div class="lastest-title">' +
              e.title +
              "</div>",
          );
      ($("#home-section").children("div").css({ background: "white" }),
        $("#word-list-session").click(function () {
          showCategorySection(e.title, e.index, 0);
        }),
        $("#exercise-lastest-session").click(function () {
          var e = JSON.parse(localStorage.getItem("lastestSession"));
          showCategorySection(e.title, e.index, e.eindex);
        }),
        $("#story-lastest-session").click(function () {
          var e = JSON.parse(localStorage.getItem("lastestSession"));
          showCategorySection(e.title, e.index, e.sindex);
        }),
        resizeLastSession(),
        resizeUnitItem());
    }
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
  localStorage.setItem("lastestSession", JSON.stringify(i));
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
      var t = $(this).children("span").eq(0).html().split("/"),
        e = $(this)
          .html()
          .replace(
            /__________/g,
            ' <select class="opt-better-fit"><option></option></select> ',
          );
      ($(this).html(e),
        $(this)
          .find(".opt-better-fit")
          .each(function () {
            for (var e = 0; e < t.length; e++)
              $(this).append(
                '<option value="' +
                  $.trim(t[e]) +
                  '">' +
                  $.trim(t[e]) +
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
    }));
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
    $("#extendedSplashProgress").css({
      left: ($(window).width() - $("#extendedSplashProgress").width()) / 2,
    }),
    resizeModal(),
    resize(),
    null == localStorage.getItem("settings"))
  ) {
    localStorage.setItem("settings", JSON.stringify({ next: !0, loop: 0 }));
  }
  ($.ajax({
    url: "data/data.json",
    type: "GET",
    dataType: "text",
    success: function (e) {
      var t = $.parseJSON(e).flashcard;
      ($("#home-section").html(""),
        $("#home-section").append(
          '<div style="padding-bottom:20px"></div><ul></ul>',
        ),
        (loadedTime = t.length));
      for (var i = 0; i < t.length; i++) {
        var n = t[i].en,
          s = (t[i].vi, n.substring(n.indexOf(" - ") + 3, n.length));
        (null != t[i].wordlist
          ? $("#home-section")
              .children("ul")
              .append(
                '<li><div><table id="tbl-last-session' +
                  i +
                  '"><tr><td><img  en="' +
                  n +
                  '" idx="' +
                  i +
                  '" class="img-last-session-unit word-list-session" src="data/' +
                  n.replace(/ /g, "-") +
                  "/" +
                  t[i].image +
                  '" /></td><td><div en="' +
                  n +
                  '" idx="' +
                  i +
                  '" class="word-list-session button-lastest-session">Target Words</div><div style="padding:3px"></div><div en="' +
                  n +
                  '" idx="' +
                  i +
                  '" class="exercise-lastest-session button-lastest-session">TOEFL Prep</div><div style="padding:3px"></div><div en="' +
                  n +
                  '" idx="' +
                  i +
                  '" class="story-lastest-session button-lastest-session">TOEFL Success</div></td></tr><tr><td colspan="2"><div  en="' +
                  n +
                  '" idx="' +
                  i +
                  '" class="button-lesson word-list-session">' +
                  s +
                  "</div></td></tr></table></div></li>",
              )
          : "Index" == n &&
            $("#home-section")
              .children("ul")
              .append(
                '<li style="text-align:unset"><div><table id="tbl-last-session' +
                  i +
                  '"><tr><td style="position:relative"><img en="' +
                  n +
                  '" idx="' +
                  i +
                  '" style=" border:0px solid chocolate;" class="word-list-session img-last-session-unit" src="data/' +
                  n.replace(/ /g, "-") +
                  "/" +
                  t[i].image +
                  '" /></td></tr><tr style="display:none"><td colspan="2"><div  en="' +
                  n +
                  '" idx="' +
                  i +
                  '" >' +
                  n +
                  '</div></td></tr></table><div en="' +
                  n +
                  '" idx="' +
                  i +
                  '" class="word-list-session button-lesson" style="border:0px; font-weight:bold;text-align:center; color:white;  background:None">' +
                  n +
                  "</div></div></li>",
              ),
          sessionStorage.setItem(n, JSON.stringify(t[i])),
          (loadedTime -= 1));
      }
      ($(".word-list-session").click(function () {
        (1 == adsNextUnit &&
          (sendLoginAction($(this).attr("en")), (adsNextUnit = !1)),
          showCategorySection($(this).attr("en"), $(this).attr("idx"), 0));
      }),
        $(".exercise-lastest-session").click(function () {
          (1 == adsNextUnit &&
            (sendLoginAction($(this).attr("en")), (adsNextUnit = !1)),
            showCategorySection($(this).attr("en"), $(this).attr("idx"), 10));
        }),
        $(".story-lastest-session").click(function () {
          (1 == adsNextUnit &&
            (sendLoginAction($(this).attr("en")), (adsNextUnit = !1)),
            showCategorySection($(this).attr("en"), $(this).attr("idx"), 11));
        }),
        init());
    },
  }),
    (intervalInit = setInterval(function () {
      loadedTime <= 0 &&
        (clearInterval(intervalInit),
        homeSectionResize(),
        resizeModal(),
        resize(),
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
    delete Hammer.defaults.cssProps.userSelect,
    (mc = new Hammer(document.getElementById("category-section"))).on(
      "panleft",
      function (e) {
        (clearTimeout(nextTimeOut),
          clearTimeout(loopTimeOut),
          clearTimeout(autoNextTimeOut),
          0 == isStory() && 0 == isExercise() && panLeft());
      },
    ),
    mc.on("panright", function (e) {
      (clearTimeout(nextTimeOut),
        clearTimeout(loopTimeOut),
        clearTimeout(autoNextTimeOut),
        0 == isStory() && 0 == isExercise() && panRight());
    }),
    mc.on("panend", function (e) {
      (clearTimeout(nextTimeOut),
        clearTimeout(loopTimeOut),
        clearTimeout(autoNextTimeOut),
        0 == isStory() && 0 == isExercise() && panEnd(e.distance));
    }));
});
