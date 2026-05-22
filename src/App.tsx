import { useEffect } from 'react'
import { useStore } from './store'
import { LocalStorageAdapter } from './storage/LocalStorageAdapter'
import { createDocument } from './lib/defaults'
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
    ui,
    setPreviewSection,
    setPreviewMode,
    saveDocument,
    currentDoc,
  } = useStore()

  useEffect(() => {
    const adapter = new LocalStorageAdapter()
    setAdapter(adapter)

    adapter.list().then(async list => {
      if (list.length === 0) {
        const doc = createDocument('Universal design system')
        await adapter.save(doc)
        useStore.setState({ currentDoc: doc })
        await loadDocList()
      } else {
        await loadDocList()
        const doc = await adapter.load(list[0].id)
        if (doc) useStore.setState({ currentDoc: doc })
      }
    })
  }, [loadDocList, setAdapter])

  useEffect(() => {
    if (!currentDoc) return
    const timer = setTimeout(() => saveDocument(), 800)
    return () => clearTimeout(timer)
  }, [currentDoc, currentDoc?.tokens, saveDocument])

  return (
    <div className="flex h-screen overflow-hidden bg-[#f7f7f4]">
      <Sidebar />

      {/* Main area */}
      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Preview toolbar */}
        <div className="flex items-center justify-between px-5 h-11 border-b border-[#e6e4dc] bg-white flex-shrink-0">
          <div className="flex gap-0.5">
            {SECTIONS.map(s => (
              <button
                key={s.id}
                onClick={() => setPreviewSection(s.id)}
                className={clsx(
                  'px-3 py-1.5 text-[12px] rounded-md transition-colors focus-visible:outline-none',
                  ui.previewSection === s.id
                    ? 'bg-[#f0efeb] text-[#171717] font-medium'
                    : 'text-[#737373] hover:text-[#171717] hover:bg-[#f7f7f4]'
                )}
              >
                {s.label}
              </button>
            ))}
          </div>

          <div className="flex bg-[#f0efeb] rounded-md p-0.5 gap-0.5">
            {(['light', 'dark'] as const).map(m => (
              <button
                key={m}
                onClick={() => setPreviewMode(m)}
                className={clsx(
                  'px-3 py-1 text-[12px] rounded transition-colors capitalize',
                  ui.previewMode === m
                    ? 'bg-white text-[#171717] shadow-sm'
                    : 'text-[#737373] hover:text-[#171717]'
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
          'bg-[#171717] text-white',
          'px-4 py-2 rounded-lg text-[12px] pointer-events-none',
          'transition-all duration-200',
          ui.toast.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
        )}
      >
        {ui.toast.message}
      </div>
    </div>
  )
}
