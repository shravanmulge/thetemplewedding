/* The Temple Wedding — shared behaviour (no dependencies) */
(function () {
  var S = window.SITE || {};

  // ---- inject config values into any element tagged with data-site="key"
  document.querySelectorAll("[data-site]").forEach(function (el) {
    var key = el.getAttribute("data-site");
    if (S[key] !== undefined && S[key] !== "") el.textContent = S[key];
  });
  document.querySelectorAll("[data-href]").forEach(function (el) {
    var kind = el.getAttribute("data-href");
    if (kind === "tel") el.href = "tel:+" + S.phoneE164;
    if (kind === "mail") el.href = "mailto:" + S.email;
    if (kind === "wa") el.href = "https://wa.me/" + S.phoneE164 + "?text=" + encodeURIComponent("Namaste, I'd like to plan a temple wedding. ");
    if (kind === "instagram") { if (S.instagram) el.href = S.instagram; else el.closest("li, .social-item") ? el.closest("li, .social-item").remove() : el.remove(); }
    if (kind === "youtube") { if (S.youtube) el.href = S.youtube; else el.closest("li, .social-item") ? el.closest("li, .social-item").remove() : el.remove(); }
  });
  document.querySelectorAll("[data-year]").forEach(function (el) { el.textContent = new Date().getFullYear(); });

  // ---- mark the current page in the nav
  var here = location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".nav a").forEach(function (a) {
    var target = a.getAttribute("href").split("/").pop() || "index.html";
    if (target === here) a.setAttribute("aria-current", "page");
  });

  // ---- mobile nav
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.querySelector(".nav");
  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var open = nav.classList.toggle("open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
  }

  // ---- booking form
  var form = document.getElementById("booking-form");
  if (!form) return;
  var status = document.getElementById("form-status");

  function collect() {
    var d = new FormData(form);
    var inc = d.getAll("include");
    return {
      names: d.get("names"), phone: d.get("phone"), email: d.get("email"),
      temple: d.get("temple"), dates: d.get("dates"), guests: d.get("guests"),
      tradition: d.get("tradition"), include: inc, message: d.get("message")
    };
  }

  function summary(v) {
    var lines = [
      "Namaste, we'd like to plan a temple wedding.",
      "",
      "Couple / family: " + v.names,
      "Phone: " + v.phone,
      v.email ? "Email: " + v.email : null,
      "Preferred temple: " + v.temple,
      "Tentative dates / muhurta window: " + (v.dates || "not fixed yet"),
      "Expected guests: " + (v.guests || "not sure yet"),
      "Tradition / community: " + (v.tradition || "to discuss"),
      v.include.length ? "We'd like you to handle: " + v.include.join(", ") : null,
      v.message ? "" : null,
      v.message ? "Notes: " + v.message : null
    ].filter(function (l) { return l !== null; });
    return lines.join("\n");
  }

  function setStatus(msg, cls) { status.textContent = msg; status.className = "form-status " + (cls || ""); }

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    if (!form.reportValidity()) return;
    var v = collect();
    var text = summary(v);
    var via = e.submitter && e.submitter.value;

    if (via === "email") {
      location.href = "mailto:" + S.email + "?subject=" + encodeURIComponent("Temple wedding enquiry: " + v.names) + "&body=" + encodeURIComponent(text);
      setStatus("Your email app should open with the enquiry filled in. If it doesn't, write to " + S.email + ".", "ok");
      return;
    }

    if (S.formEndpoint) {
      setStatus("Sending…");
      fetch(S.formEndpoint, { method: "POST", headers: { "Accept": "application/json", "Content-Type": "application/json" }, body: JSON.stringify(v) })
        .then(function (r) { if (!r.ok) throw new Error(r.status); setStatus("Received. We'll call you within one working day.", "ok"); form.reset(); })
        .catch(function () { setStatus("Couldn't send just now. Please use WhatsApp or email below.", "err"); });
      return;
    }

    // default: hand the enquiry to WhatsApp
    window.open("https://wa.me/" + S.phoneE164 + "?text=" + encodeURIComponent(text), "_blank", "noopener");
    setStatus("WhatsApp should open with your enquiry pre-filled. Just press send.", "ok");
  });
})();
