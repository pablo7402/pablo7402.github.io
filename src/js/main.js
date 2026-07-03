// Animations douces au scroll (reveal) + mode sombre persistant
(function () {
  // Reveal au scroll
  var items = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    items.forEach(function (el) { observer.observe(el); });
  } else {
    items.forEach(function (el) { el.classList.add("is-visible"); });
  }

  // Mode sombre
  var root = document.documentElement;
  var toggle = document.getElementById("theme-toggle");
  var saved = localStorage.getItem("theme");
  var prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

  function applyTheme(theme) {
    if (theme === "dark") {
      root.setAttribute("data-theme", "dark");
    } else {
      root.removeAttribute("data-theme");
    }
  }

  applyTheme(saved || (prefersDark ? "dark" : "light"));

  if (toggle) {
    toggle.addEventListener("click", function () {
      var isDark = root.getAttribute("data-theme") === "dark";
      var next = isDark ? "light" : "dark";
      applyTheme(next);
      localStorage.setItem("theme", next);
    });
  }
})();
