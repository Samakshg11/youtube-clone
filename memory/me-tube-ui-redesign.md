---
name: me-tube-ui-redesign
description: A comprehensive redesign of MeTube's UI to modernize aesthetics, improve usability, and enhance accessibility.
metadata:
  type: project
---

## Overview

This redesign aims to transform MeTube into a sleek, modern YouTube clone with:
- A **dark/light mode toggle** for accessibility.
- **Card-based layouts** with subtle animations.
- **Responsive design** for all screen sizes.
- **Improved visual hierarchy** and micro-interactions.
- **A cohesive color palette** inspired by YouTube's design system.
- **Better typography** and spacing.

## Key Changes

### 1. **Global Theme & Color System**

- **Color Palette**: Adopt YouTube's official palette with a modern twist:
  - **Primary**: `#FF5A4F` (red) for CTA buttons, gradients.
  - **Secondary**: `#FBBF24` (orange) for accents.
  - **Backgrounds**: Dark mode (`--bg-main: #04050a`) with subtle gradients.
  - **Text**: High contrast (`--text-soft: #ACB0BD`, `--text-primary: #fff`).

- **Dark/Light Mode Toggle**: Add a toggle in the navbar for dynamic theming.

### 2. **Sidebar & Navigation**

- **Category Icons**: Replace text-only categories with emoji icons (e.g., 🎵 Music, 🎬 Movies).
- **Mobile Navigation**: Replace horizontal scroll with a collapsible hamburger menu.
- **Sticky Sidebar**: Ensure it stays visible while scrolling.

### 3. **Feed & Card Layout**

- **Grid Layout**: Use a 3-column grid for the feed with responsive adjustments.
- **Video Cards**: Add subtle animations (e.g., hover effects, thumbnail scaling).
- **Shimmer Effects**: Replace static shimmers with animated placeholders.

### 4. **Watch Page**

- **Player UI**: Add a modern YouTube-like player with controls.
- **Metadata Cards**: Improve layout and spacing for views, published date, and description.
- **Interactive Buttons**: Add Like/Share buttons with visual feedback.

### 5. **Footer & Utility**

- **Sticky Footer**: Add a branded footer with copyright, links, and tech stack.
- **Accessibility**: Ensure all interactive elements are keyboard-navigable and screen-reader-friendly.

### 6. **Formatting & Spacing**

- **Tailwind CSS**: Use utility classes for consistent spacing, padding, and borders.
- **Typography**: Improve font hierarchy and readability.

## Implementation Plan

1. **Theme System**: Add a dark/light mode toggle and dynamic CSS variables.
2. **Sidebar Redesign**: Replace text-only categories with icons and improve mobile navigation.
3. **Feed Cards**: Update grid layout, animations, and shimmer effects.
4. **Watch Page**: Modernize the player and metadata cards.
5. **Footer**: Add a sticky footer with branding and links.

## Files to Update

- `src/index.css` (theme system, dark/light mode toggle)
- `src/App.jsx` (sticky footer, theme context)
- `src/components/SideBar.jsx` (category icons, mobile menu)
- `src/components/Feed.jsx` (grid layout, animations)
- `src/components/VideoCard.jsx` (hover effects, animations)
- `src/components/WatchPage.jsx` (player UI, metadata cards)
- `src/utils/categories.js` (category icons)

## Next Steps

- Start with the theme system and dark/light mode toggle.
- Redesign the sidebar and mobile navigation.
- Update the feed grid layout and video cards.
- Modernize the watch page UI.
- Add the footer component.

---
**Why:**
This redesign improves user experience, accessibility, and visual appeal by aligning with modern web standards and YouTube's design system.

**How to apply:**
- Begin with the theme system and dark/light mode toggle.
- Iterate on the sidebar and feed components first.
- Gradually update the watch page and footer.
- Test responsiveness and accessibility across devices.