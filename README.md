# Auctor Group website

English-language corporate website for Auctor Group, using the **VER01** identity from
the approved branding proposal: Circle · Line · A.

## Project structure

- `index.html` — complete single-page website and contact modal
- `site.css` — responsive design, light/dark colour modes and modal styles
- `v2/` — alternate website using the VER02 triangle-and-circle identity
- `v3/` — alternate website using the VER03 progression identity
- `variants.js` — shared reveal and contact-modal behaviour for VER02 and VER03
- `contact.ashx` — server-side ASP.NET contact handler for IIS/MailEnable
- `assets/` — identity assets for all three proposals and website photography
- `favicon.ico` and favicon assets — browser and mobile icons derived from the VER01 mark
- `fonts/` — self-hosted Archivo and Bodoni Moda webfonts
- `web.config.example` — non-secret IIS configuration template
- `DEPLOYMENT.md` — deployment and mail configuration checklist

## Content sources

The financial, ownership and portfolio information was verified on 7 August 2026
against the 2025 audited consolidated annual report of Auctor Holding, FINA Info.BIZ,
the 2025 Medika annual report and the current Aminess Hospitality Group portfolio.
Direct links to these sources are included on the website.

## Local preview

Serve the repository root with any static HTTP server and open `/`. The page itself is
static; contact delivery requires ASP.NET 4 on IIS and the server-only settings described
in `DEPLOYMENT.md`.

No recipient address, SMTP password or other production secret is stored in this repository.
