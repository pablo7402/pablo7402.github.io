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

  // Grille de photos + visionneuse plein écran (voyages, garage)
  document.querySelectorAll("[data-photo-grid]").forEach(function (grid) {
    var thumbs = Array.prototype.slice.call(grid.querySelectorAll("[data-photo-thumb]"));
    if (!thumbs.length) return;

    var lightbox = grid.parentElement.querySelector("[data-lightbox]");
    if (!lightbox) return;

    var lightboxImg = lightbox.querySelector("[data-lightbox-img]");
    var closeBtn = lightbox.querySelector("[data-lightbox-close]");
    var prevBtn = lightbox.querySelector("[data-lightbox-prev]");
    var nextBtn = lightbox.querySelector("[data-lightbox-next]");
    var counter = lightbox.querySelector("[data-lightbox-counter]");
    var photos = thumbs.map(function (t) { return t.getAttribute("data-photo-thumb"); });
    var currentIndex = 0;

    function show(index) {
      currentIndex = (index + photos.length) % photos.length;
      lightboxImg.src = photos[currentIndex];
      if (counter) counter.textContent = (currentIndex + 1) + " / " + photos.length;
    }

    function open(index) {
      show(index);
      lightbox.classList.add("is-open");
      document.body.classList.add("lightbox-locked");
    }

    function close() {
      lightbox.classList.remove("is-open");
      document.body.classList.remove("lightbox-locked");
    }

    thumbs.forEach(function (thumb, i) {
      thumb.addEventListener("click", function () { open(i); });
    });

    if (closeBtn) closeBtn.addEventListener("click", close);
    if (prevBtn) prevBtn.addEventListener("click", function () { show(currentIndex - 1); });
    if (nextBtn) nextBtn.addEventListener("click", function () { show(currentIndex + 1); });

    lightbox.addEventListener("click", function (e) {
      if (e.target === lightbox) close();
    });

    document.addEventListener("keydown", function (e) {
      if (!lightbox.classList.contains("is-open")) return;
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") show(currentIndex - 1);
      if (e.key === "ArrowRight") show(currentIndex + 1);
    });
  });
})();
