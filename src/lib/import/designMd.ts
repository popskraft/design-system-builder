import type { DesignSystemDocument, DesignTokens } from '../../types'
import { createDefaultTokens, DEFAULT_COMPONENT_SPECS } from '../defaults'

const HEX_RE = /#[0-9a-fA-F]{6}\b/g

function firstHeading(markdown: string): string | null {
  const match = markdown.match(/^#\s+(.+)$/m)
  return match?.[1]?.trim() ?? null
}

function section(markdown: string, title: string): string {
  const re = new RegExp(`^#{2,3}\\s+${title}\\b[\\s\\S]*?(?=^#{2,3}\\s+|$)`, 'im')
  return markdown.match(re)?.[0]?.trim() ?? ''
}

function assignColorsFromHexes(tokens: DesignTokens, markdown: string): DesignTokens {
  const hexes = Array.from(new Set(markdown.match(HEX_RE) ?? []))
  if (hexes.length === 0) return tokens

  const [primary, secondary, accent, bg, surface, text, border] = hexes
  return {
    ...tokens,
    colors: {
      ...tokens.colors,
      primary: primary ?? tokens.colors.primary,
      secondary: secondary ?? tokens.colors.secondary,
      accent: accent ?? tokens.colors.accent,
      bg: bg ?? tokens.colors.bg,
      surface: surface ?? tokens.colors.surface,
      text: text ?? tokens.colors.text,
      border: border ?? tokens.colors.border,
    },
  }
}

export function importDesignMd(markdown: string, existing?: DesignSystemDocument): DesignSystemDocument {
  const now = new Date().toISOString()
  const name = firstHeading(markdown) ?? existing?.name ?? 'Imported design system'
  const baseTokens = existing?.tokens ?? createDefaultTokens()
  const tokens = assignColorsFromHexes(baseTokens, markdown)
  const notes = [
    section(markdown, 'TL;DR'),
    section(markdown, 'Role'),
    section(markdown, 'Frontend Rules'),
    section(markdown, 'Constraints'),
  ].filter(Boolean)

  return {
    version: 1,
    id: existing?.id ?? crypto.randomUUID(),
    name,
    createdAt: existing?.createdAt ?? now,
    updatedAt: now,
    source: {
      kind: 'design-md',
      label: name,
      rawDesignMd: markdown,
      importedAt: now,
    },
    tokens,
    components: existing?.components ?? DEFAULT_COMPONENT_SPECS,
    notes,
  }
}
