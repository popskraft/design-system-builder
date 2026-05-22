import { useMemo, useState } from 'react'
import { useStore } from '../../store'
import { SectionLabel } from '../ui/SectionLabel'
import { buildExportPackage } from '../../lib/export/package'
import type { ExportPackage } from '../../types'

type ExportKey = keyof ExportPackage

const EXPORTS: { id: ExportKey; label: string; filename: string }[] = [
  { id: 'designMd', label: 'DESIGN.md', filename: 'DESIGN.md' },
  { id: 'contractJson', label: 'DESIGN.contract.json', filename: 'DESIGN.contract.json' },
  { id: 'tokensCss', label: 'tokens.css', filename: 'tokens.css' },
  { id: 'tokensJson', label: 'tokens.json', filename: 'tokens.json' },
]

function download(filename: string, content: string) {
  const a = document.createElement('a')
  a.href = 'data:text/plain;charset=utf-8,' + encodeURIComponent(content)
  a.download = filename
  a.click()
}

export function ExportPanel() {
  const { currentDoc, showToast } = useStore()
  const [active, setActive] = useState<ExportKey>('designMd')
  const pkg = useMemo(() => currentDoc ? buildExportPackage(currentDoc) : null, [currentDoc])

  if (!currentDoc || !pkg) return null

  const selected = EXPORTS.find(item => item.id === active) ?? EXPORTS[0]

  const copy = () => {
    navigator.clipboard.writeText(pkg[active])
      .then(() => showToast(`${selected.label} copied`))
      .catch(() => {
        download(selected.filename, pkg[active])
        showToast(`${selected.label} downloaded`)
      })
  }

  return (
    <div>
      <SectionLabel>Export package</SectionLabel>
      <div className="mb-3 grid grid-cols-2 gap-1.5">
        {EXPORTS.map(item => (
          <button
            key={item.id}
            onClick={() => setActive(item.id)}
            className={`rounded-md border px-2 py-1.5 text-[11px] transition-colors ${
              active === item.id
                ? 'border-[#171717] bg-[#171717] text-white'
                : 'border-[#e6e4dc] bg-white text-[#4d4d4d] hover:bg-[#f7f7f4]'
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>
      <textarea
        readOnly
        value={pkg[active]}
        className="min-h-96 w-full resize-y rounded-md border border-[#e6e4dc] bg-white px-3 py-2 font-mono text-[11px] leading-5 text-[#171717] outline-none"
      />
      <button
        onClick={copy}
        className="mt-3 w-full rounded-lg bg-[#171717] py-2 text-[12px] font-medium text-white transition-colors hover:bg-black"
      >
        Copy / Download
      </button>
    </div>
  )
}
