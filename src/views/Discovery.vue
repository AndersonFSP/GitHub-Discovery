<template>
  <section>
    <Slide
      title="My Bookmarks"
      :size="bookmarkSlideSize"
      :items="bookmarks"
      :sortedDropdown="false"
    />
    <FilterList
      title="Toggle topics to show"
      :checked="topics"
      :options="options"
      @on-change="updateFilter"
    />
    <Slide
      v-for="slide in filteredSlides"
      :key="slide.key"
      :title="slide.title"
      :items="slide.items"
      :keyTopic="slide.key"
    />
  </section>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue'
import { FilterList, Slide } from '@/components'
import { usePersistedData } from '@/stores/modules/persistedData'
import { repositories } from '@/views/mocks/Discovery'
import { SlideSize } from '../components/Slide/types'
import type { FilterListOption } from '@/components/FilterList/types'

const { bookmarks, topics, updateTopicsToShow } = usePersistedData()
const checkedNames = ref<string[]>([])
const bookmarkSlideSize = SlideSize.Small
const options: FilterListOption[] = [
  { label: 'Vue', value: 'vue' },
  { label: 'Javascript', value: 'javascript' },
  { label: 'Typescript', value: 'typescript' },
  { label: 'Go', value: 'go' },
  { label: 'CSS', value: 'css' },
  { label: 'Node', value: 'node' }
]
const updateFilter = (value: string[]) => {
  checkedNames.value = value
  updateTopicsToShow(value)
}

const filteredSlides = computed(() =>
  slides.filter((slide) => checkedNames.value.includes(slide.key) === true)
)

const slides = [
  {
    title: 'Vue',
    key: 'vue',
    items: [...repositories.vue]
  },
  {
    title: 'Javascript',
    key: 'javascript',
    items: [...repositories.javascript]
  },
  {
    title: 'Typescript',
    key: 'typescript',
    items: [...repositories.typescript]
  },
  {
    title: 'Go',
    key: 'go',
    items: [...repositories.go]
  },
  {
    title: 'CSS',
    key: 'css',
    items: [...repositories.css]
  },
  {
    title: 'Node',
    key: 'node',
    items: [...repositories.node]
  }
]
</script>

<style scoped lang="less">
section {
  margin: @size-spacing-6 6%;
}
</style>
