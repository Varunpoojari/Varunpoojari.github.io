# varunpoojari.github.io

Personal site of **Varun Poojari**: AI security intern at RakFort, Dublin, and MSc Cyber Security graduate.
Live at **https://varunpoojari.github.io**.

The design idea is a *case file*. Each role is a lettered exhibit with a line drawing of its city. The hero's redaction bars clear on a half-life schedule (a nod to MemHalfLife). The skills section is laid out like an ATT&CK matrix, where every skill points to the evidence behind it.

## Stack

| Concern | Choice | Why |
|---|---|---|
| Framework | [Astro](https://astro.build) 7, static output | Ships HTML and CSS, with JavaScript only where there is interaction. Fast, SEO-friendly, and GitHub Pages serves it as plain files. |
| Language | TypeScript (strict) | Typed content model; mistakes in `profile.ts` fail the build. |
| Styling | Plain CSS with custom-property tokens, component-scoped styles | No framework to keep up to date. |
| Fonts | Archivo (variable width), Source Serif 4, JetBrains Mono via Fontsource | Self-hosted: no Google Fonts requests and no tracking. |
| Map | d3-geo + world-atlas, projected **at build time** | The browser receives plain SVG paths, not a map library. |
| Hosting | GitHub Pages via GitHub Actions | Free, HTTPS by default. Rebuilds on push and daily. |

## Project layout

```
src/
  data/
    profile.ts       ← all content: bio, timeline, projects, PRs, skills, certs, countries
    snapshot.json    ← offline fallback for GitHub and Dev.to data
  lib/live.ts        ← build-time fetchers (GitHub repos, PR states, Dev.to), each with a fallback
  components/
    Rail.astro       ← side navigation, scroll spy, theme toggle, mobile menu
    Hero.astro       ← name, intro, redaction reveal, Exhibit A tag
    Timeline.astro   ← case history: eras, city drawings, dated entries
    Skyline.astro    ← original line drawings of Dublin, Pune, Bengaluru and Texas
    Work.astro       ← featured projects and project index (live stars and last push)
    Ledger.astro     ← open-source pull requests with live status
    Matrix.astro     ← ATT&CK-style skills matrix with an evidence panel
    Writing.astro    ← Dev.to articles
    Credentials.astro, Places.astro, Contact.astro
    Palette.astro    ← command palette (Ctrl K / ⌘K / "/")
    Live.astro       ← browser-side refresh of PRs, repo stats and articles
    PrStatus.astro   ← merged / in review / closed status mark
  layouts/Base.astro ← <head>: SEO, Open Graph, JSON-LD Person, no-flash theme script
  styles/global.css  ← design tokens (light and dark) and base typography
public/              ← favicon, og.png (social card), robots.txt
.github/workflows/deploy.yml
```

## Local development

Requires Node 20 or newer (CI uses Node 22).

```bash
npm install
npm run dev        # http://localhost:4321 with hot reload
npm run build      # production build into dist/
npm run preview    # serve dist/ locally
npm run snapshot   # refresh src/data/snapshot.json from GitHub and Dev.to
```

## How the live data works

1. **At build time**, `src/lib/live.ts` fetches repo stats, the state of every PR you authored, and your Dev.to articles. In CI it uses the workflow's `GITHUB_TOKEN`, so rate limits are not a concern.
2. **If any request fails**, that function returns `src/data/snapshot.json`. A network outage never breaks a build.
3. **In the visitor's browser**, `Live.astro` re-checks the same endpoints. That's three requests, cached in `sessionStorage` for 30 minutes. A newly merged PR or a new article shows up without a rebuild. If those calls fail, the built values stay in place.
4. The workflow also **rebuilds daily** (05:17 UTC), so the built HTML stays fresh too.

## Customising

Almost everything lives in **`src/data/profile.ts`**:

- **New job or event:** add an `Era` to `eras`, or an `Entry` to an era's `entries`. Set `pr: 'owner/repo#123'` on an entry to show its live status.
- **New project:** add to `projects`. `repo` must match the GitHub repository name; set `featured: true` for a full write-up.
- **New pull request:** add to `contributions`.
- **New skill:** add it to a column in `matrix`, with `evidence` saying where you used it.
- **New certification or country:** add to `certifications` or `countries`. Countries use ISO 3166 numeric codes, e.g. `'250'` for France.
- **Job title:** `person.role`. Your CV says "Intern" and LinkedIn says "Engineer"; the site uses the CV wording.
- **City drawing for a new place:** add a `city` value and draw it in `Skyline.astro`. Each drawing is a handful of SVG paths on a 600×90 canvas.

Colours and type live in `src/styles/global.css` (`:root` for light, the two dark blocks for dark). The accent `--tag` is used only for tags, focus rings and selected states. Keep it that way.

If you change the hero text, regenerate `public/og.png` (1200×630) so link previews match.

## Deployment (GitHub Pages)

The site is published from a repository named **`Varunpoojari.github.io`**, so it is served at the domain root and `astro.config.mjs` needs no `base`.

One-time setup:

1. Create a public repository called `Varunpoojari.github.io` on GitHub. Leave it empty: no README, no licence.
2. From this folder:
   ```bash
   git init -b main
   git add .
   git commit -m "Initial portfolio"
   git remote add origin https://github.com/Varunpoojari/Varunpoojari.github.io.git
   git push -u origin main
   ```
3. On GitHub, go to the repository's **Settings → Pages → Build and deployment → Source** and choose **GitHub Actions**.
4. Watch the **Actions** tab. When "Deploy to GitHub Pages" goes green, the site is live at https://varunpoojari.github.io with HTTPS enforced.

After that, every push to `main` redeploys. You can also run the workflow by hand from the Actions tab.

**Publishing from a different repository name** (e.g. `portfolio`): set `site: 'https://varunpoojari.github.io'` and `base: '/portfolio'` in `astro.config.mjs`. Asset links already use `import.meta.env.BASE_URL`.

**Custom domain:** add a `public/CNAME` file containing the domain, set `site` to it, and configure DNS as GitHub's Pages docs describe.

## Maintenance checklist

- After a PR merges or you publish an article, nothing to do: both appear automatically.
- After a new role, project or certification, edit `profile.ts` and push.
- Every few months, run `npm outdated`, then `npm update`, then `npm run build`.
- Once Sigma #6362 and awesome-honeypots #172 merge, their status marks update on their own.
- Accessibility: the build was checked with axe-core (WCAG 2 A/AA, no violations in either theme), keyboard-only navigation and reduced-motion mode. Re-check after visual changes.

## Accessibility and performance notes

- Semantic landmarks, a skip link, visible focus rings, `aria-current` on the active nav item, and a combobox/listbox command palette.
- `prefers-reduced-motion` disables the redaction reveal and smooth scrolling.
- Theme follows the OS by default. The toggle stores an explicit choice, applied before first paint so there is no flash.
- No client framework: the whole page is static HTML plus about 6 KB of vanilla scripts.
