# The Dakota East Side Ice House — Website & CMS

Free hosting on GitHub Pages with a visual CMS editor.

---

## How It Works

```
You edit content in /admin  →  Saves to _data/content.json  →  GitHub Actions runs build.js  →  index.html updated  →  Site goes live
```

- **GitHub Pages** hosts the site for free
- **Decap CMS** gives you a visual editor at `yoursite.com/admin`
- **GitHub Actions** (also free) rebuilds the site automatically on every save
- No servers, no monthly fees, no plugins

---

## One-Time Setup

### Step 1 — Create a GitHub repository

1. Go to [github.com](https://github.com) and sign in (or create a free account)
2. Click **New repository**
3. Name it `thedakotasa.com` (or anything you like)
4. Make sure it's set to **Public**
5. Click **Create repository**

### Step 2 — Upload these files

Upload everything in this folder to your new repo. Structure should be:

```
your-repo/
├── .github/
│   └── workflows/
│       └── build.yml
├── _data/
│   └── content.json
├── admin/
│   ├── config.yml
│   └── index.html
├── assets/
│   └── (all your images — copy from original site)
├── build.js
├── index.template.html
├── styles.css
├── scripts.js
├── llms.txt
└── robots.txt
```

> **Important:** Do NOT upload `index.html` — it gets generated automatically.

### Step 3 — Update config.yml

Open `admin/config.yml` and change line 2:

```yaml
repo: YOUR_GITHUB_USERNAME/YOUR_REPO_NAME
```

### Step 4 — Enable GitHub Pages

1. In your repo → **Settings → Pages**
2. Under **Source**, select **GitHub Actions**
3. Click **Save**

The first build runs automatically. Site will be live in ~1 minute at:
`https://YOUR_USERNAME.github.io/YOUR_REPO_NAME`

### Step 5 — Set up CMS login (OAuth)

The admin panel uses GitHub to authenticate you. Two options:

**Option A — Use Netlify as a free OAuth proxy (easiest):**
1. Create a free account at [netlify.com](https://netlify.com)
2. Connect your GitHub repo to Netlify (it can deploy from the same repo)
3. In `admin/config.yml`, under `backend`, add:
   ```yaml
   base_url: https://api.netlify.com
   ```
4. In Netlify → Site settings → Access control → OAuth → GitHub → Enable

**Option B — GitHub OAuth App (no Netlify needed):**
1. Go to GitHub → Settings → Developer settings → OAuth Apps → **New OAuth App**
2. Fill in:
   - Homepage URL: your site URL
   - Callback URL: `https://your-site-url/admin`
3. Copy the Client ID into `admin/config.yml` under `app_id:`

---

## Using the CMS

1. Go to `yoursite.com/admin`
2. Click **Login with GitHub**
3. Navigate to the section you want to edit:

| Section | What you can edit |
|---|---|
| **Hours** | Open/close times for each day |
| **Weekly Events** | Recurring events (day, name, time) |
| **Menu — Favorites** | Add, remove, or reprice items |
| **Menu — Sandwiches** | Add, remove, or reprice items |
| **Menu — Salads & Tacos** | Add, remove, or reprice items |
| **Menu — Pizza** | Add, remove, or reprice items |
| **Menu — Draft Beer** | Tap list — great for rotating kegs |
| **Press / Recognition** | Add new press mentions |
| **About / Pull Quote** | The quote in the About section |

4. Make changes → click **Publish**
5. Site rebuilds and goes live in ~60 seconds

---

## Editing Without the CMS

You can also edit `_data/content.json` directly on GitHub:
- Click the file → pencil icon → edit → **Commit changes**
- The site rebuilds automatically

---

## Custom Domain (e.g. thedakotasa.com)

1. Repo → **Settings → Pages → Custom domain** → enter `thedakotasa.com` → Save
2. With your domain registrar, add these DNS records:

```
Type: A     Name: @    Value: 185.199.108.153
Type: A     Name: @    Value: 185.199.109.153
Type: A     Name: @    Value: 185.199.110.153
Type: A     Name: @    Value: 185.199.111.153
Type: CNAME Name: www  Value: YOUR_USERNAME.github.io
```

3. Check **Enforce HTTPS** in GitHub Pages settings (free SSL via Let's Encrypt)

DNS changes take up to 24 hours to propagate.

---

## File Reference

| File | Purpose |
|---|---|
| `index.template.html` | Site HTML with `{{PLACEHOLDERS}}` — edit for design changes |
| `_data/content.json` | All editable content — hours, menu, events, press |
| `build.js` | Reads JSON, injects into template, outputs `index.html` |
| `admin/config.yml` | Defines CMS editor fields |
| `admin/index.html` | The CMS admin UI (loads Decap from CDN) |
| `.github/workflows/build.yml` | Auto-runs `node build.js` on every push |

---

## Adding New Editable Fields

1. Add the field to `_data/content.json`
2. Add a `{{PLACEHOLDER}}` in `index.template.html`
3. Add injection logic in `build.js` (follow existing pattern)
4. Add the field to `admin/config.yml`

---

## Resources

- Decap CMS docs: https://decapcms.org/docs
- GitHub Pages docs: https://docs.github.com/en/pages
