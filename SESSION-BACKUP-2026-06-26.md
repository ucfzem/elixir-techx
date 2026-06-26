# Session Backup — June 26, 2026

## Elixir-tech (elixir-techx.vercel.app)

### Changes Made
- Logo renamed: TechStore -> Élixir-tech (Header.tsx, index.html, 404.html)
- Tablet: hamburger nav on screens < 1024px (md -> lg breakpoint)
- TV: aggressive overrides at 1920px+ (6-col grid, scaled fonts/images/buttons, full-width containers)
- Filter tabs: hidden scrollbar, overflow-x-auto
- Cart thumbnails: loading="lazy"
- Touch targets: 48px min on coarse pointers

### Key Files
- src/index.css — TV overrides, focus system, responsive fixes
- src/components/Header.tsx — Logo, nav breakpoints
- src/pages/HomePage.tsx — Product grid, containers
- src/pages/CartPage.tsx — Lazy loading
- index.html — Meta tags (Élixir-tech)
- public/404.html — Title fix

### Commits
- 1e252f9 — Fix all TechStore -> Elixir-tech in index.html and 404.html
- 5819c8b — Rebuild with Elixir-tech logo
- fdb2f17 — Fix tablet: logo renamed, hamburger nav, proper spacing
- 751805c — Aggressive TV overrides
- 94cfccf — Backup doc
- 6f3f70a — Responsive polish

### Deployment
- Vercel: https://elixir-techx.vercel.app/
- Deploy ID: dpl_CFJXSPq3CfJXL4FyYx4sNoVk6Eqo

---

## hf-model (hf-model.vercel.app)

### Changes Made
- Reverted to original Quick Add buttons (no WhatsApp)
- Tablet/TV responsive overrides added
- vercel.json: skip build for static HTML site

### Key Files
- index.html — Full site (static HTML, CSS, JS inline)
- vercel.json — Build config

### Commits
- fc73736 — Revert to original: no WhatsApp, just Quick Add
- 903de3b — Fix WhatsApp buttons always visible
- 30cd591 — Remove WhatsApp, restore Quick Add, tablet/TV overrides
- 5feaf3e — Fix vercel.json

### Deployment
- Vercel: https://hf-model.vercel.app/
- Deploy ID: dpl_2929AGxTkZ2XE6ggRPMfTbaCkA5K
- Project ID: prj_cZ0c3SPGpjRljW7ziTck636XmFdB

---

## Blog (ucfzem.github.io/blog)

### Changes Made
- TV breakpoint fixed from 1921px to 1920px (Full HD)
- Language buttons visible on tablets (769-1024px header wraps)

### Commits
- 7b473c6 — Fix blog: show language buttons on tablet screens
- cbcfc1a — Fix blog TV breakpoint: 1921px -> 1920px

### Deployment
- GitHub Pages: https://ucfzem.github.io/blog/
