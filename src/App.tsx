import { useEffect } from 'react'
import { useStore } from './store'
import { LocalStorageAdapter } from './storage/LocalStorageAdapter'
import { Sidebar } from './components/editor/Sidebar'
import { PreviewFrame } from './components/preview/PreviewFrame'
import { clsx } from 'clsx'
import type { PreviewSection } from './types'

const SECTIONS: { id: PreviewSection; label: string }[] = [
  { id: 'overview',   label: 'Overview'   },
  { id: 'typography', label: 'Typography' },
  { id: 'components', label: 'Components' },
  { id: 'layout',     label: 'Layout'     },
]

export default function App() {
  const {
    setAdapter,
    loadDocList,
    newDocument,
    ui,
    setPreviewSection,
    setPreviewMode,
    saveDocument,
    currentDoc,
  } = useStore()

  // Init adapter + auto-load first project
  useEffect(() => {
    const adapter = new LocalStorageAdapter()
    setAdapter(adapter)

    adapter.list().then(async list => {
      if (list.length === 0) {
        await newDocument('My Design System')
      } else {
        await loadDocList()
        const doc = await adapter.load(list[0].id)
        if (doc) useStore.setState({ currentDoc: doc })
      }
    })
  }, [])

  // Auto-save on token change (debounced 800ms)
  useEffect(() => {
    if (!currentDoc) return
    const timer = setTimeout(() => saveDocument(), 800)
    return () => clearTimeout(timer)
  }, [currentDoc?.tokens])

  return (
    <div className="flex h-screen overflow-hidden" style={{ background: '#0f172a' }}>
      <Sidebar />

      {/* Main area */}
      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Preview toolbar */}
        <div className="flex items-center justify-between px-6 h-12 border-b border-slate-800 flex-shrink-0">
          <div className="flex gap-1">
            {SECTIONS.map(s => (
              <button
                key={s.id}
                onClick={() => setPreviewSection(s.id)}
                className={clsx(
                  'px-3.5 py-1.5 text-[11px] rounded-md transition-colors tracking-wide focus-visible:outline-none',
                  ui.previewSection === s.id
                    ? 'bg-slate-700 border border-slate-600 text-slate-100'
                    : 'text-slate-500 hover:text-slate-300 border border-transparent'
                )}
              >
                {s.label}
              </button>
            ))}
          </div>

          <div className="flex bg-slate-800 border border-slate-700 rounded-md overflow-hidden">
            {(['light', 'dark'] as const).map(m => (
              <button
                key={m}
                onClick={() => setPreviewMode(m)}
                className={clsx(
                  'px-3 py-1 text-[11px] transition-colors capitalize',
                  ui.previewMode === m
                    ? 'bg-slate-600 text-slate-100'
                    : 'text-slate-500 hover:text-slate-300'
                )}
              >
                {m}
              </button>
            ))}
          </div>
        </div>

        {/* Preview iframe */}
        <div className="flex-1 overflow-hidden flex flex-col">
          <PreviewFrame />
        </div>
      </div>

      {/* Toast notification */}
      <div
        className={clsx(
          'fixed bottom-6 left-1/2 -translate-x-1/2 z-50',
          'bg-slate-800 border border-slate-600 text-slate-100',
          'px-5 py-2.5 rounded-lg text-[12px] pointer-events-none',
          'transition-all duration-200',
          ui.toast.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
        )}
      >
        {ui.toast.message}
      </div>
    </div>
  )
}
