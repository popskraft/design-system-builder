import { useStore } from '../../store'
import { ColorPicker } from '../ui/ColorPicker'
import { SectionLabel } from '../ui/SectionLabel'
import { COLOR_PALETTES, THEME_PRESETS } from '../../types'
import type { ColorTokens } from '../../types'
import { clsx } from 'clsx'

export function ColorsPanel() {
  const { currentDoc, setColors, applyTheme } = useStore()
  if (!currentDoc) return null
  const colors = currentDoc.tokens.colors

  const update = (key: keyof ColorTokens) => (value: string) =>
    setColors({ [key]: value })

  return (
    <div>
      {/* Quick palettes */}
      <SectionLabel>Quick palettes</SectionLabel>
      <div className="flex gap-1.5 mb-4 flex-wrap">
        {COLOR_PALETTES.map(p => (
          <button
            key={p.name}
            title={p.name}
            onClick={() => setColors(p)}
            className={clsx(
              'w-7 h-7 rounded-md border border-white/10 cursor-pointer',
              'transition-transform hover:scale-110 hover:border-white/30',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500'
            )}
            style={{ background: p.primary }}
          />
        ))}
      </div>

      {/* Theme presets */}
      <SectionLabel>Theme preset</SectionLabel>
      <select
        className="w-full bg-slate-900 border border-slate-700 text-slate-200 text-[12px] px-2 py-1.5 rounded-md mb-4 focus:outline-none focus:border-blue-500 cursor-pointer"
        defaultValue=""
        onChange={e => {
          const preset = THEME_PRESETS[e.target.value]
          if (preset) applyTheme(preset)
          e.target.value = ''
        }}
      >
        <option value="" disabled>— Apply preset —</option>
        <option value="clean">Clean Light</option>
        <option value="dark">Dark Mode</option>
        <option value="fintech">Fintech Bold</option>
        <option value="ecom">E-commerce Warm</option>
        <option value="saas">SaaS Blue</option>
        <option value="luxury">Luxury Dark</option>
        <option value="organic">Organic Earth</option>
      </select>

      <SectionLabel>Primary</SectionLabel>
      <ColorPicker label="Color" value={colors.primary} onChange={update('primary')} />

      <SectionLabel>Secondary</SectionLabel>
      <ColorPicker label="Color" value={colors.secondary} onChange={update('secondary')} />

      <SectionLabel>Accent / CTA</SectionLabel>
      <ColorPicker label="Color" value={colors.accent} onChange={update('accent')} />

      <SectionLabel>Status</SectionLabel>
      <ColorPicker label="Success" value={colors.success} onChange={update('success')} />
      <ColorPicker label="Danger"  value={colors.danger}  onChange={update('danger')} />
      <ColorPicker label="Warning" value={colors.warning} onChange={update('warning')} />

      <SectionLabel>Surface</SectionLabel>
      <ColorPicker label="Background" value={colors.bg}      onChange={update('bg')} />
      <ColorPicker label="Surface"    value={colors.surface} onChange={update('surface')} />
      <ColorPicker label="Text"       value={colors.text}    onChange={update('text')} />
      <ColorPicker label="Border"     value={colors.border}  onChange={update('border')} />
    </div>
  )
}
