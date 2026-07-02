(function () {
  "use strict";

  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  var header = document.getElementById("siteHeader");
  if (header) {
    var onScroll = function () {
      header.classList.toggle("is-scrolled", window.scrollY > 12);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  var navToggle = document.getElementById("navToggle");
  var mainNav = document.getElementById("mainNav");
  if (navToggle && mainNav) {
    navToggle.addEventListener("click", function () {
      var open = mainNav.classList.toggle("is-open");
      navToggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
    mainNav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        mainNav.classList.remove("is-open");
        navToggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var revealTargets = document.querySelectorAll(
    ".service-row, .avis-item, .hero-card, .atelier-copy, .atelier-figure"
  );
  revealTargets.forEach(function (el) { el.setAttribute("data-reveal", ""); });

  if (!reduceMotion && "IntersectionObserver" in window) {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    );
    revealTargets.forEach(function (el) { observer.observe(el); });
  } else {
    revealTargets.forEach(function (el) { el.classList.add("is-visible"); });
  }

  var form = document.getElementById("contactForm");
  var status = document.getElementById("formStatus");
  if (form && status) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }
      status.textContent = "Merci ! Votre demande a été notée — nous vous répondrons rapidement.";
      form.reset();
    });
  }
})();
