import { useEffect, useRef } from 'react'
import { useStore } from '../../store'
import { buildPreviewHTML } from './previewHTML'

export function PreviewFrame() {
  const iframeRef = useRef<HTMLIFrameElement>(null)
  const { currentDoc, ui } = useStore()

  useEffect(() => {
    const iframe = iframeRef.current
    if (!iframe || !currentDoc) return

    const html = buildPreviewHTML(
      currentDoc.tokens,
      ui.previewSection,
      ui.previewMode
    )

    const doc = iframe.contentDocument || iframe.contentWindow?.document
    if (!doc) return
    doc.open()
    doc.write(html)
    doc.close()
  }, [currentDoc?.tokens, ui.previewSection, ui.previewMode])

  if (!currentDoc) {
    return (
      <div className="flex-1 flex items-center justify-center text-slate-600 text-sm">
        No project open
      </div>
    )
  }

  return (
    <iframe
      ref={iframeRef}
      className="flex-1 w-full border-none bg-white"
      title="preview"
      sandbox="allow-same-origin allow-scripts"
    />
  )
}
