import type { DesignSystemDocument, ExportPackage } from '../../types'
import { exportCSS } from '../tokens'

export function exportDesignMd(doc: DesignSystemDocument): string {
  const c = doc.tokens.colors
  const t = doc.tokens.typography
  const s = doc.tokens.shape

  return `# ${doc.name}

## Role

This file is the AI-readable design contract for this project.

## Source

- Kind: ${doc.source.kind}
- Label: ${doc.source.label}
- Updated: ${doc.updatedAt}

## Tokens

\`\`\`yaml
color:
  primary: "${c.primary}"
  secondary: "${c.secondary}"
  accent: "${c.accent}"
  success: "${c.success}"
  danger: "${c.danger}"
  warning: "${c.warning}"
  background: "${c.bg}"
  surface: "${c.surface}"
  text: "${c.text}"
  border: "${c.border}"
typography:
  headingFont: ${t.headingFont}
  bodyFont: ${t.bodyFont}
  headingWeight: ${t.fwHeading}
  baseSize: ${t.fontSize}px
  lineHeight: ${t.lineHeight}
shape:
  radiusSmall: ${s.rSm}px
  radiusMedium: ${s.rMd}px
  radiusLarge: ${s.rLg}px
  radiusXL: ${s.rXl}px
  spacingUnit: ${s.sp}px
\`\`\`

## Components

${doc.components.map(component => `- ${component.name}: ${component.role}. ${component.notes}`).join('\n')}

## Frontend Rules

- Bind UI to semantic tokens before primitive values.
- Validate empty, loading, error, success, dense data, mobile, and focus states.
- Keep touch targets at least 44px on touch surfaces.
- Do not copy brand identity from external references unless this project is that brand.
`
}

export function exportContract(doc: DesignSystemDocument): string {
  return JSON.stringify({
    format: 'popskraft-target-design-contract',
    schemaVersion: 1,
    updatedAt: doc.updatedAt,
    source: {
      kind: doc.source.kind,
      label: doc.source.label,
    },
    readModel: {
      entrypoint: 'DESIGN.md',
      fallbackEntrypoint: 'DESIGN.contract.json',
      precedence: [
        'explicit user instruction',
        'target project local canon',
        'DESIGN.md',
        'DESIGN.contract.json',
        'tokens.css',
        'tokens.json',
      ],
    },
    outputs: ['DESIGN.md', 'DESIGN.contract.json', 'tokens.css', 'tokens.json'],
  }, null, 2)
}

export function exportTokensJson(doc: DesignSystemDocument): string {
  return JSON.stringify({
    schemaVersion: 1,
    name: doc.name,
    updatedAt: doc.updatedAt,
    tokens: doc.tokens,
  }, null, 2)
}

export function buildExportPackage(doc: DesignSystemDocument): ExportPackage {
  return {
    designMd: exportDesignMd(doc),
    contractJson: exportContract(doc),
    tokensCss: exportCSS(doc.tokens),
    tokensJson: exportTokensJson(doc),
  }
}
