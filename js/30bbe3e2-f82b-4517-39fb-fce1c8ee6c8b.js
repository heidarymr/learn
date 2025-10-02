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
  path = "/apps-data/english-vocabulary-in-use-elementary-3rd/",
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
            '<div class="app-name">English Vocabulary in Use</div ><div class="app-slogan">Elementary</div>',
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
        (localStorage.setItem(lsetting, JSON.stringify(e)),
          $("#item" + currentReadingIndex).attr(
            "remainaudioloop",
            $("#optLoop").val(),
          ));
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
    ((remainAudioLoop = null != t && 0 < t.loop ? t.loop : 0),
      null ==
        localStorage.getItem(path.split("/")[2] + ":" + e.toLowerCase()) &&
        ((h = { read: !1 }),
        localStorage.setItem(
          path.split("/")[2] + ":" + e.toLowerCase(),
          JSON.stringify(h),
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
        sessionStorage.getItem(path.split("/")[2] + ":" + e),
      ).wordlist,
      n = JSON.parse(
        sessionStorage.getItem(path.split("/")[2] + ":" + e),
      ).reading;
    if (null != n) {
      var r = "",
        o =
          '<li  story="1" remainAudioLoop="' +
          remainAudioLoop +
          '" id="item0"><div></div></li>';
      $("#category-section")
        .children(".section")
        .children(".container")
        .append(o);
      for (var s = 0; s < n.length; s++) {
        var d = n[s].type,
          a = n[s].en,
          l = (n[s].vi, n[s].story);
        (n[s].image, n[s].sound);
        switch (d.toLowerCase()) {
          case "story":
            var c = JSON.parse(localStorage.getItem(lsession)),
              h = {
                title: c.title,
                image: $("#home-section")
                  .children("ul")
                  .children("li")
                  .eq(c.index)
                  .find("img")
                  .attr("src"),
                index: c.index,
                windex: 0,
                eindex: c.eindex,
                sindex: 0,
              };
            localStorage.setItem(lsession, JSON.stringify(h));
            o = "";
            ("" != a && (o += '<div class="wordlist-rotate">' + a + "</div>"),
              (o += '<div class="en-story">' + l + "</div>"),
              (o +=
                '<div style="text-align:center; padding-top:20px; width:100%; display:none"><div class="counter reading"><div></div></div><div style="clear:both"></div></div>'),
              0 == $("#story-block").length &&
                $("#item0")
                  .children("div")
                  .append('<div id="story-block"></div>'),
              $("#story-block").append(
                '<div class="story-block-cover">' + o + "</div>",
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
            $("#story-block").append(
              '<div class="todays-idiom-section"><fieldset><legend>Today’s Idiom</legend>' +
                l +
                "</fieldset></div>",
            );
            break;
          case "faq":
            (0 == $("#exercise-block").length &&
              $("#story-block")
                .parent()
                .append('<div id="exercise-block"></div>'),
              $("#exercise-block").append(
                '<div class="wordlist-rotate">' +
                  a +
                  '</div><div class="faq-list-section" title="' +
                  a +
                  '">' +
                  l +
                  "</div>",
              ));
            break;
          case "answer key":
            ($("#story-block").append(
              '<div id="reading-answer-key"><div class="reading-comprehension-section">' +
                a +
                '</div><div class="faq-list-section" title="' +
                a +
                '">' +
                l +
                "</div></div>",
            ),
              $("#story-block").append(
                '<div style="margin-top:20px" class="reading-section-red-answer-key">Answer Key</div><p style="display:none" class="reading-answer-key-remove-after">&nbsp;</p>',
              ),
              $(".reading-section-red-answer-key").click(function () {
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
                        .attr("src", "icons/play.png"),
                      JSBridge.LoadStoryAnswerKeyVideoAds(
                        "ANSWER KEY loaded. Check it out!",
                      ),
                      $(".show-ads-cover").remove(),
                      $("#reading-answer-key")
                        .find(".answer-key-only")
                        .html(""),
                      $("#reading-answer-key").css({ display: "block" }),
                      $(".reading-section-red-answer-key").css({
                        display: "none",
                      }),
                      $(".reading-answer-key-remove-after").remove(),
                      $("#reading-answer-key").html(
                        '<table><tr><td></td><td style="background: aliceblue; text-align:center; font-weight:bold; text-transform:uppercase; padding:7px;">Answer Key</td><td style="background: aliceblue; text-align:center; font-weight:bold; text-transform:uppercase; padding:7px;">Your Answer</td></tr></table>',
                      ),
                      $(".word-free-cover").each(function () {
                        var s = 0;
                        (null != $(this).attr("start") &&
                          (s = parseInt($(this).attr("start")) - 1),
                          "Sample & Definitions" != $(this).attr("title") &&
                            "" != $(this).attr("title") &&
                            $("#reading-answer-key table").append(
                              '<tr><td colspan="3" style="text-align:left;">' +
                                $(this).attr("title") +
                                "</td></tr>",
                            ),
                          $(this)
                            .children("ol")
                            .each(function (e) {
                              var r = 1;
                              (null != $(this).attr("start") &&
                                (r = parseInt($(this).attr("start"))),
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
                                              .children(
                                                ".ul-multi-choose-answer",
                                              )
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
                                                .append(
                                                  $(this).html() + "<br/>",
                                                )
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
                                    ((i = $.trim(
                                      $("#divAnswerKeyCover")
                                        .children("div")
                                        .eq(0)
                                        .html()
                                        .replace("____", ""),
                                    )),
                                      (n = $.trim(
                                        $("#divAnswerKeyCover")
                                          .children("div")
                                          .eq(1)
                                          .html()
                                          .replace("____", ""),
                                      )));
                                    (i.toLocaleLowerCase() ==
                                    n.toLocaleLowerCase()
                                      ? $("#reading-answer-key table").append(
                                          '<tr style="background:#1EA362; color:white"><td>' +
                                            r +
                                            "</td><td>" +
                                            i +
                                            "</td><td>" +
                                            n +
                                            "</td></tr>",
                                        )
                                      : $("#reading-answer-key table").append(
                                          "<tr><td>" +
                                            r +
                                            '</td><td style="background:#1EA362; color:white">' +
                                            i +
                                            '</td><td style="background:#D9433D; color:white">' +
                                            n +
                                            "</td></tr>",
                                        ),
                                      (r += 1));
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
                                      e = $.trim(
                                        $("#divAnswerKeyCover")
                                          .children("div")
                                          .eq(1)
                                          .html(),
                                      );
                                    i.toLocaleLowerCase() ==
                                    e.toLocaleLowerCase()
                                      ? $("#reading-answer-key table").append(
                                          '<tr style="background:#1EA362; color:white"><td>' +
                                            (parseInt($(this).index()) + 1) +
                                            "</td><td>" +
                                            i +
                                            "</td><td>" +
                                            e +
                                            "</td></tr>",
                                        )
                                      : $("#reading-answer-key table").append(
                                          "<tr><td>" +
                                            (parseInt($(this).index()) + 1) +
                                            '</td><td style="background:#1EA362; color:white">' +
                                            i +
                                            '</td><td style="background:#D9433D; color:white">' +
                                            e +
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
                                      e = $.trim(
                                        $("#divAnswerKeyCover")
                                          .children("div")
                                          .eq(1)
                                          .html(),
                                      );
                                    (t.toLocaleLowerCase() ==
                                    e.toLocaleLowerCase()
                                      ? $("#reading-answer-key table").append(
                                          '<tr style="background:#1EA362; color:white"><td>' +
                                            r +
                                            "</td><td>" +
                                            t +
                                            "</td><td>" +
                                            e +
                                            "</td></tr>",
                                        )
                                      : $("#reading-answer-key table").append(
                                          "<tr><td>" +
                                            r +
                                            '</td><td style="background:#1EA362; color:white">' +
                                            t +
                                            '</td><td style="background:#D9433D; color:white">' +
                                            e +
                                            "</td></tr>",
                                        ),
                                      (r += 1));
                                  }),
                                $(this)
                                  .children(
                                    ".answer-the-questions-word-similar",
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
                                            .children(".txt-input-answer")
                                            .val(),
                                        ));
                                    var t = $.trim(
                                        $("#divAnswerKeyCover")
                                          .children("div")
                                          .eq(0)
                                          .html(),
                                      ),
                                      e = $.trim(
                                        $("#divAnswerKeyCover")
                                          .children("div")
                                          .eq(1)
                                          .html(),
                                      );
                                    t.toLocaleLowerCase() ==
                                    e.toLocaleLowerCase()
                                      ? $("#reading-answer-key table").append(
                                          '<tr style="background:#1EA362; color:white"><td>' +
                                            (parseInt($(this).index()) + 1) +
                                            "</td><td>" +
                                            t +
                                            "</td><td>" +
                                            e +
                                            "</td></tr>",
                                        )
                                      : $("#reading-answer-key table").append(
                                          "<tr><td>" +
                                            (parseInt($(this).index()) + 1) +
                                            '</td><td style="background:#1EA362; color:white">' +
                                            t +
                                            '</td><td style="background:#D9433D; color:white">' +
                                            e +
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
                                      "" != $(this).attr("fvalue")
                                        ? ($("#divAnswerKeyCover")
                                            .children("div")
                                            .eq(0)
                                            .html($(this).attr("fvalue")),
                                          $("#divAnswerKeyCover")
                                            .children("div")
                                            .eq(1)
                                            .html(
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
                                                .children(".opt-r-w")
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
                                        o = 0;
                                      o < n.length;
                                      o++
                                    )
                                      if (
                                        $.trim(n[o]) == i.toLocaleLowerCase()
                                      ) {
                                        r = !0;
                                        break;
                                      }
                                    1 == r && "" != i.toLocaleLowerCase()
                                      ? $("#reading-answer-key table").append(
                                          '<tr style="background:#1EA362; color:white"><td>' +
                                            (parseInt(e) + 1) +
                                            "</td><td>" +
                                            t +
                                            "</td><td>" +
                                            i +
                                            "</td></tr>",
                                        )
                                      : $("#reading-answer-key table").append(
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
                              ((s += 1),
                                $("#divAnswerKeyCover").remove(),
                                0 == $("#divAnswerKeyCover").length &&
                                  $("body").append(
                                    '<div id="divAnswerKeyCover" style="display:none"><div></div><div></div></div>',
                                  ));
                              var e = $(this).attr("text");
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
                                null != $(this).attr("pre")
                                  ? $("#divAnswerKeyCover")
                                      .children("div")
                                      .eq(1)
                                      .html($(this).attr("pre") + t)
                                  : $("#divAnswerKeyCover")
                                      .children("div")
                                      .eq(1)
                                      .html(t));
                              var i = $.trim(
                                  $("#divAnswerKeyCover")
                                    .children("div")
                                    .eq(0)
                                    .html(),
                                ),
                                e = $.trim(
                                  $("#divAnswerKeyCover")
                                    .children("div")
                                    .eq(1)
                                    .html(),
                                );
                              i.toLocaleLowerCase() == e.toLocaleLowerCase()
                                ? $("#reading-answer-key table").append(
                                    '<tr style="background:#1EA362; color:white"><td>' +
                                      s +
                                      "</td><td>" +
                                      i +
                                      "</td><td>" +
                                      e +
                                      "</td></tr>",
                                  )
                                : $("#reading-answer-key table").append(
                                    "<tr><td>" +
                                      s +
                                      '</td><td style="background:#1EA362; color:white">' +
                                      i +
                                      '</td><td style="background:#D9433D; color:white">' +
                                      e +
                                      "</td></tr>",
                                  );
                            }),
                          $(this)
                            .children(".word-blank-cover")
                            .each(function (e) {
                              var t = $(this).attr("h4index");
                              (null != t && (e = t),
                                $("#reading-answer-key table").append(
                                  '<tr><td></td><td colspan="2" style="font-weight:bold;">' +
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
                                      t = $.trim(
                                        $("#divAnswerKeyCover")
                                          .children("div")
                                          .eq(1)
                                          .html(),
                                      );
                                    i.toLocaleLowerCase() ==
                                    t.toLocaleLowerCase()
                                      ? $("#reading-answer-key table").append(
                                          '<tr style="background:#1EA362; color:white"><td>' +
                                            (e + 1) +
                                            "</td><td>" +
                                            i +
                                            "</td><td>" +
                                            t +
                                            "</td></tr>",
                                        )
                                      : $("#reading-answer-key table").append(
                                          "<tr><td>" +
                                            (e + 1) +
                                            '</td><td style="background:#1EA362; color:white">' +
                                            i +
                                            '</td><td style="background:#D9433D; color:white">' +
                                            t +
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
                                      t = $.trim(
                                        $("#divAnswerKeyCover")
                                          .children("div")
                                          .eq(1)
                                          .html(),
                                      );
                                    i == t
                                      ? $("#exercise-answer-key table").append(
                                          '<tr style="background:#1EA362; color:white"><td>' +
                                            (e + 1) +
                                            "</td><td>" +
                                            i +
                                            "</td><td>" +
                                            t +
                                            "</td></tr>",
                                        )
                                      : $("#exercise-answer-key table").append(
                                          "<tr><td>" +
                                            (e + 1) +
                                            '</td><td style="background:#1EA362; color:white">' +
                                            i +
                                            '</td><td style="background:#D9433D; color:white">' +
                                            t +
                                            "</td></tr>",
                                        );
                                  }));
                            }),
                          $(this)
                            .find(".answer-the-questions-word-free")
                            .each(function (e) {
                              ((s += 1),
                                $("#divAnswerKeyCover").remove(),
                                0 == $("#divAnswerKeyCover").length &&
                                  $("body").append(
                                    '<div id="divAnswerKeyCover" style="display:none"><div></div><div></div></div>',
                                  ));
                              var t = $(this).attr("text");
                              ($("#divAnswerKeyCover")
                                .children("div")
                                .eq(0)
                                .html(t),
                                $("#divAnswerKeyCover")
                                  .children("div")
                                  .eq(1)
                                  .html(
                                    $(this)
                                      .children(".txt-small-input-answer")
                                      .val(),
                                  ));
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
                                  o = 0;
                                o < n.length;
                                o++
                              )
                                if ($.trim(n[o]) == i.toLocaleLowerCase()) {
                                  r = !0;
                                  break;
                                }
                              1 == r && "" != i.toLocaleLowerCase()
                                ? $("#reading-answer-key table").append(
                                    '<tr style="background:#1EA362; color:white"><td>' +
                                      s +
                                      "</td><td>" +
                                      t +
                                      "</td><td>" +
                                      i +
                                      "</td></tr>",
                                  )
                                : $("#reading-answer-key table").append(
                                    "<tr><td>" +
                                      s +
                                      '</td><td style="background:#1EA362; color:white">' +
                                      t +
                                      '</td><td style="background:#D9433D; color:white">' +
                                      i +
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
                              ($("#divAnswerKeyCover")
                                .children("div")
                                .eq(0)
                                .html(t),
                                $("#divAnswerKeyCover")
                                  .children("div")
                                  .eq(1)
                                  .html(
                                    $(this)
                                      .children(".txt-textarea-long-answer")
                                      .val(),
                                  ));
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
                                  o = 0;
                                o < n.length;
                                o++
                              )
                                if ($.trim(n[o]) == i.toLocaleLowerCase()) {
                                  r = !0;
                                  break;
                                }
                              1 == r && "" != i.toLocaleLowerCase()
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
                      $("#reading-answer-key").css({ display: "block" }),
                      $("html, body").animate(
                        {
                          scrollTop:
                            $("#reading-answer-key").offset().top - 100,
                        },
                        600,
                        function () {},
                      ),
                      readFlag());
                  }));
              }));
        }
      }
      ($(".speaker-louder").each(function (e) {
        ($(this).attr("idx", e), (r += $(this).attr("source") + ","));
      }),
        "" != r && (r = r.substring(0, r.length - 1)),
        $("#item0").attr("soundarr", r),
        $("#item0").attr("si", 0));
    }
    if (null != i || null != i) {
      $("#item0")
        .children("div")
        .append(
          '<div class="box_shadow_block" id="vocabulary-block"><div class="wordlist-rotate">Vocabulary</div><ul class="wordlist"></ul></div>',
        );
      for (s = 0; s < i.length; s++) {
        i[s].en.substring(0, 1);
        var a = i[s].en,
          o =
            (i[s].vi,
            i[s].pron,
            i[s].desc,
            i[s].exam,
            i[s].image,
            i[s].sound,
            '<li id="voca' + s + '" word="' + a + '">'),
          p = JSON.parse(localStorage.getItem(a));
        (null != p
          ? "" != p.note
            ? ((o +=
                '<div class="en-word">' +
                a +
                ' <img src="icons/note_app.jpg" word="' +
                a +
                '" windex="' +
                s +
                '" onclick="wordnote($(this))" class="word-note" /></div>'),
              (o +=
                '<div class="en-desc"><div class="word-note-cover">' +
                p.note.replace(/\n/g, "<br/>") +
                "</div></div>"))
            : ((o +=
                '<div class="en-word">' +
                a +
                ' <img src="icons/note_app.jpg" word="' +
                a +
                '" windex="' +
                s +
                '" onclick="wordnote($(this))" class="word-note" /></div>'),
              (o += '<div class="en-desc"></div>'))
          : ((o += '<div class="en-word">' + a + "</div>"),
            (o += '<div class="en-desc" style="display:none"></div>')),
          (o += "</li>"),
          $("#vocabulary-block .wordlist").append(o));
      }
    } else readFlag();
    var v = JSON.parse(
      sessionStorage.getItem(path.split("/")[2] + ":" + e),
    ).exercise;
    if (null != v)
      if (
        ($(".reading-section-red-answer-key").css({ display: "none" }),
        null != n
          ? $("#item0")
              .children("div")
              .append('<div id="exercise-block"></div>')
          : $("#category-section")
              .children(".section")
              .children(".container")
              .append(
                '<div id="exercise-block" style="margin:10px" class="box_shadow_yt_iframe seg-block"></div>',
              ),
        "index of idioms" == e.toLowerCase() || "index" == e.toLowerCase())
      ) {
        for (s = 0; s < 1; s++) {
          var a = v[s].en,
            w = v[s].story;
          0 == s &&
            ((o = "<div>"),
            (o +=
              '<div class="en-story"><div class="faq-list-section"><h2 style="margin-top:0px">' +
              a.toUpperCase() +
              "</h2>" +
              w +
              "</div></div>"),
            (o += "</div>"),
            $("#exercise-block").append(o));
        }
        setTimeout(function () {
          for (var e = 1; e < v.length; e++) {
            var t = v[e].en,
              i = v[e].story;
            $("#exercise-block").append(
              '<div class="faq-list-section"><h2>' +
                t.toUpperCase() +
                "</h2>" +
                i +
                "</div></div>",
            );
          }
          $(".index-block-item li").click(function () {
            var e = $(this).children(".tool-index-idioms").html();
            ($(this).html('<div class="tool-index-idioms">' + e + "</div>"),
              $(this).css({ display: "table", margin: "20px 0px 20px 0px" }),
              $(this)
                .children(".tool-index-idioms")
                .attr(
                  "style",
                  "display: table-cell;background:antiquewhite; padding:10px; border-radius:5px; color:black",
                ),
              scaleFontSize());
          });
        }, 200);
      } else
        for (s = 0; s < v.length; s++) {
          ((a = v[s].en), (w = v[s].story));
          ("Answer Key" == a
            ? $("#exercise-block").append(
                '<div id="exercise-answer-key"><div class="exercise-section">' +
                  a +
                  '</div><div class="faq-list-section" title="' +
                  a +
                  '">' +
                  w +
                  "</div></div></div>",
              )
            : $("#exercise-block").append(
                '<div class="section-rotate">' +
                  a +
                  '</div><div class="faq-list-section" title="' +
                  a +
                  '">' +
                  w +
                  "</div></div>",
              ),
            s == v.length - 1 &&
              ("" != a
                ? ($("#exercise-block").append(
                    '<div class="exercise-section-red-answer-key">Answer Key</div><p style="display:none" class="answer-key-remove-after">&nbsp;</p>',
                  ),
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
                            .attr("src", "icons/play.png"),
                          JSBridge.LoadStoryAnswerKeyVideoAds(
                            "ANSWER KEY loaded. Check it out!",
                          ),
                          $(".show-ads-cover").remove(),
                          $("#exercise-answer-key").remove(),
                          $("#exercise-block").append(
                            '<div id="exercise-answer-key" style="margin-top:30px"></div>',
                          ),
                          $(".answer-key-remove-after").remove(),
                          $("#exercise-answer-key").css({ display: "block" }),
                          $(".exercise-section-red-answer-key").css({
                            display: "none",
                          }),
                          $(".answer-key-only").html(""),
                          $("#exercise-answer-key").html(
                            '<table><tr><td></td><td style="background: aliceblue; text-align:center; font-weight:bold; text-transform:uppercase; padding:7px;">Answer Key</td><td style="background: aliceblue; text-align:center; font-weight:bold; text-transform:uppercase; padding:7px;">Your Answer</td></tr></table>',
                          ),
                          $(".word-free-cover").each(function () {
                            var s = 0;
                            ("Sample & Definitions" != $(this).attr("title") &&
                              "" != $(this).attr("title") &&
                              $("#exercise-answer-key table").append(
                                '<tr><td colspan="3" style="text-align:left;">' +
                                  $(this).attr("title") +
                                  "</td></tr>",
                              ),
                              $(this)
                                .children("ol")
                                .each(function (e) {
                                  var r = 1;
                                  (null != $(this).attr("start") &&
                                    (r = parseInt($(this).attr("start"))),
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
                                                  .children(
                                                    ".ul-multi-choose-answer",
                                                  )
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
                                                    .append(
                                                      $(this).html() + "<br/>",
                                                    )
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
                                        ((i = $.trim(
                                          $("#divAnswerKeyCover")
                                            .children("div")
                                            .eq(0)
                                            .html()
                                            .replace("____", ""),
                                        )),
                                          (n = $.trim(
                                            $("#divAnswerKeyCover")
                                              .children("div")
                                              .eq(1)
                                              .html()
                                              .replace("____", ""),
                                          )));
                                        (i.toLocaleLowerCase() ==
                                        n.toLocaleLowerCase()
                                          ? $(
                                              "#exercise-answer-key table",
                                            ).append(
                                              '<tr style="background:#1EA362; color:white"><td>' +
                                                r +
                                                "</td><td>" +
                                                i +
                                                "</td><td>" +
                                                n +
                                                "</td></tr>",
                                            )
                                          : $(
                                              "#exercise-answer-key table",
                                            ).append(
                                              "<tr><td>" +
                                                r +
                                                '</td><td style="background:#1EA362; color:white">' +
                                                i +
                                                '</td><td style="background:#D9433D; color:white">' +
                                                n +
                                                "</td></tr>",
                                            ),
                                          (r += 1));
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
                                          (t = t.substring(
                                            0,
                                            t.lastIndexOf("/"),
                                          )),
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
                                          e = $.trim(
                                            $("#divAnswerKeyCover")
                                              .children("div")
                                              .eq(1)
                                              .html(),
                                          );
                                        i.toLocaleLowerCase() ==
                                        e.toLocaleLowerCase()
                                          ? $(
                                              "#reading-answer-key table",
                                            ).append(
                                              '<tr style="background:#1EA362; color:white"><td>' +
                                                (parseInt($(this).index()) +
                                                  1) +
                                                "</td><td>" +
                                                i +
                                                "</td><td>" +
                                                e +
                                                "</td></tr>",
                                            )
                                          : $(
                                              "#reading-answer-key table",
                                            ).append(
                                              "<tr><td>" +
                                                (parseInt($(this).index()) +
                                                  1) +
                                                '</td><td style="background:#1EA362; color:white">' +
                                                i +
                                                '</td><td style="background:#D9433D; color:white">' +
                                                e +
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
                                          e = $.trim(
                                            $("#divAnswerKeyCover")
                                              .children("div")
                                              .eq(1)
                                              .html(),
                                          );
                                        (t.toLocaleLowerCase() ==
                                        e.toLocaleLowerCase()
                                          ? $(
                                              "#exercise-answer-key table",
                                            ).append(
                                              '<tr style="background:#1EA362; color:white"><td>' +
                                                r +
                                                "</td><td>" +
                                                t +
                                                "</td><td>" +
                                                e +
                                                "</td></tr>",
                                            )
                                          : $(
                                              "#exercise-answer-key table",
                                            ).append(
                                              "<tr><td>" +
                                                r +
                                                '</td><td style="background:#1EA362; color:white">' +
                                                t +
                                                '</td><td style="background:#D9433D; color:white">' +
                                                e +
                                                "</td></tr>",
                                            ),
                                          (r += 1));
                                      }),
                                    $(this)
                                      .children(
                                        ".answer-the-questions-word-similar",
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
                                                .children(".txt-input-answer")
                                                .val(),
                                            ));
                                        var t = $.trim(
                                            $("#divAnswerKeyCover")
                                              .children("div")
                                              .eq(0)
                                              .html(),
                                          ),
                                          e = $.trim(
                                            $("#divAnswerKeyCover")
                                              .children("div")
                                              .eq(1)
                                              .html(),
                                          );
                                        t.toLocaleLowerCase() ==
                                        e.toLocaleLowerCase()
                                          ? $(
                                              "#exercise-answer-key table",
                                            ).append(
                                              '<tr style="background:#1EA362; color:white"><td>' +
                                                (parseInt($(this).index()) +
                                                  1) +
                                                "</td><td>" +
                                                t +
                                                "</td><td>" +
                                                e +
                                                "</td></tr>",
                                            )
                                          : $(
                                              "#exercise-answer-key table",
                                            ).append(
                                              "<tr><td>" +
                                                (parseInt($(this).index()) +
                                                  1) +
                                                '</td><td style="background:#1EA362; color:white">' +
                                                t +
                                                '</td><td style="background:#D9433D; color:white">' +
                                                e +
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
                                          "" != $(this).attr("fvalue")
                                            ? ($("#divAnswerKeyCover")
                                                .children("div")
                                                .eq(0)
                                                .html($(this).attr("fvalue")),
                                              $("#divAnswerKeyCover")
                                                .children("div")
                                                .eq(1)
                                                .html(
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
                                                    .children(".opt-r-w")
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
                                            n = t
                                              .toLocaleLowerCase()
                                              .split("/"),
                                            r = !1,
                                            o = 0;
                                          o < n.length;
                                          o++
                                        )
                                          if (
                                            $.trim(n[o]) ==
                                            i.toLocaleLowerCase()
                                          ) {
                                            r = !0;
                                            break;
                                          }
                                        1 == r && "" != i.toLocaleLowerCase()
                                          ? $(
                                              "#exercise-answer-key table",
                                            ).append(
                                              '<tr style="background:#1EA362; color:white"><td>' +
                                                (parseInt(e) + 1) +
                                                "</td><td>" +
                                                t +
                                                "</td><td>" +
                                                i +
                                                "</td></tr>",
                                            )
                                          : $(
                                              "#exercise-answer-key table",
                                            ).append(
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
                                  ((s += 1),
                                    $("#divAnswerKeyCover").remove(),
                                    0 == $("#divAnswerKeyCover").length &&
                                      $("body").append(
                                        '<div id="divAnswerKeyCover" style="display:none"><div></div><div></div></div>',
                                      ));
                                  var e = $(this).attr("text");
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
                                    null != $(this).attr("pre")
                                      ? $("#divAnswerKeyCover")
                                          .children("div")
                                          .eq(1)
                                          .html($(this).attr("pre") + t)
                                      : $("#divAnswerKeyCover")
                                          .children("div")
                                          .eq(1)
                                          .html(t));
                                  for (
                                    var e = $.trim(
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
                                      n = e.toLocaleLowerCase().split("/"),
                                      r = !1,
                                      o = 0;
                                    o < n.length;
                                    o++
                                  )
                                    if ($.trim(n[o]) == i.toLocaleLowerCase()) {
                                      r = !0;
                                      break;
                                    }
                                  1 == r && "" != i.toLocaleLowerCase()
                                    ? $("#exercise-answer-key table").append(
                                        '<tr style="background:#1EA362; color:white"><td>' +
                                          s +
                                          "</td><td>" +
                                          e +
                                          "</td><td>" +
                                          i +
                                          "</td></tr>",
                                      )
                                    : $("#exercise-answer-key table").append(
                                        "<tr><td>" +
                                          s +
                                          '</td><td style="background:#1EA362; color:white">' +
                                          e +
                                          '</td><td style="background:#D9433D; color:white">' +
                                          i +
                                          "</td></tr>",
                                      );
                                }),
                              $(this)
                                .children(".word-blank-cover")
                                .each(function (e) {
                                  var t = $(this).attr("h4index");
                                  (null != t && (e = t),
                                    $("#exercise-answer-key table").append(
                                      '<tr><td></td><td colspan="2" style="font-weight:bold;">' +
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
                                          t = $.trim(
                                            $("#divAnswerKeyCover")
                                              .children("div")
                                              .eq(1)
                                              .html(),
                                          );
                                        i.toLocaleLowerCase() ==
                                        t.toLocaleLowerCase()
                                          ? $(
                                              "#exercise-answer-key table",
                                            ).append(
                                              '<tr style="background:#1EA362; color:white"><td>' +
                                                (e + 1) +
                                                "</td><td>" +
                                                i +
                                                "</td><td>" +
                                                t +
                                                "</td></tr>",
                                            )
                                          : $(
                                              "#exercise-answer-key table",
                                            ).append(
                                              "<tr><td>" +
                                                (e + 1) +
                                                '</td><td style="background:#1EA362; color:white">' +
                                                i +
                                                '</td><td style="background:#D9433D; color:white">' +
                                                t +
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
                                          t = $.trim(
                                            $("#divAnswerKeyCover")
                                              .children("div")
                                              .eq(1)
                                              .html(),
                                          );
                                        i == t
                                          ? $(
                                              "#exercise-answer-key table",
                                            ).append(
                                              '<tr style="background:#1EA362; color:white"><td>' +
                                                (e + 1) +
                                                "</td><td>" +
                                                i +
                                                "</td><td>" +
                                                t +
                                                "</td></tr>",
                                            )
                                          : $(
                                              "#exercise-answer-key table",
                                            ).append(
                                              "<tr><td>" +
                                                (e + 1) +
                                                '</td><td style="background:#1EA362; color:white">' +
                                                i +
                                                '</td><td style="background:#D9433D; color:white">' +
                                                t +
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
                                  ($("#divAnswerKeyCover")
                                    .children("div")
                                    .eq(0)
                                    .html(t),
                                    $("#divAnswerKeyCover")
                                      .children("div")
                                      .eq(1)
                                      .html(
                                        $(this)
                                          .children(".txt-small-input-answer")
                                          .val(),
                                      ));
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
                                      o = 0;
                                    o < n.length;
                                    o++
                                  )
                                    if ($.trim(n[o]) == i.toLocaleLowerCase()) {
                                      r = !0;
                                      break;
                                    }
                                  1 == r && "" != i.toLocaleLowerCase()
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
                                  ($("#divAnswerKeyCover")
                                    .children("div")
                                    .eq(0)
                                    .html(t),
                                    $("#divAnswerKeyCover")
                                      .children("div")
                                      .eq(1)
                                      .html(
                                        $(this)
                                          .children(".txt-textarea-long-answer")
                                          .val(),
                                      ));
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
                                      o = 0;
                                    o < n.length;
                                    o++
                                  )
                                    if ($.trim(n[o]) == i.toLocaleLowerCase()) {
                                      r = !0;
                                      break;
                                    }
                                  1 == r && "" != i.toLocaleLowerCase()
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
                            {
                              scrollTop:
                                $("#exercise-answer-key").offset().top - 100,
                            },
                            600,
                            function () {},
                          ),
                          readFlag());
                      }));
                  }))
                : $("#exercise-block").append(
                    '<p style="display:none" class="answer-key-remove-after">&nbsp;</p>',
                  )));
        }
    ($(".speaker-louder").click(function () {
      var e = $(this).attr("source");
      ($("#item" + currentReadingIndex).attr("si", $(this).attr("idx")),
        playSound(currentReadingIndex, e),
        $("#nav-story li")
          .eq(0)
          .children("span")
          .html($(this).parent().children("span").html()));
    }),
      replaceChooseAnswer2(),
      loadNoteWordList(),
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
  ((elm_index = currentReadingIndex = e),
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
  $("#bottom-section").css({ display: "block" });
  var i = JSON.parse(localStorage.getItem(lsession)),
    n = $("#tbl-last-session" + (parseInt(i.index) + 1)),
    r = n.parent().attr("en");
  (0 < n.length
    ? ($("#bottom-section")
        .children(".container")
        .html(
          '<ul id="nav-story"><li source="' +
            e +
            '"><img class="audio-play" status="0" src="icons/play.png" /><span style="margin-left:5px; position:relative; top:-23px"></span></li><li>Vocabulary</li><li style="color:yellow">' +
            r +
            "</li></ul>",
        ),
      0 == $("#vocabulary-block").length &&
        ($("#nav-story").children("li").eq(0).html(""),
        $("#nav-story").children("li").eq(1).html(""),
        $("#nav-story").children("li").eq(0).css({ width: "0px" }),
        $("#nav-story").children("li").eq(1).css({ width: "0px" }),
        $("#nav-story").children("li").eq(2).css({ width: "100%" })),
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
            case '<img src="icons/back-to-top.png" style="width: 30px; position: relative; top: -5px;" />':
            case '<img src="icons/back-to-top.png" style="width: 30px; position: relative; top: -5px;">':
              ($(window).scrollTop(
                $(".story-block-cover").eq(0).offset().top - 60,
              ),
                $("#nav-story").children("li").eq(1).html("Vocabulary"));
              break;
            case "Vocabulary":
              ($(window).scrollTop($("#vocabulary-block").offset().top - 60),
                $("#nav-story").children("li").eq(1).html("Exercises"));
              break;
            case "Exercises":
              ($(window).scrollTop(
                $("#exercise-block").eq(0).offset().top - 60,
              ),
                $("#nav-story").children("li").eq(1).html(""));
          }
        }),
      $("#nav-story")
        .children("li")
        .eq(2)
        .click(function () {
          0 < n.length
            ? 0 == checkUnitOpened(r)
              ? showAdsForNextLesson(r, r, parseInt(i.index) + 1, 0)
              : (elm.pause(),
                (autoPlay = !1),
                1 == showAds() &&
                  JSBridge.LoadStoryAnswerKeyVideoAds(
                    nFullTitle.toUpperCase() + " loaded. Check it out!",
                  ),
                showCategorySection(r, parseInt(i.index) + 1, 0))
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
            .attr("src", "icons/pause.png")),
      "" == $("#nav-story li").eq(0).children("span").html() &&
        $("#nav-story li")
          .eq(0)
          .children("span")
          .html($(".speaker-louder").eq(0).parent().children("span").html()))
    : $("#bottom-section")
        .children(".container")
        .html(
          '<div class="app-name">English Vocabulary in Use</div><div class="app-slogan">Elementary</div>',
        ),
    null != e &&
      ((elm.src = e),
      (elm.onloadedmetadata = function () {
        (localStorage.setItem("currentIndex", currentReadingIndex),
          $("#player-loading").remove(),
          1 == autoPlay ? elm.play() : (autoPlay = !0));
      }),
      (elm.onended = function () {
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
          isStory());
        var e = parseInt(
          $("#item" + currentReadingIndex).attr("remainAudioLoop"),
        );
        0 < e
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
                nextDialogueReading());
            }, 200)));
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
  var e = JSON.parse(localStorage.getItem(lsession)),
    e = $("#tbl-last-session" + e.index)
      .parent()
      .attr("en");
  (localStorage.removeItem(path.split("/")[2] + ":" + e.toLowerCase()),
    null == localStorage.getItem(path.split("/")[2] + ":" + e.toLowerCase()) &&
      localStorage.setItem(
        path.split("/")[2] + ":" + e.toLowerCase(),
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
function nextDialogueReading() {
  var e,
    t,
    i,
    n = JSON.parse(localStorage.getItem(lsetting));
  null == n ||
    1 != n.next ||
    ((e = $("#item" + currentReadingIndex).attr("si")) <
      (n = $("#item" + currentReadingIndex)
        .attr("soundarr")
        .split(",")).length -
        1 &&
      ((t = parseInt(e) + 1),
      (i = n[t]),
      $("#item" + currentReadingIndex).attr("source", i),
      $("#item" + currentReadingIndex).attr("si", t),
      $("html, body").animate(
        { scrollTop: $(".speaker-louder").eq(t).offset().top - 100 },
        600,
        function () {
          (playSound(currentReadingIndex, i),
            $("#nav-story li")
              .eq(0)
              .children("span")
              .html(
                $(".speaker-louder").eq(t).parent().children("span").html(),
              ));
        },
      )));
}
function focusReading(e) {
  var t;
  0 ==
    $("#item" + e)
      .find(".word-image")
      .find(".reading").length &&
    ($("#item" + next)
      .find(".word-image")
      .append("<div class='reading' style='position:absolute;'></div>"),
    (t = $(window).width()),
    $("#item" + e)
      .find(".word-image")
      .find(".reading")
      .css({
        width: (t - 20) / 2,
        height: "100%",
        top: 0,
        left: (t - (t - 20) / 2) / 2 - 10,
      }));
}
function homeScroll(e) {
  ($(window).scroll(function () {
    (parseInt($("#home-section").height()),
      $("#home-section").offset(),
      $(window).height());
    var e = parseInt($(this).scrollTop());
    null == $("#home-section").attr("home") &&
      $("#home-section").attr("top", e);
    var t = 0;
    0 < $(".story-block-cover").length &&
      (t = $(".story-block-cover").eq(0).position().top);
    var i = 0;
    0 < $("#vocabulary-block").length &&
      (i = $("#vocabulary-block").position().top);
    var n = 0;
    (0 < $("#exercise-block").length &&
      (n = $("#exercise-block").position().top),
      e >= t - parseInt($(window).height()) + 150 &&
        $("#bottom-section")
          .find("#nav-story")
          .children("li")
          .eq(1)
          .html("Vocabulary"),
      e >= 0 - parseInt($(window).height()) + 150 &&
        $("#bottom-section")
          .find("#nav-story")
          .children("li")
          .eq(1)
          .html("Vocabulary"),
      e >= i - parseInt($(window).height()) + 150 &&
        $("#bottom-section")
          .find("#nav-story")
          .children("li")
          .eq(1)
          .html("Exercises"),
      e >= n - parseInt($(window).height()) + 150 &&
        $("#bottom-section")
          .find("#nav-story")
          .children("li")
          .eq(1)
          .html(
            '<img src="icons/back-to-top.png" style="width: 30px; position: relative; top: -5px;" />',
          ));
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
    var e = $(window).width() * $(window).height();
    (Math.sqrt(e), Math.sqrt(t));
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
      var e = $(window).width() * $(window).height();
      (Math.sqrt(e), Math.sqrt(t));
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
    $("#section-section")
      .children(".title")
      .css({ width: $(window).width() - 100 }),
    resizeExerciseStory());
}
function scaleFontSizeIndexToolTips() {
  ($(".tool-index-idioms")
    .find(".en-word")
    .each(function () {
      var e = $(window).width() * $(window).height();
      (Math.sqrt(e), Math.sqrt(786432));
    }),
    $("#section-section")
      .children(".title")
      .css({ width: $(window).width() - 80 }),
    resizeExerciseStory());
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
      ($(this).children("img").css({ "max-width": 400, "min-width": 300 }),
        $(this)
          .children("div")
          .css({ "max-width": "calc(100% - 350px)", "min-width": 300 }),
        $(window).width() <= 400 &&
          $(this).children("img").css({ "max-width": 300 }));
    }));
}
function setStoreLastSession(e, t) {
  t = {
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
  localStorage.setItem(lsession, JSON.stringify(t));
}
function loadLastSession() {
  try {
    var e,
      t,
      i = JSON.parse(localStorage.getItem(lsession));
    null != i
      ? ((e = "waiting"),
        null !=
          (t = localStorage.getItem(
            path.split("/")[2] + ":" + i.title.toLowerCase(),
          )) && (e = 1 == $.parseJSON(t).read ? "play" : "reading"),
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
        var e;
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
              ((e = $("#answer-popup div").eq(0).html().split("/")),
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
            : 0 < $("#answer-popup").length &&
              ((e = $("#answer-popup div").eq(2).html().split("/")),
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
    }),
    $(".answer-the-questions-section-char").each(function () {
      var e = $(this)
        .html()
        .replace(/_____/g, '<input class="txt-input-answer-char" />');
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
        59 < t && ((i += 1), (t = 0));
        var n = $("#answer-popup div").eq(0).html().split("/"),
          r = $("#answer-popup div").eq(2).html().split("/"),
          e = parseInt(n[0]) + parseInt(r[0]);
        ((59 < i || e >= parseInt(n[1])) &&
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
          t < 10 && (t = "0" + t),
          i < 10 && (i = "0" + i),
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
  var t,
    i = e.attr("word"),
    n = JSON.parse(localStorage.getItem(i)),
    r = "";
  null == n
    ? ((t = { note: "" }), (r = ""), localStorage.setItem(i, JSON.stringify(t)))
    : null != n.note && (r = n.note);
  n = e.attr("windex");
  (e
    .parent()
    .parent()
    .find(".en-desc")
    .append(
      '<div id="word-note-cover"><textarea word="' +
        i +
        '">' +
        r +
        '</textarea><br/><input type="button"  word="' +
        i +
        '" windex="' +
        n +
        '" class="note-button" value="Save" /> <input type="button" word="' +
        i +
        '" windex="' +
        n +
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
function loadNoteWordList() {
  0 < $("#vocabulary-block").length &&
    $("#vocabulary-block")
      .children(".wordlist")
      .children("li")
      .each(function () {
        var e = JSON.parse(localStorage.getItem($(this).attr("word")));
        null == e
          ? $(this)
              .find(".en-word")
              .html(
                $(this).find(".en-word").html() +
                  ' <img word="' +
                  $(this).attr("word") +
                  '" windex="' +
                  $(this).index() +
                  '" onclick="wordnote($(this))" src="icons/note_app.jpg" class="word-note" />',
              )
          : e.note;
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
$(function () {
  var e;
  ((elm = document.getElementById("sound")),
    $("#modal").css({ display: "block", opacity: "1" }),
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
    $.ajax({
      url: "data/data.json?n=" + new Date(),
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
            r = 0;
          r < t.length;
          r++
        ) {
          var o = t[r].en,
            s = t[r].desc;
          null == s && (s = "Unit");
          var d = "unit";
          0 == $("#div-" + d).length &&
            ($("#home-section").append(
              '<div id="div-unit"><div class="section-cover" style="display:none;font-weight: bold; text-align: left; background:' +
                i[n] +
                '"><div style="padding:13px 10px; color:white;">' +
                s +
                '</div></div><ul class="curriculum-item"></ul></div>',
            ),
            (n += 1));
          var a = "waiting",
            l = localStorage.getItem(
              path.split("/")[2] + ":" + o.toLowerCase(),
            );
          (null != l && (a = 1 == $.parseJSON(l).read ? "play" : "reading"),
            null != t[r].wordlist
              ? ((s = t[r].wordlist.length),
                (l = t[r].reading[0].en),
                $("#div-" + d)
                  .children("ul")
                  .append(
                    '<li class="item  word-list-session" story-title="' +
                      l +
                      '"  en="' +
                      o +
                      '" idx="' +
                      r +
                      '" wl="' +
                      s +
                      '"><table id="tbl-last-session' +
                      r +
                      '"><tr><td><div class="' +
                      a +
                      '"></div></td><td><div class="title">' +
                      o +
                      "</div></td></tr></table></li>",
                  ))
              : $("#div-" + d)
                  .children("ul")
                  .append(
                    '<li class="item  word-list-session"  story-title="" en="' +
                      o +
                      '" idx="' +
                      r +
                      '" wl="0" ><table id="tbl-last-session' +
                      r +
                      '"><tr><td><div class="' +
                      a +
                      '"></div></td><td><div class="title">' +
                      o +
                      "</div></td></tr></table></li>",
                  ),
            sessionStorage.setItem(
              path.split("/")[2] + ":" + o,
              JSON.stringify(t[r]),
            ),
            --loadedTime,
            r == t.length - 1 &&
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
