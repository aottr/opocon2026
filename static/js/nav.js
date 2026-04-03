(function () {
  "use strict";

  /** Keep aria-expanded in sync with :hover / :focus-within (menu open). */
  function syncAria() {
    document.querySelectorAll(".site-nav__item--dropdown").forEach(function (item) {
      var btn = item.querySelector(".site-nav__dropdown-btn");
      if (!btn) return;

      function update() {
        var open = item.matches(":hover") || item.matches(":focus-within");
        btn.setAttribute("aria-expanded", open ? "true" : "false");
      }

      item.addEventListener("mouseenter", update);
      item.addEventListener("mouseleave", update);
      item.addEventListener("focusin", update);
      item.addEventListener("focusout", function (ev) {
        if (!item.contains(ev.relatedTarget)) update();
      });
      update();
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", syncAria);
  } else {
    syncAria();
  }
})();
