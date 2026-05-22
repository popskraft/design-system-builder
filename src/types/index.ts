// ─── TOKEN MODEL ───────────────────────────────────────────────────────────────

export type TokenCategory = 'color' | 'typography' | 'shape' | 'effects'

export interface ColorTokens {
  primary: string
  secondary: string
  accent: string
  success: string
  danger: string
  warning: string
  bg: string
  surface: string
  text: string
  border: string
}

export interface TypographyTokens {
  headingFont: string
  bodyFont: string
  fwHeading: number
  fontSize: number    // px
  lineHeight: number  // unitless
}

export interface ShapeTokens {
  rSm: number   // px
  rMd: number
  rLg: number
  rXl: number
  sp: number    // base spacing unit
  btnPx: number // button padding horizontal
  btnPy: number // button padding vertical
}

export interface EffectsTokens {
  shadowIntensity: number   // 0–30
  borderStyle: '1px solid' | '1px dashed' | '2px solid' | '0px solid'
}

export interface DesignTokens {
  colors: ColorTokens
  typography: TypographyTokens
  shape: ShapeTokens
  effects: EffectsTokens
}

export type DesignSystemSourceKind = 'manual' | 'design-md' | 'reference' | 'generated'

export interface DesignSystemSource {
  kind: DesignSystemSourceKind
  label: string
  rawDesignMd: string
  importedAt: string | null
}

export interface ComponentSpec {
  id: string
  name: string
  role: string
  notes: string
}

export interface ExportPackage {
  designMd: string
  contractJson: string
  tokensCss: string
  tokensJson: string
}

// ─── DOCUMENT ──────────────────────────────────────────────────────────────────

export interface DesignSystemDocument {
  version: 1
  id: string
  name: string
  createdAt: string
  updatedAt: string
  source: DesignSystemSource
  tokens: DesignTokens
  components: ComponentSpec[]
  notes: string[]
}

export interface DocumentMeta {
  id: string
  name: string
  updatedAt: string
}

// ─── STORAGE ADAPTER ───────────────────────────────────────────────────────────

export interface StorageAdapter {
  load(id: string): Promise<DesignSystemDocument | null>
  save(doc: DesignSystemDocument): Promise<void>
  list(): Promise<DocumentMeta[]>
  delete(id: string): Promise<void>
}

// ─── UI STATE ──────────────────────────────────────────────────────────────────

export type EditorTab = 'source' | 'colors' | 'type' | 'shape' | 'effects' | 'export'
export type PreviewSection = 'overview' | 'typography' | 'components' | 'layout'
export type PreviewMode = 'light' | 'dark'

export const FONT_OPTIONS: { label: string; value: string; css: string }[] = [
  { label: 'Syne',             value: 'syne',           css: "'Syne Variable', sans-serif" },
  { label: 'Inter',            value: 'inter',          css: "'Inter Variable', sans-serif" },
  { label: 'DM Sans',          value: 'dm-sans',        css: "'DM Sans Variable', sans-serif" },
  { label: 'Space Grotesk',    value: 'space-grotesk',  css: "'Space Grotesk Variable', sans-serif" },
  { label: 'Playfair Display', value: 'playfair',       css: "'Playfair Display Variable', serif" },
  { label: 'Outfit',           value: 'outfit',         css: "'Outfit Variable', sans-serif" },
  { label: 'DM Mono',          value: 'dm-mono',        css: "'DM Mono', monospace" },
  { label: 'Georgia',          value: 'georgia',        css: "Georgia, serif" },
  { label: 'System UI',        value: 'system',         css: "system-ui, sans-serif" },
]

export const COLOR_PALETTES = [
  { name: 'minigree', primary: '#171717', secondary: '#4d4d4d', accent: '#2f6f5e', bg: '#f7f7f4', surface: '#ffffff', text: '#171717', border: '#e6e4dc' },
  { name: 'Ocean',   primary: '#0ea5e9', secondary: '#6366f1', accent: '#f59e0b', bg: '#f0f9ff', surface: '#ffffff', text: '#0c4a6e', border: '#bae6fd' },
  { name: 'Forest',  primary: '#16a34a', secondary: '#0891b2', accent: '#eab308', bg: '#f0fdf4', surface: '#ffffff', text: '#14532d', border: '#bbf7d0' },
  { name: 'Sunset',  primary: '#dc2626', secondary: '#9333ea', accent: '#f97316', bg: '#fff7ed', surface: '#ffffff', text: '#431407', border: '#fed7aa' },
  { name: 'Slate',   primary: '#475569', secondary: '#0f766e', accent: '#d97706', bg: '#f8fafc', surface: '#ffffff', text: '#0f172a', border: '#e2e8f0' },
  { name: 'Violet',  primary: '#7c3aed', secondary: '#2563eb', accent: '#f43f5e', bg: '#faf5ff', surface: '#ffffff', text: '#2e1065', border: '#e9d5ff' },
  { name: 'Dark',    primary: '#6366f1', secondary: '#22d3ee', accent: '#fbbf24', bg: '#0f172a', surface: '#1e293b', text: '#f1f5f9', border: '#334155' },
] satisfies (Partial<ColorTokens> & { name: string })[]

export const THEME_PRESETS: Record<string, Partial<DesignTokens & { name: string }>> = {
  minigree: {
    colors: { primary: '#171717', secondary: '#4d4d4d', accent: '#2f6f5e', success: '#168a4a', danger: '#c2410c', warning: '#b7791f', bg: '#f7f7f4', surface: '#ffffff', text: '#171717', border: '#e6e4dc' },
    typography: { headingFont: "'Inter Variable', sans-serif", bodyFont: "'Inter Variable', sans-serif", fwHeading: 600, fontSize: 16, lineHeight: 1.5 },
    shape: { rSm: 6, rMd: 8, rLg: 12, rXl: 16, sp: 8, btnPx: 20, btnPy: 10 },
    effects: { shadowIntensity: 6, borderStyle: '1px solid' },
  },
  clean: {
    colors: { primary: '#2563eb', secondary: '#7c3aed', accent: '#f59e0b', success: '#10b981', danger: '#ef4444', warning: '#f59e0b', bg: '#f8fafc', surface: '#ffffff', text: '#0f172a', border: '#e2e8f0' },
    shape: { rSm: 4, rMd: 8, rLg: 12, rXl: 16, sp: 4, btnPx: 20, btnPy: 10 },
    effects: { shadowIntensity: 6, borderStyle: '1px solid' },
  },
  dark: {
    colors: { primary: '#6366f1', secondary: '#22d3ee', accent: '#fbbf24', success: '#10b981', danger: '#ef4444', warning: '#f59e0b', bg: '#0f172a', surface: '#1e293b', text: '#f1f5f9', border: '#334155' },
    shape: { rSm: 6, rMd: 10, rLg: 16, rXl: 20, sp: 4, btnPx: 20, btnPy: 10 },
    effects: { shadowIntensity: 0, borderStyle: '1px solid' },
  },
  fintech: {
    colors: { primary: '#f0b90b', secondary: '#1e2329', accent: '#f0b90b', success: '#0ecb81', danger: '#f6465d', warning: '#f0b90b', bg: '#0b0e11', surface: '#1e2329', text: '#eaecef', border: '#2b3139' },
    shape: { rSm: 2, rMd: 4, rLg: 6, rXl: 8, sp: 4, btnPx: 20, btnPy: 10 },
    effects: { shadowIntensity: 0, borderStyle: '1px solid' },
  },
  ecom: {
    colors: { primary: '#e11d48', secondary: '#0891b2', accent: '#d97706', success: '#10b981', danger: '#ef4444', warning: '#d97706', bg: '#fffbf5', surface: '#ffffff', text: '#1c1917', border: '#e7e5e4' },
    shape: { rSm: 6, rMd: 10, rLg: 14, rXl: 20, sp: 4, btnPx: 24, btnPy: 12 },
    effects: { shadowIntensity: 10, borderStyle: '1px solid' },
  },
  saas: {
    colors: { primary: '#0ea5e9', secondary: '#6366f1', accent: '#10b981', success: '#10b981', danger: '#ef4444', warning: '#f59e0b', bg: '#f0f9ff', surface: '#ffffff', text: '#0c4a6e', border: '#bae6fd' },
    shape: { rSm: 4, rMd: 8, rLg: 12, rXl: 16, sp: 4, btnPx: 20, btnPy: 10 },
    effects: { shadowIntensity: 8, borderStyle: '1px solid' },
  },
  luxury: {
    colors: { primary: '#d4af37', secondary: '#9c7722', accent: '#d4af37', success: '#10b981', danger: '#ef4444', warning: '#d4af37', bg: '#0a0a0a', surface: '#111111', text: '#f5f0e8', border: '#2a2a2a' },
    shape: { rSm: 0, rMd: 0, rLg: 2, rXl: 4, sp: 4, btnPx: 24, btnPy: 12 },
    effects: { shadowIntensity: 0, borderStyle: '1px solid' },
  },
  organic: {
    colors: { primary: '#5c7a4e', secondary: '#8b6914', accent: '#d47c0a', success: '#5c7a4e', danger: '#c0392b', warning: '#d47c0a', bg: '#f5f0e8', surface: '#fffdf7', text: '#2a1f0e', border: '#d4c5a0' },
    shape: { rSm: 4, rMd: 10, rLg: 16, rXl: 24, sp: 4, btnPx: 22, btnPy: 11 },
    effects: { shadowIntensity: 6, borderStyle: '1px solid' },
  },
}
