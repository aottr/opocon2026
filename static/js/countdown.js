(function () {
  "use strict";

  /** Convention start: June 11 00:00:00 local. If past, next year (same calendar date). */
  function getTargetDate() {
    var now = new Date();
    var y = now.getFullYear();
    var target = new Date(y, 5, 11, 0, 0, 0, 0);
    if (now > target) {
      target = new Date(y + 1, 5, 11, 0, 0, 0, 0);
    }
    return target;
  }

  function pad2(n) {
    return n < 10 ? "0" + n : String(n);
  }

  function tick(root) {
    var target = getTargetDate();
    var now = new Date();
    var ms = target - now;

    var daysEl = root.querySelector("[data-countdown-days]");
    var hoursEl = root.querySelector("[data-countdown-hours]");
    var minutesEl = root.querySelector("[data-countdown-minutes]");
    var secondsEl = root.querySelector("[data-countdown-seconds]");
    var doneEl = root.querySelector("[data-countdown-done]");
    var gridEl = root.querySelector("[data-countdown-grid]");

    if (ms <= 0) {
      if (gridEl) gridEl.hidden = true;
      if (doneEl) doneEl.hidden = false;
      if (daysEl) daysEl.textContent = "0";
      if (hoursEl) hoursEl.textContent = "0";
      if (minutesEl) minutesEl.textContent = "0";
      if (secondsEl) secondsEl.textContent = "0";
      return;
    }

    if (doneEl) doneEl.hidden = true;
    if (gridEl) gridEl.hidden = false;

    var totalSec = Math.floor(ms / 1000);
    var days = Math.floor(totalSec / 86400);
    var hours = Math.floor((totalSec % 86400) / 3600);
    var minutes = Math.floor((totalSec % 3600) / 60);
    var seconds = totalSec % 60;

    if (daysEl) daysEl.textContent = String(days);
    if (hoursEl) hoursEl.textContent = pad2(hours);
    if (minutesEl) minutesEl.textContent = pad2(minutes);
    if (secondsEl) secondsEl.textContent = pad2(seconds);
  }

  function init() {
    var root = document.querySelector("[data-countdown]");
    if (!root) return;
    tick(root);
    setInterval(function () {
      tick(root);
    }, 1000);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
