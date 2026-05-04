import type { StorageAdapter, DesignSystemDocument, DocumentMeta } from '../types'

const PREFIX = 'dsb:doc:'
const INDEX_KEY = 'dsb:index'

type DocIndex = { ids: string[] }

function migrate(raw: unknown): DesignSystemDocument {
  // Future migrations go here. For now, cast if version matches.
  const doc = raw as DesignSystemDocument
  if (doc?.version !== 1) {
    throw new Error(`Unknown document version: ${(raw as { version?: unknown })?.version}`)
  }
  return doc
}

export class LocalStorageAdapter implements StorageAdapter {
  async load(id: string): Promise<DesignSystemDocument | null> {
    try {
      const raw = localStorage.getItem(PREFIX + id)
      if (!raw) return null
      return migrate(JSON.parse(raw))
    } catch {
      return null
    }
  }

  async save(doc: DesignSystemDocument): Promise<void> {
    doc.updatedAt = new Date().toISOString()
    localStorage.setItem(PREFIX + doc.id, JSON.stringify(doc))
    // Update index
    const index = this.readIndex()
    if (!index.ids.includes(doc.id)) {
      index.ids.push(doc.id)
      this.writeIndex(index)
    }
  }

  async list(): Promise<DocumentMeta[]> {
    const index = this.readIndex()
    const metas: DocumentMeta[] = []
    for (const id of index.ids) {
      const raw = localStorage.getItem(PREFIX + id)
      if (!raw) continue
      try {
        const doc = migrate(JSON.parse(raw))
        metas.push({ id: doc.id, name: doc.name, updatedAt: doc.updatedAt })
      } catch {
        // skip corrupt entries
      }
    }
    return metas.sort((a, b) => b.updatedAt.localeCompare(a.updatedAt))
  }

  async delete(id: string): Promise<void> {
    localStorage.removeItem(PREFIX + id)
    const index = this.readIndex()
    index.ids = index.ids.filter(i => i !== id)
    this.writeIndex(index)
  }

  private readIndex(): DocIndex {
    try {
      const raw = localStorage.getItem(INDEX_KEY)
      return raw ? JSON.parse(raw) : { ids: [] }
    } catch {
      return { ids: [] }
    }
  }

  private writeIndex(index: DocIndex): void {
    localStorage.setItem(INDEX_KEY, JSON.stringify(index))
  }
}
