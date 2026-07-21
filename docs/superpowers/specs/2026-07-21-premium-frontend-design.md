# Premium frontend redesign — SD Light and Sound

Date: 2026-07-21

## Goal

Raise the visual quality of the existing marketing site from "clean template" to
"premium agency work" without changing the brand identity, the page structure, the
copy, the i18n dictionaries, the quote API, or the SEO metadata.

Only the presentation layer changes: `globals.css`, `tailwind.config.ts`, and the
components under `src/components/`.

## Constraints

- Keep the existing identity: near-black background, amber accent, chrome logo.
- Keep the existing sections and their order. No new sections, no new copy keys.
- Keep server components as server components. Add `"use client"` only where motion
  or interaction requires it.
- Only asset available is `/public/logo.jpg`. No photography. Depth must come from
  CSS, not images.
- All motion must be disabled under `prefers-reduced-motion: reduce`.
- New dependency: `motion` (Framer Motion v12). No other runtime dependencies.

## Design tokens

Extend `tailwind.config.ts`:

- Surface ramp: `void #08080A`, `black #0B0B0D`, `nacht #0F0F12`, `surf #16171B`,
  `line #26272D`. Add `line-soft` (`rgba(255,255,255,0.07)`) for glass borders.
- Keep `amber #F0A93C`, `gloed #F5C56B`, `zand #EDE3D4`, `rook #8A8D96`.
- Add keyframes: `beam-sway`, `sheen`, `shimmer`, `float`, and matching `animation`
  entries, all with long durations (8–14s for ambient, 0.6–1.2s for one-shot).

Extend `globals.css`:

- Global grain overlay: fixed pseudo-element on `body::after` using an inline SVG
  `feTurbulence` data URI at ~3% opacity, `pointer-events: none`, `z-index: 60`.
- Fluid type scale via `clamp()` utilities: `.h1`, `.h2`, `.h3`, `.lead`.
- `text-wrap: balance` on headings, `text-wrap: pretty` on paragraphs.
- Section rhythm helper `.section` = `py-24 md:py-32 lg:py-36` plus a gradient hairline
  top border (`linear-gradient(90deg, transparent, rgba(255,255,255,0.09), transparent)`)
  replacing the flat `border-t border-line`.
- `.glass` component class: `bg-white/[0.035] backdrop-blur-xl border border-white/[0.07]`
  with an inset top highlight via `box-shadow: inset 0 1px 0 rgba(255,255,255,0.06)`.
- `.btn` gets a `:active` scale, a `focus-visible` amber ring, and `.btn-primary` gets
  an amber glow shadow that intensifies on hover.
- `@media (prefers-reduced-motion: reduce)` block that sets
  `animation-duration: 0.01ms !important; transition-duration: 0.01ms !important` and
  disables `scroll-behavior: smooth`.

## Shared motion primitives

New file `src/components/motion/Reveal.tsx` (`"use client"`):

- `Reveal` — wraps children, animates `opacity 0→1`, `y 24→0`, `whileInView` with
  `viewport={{ once: true, margin: "-80px" }}`, `duration 0.6`, `ease [0.16,1,0.3,1]`.
  Accepts `delay` and `as` props.
- `Stagger` — container variant with `staggerChildren: 0.08`; `StaggerItem` child.

New file `src/components/motion/SpotlightCard.tsx` (`"use client"`):

- Tracks pointer position via `useMotionValue` and renders a radial amber glow
  (`radial-gradient(320px circle at var(--x) var(--y), rgba(240,169,60,0.10), transparent 70%)`)
  as an overlay that fades in on hover. Falls back to a static card when reduced motion.

New file `src/components/motion/Counter.tsx` (`"use client"`):

- Counts a number from 0 to a target when it enters the viewport, using
  `animate()` from `motion`. Renders the final value immediately under reduced motion.

These three primitives are the only client-side motion infrastructure. Every other
component composes them.

## Component changes

### Nav (`Nav.tsx`) — becomes a client component

- Transparent at scroll top; past 24px it gains `.glass` plus a hairline bottom border
  and slightly reduced height. Transition on background, blur, border, padding.
- Desktop links get an underline sweep on hover (`scaleX` from 0, origin left).
- Mobile: hamburger opens a full-height drawer with backdrop blur, staggered link
  entrance, `Escape` to close, body scroll lock while open, focus trap on the drawer.
- `LangSwitcher` restyled as a pill segmented control with an animated active
  indicator (`layoutId`).

### Hero (`Hero.tsx`)

- Background stack, back to front: warm radial gradient, two amber beams at differing
  angles animating with `beam-sway` (slow, opposed phases), a truss silhouette strip
  across the top, a vignette, then content.
- Logo: unchanged image, wrapped in a container with a one-shot chrome `sheen` sweep on
  mount and a soft amber ambient glow behind it.
- H1: word-level stagger reveal on mount (split on spaces in the component, not in the
  dictionary).
- Sub-paragraph and CTAs reveal after the H1 with short delays.
- Primary CTA gains an amber glow; both CTAs get a subtle magnetic hover (translate
  toward cursor, max 4px), disabled under reduced motion.
- Scroll cue at the bottom: a thin line with a looping downward pulse.

### Services (`Services.tsx`)

- Cards become `SpotlightCard` with `.glass` styling.
- Icon moves into a rounded gradient chip (`from-amber/20 to-transparent`, amber border).
- Grid animates in with `Stagger`.
- Hover: `-translate-y-1`, border brightens to `amber/40`, icon chip glows.
- The dashed "extra" note becomes a glass strip with an amber left accent rule.

### WhyUs (`WhyUs.tsx`)

- Reformatted as a numbered editorial list: large muted ordinal, amber vertical rule
  that scales in on reveal, item text.
- Items revealed with `Stagger`.

### Materiaal (`Materiaal.tsx`)

- The `50 → 2000` panel uses `Counter` for both numbers, counting on viewport entry.
- Panel becomes `.glass` with an amber radial bloom behind it.
- The truss element gets a slow horizontal shimmer.

### Realisaties (`Realisaties.tsx`)

- Replace the single empty box with a 3-column (1 on mobile, 2 on tablet) grid of
  placeholder frames: aspect-[4/3], glass, dashed inner outline, a small camera glyph,
  and a slow diagonal `shimmer` sweep.
- The existing `dict.real.empty` copy sits centred under the grid. No new copy keys.

### About (`About.tsx`)

- Two-column editorial layout on `md+`: eyebrow + heading in the left column, body copy
  in the right, with a gradient hairline between them. Single column on mobile.

### QuoteForm (`QuoteForm.tsx`)

- Fields: glass background, `focus-within` amber ring plus a soft glow, label colour
  shifts to amber on focus.
- Inline validation on blur for required fields and email format: amber-red border and a
  small message under the field. Validation is client-side only and does not replace the
  existing server-side handling in `src/app/api/offerte/route.ts`.
- Submit button has three states: idle, submitting (spinner, disabled), success
  (checkmark, then the existing success message). Errors keep the existing error path.
- The form panel itself becomes a glass card with an amber top-edge highlight.

### Footer (`Footer.tsx`)

- Gradient hairline top border, tightened spacing, hover states on links matching Nav.

## Responsive rules

- Verify at 375, 768, 1024, 1440.
- All type via `clamp()`; no fixed `px` font sizes above 14px.
- Tap targets minimum 44×44 on mobile (nav links, lang switcher, buttons).
- Hero beams and truss scale with viewport width; beams reduce opacity below 768px so
  text contrast stays above 4.5:1.
- Services grid: 1 → 2 (sm) → 3 (md) columns. Realisaties: 1 → 2 (sm) → 3 (lg).
- Nav drawer only below `md`.

## Accessibility

- All interactive elements keep a visible `focus-visible` ring (amber, 2px, offset 2px).
- Mobile drawer: `aria-expanded` on the trigger, `role="dialog"` + `aria-modal`, focus
  trap, `Escape` to close.
- Form errors linked via `aria-describedby` and `aria-invalid`.
- Decorative motion layers marked `aria-hidden`.
- Reduced-motion path verified for every animated component.

## Out of scope

- Copy, translations, and dictionary keys.
- `src/app/api/offerte/route.ts`, `middleware.ts`, `sitemap.ts`, `robots.ts`, `site.ts`.
- SEO metadata in the layouts.
- Adding photography or new sections.

## Success criteria

- `npm run build` succeeds with no new type errors.
- `npm run lint` passes.
- Every section renders correctly at 375, 768, 1024, and 1440 px wide.
- With `prefers-reduced-motion: reduce`, no element animates and all content is visible
  in its final state.
- Keyboard-only navigation reaches every interactive element with a visible focus ring.
- No new dependency other than `motion`.
