# Performance Optimization Plan

This document outlines the proposed changes to improve the website's performance and responsiveness, especially on low-config mobile devices and laptops.

## 🚩 Major Bottlenecks Identified

1.  **Global SVG Noise Filter**: The inline SVG `feTurbulence` used for the film grain effect in `RootLayout` is extremely CPU-intensive on scroll/animation.
2.  **Infinite React State Updates**: The `ReviewsSection` marquee updates React state 60 times per second, triggering constant re-renders.
3.  **Heavy Backdrop Blurs**: Extensive use of `backdrop-blur` (a very expensive GPU property) across almost all components.
4.  **Scrolling Backgrounds**: Use of `bg-fixed` in several sections, forcing constant repaints on mobile.

---

## 🛠️ Proposed Changes

### 1. Global Optimization (`app/layout.tsx`)
- **Replace SVG Filter**: Trade the dynamic `feTurbulence` for a static noise PNG texture or a more efficient CSS-based noise. This will stop the constant viewport recalculations.
- **Efficient Overlays**: Simplify the "paper wash" effect to reduce layering complexity.

### 2. Reviews Section (`app/Components/Home/ReviewsSection.tsx`)
- **Move to Pure CSS Marquee**: Use `@keyframes` for the automatic scrolling instead of a React `requestAnimationFrame` loop. This allows the browser to handle the animation on the compositor thread without involving the React main thread.
- **Mobile-First Scrolling**: Remove `bg-fixed` for mobile devices to allow smooth scrolling.
-  **Adaptive Blur**: Lower the blur intensity from `backdrop-blur-xl` to `backdrop-blur-sm` or a simple semi-transparent background on mobile.

### 3. Hero & Social Sidebar
- **Optimized HUD Decorations**: Ensure the scanline and HUD overlays are not triggering layout recalculations.
- **Component-Specific Blur**: Audit all `backdrop-blur` calls and provide a reduced-opacity fallback for users on low-power devices.

### 4. General Asset Polish
- **Priority Loading**: Ensure all key images have the `priority` attribute and appropriate `sizes` definitions to minimize LCP and CLS.

---

## 🧪 Verification Plan

### Automated Checks
- Run `npm run build` to monitor bundle size.
- Utilize Chrome DevTools **Performance** and **Rendering** tabs to measure Frame Rate (FPS) improvements.

### Manual Testing
- **CPU Throttling**: Test with 4x/6x slowdown in Chrome DevTools to simulate low-end mobile performance.
- **Mobile Real-Device Testing**: Verify that the marquee and scrolling feels "fluid" and no longer "stuttery."
