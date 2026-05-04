import { useStore } from '../../store'
import { SectionLabel } from '../ui/SectionLabel'
import { Slider } from '../ui/Slider'
import { FONT_OPTIONS } from '../../types'

export function TypePanel() {
  const { currentDoc, setTypography } = useStore()
  if (!currentDoc) return null
  const t = currentDoc.tokens.typography

  const selectCls = "w-full bg-slate-900 border border-slate-700 text-slate-200 text-[12px] px-2 py-1.5 rounded-md mb-3 focus:outline-none focus:border-blue-500 cursor-pointer"

  return (
    <div>
      <SectionLabel>Heading font</SectionLabel>
      <select
        className={selectCls}
        value={t.headingFont}
        onChange={e => setTypography({ headingFont: e.target.value })}
      >
        {FONT_OPTIONS.map(f => (
          <option key={f.value} value={f.css}>{f.label}</option>
        ))}
      </select>

      <SectionLabel>Body font</SectionLabel>
      <select
        className={selectCls}
        value={t.bodyFont}
        onChange={e => setTypography({ bodyFont: e.target.value })}
      >
        {FONT_OPTIONS.map(f => (
          <option key={f.value} value={f.css}>{f.label}</option>
        ))}
      </select>

      <SectionLabel>Heading weight</SectionLabel>
      <select
        className={selectCls}
        value={t.fwHeading}
        onChange={e => setTypography({ fwHeading: Number(e.target.value) })}
      >
        {[400, 500, 600, 700, 800, 900].map(w => (
          <option key={w} value={w}>{w}</option>
        ))}
      </select>

      <SectionLabel>Size & spacing</SectionLabel>
      <Slider
        label="Base font size"
        min={12} max={20} value={t.fontSize} unit="px"
        onChange={v => setTypography({ fontSize: v })}
      />
      <Slider
        label="Line height"
        min={10} max={20} step={1} value={Math.round(t.lineHeight * 10)} unit=""
        display={v => (v / 10).toFixed(1)}
        onChange={v => setTypography({ lineHeight: v / 10 })}
      />
    </div>
  )
}
