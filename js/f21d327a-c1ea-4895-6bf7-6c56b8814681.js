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
  path = "/apps-data/easy-american-idioms/",
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
            '<div class="app-name">Easy American Idioms</div ><div class="app-slogan">Hundreds of idiomatic expressions to give you an edge in English!</div>',
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
      o = JSON.parse(
        sessionStorage.getItem(path.split("/")[2] + ":" + e),
      ).exercise;
    if (null != o)
      if (
        "index of idioms" == e.toLowerCase() ||
        "appendix: vocabulary" == e.toLowerCase()
      ) {
        readFlag();
        for (var s = 0; s < 1; s++) {
          var a = o[s].en,
            l = o[s].story;
          if (0 == s) {
            var r = JSON.parse(localStorage.getItem(lsession)),
              c = 0;
            (null == n && null == n) || (c = n.length);
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
              eindex: c,
              sindex: 0,
            };
            localStorage.setItem(lsession, JSON.stringify(i));
            var d = '<li exercise="1" id="item' + c + '"><div>';
            ((d +=
              '<div class="en-story"><div class="faq-list-section"><div class="index-alphabet-item">' +
              a +
              "</div>" +
              l +
              "</div></div>"),
              (d += "</div></li>"),
              $("#category-section")
                .children(".section")
                .children(".container")
                .append(d));
          }
        }
        setTimeout(function () {
          for (var e = 1; e < o.length; e++) {
            var t = o[e].en,
              i = o[e].story;
            ($("#item" + c)
              .find(".en-story")
              .append(
                '<div class="faq-list-section"><div class="index-alphabet-item">' +
                  t +
                  "</div>" +
                  i +
                  "</div></div>",
              ),
              e == o.length - 1 &&
                $("#item" + c)
                  .find(".en-story")
                  .append(
                    '<p class="answer-key-remove-after">&nbsp;</p><p>&nbsp;</p>',
                  ));
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
        for (s = 0; s < o.length; s++) {
          ((a = o[s].en), (l = o[s].story));
          if (0 == s) {
            ((r = JSON.parse(localStorage.getItem(lsession))), (c = 0));
            (null == n && null == n) || (c = n.length);
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
              eindex: c,
              sindex: 0,
            };
            localStorage.setItem(lsession, JSON.stringify(i));
            d = '<li exercise="1" id="item' + c + '"><div>';
            (a.toLowerCase(),
              (d +=
                '<div class="en-story"><div class="exercise-section-title">' +
                a +
                '</div><div class="faq-list-section">' +
                l +
                "</div></div>"),
              (d += "</div></li>"),
              $("#category-section")
                .children(".section")
                .children(".container")
                .append(d));
          } else
            "Answer Key" == a
              ? $("#item" + c)
                  .find(".en-story")
                  .append(
                    '<div id="exercise-answer-key"><div class="exercise-section">' +
                      a +
                      '</div><div class="faq-list-section">' +
                      l +
                      "</div><p>&nbsp;</p></div></div>",
                  )
              : $("#item" + c)
                  .find(".en-story")
                  .append(
                    '<div class="exercise-section-title">' +
                      a +
                      '</div><div class="faq-list-section">' +
                      l +
                      "</div></div>",
                  );
          s == o.length - 1 &&
            ("" != a
              ? ($("#item" + c)
                  .find(".en-story")
                  .append(
                    '<div class="exercise-section-red-answer-key">Answer Key</div><p class="answer-key-remove-after">&nbsp;</p>',
                  ),
                $(".exercise-section-red-answer-key").click(function () {
                  ($(".answer-key-remove-after").remove(),
                    $("#exercise-answer-key").css({ display: "block" }),
                    $(".exercise-section-red-answer-key").css({
                      display: "none",
                    }));
                }))
              : $("#item" + c)
                  .find(".en-story")
                  .append('<p class="answer-key-remove-after">&nbsp;</p>'));
        }
        ($(".index-block-item li").click(function () {
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
        }),
          $(".answer-the-questions-section .ul-choose-answer")
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
                $(this).css({ color: "#0065B0", "font-weight": "bold" }));
            }),
          $(".faq-list-section .ul-choose-answer li").each(function () {
            var e = $(this)
              .html()
              .replace(/_____/g, ' <input class="txt-input-answer" /> ');
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
          $(".txt-input-first-letter").each(function () {
            var e = $(this)
              .html()
              .replace(/_____/g, '<input class="txt-input-answer" />');
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
              .replace(/_/g, '<input class="txt-input-answer-char" />');
            $(this).html(e);
          }));
      }
    var p = JSON.parse(
      sessionStorage.getItem(path.split("/")[2] + ":" + e),
    ).reading;
    if (null != p) {
      $("#category-section")
        .children(".section")
        .children(".container")
        .append('<div id="story-block"></div>');
      var h = 0;
      for (s = 0; s < p.length; s++) {
        var u = p[s].type,
          m = p[s].block,
          g = ((a = p[s].en), p[s].story),
          f = p[s].image,
          v = p[s].sound;
        if ("story" == u) {
          var w = "word-image",
            y = "";
          (a.indexOf("Pronunciation Pointer") > -1 ||
            a.indexOf("Fun Fact!") > -1 ||
            a.indexOf("Did you spot it?") > -1) &&
            ((w = "word-image-small"), (y = " pronunciation-pointer"));
          d =
            '<div title="' +
            a +
            '" source="data/' +
            urlFriendly(e) +
            "/reading/" +
            p[s].sound +
            '" idx="' +
            s +
            '" class="clear-both' +
            y +
            '">';
          ("" != f &&
            ((d +=
              '<div class="' +
              w +
              '"><img nid="' +
              (h + 1) +
              '" title="' +
              a +
              '" source="data/' +
              urlFriendly(e) +
              "/reading/" +
              p[s].sound +
              '" idx="' +
              h +
              '" class="speaker-louder" story="1" src="data/' +
              urlFriendly(e) +
              "/reading/" +
              f +
              '" /></div>'),
            "" != v
              ? ((d +=
                  '<div class="en-story-title ">' +
                  a +
                  ' <img id="item' +
                  h +
                  '" nid="' +
                  (h + 1) +
                  '" title="' +
                  a +
                  '" source="data/' +
                  urlFriendly(e) +
                  "/reading/" +
                  p[s].sound +
                  '" idx="' +
                  h +
                  '" class="speaker-louder" src="icons/speaker_louder.png" /></div>'),
                (h += 1))
              : (d += '<div class="en-story-title ">' + a + "</div>")),
            (d +=
              '<div class="en-story">' +
              g +
              '</div><div style="clear:both"></div>'),
            (d += "</div>"),
            0 == $("#" + m.replace(" ", "-")).length &&
              $("#story-block").append(
                '<div class="box_shadow_block" style="padding:10px;" id="' +
                  m.replace(" ", "-") +
                  '"></div>',
              ),
            $("#" + m.replace(" ", "-")).append(d));
        }
      }
      ($(".idiom-tip").click(function () {
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
    if (null != n || null != n) {
      $("#category-section")
        .children(".section")
        .children(".container")
        .append(
          '<div class="box_shadow_block" style="padding:10px;" id="vocabulary-block"><div class="voca-block-title">IDIOMS</div><ul class="wordlist"></ul></div>',
        );
      for (s = 0; s < n.length; s++) {
        (n[s].en.substring(0, 1), (a = n[s].en), n[s].vi, n[s].pron);
        var x = n[s].desc;
        (n[s].exam,
          (f = n[s].image),
          (v = n[s].sound),
          (d = '<li id="voca' + s + '">'));
        ((d += '<div class="wordlist-cover">'),
          (d += '<div><span class="word">' + a + ":</span> " + x + "</div>"),
          (d += "</div>"),
          (d += "</li>"),
          $("#vocabulary-block .wordlist").append(d));
      }
    }
    ($(".counter").each(function () {
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
    var b = window.location.hash.substring(1);
    if ("" != b) {
      var S = b.split("&");
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
  ($("#idiom-tip-popup").length > 0 && $("#idiom-tip-popup").remove(),
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
        if (
          (readFlag(),
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
          1 == isStory())
        );
        else {
          var t = parseInt(
            $("#item" + currentReadingIndex).attr("remainAudioLoop"),
          );
          t > 0
            ? (loopTimeOut = setTimeout(function () {
                ($("#item" + currentReadingIndex).attr(
                  "remainAudioLoop",
                  t - 1,
                ),
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
        }
      })),
    1 == isExercise())
  ) {
    var i = JSON.parse(localStorage.getItem(lsession));
    if (
      ($("#bottom-section").css({ display: "block" }),
      (o = $("#tbl-last-session" + (parseInt(i.index) + 1))).length > 0)
    ) {
      i = JSON.parse(localStorage.getItem(lsession));
      var n = o.parent().children("div").attr("en");
      i.sindex > 0
        ? $("#bottom-section")
            .children(".container")
            .html(
              '<ul id="nav-exercise"><li>Idioms</li><li>Dialogues</li><li style="color:yellow"><a style="color:yellow" href="/apps/' +
                path.split("/")[2] +
                "/" +
                urlFriendly(n) +
                "/#" +
                (parseInt(i.index) + 1) +
                '">' +
                n +
                "</a></li></ul>",
            )
        : $("#bottom-section")
            .children(".container")
            .html(
              '<ul id="nav-exercise"><li style="width:0%"></li><li style="width:0%"></li><li  style="width: calc(100% - 10px); text-align:center; padding-left:5px; padding-right:5px; color:yellow"><a style="color:yellow" href="/apps/' +
                path.split("/")[2] +
                "/" +
                urlFriendly(n) +
                "/#" +
                (parseInt(i.index) + 1) +
                '">' +
                n +
                "</a></li></ul>",
            );
    } else
      $("#bottom-section")
        .children(".container")
        .html(
          '<div class="app-name">Essential American Idioms</div><div class="app-slogan">Hundreds of idiomatic expressions to give you an edge in English!</div>',
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
      resizeExerciseStory());
  } else if (1 == isStory()) {
    $("#bottom-section").css({ display: "block" });
    i = JSON.parse(localStorage.getItem(lsession));
    var o = $("#tbl-last-session" + (parseInt(i.index) + 1));
    n = "";
    (o.length > 0 && (n = o.parent().children("div").attr("en")),
      0 == autoPlay
        ? $("#bottom-section")
            .children(".container")
            .html(
              '<ul id="nav-story"><li source="' +
                t +
                '"><img class="audio-play" status="0" src="icons/play.png" /></li><li><a style="color:white" href="#vocabulary-block">Idioms</a></li><li><a style="color:yellow" href="/apps/' +
                path.split("/")[2] +
                "/" +
                urlFriendly(n) +
                "/#" +
                (parseInt(i.index) + 1) +
                '">' +
                n +
                "</a></li></ul>",
            )
        : $("#bottom-section")
            .children(".container")
            .html(
              '<ul id="nav-story"><li source="' +
                t +
                '"><img class="audio-play" status="1" src="icons/pause.png" /></li><li><a style="color:white" href="#vocabulary-block">Idioms</a></li><li><a style="color:yellow" href="/apps/' +
                path.split("/")[2] +
                "/" +
                urlFriendly(n) +
                "/#" +
                (parseInt(i.index) + 1) +
                '">' +
                n +
                "</a></li></ul>",
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
              ($(window).scrollTop($("#idioms-block").offset().top - 60),
                $("#nav-story").children("li").eq(1).html("Dialogue"));
              break;
            case "Dialogue":
              ($(window).scrollTop($("#story-block").offset().top - 60),
                $("#nav-story").children("li").eq(1).html("Idioms"));
              break;
            case "Vocabulary":
              $(window).scrollTop($("#vocabulary-block").offset().top - 60);
          }
        }),
      resizeExerciseStory());
  } else {
    $("#bottom-section").css({ display: "block" });
    ((i = JSON.parse(localStorage.getItem(lsession))),
      (n = (o = $("#tbl-last-session" + (parseInt(i.index) + 1)))
        .parent()
        .attr("en")));
    o.length > 0
      ? ($("#bottom-section")
          .children(".container")
          .html(
            '<ul id="nav-story"><li source="' +
              t +
              '"><img class="audio-play" status="0" src="icons/play.png" /><span style="margin-left:5px; position:relative; top:-23px"></span></li><li>Idioms</li><li style="color:yellow">' +
              n +
              "</li></ul>",
          ),
        $("#nav-story")
          .children("li")
          .eq(0)
          .click(function () {
            ($(".show-ads-cover").remove(),
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
              case "Idioms":
                ($(window).scrollTop($("#vocabulary-block").offset().top - 60),
                  $("#nav-story").children("li").eq(1).html("Dialogue"));
                break;
              case "Dialogue":
                ($(window).scrollTop($("#story-block").offset().top - 60),
                  $("#nav-story").children("li").eq(1).html("Idioms"));
                break;
              case "Vocabulary":
                $(window).scrollTop($("#vocabulary-block").offset().top - 60);
            }
          }),
        $("#nav-story")
          .children("li")
          .eq(2)
          .click(function () {
            o.length > 0
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
            elm.play()),
        "" == $("#nav-story li").eq(0).children("span").html() &&
          $("#nav-story li")
            .eq(0)
            .children("span")
            .html($(".speaker-louder").eq(0).attr("title")))
      : $("#bottom-section")
          .children(".container")
          .html(
            '<div class="app-name">Easy American Idioms</div><div class="app-slogan">Hundreds of idiomatic expressions to give you an edge in English!</div>',
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
    }));
}
function checkUnitOpened(e) {
  return (
    null != localStorage.getItem(path.split("/")[2] + ":" + e.toLowerCase())
  );
}
function nextWordReading() {
  var e = JSON.parse(localStorage.getItem(lsetting));
  null != e &&
    1 == e.next &&
    (nextTimeOut = setTimeout(function () {
      null != $("#item" + currentReadingIndex).attr("nid") &&
        ((currentReadingIndex = $("#item" + currentReadingIndex).attr("nid")),
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
    if (
      ($("#home-section").attr("top", e), $("#vocabulary-block").length > 0)
    ) {
      var t = $("#vocabulary-block").position().top;
      $("#home-section").attr("vb", t - parseInt($(window).height()) - 150);
      var i = 0;
      ($("#story-block").length > 0 && (i = $("#story-block").position().top),
        e >= i - parseInt($(window).height()) + 150 &&
          $("#bottom-section")
            .find("#nav-story")
            .children("li")
            .eq(1)
            .html("Dialogue"),
        e < t - parseInt($(window).height()) + 150 &&
          $("#bottom-section")
            .find("#nav-story")
            .children("li")
            .eq(1)
            .html("Idioms"));
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
    resizeWordImage());
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
          hImage >= 150 && $(this).css({ height: 150, width: 150 }),
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
    }));
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
    .css({ "padding-top": 20, "padding-bottom": 0 });
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
    url: "data/data.json?n=1",
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
          a = t[o].desc;
        null == a && (a = "Unit");
        var l = urlFriendlyFull(a.toLowerCase());
        0 == $("#div-" + l).length &&
          ($("#home-section").append(
            '<div id="div-' +
              l +
              '"><div class="section-cover" style="display:none;font-weight: bold; text-align: left; background:' +
              i[n] +
              '"><div style="padding:13px 10px; color:white;">' +
              a +
              '</div></div><ul class="curriculum-item"></ul></div>',
          ),
          (n += 1));
        var r = "waiting",
          c = localStorage.getItem(path.split("/")[2] + ":" + s.toLowerCase());
        if (
          (null != c && (r = 1 == $.parseJSON(c).read ? "play" : "reading"),
          null != t[o].wordlist)
        ) {
          var d = t[o].wordlist.length,
            p = t[o].reading[0].en;
          $("#div-" + l)
            .children("ul")
            .append(
              '<li class="item  word-list-session" story-title="' +
                p +
                '"  en="' +
                s +
                '" idx="' +
                o +
                '" wl="' +
                d +
                '"><table id="tbl-last-session' +
                o +
                '"><tr><td><div class="' +
                r +
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
                r +
                '"></div></td><td><div class="title">' +
                s +
                "</div></td></tr></table></li>",
            );
        (sessionStorage.setItem(
          path.split("/")[2] + ":" + s,
          JSON.stringify(t[o]),
        ),
          (loadedTime -= 1),
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
