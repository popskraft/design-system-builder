import { useStore } from '../../store'
import { SectionLabel } from '../ui/SectionLabel'
import { Slider } from '../ui/Slider'
import type { EffectsTokens } from '../../types'

const BORDER_STYLES: { label: string; value: EffectsTokens['borderStyle'] }[] = [
  { label: 'Solid 1px',  value: '1px solid' },
  { label: 'Dashed 1px', value: '1px dashed' },
  { label: 'Solid 2px',  value: '2px solid' },
  { label: 'None',       value: '0px solid' },
]

export function EffectsPanel() {
  const { currentDoc, setEffects } = useStore()
  if (!currentDoc) return null
  const e = currentDoc.tokens.effects

  const selectCls = "w-full bg-white border border-[#e6e4dc] text-[#4d4d4d] text-[12px] px-2 py-1.5 rounded-md mb-3 focus:outline-none focus:border-[#2f6f5e] cursor-pointer"

  return (
    <div>
      <SectionLabel>Shadow intensity</SectionLabel>
      <Slider
        label="Depth"
        min={0} max={30} unit="" value={e.shadowIntensity}
        onChange={v => setEffects({ shadowIntensity: v })}
      />

      <SectionLabel>Borders</SectionLabel>
      <select
        className={selectCls}
        value={e.borderStyle}
        onChange={ev => setEffects({ borderStyle: ev.target.value as EffectsTokens['borderStyle'] })}
      >
        {BORDER_STYLES.map(b => (
          <option key={b.value} value={b.value}>{b.label}</option>
        ))}
      </select>
    </div>
  )
}
