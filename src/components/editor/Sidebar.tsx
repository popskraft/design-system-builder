import { useStore } from '../../store'
import { ColorsPanel } from './ColorsPanel'
import { TypePanel } from './TypePanel'
import { ShapePanel } from './ShapePanel'
import { EffectsPanel } from './EffectsPanel'
import { ProjectList } from './ProjectList'
import { exportCSS } from '../../lib/tokens'
import { clsx } from 'clsx'
import type { EditorTab } from '../../types'

const TABS: { id: EditorTab; label: string }[] = [
  { id: 'colors',  label: 'Colors'  },
  { id: 'type',    label: 'Type'    },
  { id: 'shape',   label: 'Shape'   },
  { id: 'effects', label: 'Effects' },
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
    const css = exportCSS(currentDoc.tokens)
    navigator.clipboard.writeText(css)
      .then(() => showToast('CSS variables copied!'))
      .catch(() => {
        const a = document.createElement('a')
        a.href = 'data:text/css;charset=utf-8,' + encodeURIComponent(css)
        a.download = `${currentDoc.name.toLowerCase().replace(/\s+/g, '-')}-tokens.css`
        a.click()
        showToast('Tokens downloaded!')
      })
  }

  if (ui.projectListOpen) {
    return (
      <aside className="w-[300px] min-w-[300px] bg-slate-800 border-r border-slate-700 flex flex-col h-full overflow-hidden">
        <ProjectList />
      </aside>
    )
  }

  return (
    <aside className="w-[300px] min-w-[300px] bg-slate-800 border-r border-slate-700 flex flex-col h-full overflow-hidden">
      {/* Header */}
      <div className="px-5 py-4 border-b border-slate-700">
        <div className="flex items-start justify-between gap-2">
          <div>
            <h1 className="font-['Syne_Variable',sans-serif] font-bold text-[15px] tracking-wide text-slate-100">
              Design System Builder
            </h1>
            <p className="text-[11px] text-slate-500 mt-0.5">
              {currentDoc ? currentDoc.name : 'No project open'}
            </p>
          </div>
          <button
            onClick={() => setProjectListOpen(true)}
            title="Projects"
            className="text-slate-500 hover:text-slate-300 text-[11px] mt-0.5 transition-colors"
          >
            ⊞
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-slate-700">
        {TABS.map(tab => (
          <button
            key={tab.id}
            onClick={() => setTab(tab.id)}
            className={clsx(
              'flex-1 py-2.5 text-[11px] uppercase tracking-[.03em] transition-colors',
              'focus-visible:outline-none',
              ui.activeTab === tab.id
                ? 'text-slate-100 bg-slate-900 border-b-2 border-blue-500'
                : 'text-slate-500 hover:text-slate-300'
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
            <p className="text-slate-600 text-[13px] mb-4">Open or create a project to start editing.</p>
            <button
              onClick={() => setProjectListOpen(true)}
              className="text-blue-500 text-[12px] hover:underline"
            >
              Open projects →
            </button>
          </div>
        ) : (
          <>
            {ui.activeTab === 'colors'  && <ColorsPanel />}
            {ui.activeTab === 'type'    && <TypePanel />}
            {ui.activeTab === 'shape'   && <ShapePanel />}
            {ui.activeTab === 'effects' && <EffectsPanel />}
          </>
        )}
      </div>

      {/* Footer actions */}
      {currentDoc && (
        <div className="px-5 pb-4 pt-2 space-y-2 border-t border-slate-700">
          <button
            onClick={handleExport}
            className="w-full py-2.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-[12px] font-medium tracking-wide transition-colors"
          >
            Export CSS Variables
          </button>
          <button
            onClick={saveDocument}
            className="w-full py-2 rounded-lg bg-slate-700 hover:bg-slate-600 text-slate-300 text-[12px] transition-colors"
          >
            Save
          </button>
        </div>
      )}
    </aside>
  )
}
