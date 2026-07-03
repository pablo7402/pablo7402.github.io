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

  // Carrousel photo (voyages)
  document.querySelectorAll("[data-carousel]").forEach(function (track) {
    var wrap = track.closest(".journey-carousel");
    if (!wrap) return;

    var slides = Array.prototype.slice.call(track.children);
    var dots = Array.prototype.slice.call(wrap.querySelectorAll("[data-carousel-dot]"));
    var prevBtn = wrap.querySelector("[data-carousel-prev]");
    var nextBtn = wrap.querySelector("[data-carousel-next]");

    function setActiveDot(index) {
      dots.forEach(function (dot, i) {
        dot.classList.toggle("is-active", i === index);
      });
    }

    function scrollToSlide(index) {
      if (!slides[index]) return;
      track.scrollTo({ left: slides[index].offsetLeft - track.offsetLeft, behavior: "smooth" });
    }

    dots.forEach(function (dot, i) {
      dot.addEventListener("click", function () { scrollToSlide(i); });
    });

    if (prevBtn) {
      prevBtn.addEventListener("click", function () {
        track.scrollBy({ left: -track.clientWidth * 0.8, behavior: "smooth" });
      });
    }
    if (nextBtn) {
      nextBtn.addEventListener("click", function () {
        track.scrollBy({ left: track.clientWidth * 0.8, behavior: "smooth" });
      });
    }

    if ("IntersectionObserver" in window) {
      var slideObserver = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              setActiveDot(slides.indexOf(entry.target));
            }
          });
        },
        { root: track, threshold: 0.6 }
      );
      slides.forEach(function (slide) { slideObserver.observe(slide); });
    }
  });
})();
