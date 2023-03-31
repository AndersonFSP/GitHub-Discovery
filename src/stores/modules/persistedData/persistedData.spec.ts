import type { Item } from '@/components/Slide/types'
import { usePersistedData } from '@/stores/modules/persistedData'
import { createPinia, setActivePinia } from 'pinia'
import { KeyTopic } from './types'

const item: Item = {
  image: 'iamge',
  repositoryName: 'repositoryName',
  link: 'link',
  stars: 2,
  forks: 4,
  issues: 5,
  updated: 1,
} 
describe('usePersistedData', () => { 
  beforeEach(() => {
    setActivePinia(createPinia())
  })
  it('should have the correct initial state', () => {
    const  { bookmarks, topics, sorteds } = usePersistedData()
    expect({ bookmarks, topics, sorteds  }).toEqual({ 
      bookmarks: [],
      topics: ['vue', 'javascript'],
      sorteds: { vue: '', javascript: '', typescript: '', go: '', css: '', node: '' }
    })
  })

  it('should add bookmark if it does not exist', () => {
    const  { bookmarks, updateBookmark } = usePersistedData()
    expect(bookmarks).toHaveLength(0)
    updateBookmark(item)
    expect(bookmarks).toHaveLength(1)
  })

  it('should remove bookmark if it exist', () => {
    const  { bookmarks, updateBookmark } = usePersistedData()
    updateBookmark(item)
    expect(bookmarks).toHaveLength(1)
    updateBookmark(item)
    expect(bookmarks).toHaveLength(0)
  })

  it('should find bookmark index', () => {
    const  {updateBookmark, findBookmarkIndex } = usePersistedData()
    updateBookmark(item)
    expect(findBookmarkIndex(item)).toBe(0)
  })

  it('should update topics', () => {
    const  { topics, updateTopicsToShow } = usePersistedData()
    const newTopics = ['new', 'old']
    updateTopicsToShow(newTopics)
    expect(topics).toEqual(topics)
  })

  it('should sorted list', () => {
    const  { updateSorted, sorteds } = usePersistedData()
    const newTopics = ['new', 'old']
    updateSorted(KeyTopic.Go, 'forks')
    expect(sorteds).toEqual({ vue: '', javascript: '', typescript: '', go: 'forks', css: '', node: '' })
  })
})