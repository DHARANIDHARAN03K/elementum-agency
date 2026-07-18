# Elementum — Design Decisions & Development Log

> React Webpage Assignment | Evaluated by: Ishank Sachdeva | Platform: Internshala
> Built by: [Your Name] | Date: July 17, 2026

---

## Why React (and not plain HTML)?

React uses a **component-based architecture**. Each section of the page
(Navbar, Hero, Services, etc.) is its own isolated file. This means:
- Changes to the Navbar don't accidentally break the Footer
- Code is reusable: the `FloatingProfile` pattern is used in both Hero and Testimonials
- Scalable: adding a new section = creating one new file, not editing a 1000-line HTML file

**Alternative**: Plain HTML + CSS + JS. Works fine for small pages, but becomes messy
when the UI has interactive elements or repeated patterns.

---

## Why Vite (and not Create React App)?

**Vite** uses native ES modules in development. This means the browser loads
files directly without a bundling step — startup time is ~100ms vs CRA's ~30 seconds.

Meta (who created React) deprecated Create React App in 2023. Vite is now the
official recommendation from the React team.

---

## Why Space Grotesk font (not Gerbil)?

Figma comment from Ishank confirms the font is **Gerbil** — a geometric sans-serif.
Gerbil is a paid/personal-use font not available on Google Fonts CDN.

**Decision**: Use **Space Grotesk** as the closest available match.
- Both are geometric, bold, with rounded terminals
- Space Grotesk is free, open-source, and loads from Google's CDN (fast globally)
- The visual impression is nearly identical at the sizes used in this design

**Alternative considered**: Syne, Outfit — but Space Grotesk is the closest match.

---

## Why CSS Variables for colors?

```css
:root {
  --color-black: #0a0a0a;
  --color-mint-bg: #d4ede0;
}
```

If the evaluator asks "change the green to blue" — one line change, updated everywhere.
Without variables, you'd search-and-replace across 8 CSS files and risk missing one.

This is called a **Design Token** system. All major companies (Stripe, Airbnb) use this.

---

## Animations chosen and why

| Animation | Section | Why |
|-----------|---------|-----|
| Floating profiles (translateY loop) | Hero, Testimonials | Creates a "living community" feel |
| Fade-in-up on scroll | All sections | Content reveals as user scrolls — reduces overwhelming |
| Arrow rotation on hover | Services | Standard "external link" indicator on diagonal |
| SVG path draw | Hero squiggle | The squiggly line "draws itself" — feels crafted |
| Button lift on hover | Newsletter | Physical interaction metaphor |

**IntersectionObserver** is used for scroll-triggered animations instead of scroll events.
**Why?** `scroll` events fire 60+ times per second (performance issue). IntersectionObserver
only fires when an element enters/exits the viewport — much more efficient.

---

## Why `object-fit: cover` on all images?

Images come in different aspect ratios. `object-fit: cover` crops them to fill
the container without distortion. Without it, a tall photo in a circular container
would stretch and look broken.

---

## Accessibility decisions

- All images have `alt` text
- Interactive elements have `aria-label` where text isn't visible
- Form uses `required` attribute and proper `<label>` association
- Navigation uses `role="navigation"` and `aria-label`
- `@media (prefers-reduced-motion: reduce)` disables all animations for users with motion sensitivity

---

## What is Unit Testing? (Interview prep)

Unit testing = writing code that automatically tests your other code.

Example: You have a function `formatDate(date)`. 
A unit test would be:
```js
expect(formatDate('2026-07-17')).toBe('July 17, 2026')
```

**Where does it apply?**
- ✅ Frontend: Testing that a button click shows a modal
- ✅ Backend: Testing that an API endpoint returns the right data
- ✅ Database: Testing that a query returns correct results

**Tools**: Jest, Vitest (for React), React Testing Library

In this project, unit testing wasn't required by the assignment, but in a production
app, we'd test: Does the Newsletter form validate email? Does the mobile menu open/close?

---

## What is TypeScript? (Interview prep)

TypeScript = JavaScript + type checking.

In JavaScript: `const count = "hello"` — no error until runtime (the code crashes)
In TypeScript: `const count: number = "hello"` — error immediately in editor

**Why top companies use it**: Catches bugs before they reach users. In a team of 50
developers, TypeScript prevents one dev from accidentally passing wrong data to another
dev's function.

**Why we didn't use it here**: This assignment is a single page, single developer.
TypeScript's benefits shine in large teams. Using it here would add setup complexity
with minimal benefit.

---

## Responsive breakpoints and why

| Breakpoint | Width | What Changes |
|-----------|-------|-------------|
| Desktop | > 900px | 2-column layouts, full-size profiles |
| Tablet | 600-900px | Columns stack to 1, images shrink |
| Mobile | < 600px | Smaller padding, reduced font sizes |

These match the most common device widths in India (primary market for Internshala).

---

*This document was written as a professional workflow artifact to demonstrate
decision-making transparency — a practice used at companies like Stripe, Linear, and Vercel.*
