import { defineStore } from 'pinia'
import type { Item } from '@/components/Slide/types'
import type { KeyTopic, PersistedState } from './types'

export const usePersistedData = defineStore('persistedData', {
  state: (): PersistedState => ({
    bookmarks: [],
    topics: ['vue', 'javascript'],
    sorteds: { vue: '', javascript: '', typescript: '', go: '', css: '', node: '' }
  }),
  actions: {
    findBookmarkIndex(item: Item) {
      return this.bookmarks.findIndex((bookmark) => bookmark.repositoryName === item.repositoryName)
    },
    updateBookmark(item: Item) {
      const bookmarkIndex = this.findBookmarkIndex(item)
      if (bookmarkIndex === -1) this.bookmarks.push(item)
      else this.bookmarks.splice(bookmarkIndex, 1)
    },
    updateTopicsToShow(topics: string[]) {
      this.topics = topics
    },
    updateSorted(key: KeyTopic, sorted: string) {
      this.sorteds[key] = sorted
    }
  },
  persist: true
})
