import type { ComponentSpec, DesignSystemDocument, DesignTokens } from '../../types'
import { createDefaultTokens, DEFAULT_COMPONENT_SPECS } from '../defaults'

const HEX_RE = /#[0-9a-fA-F]{6}\b/g

type ParsedYaml = Record<string, unknown>

function firstHeading(markdown: string): string | null {
  const match = markdown.match(/^#\s+(.+)$/m)
  return match?.[1]?.trim() ?? null
}

function frontMatter(markdown: string): { yaml: ParsedYaml; body: string; warnings: string[] } {
  const match = markdown.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/)
  if (!match) return { yaml: {}, body: markdown, warnings: ['No YAML front matter found; imported Markdown heuristically.'] }
  return { yaml: parseSimpleYaml(match[1]), body: match[2], warnings: [] }
}

function parseSimpleYaml(input: string): ParsedYaml {
  const root: ParsedYaml = {}
  const stack: { indent: number; value: Record<string, unknown> }[] = [{ indent: -1, value: root }]

  for (const rawLine of input.split('\n')) {
    if (!rawLine.trim() || rawLine.trimStart().startsWith('#')) continue
    const indent = rawLine.match(/^\s*/)?.[0].length ?? 0
    const line = rawLine.trim()
    const match = line.match(/^([^:]+):\s*(.*)$/)
    if (!match) continue

    const key = match[1].trim()
    const rawValue = match[2].trim()
    while (stack.length > 1 && indent <= stack[stack.length - 1].indent) stack.pop()

    const parent = stack[stack.length - 1].value
    if (!rawValue) {
      const child: Record<string, unknown> = {}
      parent[key] = child
      stack.push({ indent, value: child })
    } else {
      parent[key] = parseScalar(rawValue)
    }
  }

  return root
}

function parseScalar(value: string): string | number | boolean {
  const unquoted = value.replace(/^["']|["']$/g, '')
  if (unquoted === 'true') return true
  if (unquoted === 'false') return false
  if (/^-?\d+(\.\d+)?$/.test(unquoted)) return Number(unquoted)
  return unquoted
}

function section(markdown: string, title: string): string {
  const re = new RegExp(`^#{2,3}\\s+${title}\\b[\\s\\S]*?(?=^#{2,3}\\s+|$)`, 'im')
  return markdown.match(re)?.[0]?.trim() ?? ''
}

function stringValue(value: unknown): string | undefined {
  return typeof value === 'string' ? value : undefined
}

function numberValue(value: unknown): number | undefined {
  if (typeof value === 'number') return value
  if (typeof value === 'string') {
    const parsed = Number(value.replace(/px$/, ''))
    return Number.isFinite(parsed) ? parsed : undefined
  }
  return undefined
}

function objectValue(value: unknown): Record<string, unknown> {
  return value && typeof value === 'object' && !Array.isArray(value)
    ? value as Record<string, unknown>
    : {}
}

function pickColor(colors: Record<string, unknown>, names: string[], fallback: string): string {
  for (const name of names) {
    const value = stringValue(colors[name])
    if (value && HEX_RE.test(value)) {
      HEX_RE.lastIndex = 0
      return value
    }
    HEX_RE.lastIndex = 0
  }
  return fallback
}

function typographyRole(typography: Record<string, unknown>, names: string[]): Record<string, unknown> {
  for (const name of names) {
    const role = objectValue(typography[name])
    if (Object.keys(role).length > 0) return role
  }
  return {}
}

function tokensFromYaml(base: DesignTokens, yaml: ParsedYaml): DesignTokens {
  const colors = objectValue(yaml.colors)
  const typography = objectValue(yaml.typography)
  const rounded = objectValue(yaml.rounded ?? yaml.radius ?? yaml.shape)
  const spacing = objectValue(yaml.spacing)
  const heading = typographyRole(typography, ['h1', 'headline', 'display', 'title'])
  const body = typographyRole(typography, ['body', 'body-md', 'paragraph', 'text'])

  return {
    ...base,
    colors: {
      ...base.colors,
      primary: pickColor(colors, ['primary', 'brand', 'ink'], base.colors.primary),
      secondary: pickColor(colors, ['secondary', 'muted', 'neutral'], base.colors.secondary),
      accent: pickColor(colors, ['accent', 'tertiary', 'cta'], base.colors.accent),
      success: pickColor(colors, ['success'], base.colors.success),
      danger: pickColor(colors, ['danger', 'error'], base.colors.danger),
      warning: pickColor(colors, ['warning'], base.colors.warning),
      bg: pickColor(colors, ['background', 'bg', 'canvas', 'neutral'], base.colors.bg),
      surface: pickColor(colors, ['surface', 'card'], base.colors.surface),
      text: pickColor(colors, ['text', 'foreground', 'ink'], base.colors.text),
      border: pickColor(colors, ['border', 'hairline'], base.colors.border),
    },
    typography: {
      ...base.typography,
      headingFont: stringValue(heading.fontFamily) ?? base.typography.headingFont,
      bodyFont: stringValue(body.fontFamily) ?? stringValue(heading.fontFamily) ?? base.typography.bodyFont,
      fwHeading: numberValue(heading.fontWeight) ?? base.typography.fwHeading,
      fontSize: numberValue(body.fontSize) ?? base.typography.fontSize,
      lineHeight: numberValue(body.lineHeight) ?? base.typography.lineHeight,
    },
    shape: {
      ...base.shape,
      rSm: numberValue(rounded.sm) ?? base.shape.rSm,
      rMd: numberValue(rounded.md) ?? base.shape.rMd,
      rLg: numberValue(rounded.lg) ?? base.shape.rLg,
      rXl: numberValue(rounded.xl) ?? base.shape.rXl,
      sp: numberValue(spacing.base) ?? numberValue(spacing.sm) ?? base.shape.sp,
    },
  }
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

function componentsFromYaml(yaml: ParsedYaml, fallback: ComponentSpec[]): ComponentSpec[] {
  const components = objectValue(yaml.components)
  const entries = Object.entries(components)
  if (entries.length === 0) return fallback

  return entries.map(([id, value]) => {
    const spec = objectValue(value)
    return {
      id,
      name: id.replace(/[-_]/g, ' ').replace(/\b\w/g, char => char.toUpperCase()),
      role: stringValue(spec.role) ?? stringValue(spec.description) ?? 'Imported component rule',
      notes: stringValue(spec.notes) ?? JSON.stringify(spec),
    }
  })
}

function validateDesignMd(yaml: ParsedYaml, body: string): string[] {
  const warnings: string[] = []
  const knownKeys = new Set(['version', 'name', 'description', 'colors', 'typography', 'rounded', 'spacing', 'components'])
  const topKeys = Object.keys(yaml)

  for (const key of topKeys) {
    if (!knownKeys.has(key)) warnings.push(`Unknown top-level front matter key: ${key}`)
  }
  if (topKeys.length > 0 && !yaml.colors) warnings.push('Missing front matter colors section.')
  if (topKeys.length > 0 && !yaml.typography) warnings.push('Missing front matter typography section.')

  for (const expected of ['Overview', 'Colors', 'Typography', 'Components']) {
    if (!section(body, expected)) warnings.push(`Missing Markdown section: ${expected}`)
  }

  const unresolved = body.match(/\{[^}]+\}/g) ?? []
  if (unresolved.length > 0) warnings.push(`Token references detected but not resolved yet: ${Array.from(new Set(unresolved)).join(', ')}`)

  return warnings
}

export function importDesignMd(markdown: string, existing?: DesignSystemDocument): DesignSystemDocument {
  const now = new Date().toISOString()
  const parsed = frontMatter(markdown)
  const yamlName = stringValue(parsed.yaml.name)
  const name = yamlName ?? firstHeading(parsed.body) ?? existing?.name ?? 'Imported design system'
  const baseTokens = existing?.tokens ?? createDefaultTokens()
  const yamlTokens = Object.keys(parsed.yaml).length > 0 ? tokensFromYaml(baseTokens, parsed.yaml) : baseTokens
  const tokens = assignColorsFromHexes(yamlTokens, parsed.body)
  const notes = [
    ...parsed.warnings,
    ...validateDesignMd(parsed.yaml, parsed.body),
    section(parsed.body, 'Overview'),
    section(parsed.body, 'TL;DR'),
    section(parsed.body, 'Role'),
    section(parsed.body, 'Frontend Rules'),
    section(parsed.body, "Do's and Don'ts"),
    section(parsed.body, 'Constraints'),
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
    components: componentsFromYaml(parsed.yaml, existing?.components ?? DEFAULT_COMPONENT_SPECS),
    notes,
  }
}
