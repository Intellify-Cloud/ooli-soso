# oobalink Northern Suburbs — Microsite

Jekyll microsite for oobalink Northern Suburbs, a bond originator and home-loan
advisory practice in Durbanville Hills, Cape Town.

## Local development

```bash
bundle install
bundle exec jekyll serve
```

The production build must use the production domain from `_config.yml`
(`https://www.oobalink-ns.co.za`). Do not override `url` when building for
deployment.

## Search-engine configuration

### Google Search Console
1. Add a **Domain** property (DNS verification is preferred — no template changes needed),
   or a URL-prefix property using an HTML tag.
2. If using the HTML-tag method, paste the token into `_config.yml`:
   `google_site_verification: "<token>"` — it renders automatically in `<head>`.

### Bing Webmaster Tools
1. Add the site and verify via DNS, or paste the meta-tag token into
   `_config.yml`: `bing_site_verification: "<token>"`.
2. Submit `https://www.oobalink-ns.co.za/sitemap.xml` for indexing.

### IndexNow
The site is hosted on GitHub Pages, which does not support server-side
IndexNow submission. IndexNow is therefore not implemented; the XML sitemap
(plus GSC and Bing Webmaster Tools submissions) is the primary discovery
mechanism. If the site is ever moved to a host supporting serverless
functions, an IndexNow key file and a build-hook submission step can be added
per the [IndexNow spec](https://www.indexnow.org/documentation).

## SEO conventions

- Business identity is centralised in `_config.yml` (name, phone, email,
  address, service area) and `_data/sitetext.yml` (visible copy).
- Structured data (`FinancialService`/`LocalBusiness`, `WebSite`, `WebPage`,
  `BreadcrumbList`, `FAQPage`) is centralised in
  `_includes/structured-data.html` and `_includes/faq.html`.
- Titles and descriptions come from page front matter with
  `_config.yml` fallbacks; every indexable page has a self-referencing canonical.
- Financial content pages carry a `date_modified` front-matter field, shown as
  a visible "Last reviewed" date.
- Do not add fabricated claims, reviews, ratings schema, keyword-stuffed
  location pages, or hidden bot-only text. See `_docs/seo-guru.md` for the
  full optimisation brief.
