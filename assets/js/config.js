// ============================================================
//  SITE CONFIGURATION — edit this file, nothing else needs to change.
//  Every page reads these values at load time.
// ============================================================
window.SITE = {
  // Brand
  name: "The Temple Wedding",
  tagline: "Vedic weddings in India's living temples. Planned end to end.",

  // Planner contact. Phone must be in international format, digits only, for WhatsApp.
  plannerName: "Your Name",            // e.g. "Raghavendra Bhat"
  phoneDisplay: "+91 98XXX XXXXX",     // shown on the site
  phoneE164: "919800000000",           // used for tel: and wa.me links — digits only, country code first
  email: "hello@thetemplewedding.com",
  city: "Bengaluru, Karnataka",

  // Optional: a form endpoint (Formspree, Basin, Getform, your own API).
  // Leave empty and the booking form falls back to WhatsApp + email, which needs no backend.
  formEndpoint: "",

  // Optional social links. Leave empty to hide.
  instagram: "",
  youtube: "",

  // Public URL of the site (used for canonical + share links). Update after you buy a domain.
  siteUrl: "https://shravanmulge.github.io/thetemplewedding/"
};
