import { useEffect, useRef } from 'react'
import { useStore } from '../../store'
import { buildPreviewHTML } from './previewHTML'

export function PreviewFrame() {
  const iframeRef = useRef<HTMLIFrameElement>(null)
  const { currentDoc, ui } = useStore()

  // Rebuild HTML when tokens, mode, or doc name change
  useEffect(() => {
    const iframe = iframeRef.current
    if (!iframe || !currentDoc) return

    const html = buildPreviewHTML(currentDoc.tokens, ui.previewMode, currentDoc.name)

    const doc = iframe.contentDocument || iframe.contentWindow?.document
    if (!doc) return
    doc.open()
    doc.write(html)
    doc.close()
  }, [currentDoc, currentDoc?.tokens, ui.previewMode, currentDoc?.name])

  // Scroll to section anchor when previewSection changes
  useEffect(() => {
    const iframe = iframeRef.current
    if (!iframe) return
    const win = iframe.contentWindow
    if (!win) return

    const scrollToAnchor = () => {
      const el = win.document.getElementById(ui.previewSection)
      if (el) el.scrollIntoView({ behavior: 'smooth' })
    }

    // Give the iframe a moment to finish rendering before scrolling
    const timer = setTimeout(scrollToAnchor, 50)
    return () => clearTimeout(timer)
  }, [ui.previewSection])

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
