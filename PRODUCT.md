# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Two audiences, weighted equally:

- **Security hiring teams in Ireland and the EU** (hiring managers, recruiters, interview panels) deciding whether Varun is worth an interview for AI security, SOC analyst or detection engineering roles. They skim fast, often on a phone from a LinkedIn or CV link.
- **Security peers** (open-source maintainers, researchers, CTF players, meetup contacts) checking his work after a PR, an article or a talk. They read deeper and follow links to code.

## Product Purpose

A personal site that proves, with verifiable evidence, that Varun works where security operations meets AI security, and makes it easy to contact him. Success: a visitor leaves convinced by real artefacts (merged PRs, tools, research, talks) and either emails him, opens LinkedIn, or follows the code.

(Priority delegated by Varun: proof first, then contact.)

## Positioning

Every claim points at evidence a visitor can open: live PR status, repositories, published papers, talks. Skills are not a tag cloud; each one names where it was used.

## Operating Context

- Arrival from LinkedIn, CV PDFs, GitHub profile README, Dev.to, and link previews (Open Graph card).
- Live data: PR states, repo stats and Dev.to articles fetched at build time with a snapshot fallback, refreshed in the browser.
- Includes a small CTF and an "evidence locker" page for peers.

## Capabilities and Constraints

- Astro 7 static site on GitHub Pages; all content in `src/data/profile.ts`.
- Strict CSP hardened at build (`scripts/csp.mjs`); inline scripts are hashed.
- Self-hosted fonts, no trackers, no third-party requests at page load beyond the live-data APIs.
- Light and dark themes; command palette; mobile rail menu.
- Job title for RakFort must read "AI Security Engineer". Other roles keep their real titles.

## Brand Commitments

- Name: Varun Poojari. Voice: plain, specific, first person, no hype.
- The "case file" identity (lettered exhibits, city line drawings, redaction bars that clear on a half-life schedule, ATT&CK-style skills matrix) is confirmed: keep and refine it.
- Accent `--tag` is reserved for tags, focus rings and selected states.

## Evidence on Hand

All in `src/data/profile.ts`: merged PRs (Microsoft PyRIT #3028, five secfoo PRs), SigmaHQ submission, MemHalfLife, Pentest Suite (live app), Springer ICACIS 2024 paper, DevConf.IN 2025 talk, certifications, TryHackMe top 2%. No testimonials or employer endorsements exist; do not invent any.

## Product Principles

1. Evidence over adjectives: every claim links to something real.
2. Scannable in 30 seconds, rewarding in 5 minutes.
3. Fast, private and accessible by default; no trackers.
4. The case-file metaphor serves the evidence, never hides it.

## Accessibility & Inclusion

WCAG 2.2 AA target. Motion (redaction reveal, ticker) must respect `prefers-reduced-motion`. axe-core is already a dev dependency.
