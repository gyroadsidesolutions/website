# GY Roadside Solutions LLC — Website

Static bilingual website (English / Spanish) built with **Astro + Tailwind CSS**.  
Deployable to Netlify, Vercel, Cloudflare Pages, or any static host.

---

## Requirements

- Node.js 18 or higher
- npm 9 or higher

---

## Local Development

```bash
npm install
npm run dev        # starts dev server at http://localhost:4321
npm run build      # generates static output in /dist
npm run preview    # serves /dist locally for verification
```

> **Windows note:** Scripts use `npx astro` internally — works on CMD, PowerShell, and bash.

---

## Project Structure

```
src/
  components/     # Reusable Astro components
  config/         # site.ts, contact.ts (Web3Forms config)
  data/           # business.ts, services.ts, serviceAreas.ts, reviews.ts
  i18n/           # en.ts, es.ts, index.ts
  layouts/        # BaseLayout.astro
  pages/          # en/ and es/ static pages
  styles/         # global.css (Tailwind)
public/
  images/         # hero/, services/, about/
  robots.txt
  favicon.svg
  _redirects      # Netlify/Cloudflare redirect
```

---

## How to Update Content

### 1. Change phone number
Edit `src/data/business.ts`:
```ts
phone: "+12143027757",
phoneDisplay: "(214) 302-7757",
```

### 2. Change email
Edit `src/data/business.ts`:
```ts
email: "service@gyroadsidesolutions.com",
```

### 3. Change hours
Edit `src/data/business.ts` — the `hours` object.  
If 24/7: `available24h: true` (already set).

### 4. Add a service
In `src/data/services.ts`, add a new entry to the array:
```ts
{
  slug: "new-service",
  slugEs: "nuevo-servicio",
  title: { en: "New Service", es: "Nuevo Servicio" },
  shortDescription: { en: "...", es: "..." },
  description: { en: "...", es: "..." },
  image: "/images/services/new-service.webp",
  imageAlt: { en: "...", es: "..." },
  icon: "🔧",
  active: true,
  featured: false,
  price: null,
  relatedSlugs: [],
  faq: [],
}
```
Then place the image at `public/images/services/new-service.webp`.

### 5. Activate / deactivate a service
In `src/data/services.ts`, set `active: true` or `active: false`.  
Inactive services do **not** generate pages and do **not** appear in the UI.

### 6. Add a service area (city)
In `src/data/serviceAreas.ts`:
```ts
{
  city: "Dallas",
  state: "Texas",
  stateCode: "TX",
  slug: "dallas",
  description: { en: "...", es: "..." },
  confirmed: true,   // ← set true only when verified
}
```

### 7. Add a customer review
In `src/data/reviews.ts`:
```ts
{
  id: "review-001",
  name: "John D.",
  location: "Dallas, TX",
  date: "2026-09-15",
  rating: 5,
  text: {
    en: "Great service, fast response...",
    es: "Excelente servicio, respuesta rápida...",
  },
  source: "Google",
  url: "https://g.co/kgs/...",
  confirmed: true,   // ← set true only for real reviews
}
```
`AggregateRating` schema is added automatically once confirmed reviews exist.

### 8. Replace images
Drop WebP files into `public/images/`:
- `hero/hero-truck.webp` — Hero section background
- `services/{slug}.webp` — Each service page image
- `about/about-us.webp` — About page photo
- `images/logo.webp` — Company logo (used in header/footer)
- `images/og-default.webp` — Social sharing preview (1200×630px)

All images use `loading="lazy"` except the hero (uses `fetchpriority="high"`).

### 9. Modify translations
- English: `src/i18n/en.ts`
- Spanish: `src/i18n/es.ts`

Edit any key. Both files must stay in sync with the same structure.

---

## Web3Forms (Contact Form)

The contact form uses [Web3Forms](https://web3forms.com) — works on ALL hosting providers,  
no SMTP, no PHP, no backend required.

**To activate:**
1. Go to https://web3forms.com (free plan available)
2. Enter the client's email → click "Create Access Key"
3. Open `src/config/contact.ts`
4. Replace `YOUR_WEB3FORMS_ACCESS_KEY` with the real key
5. Confirm `destinationEmail` is correct
6. Run `npm run build` and deploy
7. Submit a test form and confirm the email is received

```ts
// src/config/contact.ts
export const contactConfig = {
  accessKey: "YOUR_WEB3FORMS_ACCESS_KEY",   // ← replace this
  destinationEmail: "service@gyroadsidesolutions.com",
  ...
};
```

**The form works with JS disabled** — it POSTs directly to `https://api.web3forms.com/submit`.

---

## Domain & HTTPS

### Set the domain
Update `.env` (or hosting environment variables):
```
PUBLIC_SITE_URL=https://gyroadsidesolutions.com
```
Also update `astro.config.mjs` → `site:` field.

### HTTPS
All major static hosts (Netlify, Vercel, Cloudflare Pages) provide free HTTPS automatically.  
For traditional hosting, enable Let's Encrypt via cPanel or your host's SSL panel.

---

## Deploy to Netlify

1. Push code to GitHub / GitLab
2. Connect repo in Netlify dashboard → New site
3. Build command: `npm run build`
4. Publish directory: `dist`
5. Add environment variables in Netlify UI (from `.env.example`)
6. Deploy

The `netlify.toml` file handles redirects and security headers automatically.

---

## Deploy to Vercel

```bash
npm i -g vercel
vercel --prod
```
Or connect the GitHub repo in the Vercel dashboard.  
The `vercel.json` file handles the root redirect.

---

## Deploy to Cloudflare Pages

1. Connect GitHub repo in Cloudflare Pages
2. Build command: `npm run build`
3. Build output directory: `dist`
4. Add environment variables in Cloudflare dashboard
5. Deploy

The `public/_redirects` file handles the `/ → /en/` redirect.

---

## Google Analytics 4

Add to `.env`:
```
PUBLIC_GA_ID=G-XXXXXXXXXX
```
Analytics loads automatically. No code changes needed.

---

## Google Tag Manager

Add to `.env`:
```
PUBLIC_GTM_ID=GTM-XXXXXXX
```
GTM takes priority over GA4 when both are set.

---

## Google Search Console

1. Go to https://search.google.com/search-console
2. Add property → HTML tag verification
3. Copy the `content` value from the meta tag
4. Add to `.env`:
```
PUBLIC_GSC_VERIFICATION=your_verification_string
```

---

## Regenerate Sitemap

The sitemap is generated automatically on every `npm run build`.  
Output: `dist/sitemap-index.xml` and `dist/sitemap-0.xml`

To exclude a page, add `noIndex={true}` to its `<BaseLayout>`.

---

## Verify Static Build

```bash
npm run build
npm run preview
```
Then open http://localhost:4321 and check:
- `/` redirects to `/en/`
- `/en/` and `/es/` load correctly
- All service pages exist (6 EN + 6 ES)
- Phone links work (`tel:+12143027757`)
- Contact form shows (Web3Forms warning until key configured)
- `dist/sitemap-index.xml` exists
- `dist/robots.txt` exists

---

## Pending Information (Confirm with Client)

| Item | Status |
|------|--------|
| Business address | ⏳ Pending |
| City / State / ZIP | ⏳ Pending |
| Google Maps embed URL | ⏳ Pending |
| Google Business Profile URL | ⏳ Pending |
| Service areas (cities/states) | ⏳ Pending |
| Real hero image | ⏳ Pending |
| Real service images | ⏳ Pending |
| About Us content & photos | ⏳ Pending |
| License / insurance details | ⏳ Pending |
| Customer reviews | ⏳ Pending |
| Final website domain | ⏳ Pending |
| Web3Forms Access Key | ⏳ Pending |
| Privacy policy legal review | ⏳ Pending |

---

## External Services Used

| Service | Purpose | Account required |
|---------|---------|-----------------|
| Web3Forms | Contact form delivery | Yes (free tier available) |
| Google Fonts (Inter) | Typography | No |
| Google Analytics 4 | Optional analytics | Yes (optional) |
| Google Tag Manager | Optional tag management | Yes (optional) |
| Google Search Console | SEO verification | Yes (recommended) |
| Google Maps | Service area embed | Yes (optional) |
| Google Business Profile | Reviews link | Yes (recommended) |

---

## Security Notes

- No secrets in source code or public files
- `PUBLIC_` env variables are browser-visible — never put private keys there
- Web3Forms Access Key is public by design (Web3Forms security model)
- No cookies set unless analytics is configured
- No `localStorage` usage
- Honeypot anti-spam on contact form

---

```
## Project Milestones & Verification

| Item | Status | Details |
|------|--------|---------|
| Final website domain | ✅ Completed | Live on gyroadsidesolutions.com |
| Web3Forms Access Key | ✅ Completed | Verified email notifications active |
| Header Logo | ✅ Completed | Updated transparent high-res logo asset |
| Real hero image | ✅ Completed | Uploaded & hotspot set via Sanity Studio |
| Service images architecture | ✅ Completed | 6-card singleton configured in CMS |
| Service areas list | ✅ Completed | DFW coverage zones active |
| Google Business Profile & Maps | ✅ Completed | Live profile linked & map embed functional |
| Customer reviews | ✅ Completed | Real testimonial cards displayed |
| Business contact & Phone | ✅ Completed | Direct click-to-call buttons operational |
| Deployment Automation | ✅ Completed | Sanity webhook + GitHub Actions pipeline running |
| Legal & Policies | ✅ Completed | Privacy policy & terms in place |
---
