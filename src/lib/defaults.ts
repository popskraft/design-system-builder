import type { ComponentSpec, DesignSystemDocument, DesignSystemSource, DesignTokens } from '../types'

export const DEFAULT_COMPONENT_SPECS: ComponentSpec[] = [
  { id: 'button', name: 'Button', role: 'Primary, secondary, accent, danger, ghost, disabled states', notes: 'Use clear contrast and visible focus states.' },
  { id: 'input', name: 'Input', role: 'Text fields, select controls, textarea, validation states', notes: 'Labels are required; placeholders are hints only.' },
  { id: 'card', name: 'Card', role: 'Individual items, tools, previews, modals', notes: 'Avoid nested cards and decorative framing.' },
  { id: 'navigation', name: 'Navigation', role: 'Desktop nav and compact/mobile navigation', notes: 'Keep primary actions reachable.' },
  { id: 'status', name: 'Status', role: 'Badges, alerts, empty/loading/error/success states', notes: 'Do not encode meaning with color alone.' },
  { id: 'data', name: 'Data display', role: 'Tables, rows, metrics, dense lists', notes: 'Prioritize scanning and comparison.' },
]

export function createDefaultSource(label = 'Manual system', rawDesignMd = ''): DesignSystemSource {
  return {
    kind: rawDesignMd.trim() ? 'design-md' : 'manual',
    label,
    rawDesignMd,
    importedAt: rawDesignMd.trim() ? new Date().toISOString() : null,
  }
}

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

export function createMinigreeTokens(): DesignTokens {
  return {
    colors: {
      primary:   '#171717',
      secondary: '#4d4d4d',
      accent:    '#2f6f5e',
      success:   '#168a4a',
      danger:    '#c2410c',
      warning:   '#b7791f',
      bg:        '#f7f7f4',
      surface:   '#ffffff',
      text:      '#171717',
      border:    '#e6e4dc',
    },
    typography: {
      headingFont: "'Inter Variable', sans-serif",
      bodyFont:    "'Inter Variable', sans-serif",
      fwHeading:   600,
      fontSize:    16,
      lineHeight:  1.50,
    },
    shape: {
      rSm:   6,
      rMd:   8,
      rLg:   12,
      rXl:   16,
      sp:    8,
      btnPx: 20,
      btnPy: 10,
    },
    effects: {
      shadowIntensity: 6,
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
    source: createDefaultSource(name),
    tokens: createDefaultTokens(),
    components: DEFAULT_COMPONENT_SPECS,
    notes: [],
  }
}

export function createMinigreeDocument(): DesignSystemDocument {
  const now = new Date().toISOString()
  return {
    version: 1,
    id: crypto.randomUUID(),
    name: 'minigree',
    createdAt: now,
    updatedAt: now,
    source: createDefaultSource('minigree example preset'),
    tokens: createMinigreeTokens(),
    components: DEFAULT_COMPONENT_SPECS,
    notes: ['Example preset retained as reference material; not the default canon.'],
  }
}
