import type { DesignSystemDocument, DesignTokens } from '../types'

export function createDefaultTokens(): DesignTokens {
  return {
    colors: {
      primary:   '#2563eb',
      secondary: '#7c3aed',
      accent:    '#f59e0b',
      success:   '#10b981',
      danger:    '#ef4444',
      warning:   '#f59e0b',
      bg:        '#f8fafc',
      surface:   '#ffffff',
      text:      '#0f172a',
      border:    '#e2e8f0',
    },
    typography: {
      headingFont: "'Syne Variable', sans-serif",
      bodyFont:    "'Inter Variable', sans-serif",
      fwHeading:   700,
      fontSize:    16,
      lineHeight:  1.5,
    },
    shape: {
      rSm:   4,
      rMd:   8,
      rLg:   12,
      rXl:   16,
      sp:    4,
      btnPx: 20,
      btnPy: 10,
    },
    effects: {
      shadowIntensity: 8,
      borderStyle: '1px solid',
    },
  }
}

export function createDocument(name: string): DesignSystemDocument {
  const now = new Date().toISOString()
  return {
    version: 1,
    id: crypto.randomUUID(),
    name,
    createdAt: now,
    updatedAt: now,
    tokens: createDefaultTokens(),
  }
}
