import { useEffect, useState } from 'react'
import { useStore } from '../../store'
import { clsx } from 'clsx'

export function ProjectList() {
  const { docList, currentDoc, loadDocList, newDocument, openDocument, deleteDocument, renameDocument, setProjectListOpen } = useStore()
  const [renamingId, setRenamingId] = useState<string | null>(null)
  const [renameValue, setRenameValue] = useState('')

  useEffect(() => {
    loadDocList()
  }, [])

  const handleNew = async () => {
    await newDocument('Untitled')
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
      <div className="flex items-center justify-between px-5 py-3 border-b border-slate-700">
        <span className="text-[11px] uppercase tracking-widest text-slate-500">Projects</span>
        <button
          onClick={() => setProjectListOpen(false)}
          className="text-slate-500 hover:text-slate-300 text-lg leading-none"
        >×</button>
      </div>

      <div className="flex-1 overflow-y-auto p-3 space-y-1">
        {docList.length === 0 && (
          <p className="text-slate-600 text-[12px] text-center mt-8">No projects yet</p>
        )}
        {docList.map(doc => (
          <div
            key={doc.id}
            onClick={() => handleOpen(doc.id)}
            className={clsx(
              'flex items-center gap-2 px-3 py-2.5 rounded-md cursor-pointer group transition-colors',
              doc.id === currentDoc?.id
                ? 'bg-slate-700 text-slate-100'
                : 'hover:bg-slate-800 text-slate-300'
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
                  className="w-full bg-slate-900 border border-blue-500 rounded px-1 text-[13px] text-slate-100 outline-none"
                />
              ) : (
                <div className="text-[13px] truncate">{doc.name}</div>
              )}
              <div className="text-[10px] text-slate-600 mt-0.5">
                {new Date(doc.updatedAt).toLocaleDateString()}
              </div>
            </div>
            <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
              <button
                onClick={e => startRename(doc.id, doc.name, e)}
                className="text-slate-500 hover:text-slate-300 text-[11px] px-1"
                title="Rename"
              >✎</button>
              <button
                onClick={e => handleDelete(doc.id, e)}
                className="text-slate-500 hover:text-red-400 text-[11px] px-1"
                title="Delete"
              >✕</button>
            </div>
          </div>
        ))}
      </div>

      <div className="p-3 border-t border-slate-700">
        <button
          onClick={handleNew}
          className="w-full py-2 rounded-md bg-slate-700 hover:bg-slate-600 text-slate-200 text-[12px] font-medium transition-colors"
        >
          + New project
        </button>
      </div>
    </div>
  )
}
