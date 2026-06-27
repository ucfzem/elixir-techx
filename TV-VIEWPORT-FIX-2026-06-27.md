# ElixirTechx — TV Viewport Fix Backup

## Date
2026-06-27

## Problem
TV browsers ignore `width=device-width` and render at virtual width (980px/1280px).
CSS breakpoints at 1920px never fire. Page renders as zoomed-out mobile view.

## Fix
1. Viewport meta: `width=1920` (forces TV browser to report 1920px width)
2. TV bootstrap CSS: `min-width: 1280px` body + `18px` font before React mounts

## File Changed
- `index.html` — viewport meta + inline bootstrap style

## Commits
- `25fc869` — fix: viewport meta for TV browsers — force 1920px width

## Why CSS Alone Didn't Work
TV browser reported width as ~480px/980px.
All `@media (min-width: 120rem)` blocks were skipped.
Page fell back to mobile styles stretched across TV screen.
