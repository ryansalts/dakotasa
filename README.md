# The Dakota East Side Ice House — Website & CMS

Free hosting on GitHub Pages with a visual CMS editor.

---

## How It Works

```
You edit content in /admin  →  Saves to _data/*.json  →  GitHub Actions runs build.js  →  index.html updated  →  Site goes live
```

- **GitHub Pages** hosts the site for free at `thedakotasa.com`
- **Decap CMS** gives you a visual editor at `thedakotasa.com/admin`
- **GitHub Actions** (also free) rebuilds the site automatically on every save
- No servers, no monthly fees, no plugins

---

## Repository Structure

```
dakotasa/
├── .github/
│   └── workflows/
│       └── build.yml               ← auto-runs build on every push
├── _data/
│   ├── hours.json
│   ├── events.json
│   ├── menu-favorites.json
│   ├── menu-sandwiches.json
│   ├── menu-salads.json
│   ├── menu-pizza.json
│   ├── menu-beer.json
│   ├── press.json
│   ├── about.json
│   ├── contact.json
│   ├── social.json
│   └── hero.json
├── admin/
│   ├── config.yml                  ← CMS field definitions
│   └── index.html                  ← CMS admin UI
├── assets/
│   └── (photos and images)
├── build.js                        ← reads _data/*.json → outputs index.html
├── index.template.html             ← site HTML with {{PLACEHOLDERS}}
├── styles.css
├── scripts.js
├── llms.txt
└── robots.txt
```

> **Note:** `index.html` is generated automatically by `build.js` — do not edit it directly. Any manual changes will be overwritten on the next build.

---

## Using the CMS

1. Go to `thedakotasa.com/admin`
2. Click **Login with GitHub**
3. Navigate to the section you want to edit:

| Section | What you can edit |
|---|---|
| **Hours** | Open/close times for each day including Monday |
| **Weekly Events** | Recurring events (day, name, time) |
| **Menu — Favorites** | Add, remove, or reprice items |
| **Menu — Sandwiches** | Add, remove, or reprice items |
| **Menu — Salads & Tacos** | Add, remove, or reprice items |
| **Menu — Pizza** | Add, remove, or reprice items |
| **Menu — Draft Beer** | Tap list — great for rotating kegs |
| **Press / Recognition** | Add new press mentions with image and link |
| **About** | All three paragraphs and the pull quote |
| **Contact Info** | Phone, email addresses |
| **Social Media** | All social and review platform links |
| **Hero Images** | Background and side photo filenames |

4. Make changes → click **Publish**
5. Site rebuilds and goes live in ~60 seconds

---

## Editing Without the CMS

You can edit any file in `_data/` directly on GitHub:

1. Navigate to the file (e.g. `_data/hours.json`)
2. Click the pencil icon → make your changes → **Commit changes**
3. The site rebuilds automatically

Each file controls one section:

| File | Controls |
|---|---|
| `_data/hours.json` | Hours for all 7 days |
| `_data/events.json` | Weekly recurring events |
| `_data/menu-favorites.json` | Favorites menu section |
| `_data/menu-sandwiches.json` | Sandwiches menu section |
| `_data/menu-salads.json` | Salads & tacos section |
| `_data/menu-pizza.json` | Pizza section |
| `_data/menu-beer.json` | Draft beer list |
| `_data/press.json` | Press & recognition cards |
| `_data/about.json` | About paragraphs and pull quote |
| `_data/contact.json` | Phone and email addresses |
| `_data/social.json` | Social media URLs |
| `_data/hero.json` | Hero image filenames and alt text |

---

## Custom Domain

The site is already configured at `thedakotasa.com`. If DNS ever needs to be reconfigured, the GitHub Pages IP addresses are:

```
Type: A     Name: @    Value: 185.199.108.153
Type: A     Name: @    Value: 185.199.109.153
Type: A     Name: @    Value: 185.199.110.153
Type: A     Name: @    Value: 185.199.111.153
Type: CNAME Name: www  Value: ryansalts.github.io
```

HTTPS is handled automatically by GitHub Pages via Let's Encrypt. DNS changes can take up to 24 hours to propagate.

---

## CMS Login (OAuth)

The admin panel authenticates via GitHub using a Cloudflare Worker OAuth proxy at `dakota-oauth.ryansalts.workers.dev`. This is already configured in `admin/config.yml` — no changes needed.

If login ever breaks, check that the Cloudflare Worker is still deployed and that the GitHub OAuth App (`Ov23lillAuDBNbxn30QS`) is still active under GitHub → Settings → Developer settings → OAuth Apps.

---

## Contact Form (Web3Forms)

The contact form submits to [web3forms.com](https://web3forms.com). The access key is hardcoded in `build.js` and injected into the form at build time.

To manage the form:
- Log in at web3forms.com to view submissions and confirm the key is active
- Set an **allowed domain** (`thedakotasa.com`) in the Web3Forms dashboard to prevent key abuse
- Add a honeypot field to the form to reduce spam:
  ```html
  <input type="checkbox" name="botcheck" style="display:none;">
  ```

---

## Adding New Editable Fields

1. Add the field to the relevant file in `_data/`
2. Add a `{{PLACEHOLDER}}` in `index.template.html`
3. Add the injection line in `build.js` under the relevant section in the `replacements` object
4. Add the field to `admin/config.yml` under the matching collection

---

## File Reference

| File | Purpose |
|---|---|
| `index.template.html` | Site HTML with `{{PLACEHOLDERS}}` — edit for design changes |
| `build.js` | Reads `_data/*.json`, injects into template, outputs `index.html` |
| `styles.css` | All site styles |
| `scripts.js` | Mobile nav burger menu |
| `admin/config.yml` | Defines all CMS editor fields and maps them to `_data/` files |
| `admin/index.html` | Loads the Decap CMS UI from CDN |
| `.github/workflows/build.yml` | Runs `node build.js` and deploys to GitHub Pages on every push |
| `llms.txt` | AI discovery file — helps The Dakota appear in AI-assisted local search |
| `robots.txt` | Crawler permissions — search and AI discovery bots allowed, training scrapers blocked |

---

## Resources

- Decap CMS docs: https://decapcms.org/docs
- GitHub Pages docs: https://docs.github.com/en/pages
- Web3Forms dashboard: https://web3forms.com
