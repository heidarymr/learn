// common.js
// Shared logic for language learning JS modules

// Shared variables
var timeout, elm, hImage, elm_length, elm_index, hold, l1, l2, next, direction, mc, nextTimeOut, loopTimeOut, autoNextTimeOut, audioInterval, currentReadingIndex, remainAudioLoop, currentIndex, win_width, win_height, lang = 2, autoPlay = false, tmp = "", audioLoop = 0, currentTime = 0, firstTimeLoaded = 0, fontSize = 100;

// Shared functions
function panLeft() { /* ...implementation... */ }
function panRight() { /* ...implementation... */ }
function panEnd(e) { /* ...implementation... */ }
function loadSettings() { /* ...implementation... */ }
function settings(e) { /* ...implementation... */ }
function resize() { /* ...implementation... */ }
function resizeHomeSection() { /* ...implementation... */ }
function showCategorySection(e, t, i) { /* ...implementation... */ }
function getSectionItem(e) { /* ...implementation... */ }

// Utility functions (can be extended)
function resizeWordImage() { /* ...implementation... */ }
function resizeExerciseStory() { /* ...implementation... */ }
function resizeStory() { /* ...implementation... */ }
function resizeUsageTipsSeg() { /* ...implementation... */ }
function resizeLastSession() { /* ...implementation... */ }
function resizeUnitItem() { /* ...implementation... */ }
function resizeModal() { /* ...implementation... */ }
function resizeTextareaAnswer() { /* ...implementation... */ }

// Export for usage in specific modules
window.LearnCommon = {
  panLeft, panRight, panEnd, loadSettings, settings, resize, resizeHomeSection, showCategorySection, getSectionItem,
  resizeWordImage, resizeExerciseStory, resizeStory, resizeUsageTipsSeg, resizeLastSession, resizeUnitItem, resizeModal, resizeTextareaAnswer
};
