# Auctor Group website

English and Croatian corporate website for Auctor Group with two public design versions.

## Project structure

- `index.html` and `en/index.html` — canonical V1 website in Croatian and English
- `v1/` — the former V0 visual package, renamed as V1 and used by the canonical pages
- `v2/` — alternate V2 layout using the third identity's logo, mark and favicons
- `_redirects` — permanent redirects from retired V0/V3 and explicit V1 preview routes
- `variants.js` — shared reveal, contact-modal and dual Netlify/IIS submission behaviour
- `contact.ashx` — server-side ASP.NET contact handler for the future IIS production host
- `assets/` — identity assets for all three proposals and website photography
- `favicon.ico` and favicon assets — browser and mobile icons derived from the VER01 mark
- `fonts/` — self-hosted Archivo and Bodoni Moda webfonts
- `robots.txt` and `sitemap.xml` — canonical crawl and index signals
- `site.webmanifest` — site identity and installable icon metadata
- `404.html` — branded, non-indexable error page
- `web.config.example` — non-secret IIS configuration template
- `DEPLOYMENT.md` — deployment, mail and SEO launch checklist

## Content sources

The financial, ownership and portfolio information was verified on 7 August 2026
against the 2025 audited consolidated annual report of Auctor Holding, FINA Info.BIZ,
the 2025 Medika annual report and the current Aminess Hospitality Group portfolio.
Direct links to these sources are included on the website.

## Local preview

Serve the repository root with any static HTTP server and open `/`. The page itself is static.
On `auctor.orka.solutions`, submissions use Netlify Forms. On the future IIS production host,
the same forms fall back to the ASP.NET handler and server-only settings in `DEPLOYMENT.md`.

V1 at `/` and `/en/` is canonical and indexable, with Croatian as the default language.
V2 remains available at `/v2/` and `/v2/en/` as a `noindex,follow` identity preview. Retired V0 and V3 URLs redirect permanently
to the closest matching active page.

No recipient address, SMTP password or other production secret is stored in this repository.
