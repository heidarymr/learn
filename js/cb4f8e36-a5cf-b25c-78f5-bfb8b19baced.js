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
  path = "/apps-data/essential-words-for-the-toefl/",
  lsession = "lastestSession-" + path.split("/")[2],
  lsetting = "settings-" + path.split("/")[2],
  lfontSetting = "fontSize-" + path.split("/")[2];
function succeded(e, t, i) {
  t;
}
var intervalInit,
  answerTimerInterval,
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
            '<div class="app-name">“Essential Words for the TOEFL”</div ><div class="app-slogan">7th edition</div>',
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
        $(".font-size-cover,#setting-container").hide());
    }),
    $(document).on("touchstart", function (e) {
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
    ? 100 < e
      ? ($("#item" + elm_index).animate(
          { left: -$(window).width() },
          400,
          function () {},
        ),
        1 == $("#item" + next).attr("story") ||
        1 == $("#item" + next).attr("exercise")
          ? (1 == $("#item" + next).attr("exercise") &&
              null != elm &&
              (elm.pause(), (elm.currentTime = 0)),
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
    : 100 < e
      ? ($("#item" + elm_index).animate(
          { left: $(window).width() },
          400,
          function () {},
        ),
        1 == $("#item" + next).attr("story") ||
        1 == $("#item" + next).attr("exercise")
          ? (1 == $("#item" + next).attr("exercise") &&
              null != elm &&
              (elm.pause(), (elm.currentTime = 0)),
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
      ((e = "<table>"),
      (e +=
        '<tr><td>Auto next</td><td><label class="switch"><input id="chkAuto" type="checkbox"><div class="slider round"></div></label></td></tr>'),
      (e +=
        '<tr><td>Number of repeat</td><td><select id="optLoop"><option value="0">0</option><option value="1">1</option><option value="2">2</option><option value="3">3</option><option value="4">4</option><option value="5">5</option></select></td></tr>'),
      (e += "</table>"),
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
      })));
  var e = JSON.parse(localStorage.getItem(lsetting));
  ($("#optLoop").val(e.loop),
    1 == e.next
      ? $("#chkAuto").attr("checked", "checked")
      : $("#chkAuto").removeAttr("checked"));
}
function settings(e) {
  var t;
  ($("#setting-container").remove(),
    1 == e
      ? ($("#settings img").attr("src", "icons/close-window-50.png"),
        0 == $("#setting-container").length &&
          ((t = "<table>"),
          (t +=
            '<tr><td>Auto next words</td><td><label class="switch"><input id="chkAuto" type="checkbox"><div class="slider round"></div></label></td></tr>'),
          (t +=
            '<tr><td>Number of repeat</td><td><select id="optLoop"><option value="0">0</option><option value="1">1</option><option value="2">2</option><option value="3">3</option><option value="4">4</option><option value="5">5</option></select></td></tr>'),
          (t += "</table>"),
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
          })),
        (t = JSON.parse(localStorage.getItem(lsetting))),
        $("#optLoop").val(t.loop),
        1 == t.next
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
  ($(".font-size").attr("style", ""),
    0 < $("#answer-popup").length &&
      ($("#answer-popup").remove(),
      clearInterval(answerTimerInterval),
      (answerTimerInterval = null)),
    0 < $("#idiom-tip-popup").length && $("#idiom-tip-popup").remove(),
    setStoreLastSession(e, t, i),
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
    ((remainAudioLoop = null != t && 0 < t.loop ? t.loop : 0),
      null == localStorage.getItem(e.toLowerCase()) &&
        ((p = { read: !1 }),
        localStorage.setItem(e.toLowerCase(), JSON.stringify(p)),
        $("#tbl-last-session" + currentIndex)
          .find("div")
          .eq(0)
          .attr("class", "reading")),
      $("#category-section")
        .children(".section")
        .children(".container")
        .html(""));
    var i = JSON.parse(sessionStorage.getItem(e)).wordlist;
    if (null != i || null != i) {
      $("#category-section")
        .children(".section")
        .children(".container")
        .append(
          '<div class="box_shadow_block" style="padding:15px;" id="vocabulary-block"><div class="voca-block-title">TARGET WORDS</div><ul class="wordlist"></ul></div>',
        );
      for (var n = 0; n < i.length; n++) {
        i[n].en.substring(0, 1);
        var o = i[n].en,
          s =
            (i[n].vi,
            i[n].pron,
            i[n].desc
              .replace("adv.", "<i>adv.</i>")
              .replace("n.", "<i>n.</i>")
              .replace("v.", "<i>v.</i>")
              .replace("adj.", "<i>adj.</i>")
              .replace("syn.", "<i>syn.</i>")
              .replace("ph.", "<i>ph.</i>")
              .replace("prep.", "<i>prep.</i>")),
          r = i[n].exam
            .replace("adv.", "<i>adv.</i>")
            .replace("n.", "<i>n.</i>")
            .replace("v.", "<i>v.</i>")
            .replace("adj.", "<i>adj.</i>")
            .replace("syn.", "<i>syn.</i>")
            .replace("ph.", "<i>ph.</i>")
            .replace("prep.", "<i>prep.</i>"),
          l = (i[n].image, i[n].sound, '<li id="voca' + n + '">');
        ((l += '<div class="wordlist-cover">'),
          (l +=
            "" != s
              ? '<div  class="exam"><span class="word">' +
                o +
                "</span> <span>(" +
                s +
                ")</span>" +
                r +
                "</div>"
              : '<div  class="exam"><span class="word">' +
                o +
                "</span>" +
                r +
                "</div>"),
          (l += "</div>"),
          (l += "</li>"),
          $("#vocabulary-block .wordlist").append(l));
      }
    } else readFlag();
    var a = JSON.parse(sessionStorage.getItem(e)).exercise;
    if (null != a) {
      if (
        ($("#category-section")
          .children(".section")
          .children(".container")
          .append(
            '<div id="exercise-block" class="box_shadow_yt_iframe seg-block"></div>',
          ),
        "index of idioms" == e.toLowerCase() || "index" == e.toLowerCase())
      ) {
        for (n = 0; n < 1; n++) {
          var o = a[n].en,
            c = a[n].story;
          0 == n &&
            ((d = JSON.parse(localStorage.getItem(lsession))),
            (h = 0),
            (null == i && null == i) || (h = i.length),
            (p = {
              title: d.title,
              image: $("#home-section")
                .children("ul")
                .children("li")
                .eq(d.index)
                .find("img")
                .attr("src"),
              index: d.index,
              windex: 0,
              eindex: h,
              sindex: 0,
            }),
            localStorage.setItem(lsession, JSON.stringify(p)),
            (l =
              '<div class="en-story"><div class="faq-list-section"><div class="index-alphabet-item">' +
              o +
              "</div>" +
              c +
              "</div></div>"),
            $("#exercise-block").append(l));
        }
        setTimeout(function () {
          for (var e = 1; e < a.length; e++) {
            var t = a[e].en,
              i = a[e].story;
            $("#exercise-block").append(
              '<div class="faq-list-section"><div class="index-alphabet-item">' +
                t +
                "</div>" +
                i +
                "</div></div>",
            );
          }
          $(".index-block-item li").click(function () {
            (0 < $("#idiom-tip-popup").length && $("#idiom-tip-popup").remove(),
              $("body").append(
                '<div id="idiom-tip-popup"><div id="close-idiom-tip-popup"><img src="icons/close-window-50.png" /></div><div id="idiom-tip-popup-cover">' +
                  $(this)
                    .children(".tool-index-idioms")
                    .html()
                    .replace("adv.", "<i>adv.</i>")
                    .replace("n.", "<i>n.</i>")
                    .replace("v.", "<i>v.</i>")
                    .replace("adj.", "<i>adj.</i>")
                    .replace("syn.", "<i>syn.</i>")
                    .replace("ph.", "<i>ph.</i>")
                    .replace("prep.", "<i>prep.</i>") +
                  "</div></div>",
              ),
              $("#idiom-tip-popup").find(".word-image").remove(),
              $("#close-idiom-tip-popup img").click(function () {
                $("#idiom-tip-popup").remove();
              }));
          });
        }, 200);
      } else
        for (n = 0; n < a.length; n++) {
          var d,
            h,
            p,
            o = a[n].en,
            c = a[n].story,
            u = a[n].titlehidden;
          (0 == n
            ? ((d = JSON.parse(localStorage.getItem(lsession))),
              (h = 0),
              (null == i && null == i) || (h = i.length),
              (p = {
                title: d.title,
                image: $("#home-section")
                  .children("ul")
                  .children("li")
                  .eq(d.index)
                  .find("img")
                  .attr("src"),
                index: d.index,
                windex: 0,
                eindex: h,
                sindex: 0,
              }),
              localStorage.setItem(lsession, JSON.stringify(p)),
              (l = '<div exercise="1" id="item' + n + '">'),
              o.toLowerCase(),
              (l +=
                '<div class="en-story"><div class="exercise-section-title">' +
                o +
                '</div><div class="faq-list-section" title="' +
                o +
                '">' +
                c +
                "</div></div>"),
              (l += "</div>"),
              $("#exercise-block").append(l))
            : "Answer Key" == o
              ? $("#exercise-block")
                  .find(".en-story")
                  .append(
                    '<div id="exercise-answer-key"><div class="exercise-section">' +
                      o +
                      '</div><div class="faq-list-section" title="' +
                      o +
                      '">' +
                      c +
                      "</div></div></div>",
                  )
              : "true" == u
                ? 0 == $("#exercise-block-single").length
                  ? $("#exercise-block")
                      .find(".en-story")
                      .append(
                        '<div id="exercise-block-single" class="faq-list-section exercise-block-single" title="' +
                          o +
                          '">' +
                          c +
                          "</div></div>",
                      )
                  : $("#exercise-block")
                      .find(".en-story")
                      .append(
                        '<div class="faq-list-section exercise-block-single" title="' +
                          o +
                          '">' +
                          c +
                          "</div></div>",
                      )
                : $("#exercise-block")
                    .find(".en-story")
                    .append(
                      '<div class="exercise-section-title">' +
                        o +
                        '</div><div class="faq-list-section" title="' +
                        o +
                        '">' +
                        c +
                        "</div></div>",
                    ),
            n == a.length - 1 &&
              "" != o &&
              ($("#exercise-block")
                .find(".en-story")
                .append(
                  '<div class="exercise-section-red-answer-key">Answer Key</div>',
                ),
              $(".exercise-section-red-answer-key").click(function () {
                (sendLoginAction("ANSWER KEY loaded. Check it out!"),
                  readFlag(),
                  $(".answer-key-remove-after").remove(),
                  $("#exercise-answer-key").css({ display: "block" }),
                  $(".exercise-section-red-answer-key").css({
                    display: "none",
                  }),
                  $(".answer-key-only").html(""),
                  $("#exercise-answer-block").html(
                    '<table><tr><td></td><td style="background: aliceblue; text-align:center; font-weight:bold; text-transform:uppercase; padding:7px;">Answer Key</td><td style="background: aliceblue; text-align:center; font-weight:bold; text-transform:uppercase; padding:7px;">Your Answer</td></tr></table>',
                  ),
                  $(".faq-list-section").each(function () {
                    0 < $(this).find(".answer-the-questions-section").length &&
                      ($("#exercise-answer-block table").append(
                        '<tr><td colspan="3" style="font-weight:bold;">' +
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
                                $(this).children("input").attr("checked") &&
                                (1 < e.length
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
                          ((i = $.trim(
                            $("#divAnswerKeyCover")
                              .children("div")
                              .eq(0)
                              .html(),
                          )),
                            (n = $.trim(
                              $("#divAnswerKeyCover")
                                .children("div")
                                .eq(1)
                                .html(),
                            )));
                          i == n
                            ? $("#exercise-answer-block table").append(
                                '<tr style="background:#1EA362; color:white"><td>' +
                                  (parseInt($(this).index()) + 1) +
                                  "</td><td>" +
                                  i +
                                  "</td><td>" +
                                  n +
                                  "</td></tr>",
                              )
                            : $("#exercise-answer-block table").append(
                                "<tr><td>" +
                                  (parseInt($(this).index()) + 1) +
                                  '</td><td style="background:#1EA362; color:white">' +
                                  i +
                                  '</td><td style="background:#D9433D; color:white">' +
                                  n +
                                  "</td></tr>",
                              );
                        }));
                  }),
                  $("#exercise-answer-block").css({ display: "block" }),
                  $("html,body").animate(
                    {
                      scrollTop: $("#exercise-answer-block").offset().top - 100,
                    },
                    0,
                  ));
              })));
        }
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
            var e;
            ($(this)
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
              $(this).parent().parent().attr("answer-index") == $(this).index()
                ? ((e = $("#answer-popup div").eq(0).html().split("/")),
                  $("#answer-popup div")
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
                    }))
                : ((e = $("#answer-popup div").eq(2).html().split("/")),
                  $("#answer-popup div")
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
                    })));
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
            var e,
              t,
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
                ((e = ""),
                $(this)
                  .parent()
                  .children("li")
                  .each(function () {
                    ($(this).find("input").attr("disabled", "disabled"),
                      $(this).unbind("click"),
                      "checked" == $(this).find("input").attr("checked") &&
                        (e += $(this).index() + ","));
                  }),
                0 < e.length && (e = e.substring(0, e.length - 1)),
                $(this).parent().parent().attr("answer-index") == e
                  ? ((t = $("#answer-popup div").eq(0).html().split("/")),
                    $("#answer-popup div")
                      .eq(0)
                      .html(parseInt(t[0]) + 1 + "/" + t[1]),
                    $(this)
                      .parent()
                      .css({
                        background: "#F5F5DC",
                        "border-radius": "7px",
                        padding: "8px",
                        border: "2px solid #1ea362",
                      }))
                  : ((t = $("#answer-popup div").eq(2).html().split("/")),
                    $("#answer-popup div")
                      .eq(2)
                      .html(parseInt(t[0]) + 1 + "/" + t[1]),
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
      var m =
        '<select class="opt-fill-blank"><option></option><option>a</option><option>b</option><option>c</option><option>d</option><option>e</option></select>';
      ($(".answer-the-questions-section-char").each(function () {
        $(this).html(m);
      }),
        $(".opt-fill-blank").each(function () {
          $(this).html(m);
        }),
        $(".opt-fill-blank").change(function () {
          $.trim($(this).attr("answer")).toLowerCase() ==
          $.trim($(this).val().toLowerCase())
            ? ($(this).attr("disabled", "disabled"),
              $(this).css({
                background: "#1EA362",
                color: "white",
                border: "",
              }),
              0 ==
                $("#nav-story").children("li").eq(0).find(".audio-play")
                  .length && $("#nav-story").children("li").eq(0).html(""))
            : (0 ==
                $("#nav-story").children("li").eq(0).find(".audio-play")
                  .length &&
                $("#nav-story")
                  .children("li")
                  .eq(0)
                  .html('<span style="color:red">wrong</span>'),
              $(this).css({ border: "2px dotted red" }));
        }));
    }
    ($(".counter").each(function () {
      $(this).css({
        "margin-left": ($(window).width() - $(this).width() - 20) / 2,
      });
    }),
      $(".speaker-louder").click(function () {
        var e = $(this).attr("source");
        (playSound((currentReadingIndex = $(this).attr("idx")), e),
          $("#nav-story li")
            .eq(0)
            .children("span")
            .html($(this).attr("title")));
      }),
      homeSectionResize(),
      scaleFontSize(),
      playSeeking(0));
    e = window.location.hash.substring(1);
    if ("" != e) {
      e = e.split("&");
      if (1 < e.length)
        switch (e[1].toLowerCase()) {
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
  ((elm_index = currentReadingIndex = e),
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
  (clearInterval(audioInterval), (currentReadingIndex = e));
  var n, o, s;
  (1 == isExercise()
    ? ($("#exercise-block").css({ display: "block" }),
      (n = JSON.parse(localStorage.getItem(lsession))),
      $("#bottom-section").css({ display: "block" }),
      0 < (o = $("#tbl-last-session" + (parseInt(n.index) + 1))).length
        ? ((n = JSON.parse(localStorage.getItem(lsession))),
          (s = o.parent().attr("en")),
          0 < n.sindex
            ? $("#bottom-section")
                .children(".container")
                .html(
                  '<ul id="nav-exercise"><li>Target Words</li><li>Dialogues</li><li style="color:yellow"><a style="color:yellow" href="/apps/' +
                    path.split("/")[2] +
                    "/" +
                    urlFriendly(s) +
                    "/#" +
                    (parseInt(n.index) + 1) +
                    '">' +
                    s +
                    "</a></li></ul>",
                )
            : $("#exercise-block-single").length
              ? $("#bottom-section")
                  .children(".container")
                  .html(
                    '<ul id="nav-exercise"><li style="width:calc(50% - 10px)">Practice</li><li style="width:0%"></li><li  style="width:calc(50% - 10px); text-align:center; padding-left:5px; padding-right:5px; color:yellow">' +
                      s +
                      "</li></ul>",
                  )
              : $("#bottom-section")
                  .children(".container")
                  .html(
                    '<ul id="nav-exercise"><li style="width:0%"></li><li style="width:0%"></li><li  style="width:calc(100% - 10px); text-align:center; padding-left:5px; padding-right:5px; color:yellow">' +
                      s +
                      "</li></ul>",
                  ))
        : $("#bottom-section")
            .children(".container")
            .html(
              '<div class="app-name">Essential Words for the TOEFL</div><div class="app-slogan">7th edition</div>',
            ),
      $("#nav-exercise")
        .children("li")
        .eq(2)
        .click(function () {
          elm.pause();
          var e = JSON.parse(localStorage.getItem(lsession)),
            t = $("#tbl-last-session" + (parseInt(e.index) + 1));
          0 < t.length &&
            (0 == checkUnitOpened((t = t.parent().attr("en")))
              ? showAdsForNextLesson
              : showCategorySection)(t, parseInt(e.index) + 1, 0);
        }),
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
          (0 < $(".exercise-block-single").length &&
            ($(".exercise-block-single").css({ display: "block" }),
            practiceTimerAlert(n.title)),
            "Practice" === $(this).html() &&
              $(window).scrollTop(
                $("#exercise-block-single").offset().top - 60,
              ));
        }),
      resizeExerciseStory())
    : 1 == isStory()
      ? ((n = JSON.parse(localStorage.getItem(lsession))),
        $("#bottom-section").css({ display: "block" }),
        (o = $("#tbl-last-session" + (parseInt(n.index) + 1))),
        (s = ""),
        0 < o.length && (s = o.parent().attr("en")),
        $("#bottom-section")
          .children(".container")
          .html(
            '<ul id="nav-story"><li>Practice</li><li>Target Words</li><li style="color:yellow">' +
              s +
              "</li></ul>",
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
            var e;
            switch (
              ($(".show-ads-cover").remove(),
              "Practice" == $("#nav-story").children("li").eq(0).html() &&
                ($("#exercise-block").css({ display: "block" }),
                null !=
                  (e = JSON.parse(
                    localStorage.getItem(n.title.toLowerCase()),
                  )) &&
                  ((e = {
                    read: !1,
                    total: e.total,
                    correct: 0,
                    wrong: 0,
                    time: "",
                  }),
                  localStorage.setItem(
                    n.title.toLowerCase(),
                    JSON.stringify(e),
                  )),
                $(".font-size").css({ bottom: "105px" }),
                practiceTimerAlert(n.title)),
              $(this).html())
            ) {
              case "Practice":
                $(window).scrollTop($("#exercise-block").offset().top - 60);
                break;
              case "Target Words":
                $(window).scrollTop($("#vocabulary-block").offset().top - 60);
            }
          }),
        $("#nav-story")
          .children("li")
          .eq(1)
          .click(function () {
            switch (($(".show-ads-cover").remove(), $(this).html())) {
              case "Practice":
                $(window).scrollTop($("#exercise-block").offset().top - 60);
                break;
              case "Target Words":
                $(window).scrollTop($("#vocabulary-block").offset().top - 60);
            }
          }),
        $("#nav-story")
          .children("li")
          .eq(2)
          .click(function () {
            0 < o.length
              ? 0 == checkUnitOpened(s)
                ? showAdsForNextLesson(s, s, parseInt(n.index) + 1, 0)
                : (elm.pause(),
                  (autoPlay = !1),
                  1 == showAds() &&
                    sendLoginAction(s + " loaded. Check it out!"),
                  showCategorySection(s, parseInt(n.index) + 1, 0))
              : $("#section-section").trigger("click");
          }),
        resizeExerciseStory())
      : ((n = JSON.parse(localStorage.getItem(lsession))),
        $("#bottom-section").css({ display: "block" }),
        0 < (o = $("#tbl-last-session" + (parseInt(n.index) + 1))).length
          ? ((s = o.parent().attr("en")),
            $("#bottom-section")
              .children(".container")
              .html(
                '<ul id="nav-wordlist"><li>Practice the Idioms</li><li>Dialogues</li><li style="color:yellow">' +
                  s +
                  "</li></ul>",
              ))
          : $("#bottom-section")
              .children(".container")
              .html(
                '<ul id="nav-wordlist"><li>Practice the Idioms</li><li>Dialogues</li><li>INDEX</li></ul>',
              ),
        $("#nav-wordlist")
          .children("li")
          .eq(0)
          .click(function () {
            (clearTimeout(nextTimeOut),
              clearTimeout(loopTimeOut),
              clearTimeout(autoNextTimeOut),
              elm.pause(),
              showCategorySection(n.title, n.index, n.eindex));
          }),
        $("#nav-wordlist")
          .children("li")
          .eq(1)
          .click(function () {
            (clearTimeout(nextTimeOut),
              clearTimeout(loopTimeOut),
              clearTimeout(autoNextTimeOut),
              elm.pause());
            var e = JSON.parse(localStorage.getItem(lsession));
            showCategorySection(e.title, e.index, e.sindex);
          }),
        $("#nav-wordlist")
          .children("li")
          .eq(2)
          .click(function () {
            (clearTimeout(nextTimeOut),
              clearTimeout(loopTimeOut),
              clearTimeout(autoNextTimeOut),
              elm.pause());
            var e = JSON.parse(localStorage.getItem(lsession)),
              t = $("#tbl-last-session" + (parseInt(e.index) + 1));
            0 < t.length &&
              showCategorySection(
                t.parent().attr("en"),
                parseInt(e.index) + 1,
                parseInt(t.find("td").eq(1).children("div").attr("wl")) + 1,
              );
          })),
    null != i &&
      ($("#item" + e)
        .find(".reading")
        .unbind("click"),
      (elm.src = i),
      (elm.onloadedmetadata = function () {
        (null != localStorage[i]
          ? ((t = localStorage.getItem(i)),
            parseInt(t) < 1e3 && localStorage.setItem(i, parseInt(t) + 1),
            $("#item" + e)
              .find(".counter")
              .children("div")
              .html(localStorage.getItem(i)))
          : ($("#item" + e)
              .find(".counter")
              .children("div")
              .html(1),
            localStorage.setItem(i, "1")),
          localStorage.setItem("currentIndex", currentReadingIndex),
          1 == autoPlay ? elm.play() : (autoPlay = !0));
      }),
      (elm.onended = function () {
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
          nextDialogueReading());
      })),
    resizeExerciseStory());
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
        sendLoginAction(t + " loaded. Check it out!"),
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
function showAdsForNextLesson1(e, t, i) {
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
        sendLoginAction(e + " loaded. Check it out!"),
        showCategorySection(e, t, i),
        $(".show-ads-cover").remove());
    }));
}
function checkUnitOpened(e) {
  return null != localStorage.getItem(e.toLowerCase());
}
function nextWordReading() {
  var e = JSON.parse(localStorage.getItem(lsetting));
  null != e &&
    1 == e.next &&
    (nextTimeOut = setTimeout(function () {
      (panLeft(), panEnd(110));
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
  var t = 786432;
  ($(".en-word").each(function () {
    var e = $(window).width() * $(window).height(),
      e = 300 * (Math.sqrt(e) / Math.sqrt(t));
    $(".en-word").css("font-size", e + "%");
  }),
    $(".wordlist-cover .en-word").each(function () {
      var e = $(window).width() * $(window).height(),
        e = 110 * (Math.sqrt(e) / Math.sqrt(t));
      (e < 110 && (e = 110), $(this).css("font-size", e + "%"));
    }),
    $(".vn-word").each(function () {
      var e = $(window).width() * $(window).height(),
        e = 140 * (Math.sqrt(e) / Math.sqrt(t));
      $(".vn-word").css("font-size", e + "%");
    }),
    $(".alphabet").each(function () {
      var e = $(window).width() * $(window).height(),
        e = 300 * (Math.sqrt(e) / Math.sqrt(t));
      $(".alphabet").css("font-size", e + "%");
    }),
    $(".en-story-title").each(function () {
      var e = $(window).width() * $(window).height(),
        e = 200 * (Math.sqrt(e) / Math.sqrt(t));
      (e < 120 && (e = 120), $(".en-story-title").css("font-size", e + "%"));
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
          hImage <= 120 &&
            ((hImage = 120), $(this).css({ margin: "10px 0px 10px 0px" })),
          $(this).css({ height: hImage, width: hImage }),
          $(this).parent().css({ float: "", padding: "" }),
          $("#item" + currentReadingIndex)
            .find(".en-story-title")
            .css({ "padding-bottom": "" }),
          1 == parseInt($(this).attr("story"))
            ? (250 <= hImage && $(this).css({ height: 250, width: 250 }),
              hImage <= 120 && $(this).css({ height: 120, width: 120 }),
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
    resizeExerciseStory());
}
function scaleFontSizeIndexToolTips() {
  ($(".tool-index-idioms")
    .find(".en-word")
    .each(function () {
      var e = $(window).width() * $(window).height(),
        e = 300 * (Math.sqrt(e) / Math.sqrt(786432));
      $(this).css("font-size", e + "%");
    }),
    resizeExerciseStory());
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
    ? $("#item" + currentReadingIndex).css({ position: "fixed", left: 0 })
    : $("#item" + currentReadingIndex).css({ position: "fixed", left: 10 });
}
function isStory() {
  return 0 < $("#vocabulary-block").length && 0 < $("#exercise-block").length;
}
function isExercise() {
  return 0 == $("#vocabulary-block").length && 0 < $("#exercise-block").length;
}
function resizeExerciseStory() {
  ($("#category-section")
    .find(".container")
    .children("li")
    .each(function () {
      var e;
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
        (e = $("#item" + $(this).index()).children("div")).css({ padding: 10 }),
        $(window).height(),
        $(".header").height(),
        $("#bottom-section").height(),
        e.height());
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
    var e,
      t,
      i = JSON.parse(localStorage.getItem(lsession));
    null != i
      ? ((e = "waiting"),
        null != (t = localStorage.getItem(i.title.toLowerCase())) &&
          (e = 1 == $.parseJSON(t).read ? "play" : "reading"),
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
          .attr("class", e),
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
                e +
                '"></div></td><td><div class="title">' +
                i.title +
                loadAnswerKey(i.title) +
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
        resizeUnitItem())
      : ($("#tbl-last-session0").parent().parent().parent().attr("opened", "1"),
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
  i = {
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
function practiceTimerAlert(r) {
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
        .append(
          '<div id="exercise-answer-block"></div><p>&nbsp;</p><p>&nbsp;</p>',
        ),
    $("#exercise-answer-block").css({ display: "block" }),
    null == answerTimerInterval &&
      (answerTimerInterval = setInterval(function () {
        var e = $("#answer-popup div").eq(1).html().split(":"),
          t = parseInt(e[1]) + 1,
          i = parseInt(e[0]);
        59 < t && ((i += 1), (t = 0));
        var n = $("#answer-popup div").eq(0).html().split("/"),
          o = $("#answer-popup div").eq(2).html().split("/"),
          s = parseInt(n[0]) + parseInt(o[0]),
          e = !1;
        ((59 < i || s >= parseInt(n[1])) &&
          (clearInterval(answerTimerInterval),
          0 < parseInt(o[0])
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
              $(".exercise-section-red-answer-key").css({ display: "block" }))
            : ($(".exercise-section-red-answer-key").html(
                '<div style="border-bottom: 1px solid; font-weight: bold; z-index: 9999; position: fixed; left: 0px; width: 100%; bottom: 100px; border-radius: 0px; padding: 10px 0px; display: block;vertical-align: middle;margin: auto;background: #1EA362;text-transform: uppercase;color: yellow;text-shadow: 1px 1px gray;">Fantastic!<br>100% Correct.</div>',
              ),
              $(".exercise-section-red-answer-key").css({
                display: "block",
                background: "none",
              }),
              $(".exercise-section-red-answer-key").unbind("click")),
          (e = !0)),
          t < 10 && (t = "0" + t),
          i < 10 && (i = "0" + i),
          $("#answer-popup div")
            .eq(1)
            .html(i + ":" + t));
        n = JSON.parse(localStorage.getItem(r.toLowerCase()));
        null != n &&
          (1 == n.read && (e = !0),
          (o = $("#answer-popup div").eq(0).html().split("/")),
          (n = $("#answer-popup div").eq(2).html().split("/")),
          (t = {
            read: e,
            total: parseInt(o[1]),
            correct: parseInt(o[0]),
            wrong: parseInt(n[0]),
            time: i + ":" + t,
          }),
          localStorage.setItem(r.toLowerCase(), JSON.stringify(t)));
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
  i = e.attr("windex");
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
        i +
        '" class="note-button" value="Save" /> <input type="button" word="' +
        t +
        '" windex="' +
        i +
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
    e = JSON.parse(localStorage.getItem(e.toLowerCase()));
  return (
    null != e &&
      null != e.total &&
      ((t +=
        '<div class="your-answer"><button class="correct">' +
        e.correct +
        "/" +
        e.total +
        "</button>"),
      0 < e.wrong &&
        (t += '<button class="wrong">' + e.wrong + "/" + e.total + "</button>"),
      "" != e.time &&
        (t += '<button class="time">' + e.time + "</button></div>")),
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
  var e;
  ((elm = document.getElementById("sound")),
    $("#modal").css({ display: "block", opacity: "1" }),
    $("#extendedSplashProgress").css({
      left: ($(window).width() - $("#extendedSplashProgress").width()) / 2,
    }),
    resizeModal(),
    resizeHomeSection(),
    null == localStorage.getItem(lsetting) &&
      ((e = { next: !1, loop: 0 }),
      localStorage.setItem(lsetting, JSON.stringify(e))),
    null == localStorage.getItem(lfontSetting)
      ? ((e = { fontSize: fontSize }),
        localStorage.setItem(lfontSetting, JSON.stringify(e)))
      : ((e = JSON.parse(localStorage.getItem(lfontSetting))),
        (fontSize = e.fontSize)),
    $("#extendedSplashProgress").css({ display: "block" }),
    $.ajax({
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
            o = 0;
          o < t.length;
          o++
        ) {
          var s = t[o].en,
            r = t[o].desc;
          null == r && (r = "Lesson");
          var l = urlFriendlyFull(r.toLowerCase());
          0 == $("#div-" + l).length &&
            ($("#home-section").append(
              '<div id="div-' +
                l +
                '"><div class="section-cover" style="display:none;font-weight: bold; text-align: left; background:' +
                i[n] +
                '"><div style="padding:13px 10px; color:white;">' +
                r +
                '</div></div><ul class="curriculum-item"></ul></div>',
            ),
            10 < (n += 1) && (n = 0));
          var a = "waiting",
            r = localStorage.getItem(s.toLowerCase());
          null != r && (a = 1 == $.parseJSON(r).read ? "play" : "reading");
          (path.split("/")[2], urlFriendlyFull(s.toLowerCase()));
          r = 0;
          (null != t[o].wordlist && (r = t[o].wordlist.length),
            $("#div-" + l)
              .children("ul")
              .append(
                '<li class="item  word-list-session"  en="' +
                  s +
                  '" idx="' +
                  o +
                  '" wl="' +
                  r +
                  '" ><table id="tbl-last-session' +
                  o +
                  '"><tr><td><div class="' +
                  a +
                  '"></div></td><td><div class="title">' +
                  s +
                  loadAnswerKey(s) +
                  "</div></td></tr></table></li>",
              ),
            sessionStorage.setItem(s, JSON.stringify(t[o])),
            --loadedTime,
            o == t.length - 1 &&
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
            : (1 == showAds() && sendLoginAction(""),
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
      resizeLastSession();
    }),
    $("body").css({ "font-size": fontSize + "%" }));
});
