# SDWH Website — Deployment Guide

## Stack summary

| Component | Provider | Cost |
|---|---|---|
| File hosting | GitHub Pages | Free |
| DNS / CDN / Security | Cloudflare | Free |
| Contact forms | Tally.so | Free |
| Domain registrar | GoDaddy (existing) | Existing |

---

## Step 1 — Create the GitHub repository

1. Go to github.com and create a new **public** repository named `sdwh-site` (or similar).
2. Push the contents of this `/site/` folder to the `main` branch root.
3. In repository Settings → Pages:
   - Source: **Deploy from branch**
   - Branch: `main`
   - Folder: `/ (root)`
4. GitHub will give you a temporary URL (e.g. `yourusername.github.io/sdwh-site`). Test all pages at this URL before pointing the domain.

---

## Step 2 — Set up Cloudflare

1. Create a free account at cloudflare.com.
2. Add site → enter `sdwh.co.uk` → select **Free plan**.
3. Cloudflare will scan your existing DNS records (from GoDaddy). Review and import them.
4. Cloudflare will give you two nameserver addresses (e.g. `xxx.ns.cloudflare.com`).

---

## Step 3 — Point GoDaddy nameservers to Cloudflare

1. Log in to GoDaddy → My Products → Domains → sdwh.co.uk → DNS → Nameservers.
2. Select **Custom** and enter the two Cloudflare nameservers.
3. Save. Propagation takes up to 24 hours but is usually faster.

---

## Step 4 — Configure DNS in Cloudflare

Once Cloudflare controls the DNS, add these records to point the domain to GitHub Pages:

| Type | Name | Value | Proxy |
|---|---|---|---|
| A | @ | 185.199.108.153 | Proxied (orange cloud) |
| A | @ | 185.199.109.153 | Proxied |
| A | @ | 185.199.110.153 | Proxied |
| A | @ | 185.199.111.153 | Proxied |
| CNAME | www | yourusername.github.io | Proxied |

The four IPs are GitHub Pages' standard IP addresses.

---

## Step 5 — Configure custom domain in GitHub Pages

1. In repository Settings → Pages → Custom domain: enter `sdwh.co.uk`.
2. Tick **Enforce HTTPS** (available once DNS is verified).
3. GitHub will add a `CNAME` file to the root of your repo automatically.

---

## Step 6 — Cloudflare security settings (recommended)

In Cloudflare dashboard:

- **SSL/TLS** → Encryption mode: **Full (strict)**
- **Security** → Security Level: **Medium**
- **Security** → Bot Fight Mode: **On**
- **Speed** → Auto Minify: tick CSS and HTML
- **Caching** → Browser Cache TTL: **4 hours** (good default for a site updated occasionally)

---

## Updating the site

To publish new or updated pages:
1. Make changes to the HTML files in this folder.
2. Commit and push to the `main` branch.
3. GitHub Pages will rebuild automatically within 1–2 minutes.

To embed a new chart from Streamlit:
1. In your Plotly/Streamlit script, run:
   ```python
   from sdwh_theme import export_chart
   export_chart(fig, "chart_filename", interactive=True)
   # Produces chart_filename.html
   ```
2. Copy the output `.html` file into a `/charts/` subfolder in this repo.
3. In the relevant page (e.g. `accountability-and-governance.html`), replace the `<div class="chart-placeholder">` with:
   ```html
   <iframe
     src="/charts/chart_filename.html"
     class="chart-embed"
     title="Chart title"
     loading="lazy"
     scrolling="no"
   ></iframe>
   ```
   Set the `height` of `.chart-embed` in CSS to match the chart's exported height.

---

## Adding the Tally contact form

1. Create your form at tally.so.
2. In Tally: Customize → Design → set Primary colour `#1d70b8`, Background `#ffffff`, Font `Inter`.
3. Get the embed code (one line of HTML).
4. In `about.html`, replace the placeholder comment with the Tally embed script.

---

## File structure

```
/site/
├── index.html
├── about.html
├── corporate-finance.html
├── public-procurement.html
├── defence-procurement.html
├── infrastructure-investment.html
├── accountability-and-governance.html
├── privacy-policy.html
├── cookie-policy.html
├── terms-of-use.html
├── _config.yml
├── css/
│   └── style.css
└── charts/          ← Plotly HTML exports go here
    └── (empty — add chart files when ready)
```
