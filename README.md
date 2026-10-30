# The Temple Wedding

Website for a wedding planner who arranges traditional Hindu weddings at living temples (Sri Virupaksha Temple, Hampi; Bhoga Nandeeshwara Temple, Nandi Hills; Melukote, Guruvayur, Madurai, Kukke Subramanya and any family kula devata shrine), end to end: temple permissions, purohits and the full ritual sequence, stay, travel, food, makeup, décor and guest care.

Plain HTML, CSS and JavaScript. No build step, no framework, no backend. It can be hosted on GitHub Pages, Netlify, Vercel, Cloudflare Pages or any static host.

## Pages

| File | Purpose |
|---|---|
| `index.html` | Home: hero, four pillars, conviction band, six service cards, two flagship temples, four-step process, beliefs + quote, FAQ, enquiry form |
| `temples.html` | Temple directory with filter tabs (flagship / Shaivite / Vaishnavite / kula devata), seven temple rows, kula devata band, how permissions work, feasibility-check form |
| `services.html` | "What We Handle": stat cards, interactive coverage configurator, six pillars with features, integrity guarantee band, custom scope form |
| `process.html` | "How It Works": four-phase chronicle, planner quote, NRI planning section with case card, FAQ, CTA band |
| `book.html` | Three-step consultation wizard (sanctum & muhurta → sampradaya → guests & contact) with urgent-contact panel, pact, temple preview and mini FAQ |
| `policies.html` | Privacy, ritual terms and temple protocols (linked from the footer) |
| `404.html` | Not-found page (GitHub Pages serves it automatically) |

## Before going live: edit `assets/js/config.js`

Every page reads contact details from one file. Set:

- `plannerName`, `phoneDisplay`, `phoneE164` (digits only, country code first; drives `tel:` and WhatsApp links), `email`, `city`, `addressLines`
- `formEndpoint` (optional): a Formspree/Basin/Getform URL. Leave empty and every form opens WhatsApp (or email) with the enquiry pre-filled, which needs no backend
- `instagram`, `youtube` (optional)
- `siteUrl`: update after you connect a custom domain

Also update the `<link rel="canonical">` and `og:` tags at the top of each HTML file once you have a domain (search for `shravanmulge.github.io`), and `robots.txt` / `sitemap.xml`.

The address and phone number currently in `config.js` are placeholders in the shape of the design mockup, not real details.

## Content to replace before launch

- **Testimonial** in `process.html` (the "Case in point" card) is a labelled sample. Replace it with a real quote and the couple's permission, or remove the card.
- **Photos.** Only Virupaksha (Hampi) and Bhoga Nandeeshwara have real photographs (Wikimedia Commons, CC BY-SA 4.0, credited in the footer). Every other image slot is a styled placeholder (`<span class="ph">`) or an illustration (`assets/img/art-*.svg`). Drop in the planner's own photographs from past weddings by replacing the `<img src>` or the `.ph` span.
- **Temple facts.** Distances, seasons and where ceremonies are held were written from general knowledge. The planner should verify each against current temple practice, especially permission conditions, which change.
- **Numbers.** The design mockup carried claims like "140+ weddings"; these were left out. Add real figures if you have them.

## How the JavaScript works

- `assets/js/config.js`: site-wide settings (above).
- `assets/js/icons.js`: inline SVG icon set. Use `<i data-icon="name"></i>` anywhere.
- `assets/js/main.js`: injects config values (`data-site`, `data-href`), mobile nav, temple filter tabs (`data-filter` / `data-tags`), services configurator (`.cfg-tile`), the booking wizard (`.wizard`), and a generic enquiry handler for any `<form data-enquiry="...">` (endpoint → WhatsApp → email fallback). Temple pages link to `book.html?temple=...` which pre-selects the temple.

## Hosting on GitHub Pages

`.github/workflows/deploy.yml` deploys the repository root to GitHub Pages on every push to `main` (and to `claude/**` branches while the site is being built).

One-time setup (the Actions token cannot create the Pages site itself):

1. Repo **Settings → Pages**.
2. **Build and deployment → Source**: choose **GitHub Actions**.
3. Re-run the "Deploy site to GitHub Pages" workflow from the **Actions** tab (or push any commit).

The site is then served at `https://<username>.github.io/thetemplewedding/`.

### Custom domain

1. Buy the domain (`thetemplewedding.com` and `thetemplewedding.in` were both available when this site was built).
2. Add a file named `CNAME` at the repository root containing only the domain.
3. Add DNS records per GitHub's guide: https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site
4. In **Settings → Pages**, enter the custom domain and tick **Enforce HTTPS** once the certificate is issued.

## Running locally

```bash
python3 -m http.server 8080
```

Then open http://localhost:8080.

## Image credits

- `virupaksha-*.jpg`, `thumb-virupaksha.jpg`, `og-image.jpg`: derived from ["Virupaksha - Gopuram"](https://commons.wikimedia.org/wiki/File:Virupaksha_-_Gopuram.jpg) by Ingo Mehling, [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/).
- `bhoga-nandeeshwara-kalyani.jpg`, `thumb-bhoga.jpg`: from ["Kalyani (Pushkarni) - Bhoga Nandeeshwara Temple"](https://commons.wikimedia.org/wiki/File:Kalyani_(Pushkarni)_-_Bhoga_Nandeeshwara_Temple.jpg) by Bikashrd, CC BY-SA 4.0.
- `bhoga-nandeeshwara-mantapa*.jpg`: from ["Bhoga Nandeeshwara Temple - Vasanta Mantapa"](https://commons.wikimedia.org/wiki/File:Bhoga_Nandeeshwara_Temple_-_Vasanta_Mantapa.jpg) by Bikashrd, CC BY-SA 4.0.
- `art-*.svg`, `pattern-mandala.svg`, `mandala-line.svg`, `favicon.svg`: original illustrations, no attribution needed.

Keep the footer credit line while these photographs are in use.
