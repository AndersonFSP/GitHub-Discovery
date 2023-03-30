import { defineStore } from 'pinia'
import type { Item } from '@/components/Slide/types'
import type { PersistedState } from './types'

export const usePersistedData = defineStore('persistedData', {
  state: (): PersistedState => ({
    bookmarks: [],
    topics: ['vue', 'javascript'],
    sorted: { }
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
    }
  },
  persist: true
})
