# The Temple Wedding

Website for a wedding planner who arranges traditional Hindu weddings at living temples (Sri Virupaksha Temple, Hampi; Bhoga Nandeeshwara Temple, Nandi Hills; and others), end to end: temple permissions, purohits and the full ritual sequence, stay, travel, food, makeup, décor, photography and guest care.

Plain HTML, CSS and JavaScript. No build step, no framework, no backend. It can be hosted on GitHub Pages, Netlify, Vercel, Cloudflare Pages or any static host.

## Pages

| File | Purpose |
|---|---|
| `index.html` | Home: positioning, what's included, flagship temples, process summary, FAQ |
| `temples.html` | Temple directory with details for Virupaksha and Bhoga Nandeeshwara, plus other temples |
| `services.html` | Everything the planner handles, by category |
| `process.html` | The booking and discussion-round process, step by step |
| `book.html` | Consultation enquiry form (WhatsApp / email / optional form endpoint) |
| `404.html` | Not-found page (GitHub Pages serves it automatically) |

## Before going live: edit `assets/js/config.js`

Every page reads its contact details from one file. Open `assets/js/config.js` and set:

- `plannerName`: the planner's name (shown in the quote on the home page)
- `phoneDisplay`: the phone number as you want it printed
- `phoneE164`: the same number, digits only with country code, e.g. `919812345678`. This drives the `tel:` and WhatsApp links.
- `email`
- `city`
- `formEndpoint` (optional): paste a Formspree/Basin/Getform URL and the booking form will POST to it. Leave empty and the form opens WhatsApp (or email) with the enquiry pre-filled, which needs no backend at all.
- `instagram`, `youtube` (optional): leave empty to hide the links
- `siteUrl`: update after you connect a custom domain

Also update the `<link rel="canonical">` and `og:` tags at the top of each HTML file once you have a domain (search for `shravanmulge.github.io`).

## Hosting on GitHub Pages

`.github/workflows/deploy.yml` deploys the repository root to GitHub Pages on every push to `main` (and to `claude/**` branches while the site is being built).

First-time setup, once:

1. In the GitHub repo go to **Settings → Pages**.
2. Under **Build and deployment → Source**, choose **GitHub Actions**.
3. Re-run the "Deploy site to GitHub Pages" workflow from the **Actions** tab (or push any commit).

The workflow also tries to enable Pages by itself (`enablement: true`), so step 2 may already be done when you look.

The site is then served at `https://<username>.github.io/thetemplewedding/`.

### Custom domain

1. Buy the domain (`thetemplewedding.com` and `thetemplewedding.in` were both available when this site was built).
2. Add a file named `CNAME` at the repository root containing only the domain, e.g. `thetemplewedding.com`.
3. At your registrar, add DNS records per GitHub's guide: https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site
4. In **Settings → Pages**, enter the custom domain and tick **Enforce HTTPS** once the certificate is issued.

## Running locally

Any static server works:

```bash
python3 -m http.server 8080
```

Then open http://localhost:8080.

## Images

- `assets/img/bhoga-nandeeshwara-kalyani.jpg`: cropped from ["Kalyani (Pushkarni) - Bhoga Nandeeshwara Temple"](https://commons.wikimedia.org/wiki/File:Kalyani_(Pushkarni)_-_Bhoga_Nandeeshwara_Temple.jpg) by Bikashrd, licensed [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/).
- `assets/img/virupaksha-gopuram.jpg`, `virupaksha-card.jpg`, `og-image.jpg`: derived from ["Virupaksha - Gopuram"](https://commons.wikimedia.org/wiki/File:Virupaksha_-_Gopuram.jpg) by Ingo Mehling, licensed [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/). The attribution in the site footer must stay if you keep the photo. Replace it with your own photographs when you have them and you can drop the credit.
- `assets/img/art-*.svg`: original illustrations used as placeholders for temples without a photo. Replace with real photos of each temple (ideally your own, from past weddings) by editing the `<img src>` in `temples.html` and `index.html`.

## Content to verify before launch

The temple descriptions were written from general knowledge. The planner should check, for each temple, that the stated details (distances, seasons, where the ceremony is held) match current practice, and especially the permission conditions, which change. The site already says permissions are confirmed after booking; keep that wording unless you want to make firmer promises.
