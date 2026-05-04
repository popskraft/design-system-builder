import { useStore } from '../../store'
import { SectionLabel } from '../ui/SectionLabel'
import { Slider } from '../ui/Slider'

export function ShapePanel() {
  const { currentDoc, setShape } = useStore()
  if (!currentDoc) return null
  const s = currentDoc.tokens.shape

  return (
    <div>
      <SectionLabel>Border radius</SectionLabel>
      <Slider label="Small  (tag, badge)" min={0} max={12}  value={s.rSm}  onChange={v => setShape({ rSm: v })} />
      <Slider label="Medium (input, btn)" min={0} max={24}  value={s.rMd}  onChange={v => setShape({ rMd: v })} />
      <Slider label="Large  (card)"       min={0} max={32}  value={s.rLg}  onChange={v => setShape({ rLg: v })} />
      <Slider label="XL     (modal)"      min={0} max={40}  value={s.rXl}  onChange={v => setShape({ rXl: v })} />

      <SectionLabel>Spacing</SectionLabel>
      <Slider label="Base unit" min={2} max={8} value={s.sp} onChange={v => setShape({ sp: v })} />

      <SectionLabel>Button padding</SectionLabel>
      <Slider label="Horizontal" min={8}  max={40} value={s.btnPx} onChange={v => setShape({ btnPx: v })} />
      <Slider label="Vertical"   min={4}  max={24} value={s.btnPy} onChange={v => setShape({ btnPy: v })} />
    </div>
  )
}
