/* The Temple Wedding — shared behaviour (no dependencies) */
(function () {
  var S = window.SITE || {};
  var I = window.ICONS || {};

  // ---- icons: <i data-icon="name"></i>
  document.querySelectorAll("[data-icon]").forEach(function (el) {
    var svg = I[el.getAttribute("data-icon")];
    if (svg) el.innerHTML = svg;
  });

  // ---- inject config values into any element tagged with data-site="key"
  document.querySelectorAll("[data-site]").forEach(function (el) {
    var key = el.getAttribute("data-site");
    if (key === "addressLines" && S.addressLines) { el.innerHTML = S.addressLines.map(function (l) { return "<span class=\"addr-line\">" + l + "</span>"; }).join(" "); return; }
    if (S[key] !== undefined && S[key] !== "") el.textContent = S[key];
  });
  var waText = encodeURIComponent("Namaste, I'd like to plan a temple wedding. ");
  document.querySelectorAll("[data-href]").forEach(function (el) {
    var kind = el.getAttribute("data-href");
    if (kind === "tel") el.href = "tel:+" + S.phoneE164;
    if (kind === "mail") el.href = "mailto:" + S.email;
    if (kind === "wa") el.href = "https://wa.me/" + S.phoneE164 + "?text=" + waText;
    if (kind === "instagram" || kind === "youtube") {
      if (S[kind]) el.href = S[kind]; else (el.closest("li") || el).remove();
    }
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
      toggle.innerHTML = open ? I.close : I.menu;
    });
  }

  // ---- filter tabs (temples page): [data-filter] buttons, [data-tags] items
  var tabs = document.querySelectorAll("[data-filter]");
  if (tabs.length) {
    var items = document.querySelectorAll("[data-tags]");
    var countEl = document.querySelector("[data-filter-count]");
    tabs.forEach(function (t) {
      t.addEventListener("click", function () {
        tabs.forEach(function (x) { x.classList.remove("active"); });
        t.classList.add("active");
        var f = t.getAttribute("data-filter"); var n = 0;
        items.forEach(function (it) {
          var show = f === "all" || (" " + it.getAttribute("data-tags") + " ").indexOf(" " + f + " ") > -1;
          it.hidden = !show; if (show) n++;
        });
        if (countEl) countEl.textContent = n;
      });
    });
  }

  // ---- coverage configurator (services page)
  var tiles = document.querySelectorAll(".cfg-tile");
  if (tiles.length) {
    var pct = document.querySelector("[data-cfg-pct]");
    var status = document.querySelector("[data-cfg-status]");
    var update = function () {
      var on = document.querySelectorAll(".cfg-tile.on").length;
      var p = Math.round(on / tiles.length * 100);
      if (pct) pct.textContent = p + "%";
      if (status) status.textContent = p === 100 ? "Complete turnkey protection" : (p === 0 ? "Nothing selected yet" : "Partial scope: " + on + " of " + tiles.length + " domains");
    };
    tiles.forEach(function (t) {
      t.addEventListener("click", function () { t.classList.toggle("on"); t.setAttribute("aria-pressed", t.classList.contains("on")); update(); });
    });
    update();
  }

  // ---- forms: any <form data-enquiry> is serialised and sent via endpoint / WhatsApp / email
  function labelFor(form, name) {
    var el = form.querySelector('[name="' + name + '"]');
    if (!el) return name;
    var lab = el.id ? form.querySelector('label[for="' + el.id + '"]') : null;
    if (!lab) { var wrap = el.closest(".field"); lab = wrap && wrap.querySelector("label, .field-label"); }
    return lab ? lab.textContent.replace(/\s*\(.*?\)\s*/g, "").replace(/\*/g, "").trim() : name;
  }
  function serialise(form) {
    var d = new FormData(form), out = {}, lines = [];
    var seen = [];
    d.forEach(function (v, k) {
      if (!v) return;
      if (!out[k]) { out[k] = []; seen.push(k); }
      out[k].push(v);
    });
    seen.forEach(function (k) { lines.push(labelFor(form, k) + ": " + out[k].join(", ")); });
    return { data: out, text: (form.getAttribute("data-enquiry") || "Temple wedding enquiry") + "\n\n" + lines.join("\n") };
  }
  function setStatus(form, msg, cls) {
    var st = form.querySelector(".form-status");
    if (!st) { st = document.createElement("p"); st.className = "form-status"; form.appendChild(st); }
    st.textContent = msg; st.className = "form-status " + (cls || "");
  }
  function send(form, via) {
    var s = serialise(form);
    if (via === "email") {
      location.href = "mailto:" + S.email + "?subject=" + encodeURIComponent(form.getAttribute("data-enquiry") || "Temple wedding enquiry") + "&body=" + encodeURIComponent(s.text);
      setStatus(form, "Your email app should open with the enquiry filled in. If it doesn't, write to " + S.email + ".", "ok");
      return;
    }
    if (S.formEndpoint && via !== "whatsapp") {
      setStatus(form, "Sending…");
      fetch(S.formEndpoint, { method: "POST", headers: { "Accept": "application/json", "Content-Type": "application/json" }, body: JSON.stringify(s.data) })
        .then(function (r) { if (!r.ok) throw new Error(r.status); setStatus(form, "Received. We'll call you within one working day.", "ok"); form.reset(); })
        .catch(function () { setStatus(form, "Couldn't send just now. Please use WhatsApp or email instead.", "err"); });
      return;
    }
    window.open("https://wa.me/" + S.phoneE164 + "?text=" + encodeURIComponent(s.text), "_blank", "noopener");
    setStatus(form, "WhatsApp should open with your enquiry pre-filled. Just press send.", "ok");
  }
  document.querySelectorAll("form[data-enquiry]").forEach(function (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (!form.reportValidity()) return;
      send(form, e.submitter && e.submitter.value);
    });
  });

  // ---- 3-step wizard (book page)
  var wiz = document.querySelector(".wizard");
  if (wiz) {
    var panels = wiz.querySelectorAll(".wiz-panel");
    var steps = wiz.querySelectorAll(".wiz-step");
    var cur = 0;
    var show = function (n, scroll) {
      cur = n;
      panels.forEach(function (p, i) { p.hidden = i !== n; });
      steps.forEach(function (s, i) { s.classList.toggle("active", i === n); s.classList.toggle("done", i < n); });
      if (scroll) wiz.scrollIntoView({ behavior: "smooth", block: "start" });
    };
    wiz.querySelectorAll("[data-next]").forEach(function (b) {
      b.addEventListener("click", function () {
        var fields = panels[cur].querySelectorAll("input, select, textarea");
        for (var i = 0; i < fields.length; i++) if (!fields[i].reportValidity()) return;
        show(Math.min(cur + 1, panels.length - 1), true);
      });
    });
    wiz.querySelectorAll("[data-prev]").forEach(function (b) { b.addEventListener("click", function () { show(Math.max(cur - 1, 0), true); }); });
    steps.forEach(function (s, i) { s.addEventListener("click", function () { if (i < cur) show(i, true); }); });
    show(0);
    // pre-select temple from ?temple=
    var t = new URLSearchParams(location.search).get("temple");
    var sel = wiz.querySelector('select[name="temple"]');
    if (t && sel) {
      var hit = false;
      for (var i = 0; i < sel.options.length; i++) if (sel.options[i].text.indexOf(t) === 0 || t.indexOf(sel.options[i].text) === 0) { sel.selectedIndex = i; hit = true; break; }
      if (!hit) sel.add(new Option(t, t, true, true));
    }
  }

  // ---- generic ?temple= preselect for non-wizard selects
  document.querySelectorAll('select[name="temple"]:not(.wizard select)').forEach(function (sel) {
    var t = new URLSearchParams(location.search).get("temple"); if (!t) return;
    for (var i = 0; i < sel.options.length; i++) if (sel.options[i].text === t) { sel.selectedIndex = i; return; }
    sel.add(new Option(t, t, true, true));
  });
})();
