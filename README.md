# JadwalLari.com Redirect Service

This repository contains a **simple redirect service** for `jadwallari.com`.

Its only purpose is to handle redirects for the main platform **schedules.run**, including:

- Redirecting shared event URLs to event detail pages
- Redirecting users to **official third-party registration websites**

This service exists to keep routing, external links, and vendor URLs **separate** from the main application.

---

## Scope

This repository **does not**:

- Serve user-facing pages
- Host event content
- Handle registrations or payments

All canonical content and user interactions live in **schedules.run**.

---

## URL Behavior (High-level)

- `jadwallari.com/{slug}`
  → redirects to the event detail page on `schedules.run`

- `jadwallari.com/official/{slug}`
  → redirects to the official registration website provided by the event organizer

- Other paths
  → redirect to `schedules.run`

---

## SEO

This domain is **not indexed** by search engines.

Canonical URLs always belong to **schedules.run**.

---

## License

MIT License.
