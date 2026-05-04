import { useRef } from 'react'
import { clsx } from 'clsx'

interface Props {
  value: string
  onChange: (value: string) => void
  label?: string
}

export function ColorPicker({ value, onChange, label }: Props) {
  const inputRef = useRef<HTMLInputElement>(null)

  return (
    <div className="flex items-center justify-between gap-2 mb-2.5">
      {label && <span className="text-[12px] text-slate-400 flex-1 whitespace-nowrap">{label}</span>}
      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        className={clsx(
          'flex items-center gap-1.5 px-2 py-1',
          'bg-slate-900 border border-slate-700 rounded-md',
          'hover:border-slate-500 transition-colors cursor-pointer',
          'focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-blue-500'
        )}
      >
        <span
          className="w-5 h-5 rounded flex-shrink-0 border border-white/10"
          style={{ background: value }}
        />
        <span className="text-[11px] text-slate-400 font-mono min-w-[52px]">{value}</span>
        <input
          ref={inputRef}
          type="color"
          value={value}
          onChange={e => onChange(e.target.value)}
          className="sr-only"
          tabIndex={-1}
        />
      </button>
    </div>
  )
}
