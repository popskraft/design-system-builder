import type { DesignSystemDocument, ExportPackage } from '../../types'
import { exportCSS } from '../tokens'

export function exportDesignMd(doc: DesignSystemDocument): string {
  const c = doc.tokens.colors
  const t = doc.tokens.typography
  const s = doc.tokens.shape

  return `---
version: alpha
name: ${doc.name}
description: AI-readable design system exported from Popskraft Design System Knowledge Core.
colors:
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
  h1:
    fontFamily: ${t.headingFont}
    fontSize: 48px
    fontWeight: ${t.fwHeading}
    lineHeight: 1.1
  body:
    fontFamily: ${t.bodyFont}
    fontSize: ${t.fontSize}px
    fontWeight: 400
    lineHeight: ${t.lineHeight}
rounded:
  sm: ${s.rSm}px
  md: ${s.rMd}px
  lg: ${s.rLg}px
  xl: ${s.rXl}px
spacing:
  base: ${s.sp}px
  xs: ${s.sp}px
  sm: ${s.sp * 2}px
  md: ${s.sp * 4}px
  lg: ${s.sp * 6}px
components:
${doc.components.map(component => `  ${component.id}:
    role: ${component.role}
    notes: ${component.notes}`).join('\n')}
---

# ${doc.name}

## Overview

This file is the AI-readable design contract for this project.

## Source

- Kind: ${doc.source.kind}
- Label: ${doc.source.label}
- Updated: ${doc.updatedAt}

## Colors

Use primary color for core actions and identity. Use secondary for support UI, accent for selective emphasis, background and surface for layout layers, text for readable content, and border for separation.

## Typography

Headings use ${t.headingFont} at weight ${t.fwHeading}. Body text uses ${t.bodyFont} at ${t.fontSize}px with ${t.lineHeight} line height.

## Layout

Use a ${s.sp}px spacing base with consistent grouping, visible hierarchy, and responsive layout behavior.

## Elevation & Depth

Use borders and shadows intentionally. Avoid decorative depth that does not communicate interaction or hierarchy.

## Shapes

Use ${s.rMd}px as the default control radius, ${s.rLg}px for cards, and ${s.rXl}px for larger panels.

## Components

${doc.components.map(component => `- ${component.name}: ${component.role}. ${component.notes}`).join('\n')}

## Do's and Don'ts

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
