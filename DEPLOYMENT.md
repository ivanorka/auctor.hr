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
and bind the production website before launch. Do not collect form data over an untrusted
TLS connection.
