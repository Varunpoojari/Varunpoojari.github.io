---
name: Varun Poojari — Case File
description: A security practitioner's portfolio presented as an evidence file.
colors:
  lab-paper: "#eef1f3"
  lab-paper-raised: "#f8f9fa"
  case-ink: "#142029"
  case-ink-soft: "#3a4a57"
  muted-graphite: "#5d6b77"
  rule-line: "#c6cfd6"
  rule-line-soft: "#dce2e7"
  evidence-tag: "#f2c230"
  evidence-tag-ink: "#1b1607"
  merged-green: "#2f6f4f"
  open-amber: "#8a5a00"
  night-paper: "#11171e"
  night-paper-raised: "#172029"
  night-ink: "#e4e9ed"
typography:
  display:
    fontFamily: "Archivo Variable, Arial Narrow, system-ui, sans-serif"
    fontSize: "clamp(2.75rem, 7vw, 5.25rem)"
    fontWeight: 650
    lineHeight: 1.15
  headline:
    fontFamily: "Archivo Variable, Arial Narrow, system-ui, sans-serif"
    fontSize: "2.5rem"
    fontWeight: 700
    letterSpacing: "-0.015em"
    fontVariation: "'wdth' 118"
  title:
    fontFamily: "Archivo Variable, Arial Narrow, system-ui, sans-serif"
    fontSize: "1.375rem"
    fontWeight: 650
  body:
    fontFamily: "Source Serif 4 Variable, Georgia, Times New Roman, serif"
    fontSize: "1.0625rem"
    fontWeight: 400
    lineHeight: 1.6
  label:
    fontFamily: "JetBrains Mono Variable, ui-monospace, SFMono-Regular, Menlo, monospace"
    fontSize: "0.8125rem"
    letterSpacing: "-0.01em"
rounded:
  base: "3px"
spacing:
  gutter: "clamp(1rem, 4vw, 3rem)"
  measure: "40rem"
  rail: "15rem"
  section: "clamp(3.5rem, 8vw, 6rem)"
components:
  skip-link:
    backgroundColor: "{colors.evidence-tag}"
    textColor: "{colors.evidence-tag-ink}"
    padding: "0.5rem 0.9rem"
  evidence-tag-chip:
    backgroundColor: "{colors.evidence-tag}"
    textColor: "{colors.evidence-tag-ink}"
    rounded: "{rounded.base}"
---

# Design System: Varun Poojari — Case File

## Overview

**Creative North Star: "The Case File"**

The site reads like an investigator's evidence file laid on a cool lab bench. Each role is a lettered exhibit with a line drawing of its city; the hero's redaction bars clear on a half-life schedule; skills sit in an ATT&CK-style matrix where every cell names the evidence behind it. The metaphor exists to put proof in front of the reader, never to hide it.

Density is editorial: generous section spacing, a single reading measure, and a fixed side rail for navigation. Colour is almost entirely paper and ink, with one yellow evidence tag reserved for marking things.

**Key Characteristics:**
- Paper-and-ink neutrals with a faint noise grain.
- One accent, used sparingly, for tags, focus and selection only.
- Wide Archivo for structure, Source Serif for reading, mono only for real identifiers.
- Flat surfaces; hairline rules instead of shadows.

## Colors

Cool, quiet neutrals with a single high-visibility evidence-tag yellow.

### Primary
- **Evidence-Tag Yellow** (#f2c230): tags, focus rings, skip link and selected states. Text on it is **Tag Ink** (#1b1607).

### Neutral
- **Lab Paper** (#eef1f3) / **Night Paper** (#11171e): page background in light / dark.
- **Lab Paper Raised** (#f8f9fa) / (#172029): panels and cards lifted by tone, not shadow.
- **Case Ink** (#142029) / **Night Ink** (#e4e9ed): primary text.
- **Case Ink Soft** (#3a4a57) and **Muted Graphite** (#5d6b77): secondary text and metadata.
- **Rule Line** (#c6cfd6) and **Rule Line Soft** (#dce2e7): dividers, link underlines at rest.

### Status
- **Merged Green** (#2f6f4f / dark #6cc296) and **Open Amber** (#8a5a00 / dark #e9b649): live PR status, and as the ramp for the GitHub contribution tiles in Open source (level 0 is Rule Line Soft; levels 1–4 mix Merged Green into the raised paper).

### Named Rules
**The One Tag Rule.** Evidence-Tag Yellow marks; it never decorates. No yellow headings, backgrounds or buttons beyond tags, focus and selection.

## Typography

**Display Font:** Archivo Variable (width axis), fallback Arial Narrow
**Body Font:** Source Serif 4 Variable (optical size), fallback Georgia
**Label/Mono Font:** JetBrains Mono Variable

**Character:** a wide, engineered sans for labels and structure against a calm, bookish serif for reading.

### Hierarchy
- **Display** (650, clamp 2.75–5.25rem, 1.15): the hero name only.
- **Headline** (700, 2.5rem, wdth 118, -0.015em): section titles.
- **Title** (650, 1.375rem): exhibit and card titles.
- **Body** (400, 1.0625rem, 1.6): prose, capped at the 40rem measure.
- **Label** (mono, 0.8125rem): PR numbers, hashes, dates as identifiers.

Scale is a perfect fourth from a 17px body.

### Named Rules
**The Real Identifier Rule.** Monospace appears only on things that are literally identifiers (PR numbers, hashes, commands), never as a "techy" flavour.

## Layout

Fixed 15rem side rail on wide screens, collapsing to a top menu on mobile. Content column follows a 40rem reading measure with a fluid gutter (1–3rem). Sections are separated by fluid vertical padding (3.5–6rem). Long lists (projects, PRs, skills) use grids that collapse to a single column.

## Elevation & Depth

Flat. Depth comes from tonal steps (paper → paper-raised), hairline rules and the paper grain overlay, not shadows.

### Named Rules
**The Flat Bench Rule.** Nothing floats. Use a tonal step or a rule line before reaching for a shadow.

## Shapes

Near-square corners (3px radius) on panels and chips. Hairline borders. City drawings are single-weight line art on a 600×90 canvas.

## Components

### Links
- Inherit text colour; 1px underline in Rule Line at rest, darkening to Ink on hover (120ms).

### Tags / Status marks
- Evidence-Tag Yellow chip with Tag Ink text, 3px radius. Status marks use Merged Green / Open Amber with a text label, never colour alone.

### Navigation (Rail)
- Side rail with scroll-spy highlighting, theme toggle and command palette entry (Ctrl K / ⌘K / "/"). Mobile: collapsible menu.

### Exhibit (signature)
- A lettered era block: city line drawing, role, org, period, then dated entries with optional live PR status.

### Skills Matrix (signature)
- ATT&CK-style columns of tactics; selecting a skill opens its evidence.

## Do's and Don'ts

### Do:
- **Do** link every claim to its evidence (PR, repo, paper, talk).
- **Do** keep body copy within the 40rem measure.
- **Do** pair any status colour with a text label.
- **Do** respect `prefers-reduced-motion` for the redaction reveal and ticker.

### Don't:
- **Don't** use Evidence-Tag Yellow for decoration (The One Tag Rule).
- **Don't** add drop shadows or glassmorphism (The Flat Bench Rule).
- **Don't** use monospace for anything that is not an identifier.
- **Don't** invent testimonials, metrics or endorsements.
