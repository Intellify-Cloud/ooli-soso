document.addEventListener("DOMContentLoaded", function () {
  const mainNav = document.getElementById("mainNav");
  const navbarCollapse = document.getElementById("navbarResponsive");

  document.querySelectorAll('a.js-scroll-trigger[href*="#"]:not([href="#"])').forEach(function (link) {
    link.addEventListener("click", function (event) {
      const linkUrl = new URL(link.href, window.location.href);

      if (linkUrl.pathname.replace(/^\//, "") !== window.location.pathname.replace(/^\//, "") ||
          linkUrl.hostname !== window.location.hostname) {
        return;
      }

      const target = document.getElementById(linkUrl.hash.slice(1)) ||
        document.querySelector("[name='" + CSS.escape(linkUrl.hash.slice(1)) + "']");

      if (!target) {
        return;
      }

      event.preventDefault();
      window.scrollTo({
        top: target.getBoundingClientRect().top + window.pageYOffset - 54,
        behavior: "smooth"
      });
    });
  });

  document.querySelectorAll(".js-scroll-trigger").forEach(function (trigger) {
    trigger.addEventListener("click", function () {
      if (navbarCollapse && window.bootstrap) {
        window.bootstrap.Collapse.getOrCreateInstance(navbarCollapse, { toggle: false }).hide();
      }
    });
  });

  if (document.body && mainNav && window.bootstrap) {
    window.bootstrap.ScrollSpy.getOrCreateInstance(document.body, {
      target: "#mainNav",
      rootMargin: "-56px 0px -40%"
    });
  }

  function navbarShrink() {
    if (!mainNav) {
      return;
    }

    mainNav.classList.toggle("navbar-shrink", window.scrollY > 100);
  }

  navbarShrink();
  window.addEventListener("scroll", navbarShrink);
});
