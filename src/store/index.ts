import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'
import type {
  DesignSystemDocument,
  DocumentMeta,
  StorageAdapter,
  EditorTab,
  PreviewSection,
  PreviewMode,
  DesignTokens,
  ColorTokens,
  TypographyTokens,
  ShapeTokens,
  EffectsTokens,
} from '../types'
import { createDocument } from '../lib/defaults'

interface UIState {
  activeTab: EditorTab
  previewSection: PreviewSection
  previewMode: PreviewMode
  projectListOpen: boolean
  isLoading: boolean
  toast: { message: string; visible: boolean }
}

interface AppState {
  // Storage
  adapter: StorageAdapter | null

  // Documents
  currentDoc: DesignSystemDocument | null
  docList: DocumentMeta[]

  // UI
  ui: UIState

  // Actions — adapter
  setAdapter(adapter: StorageAdapter): void

  // Actions — documents
  loadDocList(): Promise<void>
  newDocument(name?: string): Promise<void>
  openDocument(id: string): Promise<void>
  saveDocument(): Promise<void>
  deleteDocument(id: string): Promise<void>
  renameDocument(id: string, name: string): Promise<void>

  // Actions — tokens
  setColors(colors: Partial<ColorTokens>): void
  setTypography(typo: Partial<TypographyTokens>): void
  setShape(shape: Partial<ShapeTokens>): void
  setEffects(effects: Partial<EffectsTokens>): void
  applyTheme(tokens: Partial<DesignTokens>): void

  // Actions — UI
  setTab(tab: EditorTab): void
  setPreviewSection(section: PreviewSection): void
  setPreviewMode(mode: PreviewMode): void
  setProjectListOpen(open: boolean): void
  showToast(message: string): void
}

export const useStore = create<AppState>()(
  immer((set, get) => ({
    adapter: null,
    currentDoc: null,
    docList: [],
    ui: {
      activeTab: 'colors',
      previewSection: 'overview',
      previewMode: 'light',
      projectListOpen: false,
      isLoading: false,
      toast: { message: '', visible: false },
    },

    setAdapter(adapter) {
      set(s => { s.adapter = adapter })
    },

    async loadDocList() {
      const { adapter } = get()
      if (!adapter) return
      const list = await adapter.list()
      set(s => { s.docList = list })
    },

    async newDocument(name = 'Untitled') {
      const { adapter } = get()
      if (!adapter) return
      const doc = createDocument(name)
      await adapter.save(doc)
      set(s => {
        s.currentDoc = doc
        s.ui.projectListOpen = false
      })
      await get().loadDocList()
    },

    async openDocument(id) {
      const { adapter } = get()
      if (!adapter) return
      set(s => { s.ui.isLoading = true })
      const doc = await adapter.load(id)
      set(s => {
        if (doc) s.currentDoc = doc
        s.ui.isLoading = false
        s.ui.projectListOpen = false
      })
    },

    async saveDocument() {
      const { adapter, currentDoc } = get()
      if (!adapter || !currentDoc) return
      await adapter.save(currentDoc)
      await get().loadDocList()
    },

    async deleteDocument(id) {
      const { adapter, currentDoc } = get()
      if (!adapter) return
      await adapter.delete(id)
      if (currentDoc?.id === id) {
        set(s => { s.currentDoc = null })
      }
      await get().loadDocList()
    },

    async renameDocument(id, name) {
      const { adapter } = get()
      if (!adapter) return
      const doc = await adapter.load(id)
      if (!doc) return
      doc.name = name
      await adapter.save(doc)
      set(s => {
        if (s.currentDoc?.id === id) s.currentDoc.name = name
      })
      await get().loadDocList()
    },

    setColors(colors) {
      set(s => {
        if (!s.currentDoc) return
        Object.assign(s.currentDoc.tokens.colors, colors)
      })
      // Auto-save debounce handled by effect in App
    },

    setTypography(typo) {
      set(s => {
        if (!s.currentDoc) return
        Object.assign(s.currentDoc.tokens.typography, typo)
      })
    },

    setShape(shape) {
      set(s => {
        if (!s.currentDoc) return
        Object.assign(s.currentDoc.tokens.shape, shape)
      })
    },

    setEffects(effects) {
      set(s => {
        if (!s.currentDoc) return
        Object.assign(s.currentDoc.tokens.effects, effects)
      })
    },

    applyTheme(tokens) {
      set(s => {
        if (!s.currentDoc) return
        if (tokens.colors) Object.assign(s.currentDoc.tokens.colors, tokens.colors)
        if (tokens.typography) Object.assign(s.currentDoc.tokens.typography, tokens.typography)
        if (tokens.shape) Object.assign(s.currentDoc.tokens.shape, tokens.shape)
        if (tokens.effects) Object.assign(s.currentDoc.tokens.effects, tokens.effects)
      })
    },

    setTab(tab) { set(s => { s.ui.activeTab = tab }) },
    setPreviewSection(section) { set(s => { s.ui.previewSection = section }) },
    setPreviewMode(mode) { set(s => { s.ui.previewMode = mode }) },
    setProjectListOpen(open) { set(s => { s.ui.projectListOpen = open }) },

    showToast(message) {
      set(s => { s.ui.toast = { message, visible: true } })
      setTimeout(() => set(s => { s.ui.toast.visible = false }), 2200)
    },
  }))
)
