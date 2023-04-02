import type { Item } from '@/components/Slide/types'

export interface PersistedState {
  bookmarks: Item[]
  topics: string[]
  sorteds: {
    vue: string
    javascript: string
    typescript: string
    go: string
    css: string
    node: string
  }
}

export enum KeyTopic {
  Vue = 'vue',
  Javascript = 'javascript',
  Typescript = 'typescript',
  Go = 'go',
  Css = 'css',
  Node = 'node'
}
