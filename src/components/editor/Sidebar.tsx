import { useStore } from '../../store'
import { ColorsPanel } from './ColorsPanel'
import { TypePanel } from './TypePanel'
import { ShapePanel } from './ShapePanel'
import { EffectsPanel } from './EffectsPanel'
import { SourcePanel } from './SourcePanel'
import { ExportPanel } from './ExportPanel'
import { ProjectList } from './ProjectList'
import { buildExportPackage } from '../../lib/export/package'
import { clsx } from 'clsx'
import type { EditorTab } from '../../types'

const TABS: { id: EditorTab; label: string }[] = [
  { id: 'source',  label: 'Source'  },
  { id: 'colors',  label: 'Colors'  },
  { id: 'type',    label: 'Type'    },
  { id: 'shape',   label: 'Shape'   },
  { id: 'effects', label: 'Effects' },
  { id: 'export',  label: 'Export'  },
]

export function Sidebar() {
  const {
    currentDoc,
    ui,
    setTab,
    setProjectListOpen,
    showToast,
    saveDocument,
  } = useStore()

  const handleExport = () => {
    if (!currentDoc) return
    const pkg = buildExportPackage(currentDoc)
    navigator.clipboard.writeText(pkg.designMd)
      .then(() => showToast('DESIGN.md copied!'))
      .catch(() => {
        const a = document.createElement('a')
        a.href = 'data:text/markdown;charset=utf-8,' + encodeURIComponent(pkg.designMd)
        a.download = 'DESIGN.md'
        a.click()
        showToast('DESIGN.md downloaded!')
      })
  }

  if (ui.projectListOpen) {
    return (
      <aside className="w-70 min-w-70 bg-white border-r border-[#e6e4dc] flex flex-col h-full overflow-hidden">
        <ProjectList />
      </aside>
    )
  }

  return (
    <aside className="w-70 min-w-70 bg-white border-r border-[#e6e4dc] flex flex-col h-full overflow-hidden">
      {/* Header */}
      <div className="px-5 h-11 flex items-center justify-between border-b border-[#e6e4dc] shrink-0">
        <div className="flex items-center gap-2.5 min-w-0">
          <span className="font-semibold text-[13px] text-[#171717] truncate">
            {currentDoc ? currentDoc.name : 'Design System Builder'}
          </span>
        </div>
        <button
          onClick={() => setProjectListOpen(true)}
          title="Projects"
          className="text-[#737373] hover:text-[#171717] transition-colors text-[18px] leading-none shrink-0 ml-2"
        >
          ⊞
        </button>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-[#e6e4dc] bg-white">
        {TABS.map(tab => (
          <button
            key={tab.id}
            onClick={() => setTab(tab.id)}
            className={clsx(
              'flex-1 py-2.5 text-[11px] uppercase tracking-wider transition-colors',
              'focus-visible:outline-none',
              ui.activeTab === tab.id
                ? 'text-[#171717] border-b-2 border-[#171717] font-medium'
                : 'text-[#737373] hover:text-[#4d4d4d]'
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Panel content */}
      <div className="flex-1 overflow-y-auto px-5 py-4">
        {!currentDoc ? (
          <div className="text-center mt-12">
            <p className="text-[#737373] text-[13px] mb-4">Open or create a project to start.</p>
            <button
              onClick={() => setProjectListOpen(true)}
              className="text-[#2f6f5e] text-[12px] hover:underline"
            >
              Open projects →
            </button>
          </div>
        ) : (
          <>
            {ui.activeTab === 'source'  && <SourcePanel key={currentDoc.id} />}
            {ui.activeTab === 'colors'  && <ColorsPanel />}
            {ui.activeTab === 'type'    && <TypePanel />}
            {ui.activeTab === 'shape'   && <ShapePanel />}
            {ui.activeTab === 'effects' && <EffectsPanel />}
            {ui.activeTab === 'export'  && <ExportPanel />}
          </>
        )}
      </div>

      {/* Footer */}
      {currentDoc && (
        <div className="px-5 pb-4 pt-3 space-y-2 border-t border-[#e6e4dc]">
          <button
            onClick={handleExport}
            className="w-full py-2 rounded-lg bg-[#171717] hover:bg-black text-white text-[12px] font-medium transition-colors"
          >
            Export DESIGN.md
          </button>
          <button
            onClick={saveDocument}
            className="w-full py-2 rounded-lg border border-[#e6e4dc] hover:bg-[#f7f7f4] text-[#4d4d4d] text-[12px] transition-colors"
          >
            Save
          </button>
        </div>
      )}
    </aside>
  )
}
