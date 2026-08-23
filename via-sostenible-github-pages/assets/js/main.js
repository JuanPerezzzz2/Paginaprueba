(function () {
  "use strict";

  const body = document.body;
  body.classList.add("js-enabled");
  const toggle = document.querySelector(".menu-toggle");
  const menu = document.querySelector(".nav-links");
  const desktopQuery = window.matchMedia("(min-width: 981px)");

  function closeMenu(returnFocus) {
    if (!toggle || !menu) return;
    menu.classList.remove("open");
    toggle.setAttribute("aria-expanded", "false");
    toggle.setAttribute("aria-label", "Abrir menú");
    body.classList.remove("menu-open");
    if (returnFocus) toggle.focus();
  }

  if (toggle && menu) {
    toggle.addEventListener("click", function () {
      const open = !menu.classList.contains("open");
      menu.classList.toggle("open", open);
      toggle.setAttribute("aria-expanded", String(open));
      toggle.setAttribute("aria-label", open ? "Cerrar menú" : "Abrir menú");
      body.classList.toggle("menu-open", open);
      if (open) menu.querySelector("a")?.focus();
    });

    menu.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        closeMenu(false);
      });
    });

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape" && menu.classList.contains("open")) {
        closeMenu(true);
      }
    });

    desktopQuery.addEventListener("change", function (event) {
      if (event.matches) closeMenu(false);
    });
  }

  document.querySelectorAll("[data-current-year]").forEach(function (element) {
    element.textContent = String(new Date().getFullYear());
  });

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const reveals = document.querySelectorAll(".reveal");
  if (!reduceMotion && reveals.length && "IntersectionObserver" in window) {
    body.classList.add("reveal-ready");
    const observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    reveals.forEach(function (element) {
      observer.observe(element);
    });
  }

  const serviceSelect = document.querySelector("#servicio");
  if (serviceSelect) {
    const requestedService = new URLSearchParams(window.location.search).get("servicio");
    if (requestedService) {
      const matchingOption = Array.from(serviceSelect.options).find(function (option) {
        return option.value === requestedService;
      });
      if (matchingOption) serviceSelect.value = requestedService;
    }
  }

  const form = document.querySelector("[data-contact-form]");
  if (!form) return;

  form.noValidate = true;

  const status = form.querySelector(".form-status");
  const requiredFields = form.querySelectorAll("[required]");

  if (new URLSearchParams(window.location.search).get("estado") === "datos") {
    status.textContent = "No fue posible validar la información enviada. Revisa los campos y vuelve a intentarlo.";
    status.classList.add("visible");
  }

  function errorMessage(field) {
    if (field.validity.valueMissing) {
      if (field.type === "checkbox") return "Debes aceptar el Aviso de Privacidad para continuar.";
      return "Este campo es obligatorio.";
    }
    if (field.validity.typeMismatch) return "Escribe un correo electrónico válido.";
    return "Revisa la información de este campo.";
  }

  function showFieldState(field) {
    const error = document.getElementById(field.getAttribute("aria-describedby"));
    const invalid = !field.validity.valid;
    field.setAttribute("aria-invalid", String(invalid));
    if (error) error.textContent = invalid ? errorMessage(field) : "";
    return !invalid;
  }

  requiredFields.forEach(function (field) {
    field.addEventListener("blur", function () {
      showFieldState(field);
    });
    field.addEventListener(field.type === "checkbox" ? "change" : "input", function () {
      if (field.getAttribute("aria-invalid") === "true") showFieldState(field);
    });
  });

  form.addEventListener("submit", function (event) {
    let firstInvalid = null;
    requiredFields.forEach(function (field) {
      if (!showFieldState(field) && !firstInvalid) firstInvalid = field;
    });

    if (firstInvalid) {
      event.preventDefault();
      status.textContent = "Hay información pendiente. Revisa los campos señalados antes de enviar.";
      status.classList.add("visible");
      firstInvalid.focus();
    } else if (form.hasAttribute("data-preview-form")) {
      event.preventDefault();
      status.textContent = "La información es válida. Esta demostración no envía datos; el envío se activará en Hostinger.";
      status.classList.add("visible");
    } else {
      status.textContent = "";
      status.classList.remove("visible");
    }
  });
})();
