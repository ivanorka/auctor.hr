# Deployment

The current `auctor.hr` endpoint identifies itself as Microsoft IIS 10 with ASP.NET 4 and
MailEnable. The website therefore uses a portable ASP.NET `.ashx` contact handler and SMTP.

## Files to publish

Publish the repository root to the IIS website root, preserving the `assets/` and `fonts/`
directories. Keep `contact.ashx` at the same level as `index.html`.

## Contact form configuration

Set these values as IIS/application-pool environment variables where possible. If the host
does not support that, copy `web.config.example` to an untracked production `web.config`
and set the values on the server only.

| Setting | Required | Purpose |
| --- | --- | --- |
| `CONTACT_TO` | yes | Internal inbox that receives website enquiries |
| `CONTACT_FROM` | yes | Verified role-based sender on the Auctor domain |
| `SMTP_HOST` | no | SMTP server; defaults to `127.0.0.1` |
| `SMTP_PORT` | no | SMTP port; defaults to `25` |
| `SMTP_SSL` | no | Set to `true` when required |
| `SMTP_USERNAME` | no | SMTP account when authentication is required |
| `SMTP_PASSWORD` | no | SMTP password when authentication is required |

Never commit the production `web.config`, recipient address or SMTP credentials.

## Mail and form verification

1. Confirm that the `CONTACT_FROM` domain is authorised by the active MailEnable relay.
2. Submit the modal form from the production HTTPS origin.
3. Confirm that the page reports success only after SMTP accepts the message.
4. Verify receipt in the configured internal inbox and test Reply to confirm the visitor's
   address is used as `Reply-To`.
5. Review server logs for the `contact.inquiry accepted` event. The handler logs the event
   type and topic only, not the visitor's message or contact details.
6. Test invalid data, the honeypot and more than five submissions from one address within
   ten minutes.

The notification includes branded HTML and plain-text alternatives. It deliberately does
not send an automatic acknowledgement to the visitor, preventing the public form from being
used as an email relay.

## HTTPS and DNS

At the time of implementation, `auctor.hr` resolved to `213.202.100.77` and presented a
self-signed certificate on the MailEnable endpoint. Install a publicly trusted certificate
and bind the production website before copying `web.config.example` to production. Its
canonical redirect and HSTS header assume that trusted HTTPS is already working. Do not
collect form data over an untrusted TLS connection.

The production configuration requires the IIS URL Rewrite module. It permanently redirects
HTTP and non-`www` requests to `https://www.auctor.hr/`, removes explicit `index.html` from
public URLs, serves the branded 404 page and enables compression and security headers.

## SEO launch checklist

1. Verify that each of these responds over trusted HTTPS:
   - `https://www.auctor.hr/` — `200`
   - `https://www.auctor.hr/robots.txt` — `200`, `text/plain`
   - `https://www.auctor.hr/sitemap.xml` — `200`, XML content type
   - `https://www.auctor.hr/404.html` — file is available to IIS for custom errors
   - an unknown URL — `404`, showing the branded error page rather than returning `200`
2. Confirm that `http://auctor.hr/`, `https://auctor.hr/` and explicit `index.html` URLs each
   perform one permanent redirect to the matching `https://www.auctor.hr/` URL.
3. Confirm that `/v0/`, `/v2/` and `/v3/` remain crawlable and return `200`, while their HTML
   contains `noindex,follow`. Do not block these paths in `robots.txt`; crawlers must fetch the
   pages to see the `noindex` instruction.
4. Add the `https://www.auctor.hr/` property in Google Search Console and Bing Webmaster Tools.
   Submit `https://www.auctor.hr/sitemap.xml`, inspect the homepage and request indexing.
5. Test the homepage with Google's Rich Results Test and Schema Markup Validator. Confirm that
   the `Corporation`, `Organization`, `WebSite`, `WebPage` and `ImageObject` entities resolve
   without errors and use the production URLs.
6. Use Search Console's HTTPS and Page indexing reports after deployment. Check again after
   Google has crawled the site and investigate any duplicate-canonical, redirect or 404 issues.
7. Run Lighthouse on a cold mobile load. The site self-hosts its fonts, preloads only the hero
   image and serves WebP alternatives; verify compression and long-lived asset caching at the
   host/CDN level without applying long caching to HTML.

Only the canonical homepage appears in the XML sitemap. The preserved V0 and the two identity
previews are excluded intentionally because they duplicate the same corporate content and are
not search landing pages.
