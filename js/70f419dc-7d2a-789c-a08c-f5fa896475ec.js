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
  win_width = $(window).width(),
  win_height = $(window).height(),
  lang = 2,
  autoPlay = !1,
  tmp = "",
  audioLoop = 0,
  currentTime = 0,
  adsNextUnit = !0;
function succeded(e, t, i) {
  t;
}
var intervalInit,
  audioTimeout,
  adsFirstTimeLoadedInterval,
  loadedTime = 0,
  ads = !1,
  adsFirstTime = !1,
  countUnitLearned = 0;
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
      (0 < $("#idiom-tip-popup").length && $("#idiom-tip-popup").remove(),
        JSBridge.stopedPlayer(),
        loadLastSession(),
        clearTimeout(nextTimeOut),
        clearTimeout(loopTimeOut),
        $("#bottom-section")
          .children(".container")
          .html(
            '<div class="app-name">Most Common Idioms in English</div><div class="app-slogan">Hundreds of idiomatic expressions to give you an edge in English!</div>',
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
          ? $("#item" + next).animate({ left: 0 }, 400, function () {
              (playSound(next, $("#item" + next).attr("source")),
                focusReading(next),
                swipeWindow());
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
                focusReading(next),
                swipeWindow());
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
function settings(e) {
  if (($("#setting-container").remove(), 1 == e)) {
    if (
      ($("#settings img").attr("src", "icons/close-window-50.png"),
      0 == $("#setting-container").length)
    ) {
      ('<tr><td>Auto next Dialogues</td><td><label class="switch"><input id="chkAuto" type="checkbox"><div class="slider round"></div></label></td></tr>',
        '<tr style="display:none"><td>Number of repeat</td><td><select id="optLoop"><option value="0">0</option><option value="1">1</option><option value="2">2</option><option value="3">3</option><option value="4">4</option><option value="5">5</option></select></td></tr>',
        "</table>",
        $("body").append(
          '<div id="setting-container"><div><table><tr><td>Auto next Dialogues</td><td><label class="switch"><input id="chkAuto" type="checkbox"><div class="slider round"></div></label></td></tr><tr style="display:none"><td>Number of repeat</td><td><select id="optLoop"><option value="0">0</option><option value="1">1</option><option value="2">2</option><option value="3">3</option><option value="4">4</option><option value="5">5</option></select></td></tr></table></div></div>',
        ),
        $("#setting-container").css({
          height: $(window).height(),
          width: 270,
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
      i.css({ height: e, "overflow-y": "scroll", "overflow-x": "hidden" }),
    $("#category-section").css({ height: e, top: t }));
}
function showCategorySection(e, t, i) {
  ((autoPlay = !1),
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
    if (null != i || null != i)
      for (var n = 0; n < i.length; n++) {
        i[n].en.substring(0, 1);
        var s = i[n].en,
          o = (i[n].vi, i[n].pron),
          r = i[n].desc,
          a = i[n].exam,
          l = i[n].image,
          d = i[n].sound,
          c =
            '<li remainAudioLoop="' + remainAudioLoop + '" id="item' + n + '">';
        ((c += '<div class="word-image"><img src="" /></div>'),
          (c +=
            '<div class="en-word">' +
            s +
            ' <span class="en-pron">' +
            o +
            "</span></div>"),
          (c += '<div class="en-desc">' + r + "</div>"),
          "" != a &&
            (c +=
              '<div class="en-exam"><span class="arrow">→</span>  ' +
              a +
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
            "data/" + e.replace(/ /g, "-") + "/wordlist/" + d,
          ));
      }
    var h = JSON.parse(sessionStorage.getItem(e)).reading;
    if (null != h) {
      var p = "",
        u = 0;
      ((null == i && null == i) || (u = i.length + 1),
        $("#category-section")
          .children(".section")
          .children(".container")
          .append(
            '<li  story="1" remainAudioLoop="' +
              remainAudioLoop +
              '" id="item' +
              u +
              '"><div></div></li>',
          ));
      for (n = 0; n < h.length; n++) {
        var v = h[n].type,
          m = (h[n].block, (s = h[n].en), h[n].story);
        ((l = h[n].image), (d = h[n].sound));
        if ("story" == v) {
          var g = {
            title: (_ = JSON.parse(localStorage.getItem("lastestSession")))
              .title,
            image: $("#home-section")
              .children("ul")
              .children("li")
              .eq(_.index)
              .find("img")
              .attr("src"),
            index: _.index,
            windex: 0,
            eindex: _.eindex,
            sindex: u,
          };
          localStorage.setItem("lastestSession", JSON.stringify(g));
          var w = "word-image",
            x = "";
          (-1 < s.indexOf("Pronunciation Pointer") ||
            -1 < s.indexOf("Fun Fact!") ||
            -1 < s.indexOf("Did you spot it?")) &&
            ((w = "word-image-small"), (x = " pronunciation-pointer"));
          c = '<div class="clear-both' + x + '">';
          ("" != l &&
            ((c +=
              '<div class="' +
              w +
              '"><img story="1" src="data/' +
              urlFriendly(e) +
              "/reading/" +
              l +
              '" /></div>'),
            "" != d
              ? ((c +=
                  '<div class="en-story-title ">' +
                  s +
                  ' <img title="' +
                  s +
                  '" source="data/' +
                  urlFriendly(e) +
                  "/reading/" +
                  h[n].sound +
                  '" class="speaker-louder" src="icons/speaker_louder.png" /></div>'),
                (p +=
                  "data/" + urlFriendly(e) + "/reading/" + h[n].sound + ","))
              : (c += '<div class="en-story-title ">' + s + "</div>")),
            (c +=
              '<div class="en-story">' +
              m +
              '</div><div style="clear:both"></div>'),
            (c += "</div>"),
            0 == $("#dialog-block").length &&
              $("#item" + u)
                .children("div")
                .append(
                  '<div class="box_shadow_block" style="padding:10px;" id="dialog-block"></div>',
                ),
            $("#dialog-block").append(c));
        }
      }
      ("" != h[0].sound &&
        ($("#item" + u).attr(
          "source",
          "data/" + urlFriendly(e) + "/reading/" + h[0].sound,
        ),
        "" != p && (p = p.substring(0, p.length - 1)),
        $("#item" + u).attr("soundarr", p),
        $("#item" + u).attr("si", 0)),
        $(".speaker-louder").click(function () {
          var e = $(this).attr("source");
          ($("#item" + (i.length + 1)).attr("source", e),
            $("#item" + currentReadingIndex).attr(
              "si",
              $(".speaker-louder").index($(this)),
            ),
            playSound(currentReadingIndex, e),
            $("#nav-story li")
              .eq(0)
              .children("span")
              .html($(this).attr("title")));
        }),
        $(".idiom-tip").click(function () {
          (0 < $("#idiom-tip-popup").length && $("#idiom-tip-popup").remove(),
            $("body").append(
              '<div id="idiom-tip-popup"><div id="close-idiom-tip-popup"><img src="icons/close-window-50.png" /></div><div id="idiom-tip-popup-cover">' +
                $("#item" + $(this).attr("idx")).html() +
                "</div></div>",
            ),
            $("#idiom-tip-popup").find(".word-image").remove(),
            $("#close-idiom-tip-popup img").click(function () {
              $("#idiom-tip-popup").remove();
            }));
        }),
        $("#quiz-on-reading")
          .find(".answer-the-questions-section .ul-choose-answer")
          .children("li")
          .each(function () {
            var e = $(this).html();
            $(this).html(
              '<input type="radio" name="rdo' +
                $(this).parent().parent().index() +
                $(this).parent().index() +
                '" /> ' +
                e,
            );
          }),
        $("#quiz-on-reading")
          .find(".answer-the-questions-section .ul-choose-answer")
          .children("li")
          .click(function () {
            ($(this)
              .parent()
              .children("li")
              .each(function () {
                $(this).css({ color: "", "font-weight": "" });
              }),
              $(this).find("input").attr("checked", "checked"),
              $(this).css({ color: "#1d675a", "font-weight": "bold" }));
          }),
        $("#quiz-on-reading")
          .find(".faq-list-section .ul-choose-answer li")
          .each(function () {
            var e = $(this)
              .html()
              .replace(/_____/g, ' <input class="txt-input-answer" /> ');
            $(this).html(e);
          }),
        $("#quiz-on-reading")
          .find(".faq-list-section p")
          .each(function () {
            var e = $(this)
              .html()
              .replace(/ __________ /g, ' <input class="txt-input-answer" /> ');
            $(this).html(e);
          }),
        $("#quiz-on-reading")
          .find(".txt-input-one-line")
          .each(function () {
            var e = $(this)
              .html()
              .replace(/ _____ /g, ' <input class="txt-input-answer" /> ');
            $(this).html(e);
          }),
        $("#quiz-on-reading")
          .find(".txt-input-one-new-line")
          .each(function () {
            var e = $(this)
              .html()
              .replace(
                /_____/g,
                ' <textarea class="txt-input-answer" style="min-width:300px; height:45px"></textarea> ',
              );
            $(this).html(e);
          }));
    }
    var y = JSON.parse(sessionStorage.getItem(e)).idioms;
    if (null != y || null != y) {
      0 == $("#idioms-block").length &&
        $("#item" + (i.length + 1))
          .children("div")
          .append(
            '<div class="box_shadow_block" style="padding:15px;" id="idioms-block"><div class="idioms-block-title">MORE FUN WITH IDIOMATIC EXPRESSIONS: ' +
              y[0].pron +
              '</div><ul class="wordlist"></ul></div>',
          );
      for (n = 0; n < y.length; n++) {
        (y[n].en.substring(0, 1),
          (s = y[n].en),
          y[n].vi,
          (o = y[n].pron),
          (r = y[n].desc),
          (a = y[n].exam),
          (l = y[n].image),
          (d = y[n].sound),
          (c = '<li id="idioms' + n + '">'));
        ((c += '<div class="wordlist-cover">'),
          (c += '<div><span class="word">' + s + ":</span> " + r + "</div>"),
          (c +=
            '<div  class="exam"><span class="arrow">→</span> ' + a + "</div>"),
          (c += "</div>"),
          (c += "</li>"),
          $("#idioms-block .wordlist").append(c));
      }
    }
    if (null != i || null != i) {
      0 == $("#vocabulary-block").length &&
        $("#item" + (i.length + 1))
          .children("div")
          .append(
            '<div class="box_shadow_block" style="padding:15px;" id="vocabulary-block"><div class="voca-block-title">IDIOMS</div><ul class="wordlist"></ul></div>',
          );
      for (n = 0; n < i.length; n++) {
        (i[n].en.substring(0, 1),
          (s = i[n].en),
          i[n].vi,
          (o = i[n].pron),
          (r = i[n].desc),
          (a = i[n].exam),
          (l = i[n].image),
          (d = i[n].sound),
          (c = '<li id="voca' + n + '">'));
        ((c += '<div class="wordlist-cover">'),
          (c +=
            '<div  class="exam"><span class="word">' +
            s +
            ":</span> " +
            a +
            "</div>"),
          (c += "</div>"),
          (c += "</li>"),
          $("#vocabulary-block .wordlist").append(c));
      }
    }
    var f = JSON.parse(sessionStorage.getItem(e)).exercise;
    if (null != f)
      if (
        "index of idioms" == e.toLowerCase() ||
        "appendix: vocabulary" == e.toLowerCase()
      ) {
        for (n = 0; n < 1; n++) {
          s = f[n].en;
          var b = f[n].story;
          if (0 == n) {
            var _ = JSON.parse(localStorage.getItem("lastestSession")),
              k = 0;
            (null == i && null == i) || (k = i.length + 1);
            g = {
              title: _.title,
              image: $("#home-section")
                .children("ul")
                .children("li")
                .eq(_.index)
                .find("img")
                .attr("src"),
              index: _.index,
              windex: 0,
              eindex: k,
              sindex: 0,
            };
            localStorage.setItem("lastestSession", JSON.stringify(g));
            c = '<li exercise="1" id="item' + k + '"><div>';
            ((c +=
              '<div class="en-story"><div class="faq-list-section"><div class="index-alphabet-item">' +
              s +
              "</div>" +
              b +
              "</div></div>"),
              (c += "</div></li>"),
              $("#category-section")
                .children(".section")
                .children(".container")
                .append(c));
          }
        }
        setTimeout(function () {
          for (var e = 1; e < f.length; e++) {
            var t = f[e].en,
              i = f[e].story;
            ($("#item" + k)
              .find(".en-story")
              .append(
                '<div class="faq-list-section"><div class="index-alphabet-item">' +
                  t +
                  "</div>" +
                  i +
                  "</div></div>",
              ),
              e == f.length - 1 &&
                $("#item" + k)
                  .find(".en-story")
                  .append('<p class="answer-key-remove-after">&nbsp;</p>'));
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
      } else {
        for (n = 0; n < f.length; n++) {
          ((s = f[n].en), (b = f[n].story));
          if (0 == n) {
            ((_ = JSON.parse(localStorage.getItem("lastestSession"))), (k = 0));
            null != i || null != i
              ? (k = i.length + 1)
              : $("#category-section")
                  .children(".section")
                  .children(".container")
                  .append(
                    '<li exercise="1" id="item' + k + '"><div></div></div>',
                  );
            g = {
              title: _.title,
              image: $("#home-section")
                .children("ul")
                .children("li")
                .eq(_.index)
                .find("img")
                .attr("src"),
              index: _.index,
              windex: 0,
              eindex: k,
              sindex: 0,
            };
            localStorage.setItem("lastestSession", JSON.stringify(g));
            c = "";
            (s.toLowerCase(),
              (c +=
                '<div class="en-story"><div class="exercise-section-title">' +
                s +
                '</div><div class="faq-list-section" title="' +
                s +
                '">' +
                b +
                "</div></div>"),
              0 == $("#exercise-block").length &&
                $("#item" + k)
                  .children("div")
                  .append(
                    '<div class="box_shadow_block" style="padding:15px;" id="exercise-block"></div>',
                  ),
              $("#exercise-block").append(c));
          } else
            "Answer Key" == s
              ? $("#exercise-block")
                  .find(".en-story")
                  .append(
                    '<div id="exercise-answer-key"><div class="exercise-section">' +
                      s +
                      '</div><div class="faq-list-section" title="' +
                      s +
                      '">' +
                      b +
                      "</div></div></div>",
                  )
              : $("#exercise-block")
                  .find(".en-story")
                  .append(
                    '<div class="exercise-section-title">' +
                      s +
                      '</div><div class="faq-list-section" title="' +
                      s +
                      '">' +
                      b +
                      "</div></div>",
                  );
          n == f.length - 1 &&
            "" != s &&
            ($("#exercise-block")
              .find(".en-story")
              .append(
                '<div class="exercise-section-red-answer-key">Answer Key</div>',
              ),
            $(".exercise-section-red-answer-key").click(function () {
              (JSBridge.LoadStoryAnswerKeyVideoAds("Answer Key. Check it out!"),
                (adsNextUnit = !1),
                $(".answer-key-remove-after").remove(),
                $("#exercise-answer-key").css({ display: "block" }),
                $(".exercise-section-red-answer-key").css({ display: "none" }),
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
                                      $(this).children(".opt-fill-blank").val(),
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
                                    (e = " (" + $(this).attr("explain") + ")"),
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
                                  if ("V" == $(this).children(".opt-v-x").val())
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
                                        "<u>" + $.trim($(this).val()) + "</u>",
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
            }));
        }
        $(".index-block-item li").click(function () {
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
        });
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
function playSound(i, e) {
  (clearInterval(audioInterval), (currentReadingIndex = i));
  document.getElementById("sound");
  if (1 == isExercise()) {
    var n = JSON.parse(localStorage.getItem("lastestSession"));
    if (
      ($("#bottom-section").css({ display: "block" }),
      0 < (o = $("#tbl-last-session" + (parseInt(n.index) + 1))).length)
    ) {
      n = JSON.parse(localStorage.getItem("lastestSession"));
      var s = o.parent().children("div").attr("en");
      0 < n.sindex
        ? $("#bottom-section")
            .children(".container")
            .html(
              '<ul id="nav-exercise"><li>Idioms</li><li>Dialogues</li><li style="color:yellow">' +
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
          '<div class="app-name">Most Common Idioms in English</div><div class="app-slogan">Hundreds of idiomatic expressions to give you an edge in English!</div>',
        );
    ($("#nav-exercise")
      .children("li")
      .eq(2)
      .click(function () {
        var e = JSON.parse(localStorage.getItem("lastestSession")),
          t = $("#tbl-last-session" + (parseInt(e.index) + 1));
        if (0 < t.length) {
          var i = t.parent().children("div").attr("en");
          isNaN(parseInt(t.find("td").eq(1).children("div").attr("wl")))
            ? showCategorySection(i, parseInt(e.index) + 1, 0)
            : showCategorySection(
                i,
                parseInt(e.index) + 1,
                parseInt(t.find("td").eq(1).children("div").attr("wl")) + 1,
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
          $("#bottom-section").css({ display: "none" });
        }));
  } else if (1 == isStory()) {
    n = JSON.parse(localStorage.getItem("lastestSession"));
    $("#bottom-section").css({ display: "block" });
    s = "";
    if (0 < (o = $("#tbl-last-session" + (parseInt(n.index) + 1))).length)
      s = o.parent().children("div").attr("en");
    (0 == autoPlay
      ? $("#bottom-section")
          .children(".container")
          .html(
            '<ul id="nav-story"><li source="' +
              e +
              '"><img class="audio-play" status="0" src="icons/play.png" /><span style="margin-left:5px; position:relative; top:-23px"></span></li><li><a style="color:white" href="#vocabulary-block">Idioms</a></li><li style="color:yellow">' +
              s +
              "</li></ul>",
          )
      : $("#bottom-section")
          .children(".container")
          .html(
            '<ul id="nav-story"><li source="' +
              e +
              '"><img class="audio-play" status="1" src="icons/pause.png" /><span style="margin-left:5px; position:relative; top:-23px"></span></li><li><a style="color:white" href="#vocabulary-block">Idioms</a></li><li style="color:yellow">' +
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
              JSBridge.stopedPlayer())
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
              JSBridge.playMediaSeeked($(this).attr("source")));
        }),
      $("#nav-story")
        .children("li")
        .eq(1)
        .click(function () {
          (clearTimeout(nextTimeOut),
            clearTimeout(loopTimeOut),
            clearTimeout(autoNextTimeOut));
        }),
      $("#nav-story")
        .children("li")
        .eq(2)
        .click(function () {
          (clearTimeout(nextTimeOut),
            clearTimeout(loopTimeOut),
            clearTimeout(autoNextTimeOut),
            JSBridge.stopedPlayer());
          var e = JSON.parse(localStorage.getItem("lastestSession")),
            t = $("#tbl-last-session" + (parseInt(e.index) + 1));
          if (0 < t.length) {
            var i = t.parent().children("div").attr("en");
            ((adsNextUnit =
              1 != adsNextUnit ||
              (JSBridge.LoadStoryAnswerKeyVideoAds(i + ". Check it out!"), !1)),
              isNaN(parseInt(t.find("td").eq(1).children("div").attr("wl")))
                ? showCategorySection(i, parseInt(e.index) + 1, 0)
                : showCategorySection(
                    i,
                    parseInt(e.index) + 1,
                    parseInt(t.find("td").eq(1).children("div").attr("wl")) + 1,
                  ));
          }
        }));
  } else {
    var o;
    n = JSON.parse(localStorage.getItem("lastestSession"));
    if (
      ($("#bottom-section").css({ display: "block" }),
      0 < (o = $("#tbl-last-session" + (parseInt(n.index) + 1))).length)
    ) {
      s = o.parent().children("div").attr("en");
      $("#bottom-section")
        .children(".container")
        .html(
          '<ul id="nav-wordlist"><li>Practice the Idioms</li><li>Dialogues</li><li style="color:yellow">' +
            s +
            "</li></ul>",
        );
    } else
      $("#bottom-section")
        .children(".container")
        .html(
          '<ul id="nav-wordlist"><li>Practice the Idioms</li><li>Dialogues</li><li>INDEX</li></ul>',
        );
    ($("#nav-wordlist")
      .children("li")
      .eq(0)
      .click(function () {
        (clearTimeout(nextTimeOut),
          clearTimeout(loopTimeOut),
          clearTimeout(autoNextTimeOut),
          JSBridge.stopedPlayer(),
          showCategorySection(n.title, n.index, n.eindex));
      }),
      $("#nav-wordlist")
        .children("li")
        .eq(1)
        .click(function () {
          (clearTimeout(nextTimeOut),
            clearTimeout(loopTimeOut),
            clearTimeout(autoNextTimeOut),
            JSBridge.stopedPlayer());
          var e = JSON.parse(localStorage.getItem("lastestSession"));
          showCategorySection(e.title, e.index, e.sindex);
        }),
      $("#nav-wordlist")
        .children("li")
        .eq(2)
        .click(function () {
          (clearTimeout(nextTimeOut),
            clearTimeout(loopTimeOut),
            clearTimeout(autoNextTimeOut),
            JSBridge.stopedPlayer());
          var e = JSON.parse(localStorage.getItem("lastestSession")),
            t = $("#tbl-last-session" + (parseInt(e.index) + 1));
          0 < t.length &&
            showCategorySection(
              t.parent().children("div").attr("en"),
              parseInt(e.index) + 1,
              parseInt(t.find("td").eq(1).children("div").attr("wl")) + 1,
            );
        }));
  }
  if (null != e)
    if (
      ($("#item" + i)
        .find(".reading")
        .unbind("click"),
      null != localStorage[e]
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
      JSBridge.stopedPlayer(),
      1 == autoPlay ? JSBridge.playMedia(e) : (autoPlay = !0),
      1 == isStory())
    )
      var r = setInterval(function () {
        1 == JSBridge.endedPlayer() &&
          (clearInterval(r),
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
      }, 1e3);
    else
      audioInterval = setInterval(function () {
        if (1 == JSBridge.endedPlayer()) {
          clearInterval(audioInterval);
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
      }, 100);
}
function nextDialogueReading() {
  var e = JSON.parse(localStorage.getItem("settings"));
  if (null != e && 1 == e.next) {
    var t = $("#item" + currentReadingIndex).attr("si"),
      i = $("#item" + currentReadingIndex)
        .attr("soundarr")
        .split(",");
    if (t < i.length - 1) {
      var n = parseInt(t) + 1,
        s = i[n];
      ($("#item" + currentReadingIndex).attr("source", s),
        $("#item" + currentReadingIndex).attr("si", n),
        (location.hash = "#block-" + (n + 1)),
        playSound(currentReadingIndex, s),
        $("#nav-story li")
          .eq(0)
          .children("span")
          .html($(".speaker-louder").eq(n).attr("title")));
    }
  }
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
    $("#home-section").attr("top", e);
  }),
    $("#home-section").scroll(function () {
      (parseInt($("#home-section").height()),
        $("#home-section").offset(),
        $(window).height());
      var e = parseInt($(this).scrollTop());
      $("#home-section").attr("top", e);
    }),
    $("#category-section").scroll(function () {
      var e = parseInt($(this).scrollTop());
      $("#category-section").attr("top", e);
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
  ($(".en-word").each(function () {
    var e = $(window).width() * $(window).height(),
      t = 150 * (Math.sqrt(e) / Math.sqrt(786432));
    (t < 120 && (t = 120), $(".en-word").css("font-size", t + "%"));
  }),
    $(".en-story-title").each(function () {
      var e = $(window).width() * $(window).height(),
        t = 120 * (Math.sqrt(e) / Math.sqrt(786432));
      (t < 110 && (t = 110), $(".en-story-title").css("font-size", t + "%"));
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
          1 == parseInt($(this).attr("story"))
            ? ($(window).width() < 400 && (hImage = 120),
              250 <= hImage && $(this).css({ height: 250, width: 250 }),
              hImage <= 120 && $(this).css({ height: 120, width: 120 }),
              $(window).width())
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
      .css({ width: $(window).width() - 80 }),
    resizeUsageTipsSeg());
}
function scaleFontSizeIndexToolTips() {
  ($(".tool-index-idioms")
    .find(".en-word")
    .each(function () {
      var e = $(window).width() * $(window).height(),
        t = 140 * (Math.sqrt(e) / Math.sqrt(786432));
      (t < 110 && (t = 110), $(this).css("font-size", t + "%"));
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
    }));
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
        var e = $(this).children("div");
        e.css({ height: "", width: "", "overflow-y": "", "overflow-x": "" });
        var t =
          $(window).height() -
          $(".header").height() -
          $("#bottom-section").height();
        (e.height() > t &&
          e.css({
            height: t,
            width: $(this).width(),
            "overflow-y": "scroll",
            "overflow-x": "hidden",
            padding: 10,
          }),
          $(this)
            .find(".faq-list-section")
            .children("ol")
            .css({ margin: "", padding: "" }),
          $(this).find(".faq-list-section").css({ "padding-bottom": 10 }),
          $(window).width() < 400 &&
            $(this)
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
        : 0 == $(this).children("div").width()
          ? $(this).children("div").css({ width: "", float: "" })
          : $(this).children("div").css({ "max-width": "900px", float: "" }));
  }),
    $(".toefl-prep-para").each(function () {
      $(this).parent().css({ "font-weight": "normal" });
    }));
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
function showIdiomsToolTips(e) {
  (0 < $("#idiom-tip-popup").length && $("#idiom-tip-popup").remove(),
    $("body").append(
      '<div id="idiom-tip-popup"><div id="close-idiom-tip-popup"><img src="icons/close-window-50.png" /></div><div id="idiom-tip-popup-cover">' +
        $("#item" + e.attr("idx")).html() +
        "</div></div>",
    ),
    $("#idiom-tip-popup").find(".word-image").remove(),
    $("#close-idiom-tip-popup img").click(function () {
      $("#idiom-tip-popup").remove();
    }));
}
$(function () {
  if (
    ($("#modal").css({ display: "block", opacity: "1" }),
    $("#extendedSplashProgress").css({
      left: ($(window).width() - $("#extendedSplashProgress").width()) / 2,
    }),
    resizeModal(),
    resize(),
    null == localStorage.getItem("settings"))
  ) {
    localStorage.setItem("settings", JSON.stringify({ next: !1, loop: 0 }));
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
        var n = t[i].en;
        t[i].vi;
        if (null != t[i].wordlist) {
          var s = t[i].wordlist.length;
          $("#home-section")
            .children("ul")
            .append(
              '<li><div><table id="tbl-last-session' +
                i +
                '"><tr><td style="position:relative"><img en="' +
                n +
                '" idx="' +
                i +
                '" wl="' +
                s +
                '" class="img-last-session-unit story-lastest-session" src="data/' +
                urlFriendly(n) +
                "/" +
                t[i].image +
                '" /><img en="' +
                n +
                '" idx="' +
                i +
                '" wl="' +
                s +
                '" class="session-play-button" src="icons/play.png" /></td><td style="display:none"><div en="' +
                n +
                '" idx="' +
                i +
                '" wl="' +
                s +
                '" class="story-lastest-session button-session">Dialogues</div><div style="padding:3px"></div><div en="' +
                n +
                '" idx="' +
                i +
                '" class="word-list-session button-session">Idioms</div><div style="padding:3px"></div><div en="' +
                n +
                '" idx="' +
                i +
                '" wl="' +
                s +
                '" class="exercise-lastest-session button-session">Practice</div></td></tr></table><div en="' +
                n +
                '" idx="' +
                i +
                '" wl="' +
                s +
                '" class="story-lastest-session button-lesson">' +
                n +
                "</div></div></li>",
            );
        } else
          "INDEX OF IDIOMS" == n || "Appendix: VOCABULARY" == n
            ? $("#home-section")
                .children("ul")
                .append(
                  '<li><div><table id="tbl-last-session' +
                    i +
                    '"><tr><td style="position:relative"><img en="' +
                    n +
                    '" idx="' +
                    i +
                    '" wl="' +
                    s +
                    '" style=" border:0px solid chocolate;" class="word-list-session img-last-session-unit" src="data/' +
                    urlFriendly(n) +
                    "/" +
                    t[i].image +
                    '" /></td></tr></table><div en="' +
                    n +
                    '" idx="' +
                    i +
                    '" wl="' +
                    s +
                    '" class="word-list-session button-lesson" style="text-align:center; color:chocolate; border:0px solid chocolate; background:None">' +
                    n +
                    "</div></div></li>",
                )
            : $("#home-section")
                .children("ul")
                .append(
                  '<li><div><table id="tbl-last-session' +
                    i +
                    '"><tr><td style="position:relative"><img en="' +
                    n +
                    '" idx="' +
                    i +
                    '" wl="' +
                    s +
                    '" style=" border:1px solid chocolate;" class="word-list-session img-last-session-unit" src="data/' +
                    urlFriendly(n) +
                    "/" +
                    t[i].image +
                    '" /></td></tr></table><div en="' +
                    n +
                    '" idx="' +
                    i +
                    '" wl="' +
                    s +
                    '" class="word-list-session button-lesson" style="text-align:center; color:chocolate; border:1px solid chocolate">' +
                    n +
                    "</div></div></li>",
                );
        (sessionStorage.setItem(n, JSON.stringify(t[i])), (loadedTime -= 1));
      }
      ($(".word-list-session").click(function () {
        showCategorySection($(this).attr("en"), $(this).attr("idx"), 0);
      }),
        $(".exercise-lastest-session").click(function () {
          showCategorySection(
            $(this).attr("en"),
            $(this).attr("idx"),
            parseInt($(this).attr("wl")),
          );
        }),
        $(".story-lastest-session, .session-play-button").click(function () {
          (1 == adsNextUnit &&
            (JSBridge.LoadStoryAnswerKeyVideoAds(
              $(this).attr("en") + ". Check it out!",
            ),
            (adsNextUnit = !1)),
            showCategorySection(
              $(this).attr("en"),
              $(this).attr("idx"),
              parseInt($(this).attr("wl")) + 1,
            ));
        }),
        init());
    },
  }),
    (intervalInit = setInterval(function () {
      loadedTime <= 0 &&
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
      (resizeModal(),
        resize(),
        homeSectionResize(),
        swipeWindow(),
        scaleFontSize(),
        resizeLastSession(),
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
    }));
});
var scroll = function (e) {
  var t = 0;
  (e.find("#vocabulary-block").each(function () {
    t += $(this).outerHeight();
  }),
    e.scrollTop(t));
};
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
function loadLastSession() {
  try {
    var e = JSON.parse(localStorage.getItem("lastestSession"));
    null != e &&
      (0 != e.eindex
        ? $("#home-section")
            .children("div")
            .html(
              '<table id="tbl-last-session"><tr><td style="position:relative"><img id="img-last-session-unit" src="' +
                e.image +
                '" /><img id="story-lastest-session-play-button" class="session-play-button" src="icons/play.png" /></td><td style="display:none"><div id="story-lastest-session" class="button-lastest-session">Dialogues</div><div style="padding:3px"></div><div id="word-list-session" class="button-lastest-session">Idioms</div><div style="padding:3px"></div><div id="exercise-lastest-session" class="button-lastest-session">Practice</div></td></tr></table><div class="lastest-title">' +
                e.title +
                "</div>",
            )
        : $("#home-section")
            .children("div")
            .html(
              '<table id="tbl-last-session"><tr><td style="position:relative"><img id="img-last-session-unit" src="' +
                e.image +
                '" /></td></tr></table><div class="lastest-title">' +
                e.title +
                "</div>",
            ),
      $("#home-section")
        .children("div")
        .css({ background: "white", "padding-top": 15 }),
      $("#word-list-session").click(function () {
        showCategorySection(e.title, e.index, 0);
      }),
      $("#exercise-lastest-session").click(function () {
        var e = JSON.parse(localStorage.getItem("lastestSession"));
        showCategorySection(e.title, e.index, e.eindex);
      }),
      $(
        "#story-lastest-session, #story-lastest-session-play-button, #img-last-session-unit",
      ).click(function () {
        var e = JSON.parse(localStorage.getItem("lastestSession"));
        showCategorySection(e.title, e.index, e.eindex);
      }),
      resizeLastSession(),
      resizeUnitItem());
  } catch (e) {}
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
    0 < $(".word-blank-cover").length &&
      ("" == t && (t = e),
      $(".word-blank-cover")
        .find(".answer-the-questions-section-word-blank")
        .each(function () {
          1 == $(this).children(".opt-fill-blank").children("option").length &&
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
