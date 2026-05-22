import { useEffect, useState } from 'react'
import { useStore } from '../../store'
import { clsx } from 'clsx'

export function ProjectList() {
  const { docList, currentDoc, loadDocList, newDocument, openDocument, deleteDocument, renameDocument, setProjectListOpen } = useStore()
  const [renamingId, setRenamingId] = useState<string | null>(null)
  const [renameValue, setRenameValue] = useState('')

  useEffect(() => {
    loadDocList()
  }, [loadDocList])

  const handleNew = async () => {
    await newDocument('Untitled design system')
  }

  const handleOpen = (id: string) => {
    if (renamingId) return
    openDocument(id)
  }

  const startRename = (id: string, current: string, e: React.MouseEvent) => {
    e.stopPropagation()
    setRenamingId(id)
    setRenameValue(current)
  }

  const commitRename = async () => {
    if (!renamingId || !renameValue.trim()) { setRenamingId(null); return }
    await renameDocument(renamingId, renameValue.trim())
    setRenamingId(null)
  }

  const handleDelete = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation()
    if (!confirm('Delete this project?')) return
    await deleteDocument(id)
  }

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between px-5 h-11 border-b border-[#e6e4dc] shrink-0">
        <span className="text-[10px] uppercase tracking-widest text-[#737373] font-medium">Systems</span>
        <button
          onClick={() => setProjectListOpen(false)}
          className="text-[#737373] hover:text-[#171717] text-lg leading-none transition-colors"
        >×</button>
      </div>

      <div className="flex-1 overflow-y-auto p-3 space-y-0.5">
        {docList.length === 0 && (
          <p className="text-[#737373] text-[12px] text-center mt-8">No systems yet</p>
        )}
        {docList.map(doc => (
          <div
            key={doc.id}
            onClick={() => handleOpen(doc.id)}
            className={clsx(
              'flex items-center gap-2 px-3 py-2.5 rounded-md cursor-pointer group transition-colors',
              doc.id === currentDoc?.id
                ? 'bg-[#f0efeb] text-[#171717]'
                : 'hover:bg-[#f7f7f4] text-[#4d4d4d]'
            )}
          >
            <div className="flex-1 min-w-0">
              {renamingId === doc.id ? (
                <input
                  autoFocus
                  value={renameValue}
                  onChange={e => setRenameValue(e.target.value)}
                  onBlur={commitRename}
                  onKeyDown={e => { if (e.key === 'Enter') commitRename(); if (e.key === 'Escape') setRenamingId(null) }}
                  onClick={e => e.stopPropagation()}
                  className="w-full bg-white border border-[#2f6f5e] rounded px-1 text-[13px] text-[#171717] outline-none"
                />
              ) : (
                <div className="text-[13px] truncate">{doc.name}</div>
              )}
              <div className="text-[10px] text-[#737373] mt-0.5">
                {new Date(doc.updatedAt).toLocaleDateString()}
              </div>
            </div>
            <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
              <button
                onClick={e => startRename(doc.id, doc.name, e)}
                className="text-[#737373] hover:text-[#4d4d4d] text-[11px] px-1 transition-colors"
                title="Rename"
              >✎</button>
              <button
                onClick={e => handleDelete(doc.id, e)}
                className="text-[#737373] hover:text-[#c2410c] text-[11px] px-1 transition-colors"
                title="Delete"
              >✕</button>
            </div>
          </div>
        ))}
      </div>

      <div className="p-3 border-t border-[#e6e4dc]">
        <button
          onClick={handleNew}
          className="w-full py-2 rounded-md border border-[#e6e4dc] hover:bg-[#f7f7f4] text-[#4d4d4d] text-[12px] font-medium transition-colors"
        >
          + New system
        </button>
      </div>
    </div>
  )
}
