<template>
  <section>
    <Slide title="My Bookmarks" size="sm" :items="bookmarks" :sortedDropdown="false" />
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
import FilterList from '@/components/FilterList/FilterList.vue'
import Slide from '@/components/Slide/Slide.vue'
import { usePersistedData } from '@/stores/modules/persistedData'
import { KeyTopic } from '@/stores/modules/persistedData/types'
import { repositories } from '@/views/mocks/Discovery'

const { bookmarks, topics, updateTopicsToShow } = usePersistedData()
const checkedNames = ref([])
const options = [
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
    key: KeyTopic.Vue,
    items: [...repositories.vue]
  },
  {
    title: 'Javascript',
    key: KeyTopic.Javascript,
    items: [...repositories.vue]
  },
  {
    title: 'Typescript',
    key: KeyTopic.Typescript,
    items: [...repositories.vue]
  },
  {
    title: 'Go',
    key: KeyTopic.Go,
    items: [...repositories.vue]
  },
  {
    title: 'CSS',
    key: KeyTopic.Css,
    items: [...repositories.vue]
  },
  {
    title: 'Node',
    key: KeyTopic.Node,
    items: [...repositories.vue]
  }
]
</script>

<style scoped lang="less">
section {
  margin: @size-spacing-6 6%;
}
</style>
