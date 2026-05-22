import { useState } from 'react'
import { useStore } from '../../store'
import { SectionLabel } from '../ui/SectionLabel'

export function SourcePanel() {
  const { currentDoc, importDesignMdSource } = useStore()
  const [value, setValue] = useState(currentDoc?.source.rawDesignMd ?? '')

  if (!currentDoc) return null

  return (
    <div>
      <SectionLabel>DESIGN.md source</SectionLabel>
      <textarea
        value={value}
        onChange={e => setValue(e.target.value)}
        placeholder="# Design System&#10;&#10;## Tokens&#10;primary: #171717"
        className="min-h-80 w-full resize-y rounded-md border border-[#e6e4dc] bg-white px-3 py-2 font-mono text-[11px] leading-5 text-[#171717] outline-none focus:border-[#2f6f5e]"
      />
      <button
        onClick={() => importDesignMdSource(value)}
        disabled={!value.trim()}
        className="mt-3 w-full rounded-lg bg-[#171717] py-2 text-[12px] font-medium text-white transition-colors hover:bg-black disabled:cursor-not-allowed disabled:opacity-40"
      >
        Import DESIGN.md
      </button>
      <div className="mt-4 rounded-md border border-[#e6e4dc] bg-[#f7f7f4] p-3 text-[12px] leading-5 text-[#4d4d4d]">
        <div className="font-medium text-[#171717]">{currentDoc.source.label}</div>
        <div>{currentDoc.source.kind}</div>
        {currentDoc.source.importedAt && <div>{new Date(currentDoc.source.importedAt).toLocaleString()}</div>}
      </div>
    </div>
  )
}
