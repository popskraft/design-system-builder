import type { DesignTokens } from '../types'

// Converts hex to rgba with alpha
export function hexAlpha(hex: string, alpha: number): string {
  try {
    const r = parseInt(hex.slice(1, 3), 16)
    const g = parseInt(hex.slice(3, 5), 16)
    const b = parseInt(hex.slice(5, 7), 16)
    return `rgba(${r},${g},${b},${alpha})`
  } catch {
    return hex
  }
}

// Generates CSS custom properties string from tokens
export function tokensToCSS(tokens: DesignTokens, mode: 'light' | 'dark' = 'light'): string {
  const { colors, typography, shape, effects } = tokens
  const si = effects.shadowIntensity

  // Dark mode: invert background/surface/text
  const bg      = mode === 'dark' ? darkenHex(colors.bg)      : colors.bg
  const surface = mode === 'dark' ? darkenHex(colors.surface) : colors.surface
  const text    = mode === 'dark' ? lightenHex(colors.text)   : colors.text

  return `
  --c-primary:    ${colors.primary};
  --c-secondary:  ${colors.secondary};
  --c-accent:     ${colors.accent};
  --c-success:    ${colors.success};
  --c-danger:     ${colors.danger};
  --c-warning:    ${colors.warning};
  --c-bg:         ${bg};
  --c-surface:    ${surface};
  --c-text:       ${text};
  --c-text-muted: ${hexAlpha(text, 0.5)};
  --c-border:     ${colors.border};
  --f-heading:    ${typography.headingFont};
  --f-body:       ${typography.bodyFont};
  --fw-heading:   ${typography.fwHeading};
  --fs-base:      ${typography.fontSize}px;
  --lh-base:      ${typography.lineHeight};
  --r-sm:         ${shape.rSm}px;
  --r-md:         ${shape.rMd}px;
  --r-lg:         ${shape.rLg}px;
  --r-xl:         ${shape.rXl}px;
  --r-full:       9999px;
  --sp:           ${shape.sp}px;
  --btn-px:       ${shape.btnPx}px;
  --btn-py:       ${shape.btnPy}px;
  --border-style: ${effects.borderStyle};
  --shadow-sm:    0 1px 2px rgba(0,0,0,${si / 200});
  --shadow-md:    0 4px 12px rgba(0,0,0,${si / 100});
  --shadow-lg:    0 8px 32px rgba(0,0,0,${si / 60});
`.trim()
}

// Generates the final export-ready CSS block
export function exportCSS(tokens: DesignTokens): string {
  const { colors, typography, shape, effects } = tokens
  const si = effects.shadowIntensity
  return `:root {
  /* Colors */
  --c-primary:   ${colors.primary};
  --c-secondary: ${colors.secondary};
  --c-accent:    ${colors.accent};
  --c-success:   ${colors.success};
  --c-danger:    ${colors.danger};
  --c-warning:   ${colors.warning};
  --c-bg:        ${colors.bg};
  --c-surface:   ${colors.surface};
  --c-text:      ${colors.text};
  --c-border:    ${colors.border};

  /* Typography */
  --f-heading:  ${typography.headingFont};
  --f-body:     ${typography.bodyFont};
  --fw-heading: ${typography.fwHeading};
  --fs-base:    ${typography.fontSize}px;
  --lh-base:    ${typography.lineHeight};

  /* Radius */
  --r-sm:   ${shape.rSm}px;
  --r-md:   ${shape.rMd}px;
  --r-lg:   ${shape.rLg}px;
  --r-xl:   ${shape.rXl}px;
  --r-full: 9999px;

  /* Spacing */
  --sp:    ${shape.sp}px;
  --sp-xs: calc(var(--sp) * 1);
  --sp-sm: calc(var(--sp) * 2);
  --sp-md: calc(var(--sp) * 4);
  --sp-lg: calc(var(--sp) * 6);
  --sp-xl: calc(var(--sp) * 8);

  /* Buttons */
  --btn-px: ${shape.btnPx}px;
  --btn-py: ${shape.btnPy}px;

  /* Shadows */
  --shadow-sm: 0 1px 2px rgba(0,0,0,${si / 200});
  --shadow-md: 0 4px 12px rgba(0,0,0,${si / 100});
  --shadow-lg: 0 8px 32px rgba(0,0,0,${si / 60});

  /* Borders */
  --border-style: ${effects.borderStyle};
}`
}

function darkenHex(hex: string): string {
  try {
    const r = parseInt(hex.slice(1, 3), 16)
    const g = parseInt(hex.slice(3, 5), 16)
    const b = parseInt(hex.slice(5, 7), 16)
    const f = 0.15
    return `#${Math.round(r * f).toString(16).padStart(2, '0')}${Math.round(g * f).toString(16).padStart(2, '0')}${Math.round(b * f).toString(16).padStart(2, '0')}`
  } catch { return hex }
}

function lightenHex(hex: string): string {
  try {
    const r = parseInt(hex.slice(1, 3), 16)
    const g = parseInt(hex.slice(3, 5), 16)
    const b = parseInt(hex.slice(5, 7), 16)
    return `#${Math.min(255, r + 180).toString(16).padStart(2, '0')}${Math.min(255, g + 180).toString(16).padStart(2, '0')}${Math.min(255, b + 180).toString(16).padStart(2, '0')}`
  } catch { return hex }
}
