# Auctor Group website

English-language corporate website for Auctor Group, using the **VER01** identity from
the approved branding proposal: Circle · Line · A.

## Project structure

- `index.html` — complete single-page website and contact modal
- `site.css` — responsive design, light/dark colour modes and modal styles
- `v0/` — original Croatian package with its CSS, assets and fonts preserved verbatim; only
  `contact.css`, the shared contact behavior and the V0–V3 path are added
- `v2/` — alternate website using the VER02 triangle-and-circle identity
- `v3/` — alternate website using the VER03 progression identity
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

The canonical homepage is the only indexable version. `/v0/`, `/v2/` and `/v3/` remain
accessible as identity previews but deliberately use `noindex,follow` and point their canonical
link to `/`.

No recipient address, SMTP password or other production secret is stored in this repository.
