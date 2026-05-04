interface Props {
  label: string
  min: number
  max: number
  step?: number
  value: number
  unit?: string
  display?: (v: number) => string
  onChange: (value: number) => void
}

export function Slider({ label, min, max, step = 1, value, unit = 'px', display, onChange }: Props) {
  const shown = display ? display(value) : `${value}${unit}`
  return (
    <div className="flex items-center gap-2 mb-2.5">
      <span className="text-[12px] text-slate-400 flex-1 whitespace-nowrap">{label}</span>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={e => onChange(parseFloat(e.target.value))}
        className="w-[90px] h-[4px] bg-slate-700 rounded appearance-none outline-none
          [&::-webkit-slider-thumb]:appearance-none
          [&::-webkit-slider-thumb]:w-3.5
          [&::-webkit-slider-thumb]:h-3.5
          [&::-webkit-slider-thumb]:rounded-full
          [&::-webkit-slider-thumb]:bg-blue-500
          [&::-webkit-slider-thumb]:border-2
          [&::-webkit-slider-thumb]:border-slate-800
          [&::-webkit-slider-thumb]:cursor-pointer"
        style={{ accentColor: '#3b82f6' }}
      />
      <span className="text-[11px] text-slate-500 min-w-[36px] text-right font-mono">{shown}</span>
    </div>
  )
}
