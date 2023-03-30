<template>
  <section>
    <Slide title="My Bookmarks" :items="bookmarks" :sortedDropdown="false" />
    <FilterList
      title="Toggle topics to show"
      :checked="checked"
      :options="options"
      @on-change="updateFilter"
    />
    <Slide
      v-for="slide in filteredSlides"
      :key="slide.key"
      :title="slide.title"
      :items="slide.items"
    />
  </section>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue'
import FilterList from '@/components/FilterList/FilterList.vue'
import Slide from '@/components/Slide/Slide.vue'
import { usePersistedData } from '@/stores/modules/persistedData'

const { bookmarks } = usePersistedData()
const checkedNames = ref([])
const options = [
  { label: 'Vue', value: 'vue' },
  { label: 'Typescript', value: 'typescript' },
  { label: 'Javascript', value: 'javascript' },
  { label: 'Go', value: 'go' },
  { label: 'CSS', value: 'css' },
  { label: 'Node', value: 'node' }
]
const updateFilter = (value: string[]) => {
  checkedNames.value = value
}

const filteredSlides = computed(() =>
  slides.filter((slide) => checkedNames.value.includes(slide.key) === true)
)

const checked = computed(() => ['vue', 'javascript'])
const repositories = [
  {
    image:
      'https://i0.wp.com/multarte.com.br/wp-content/uploads/2015/08/imagens-amor.jpg?w=1392&ssl=1',
    repositoryName: 'Awesome vue',
    link: 'https://github.com/vuejs/awesome-vue#official-resources',
    stars: 3,
    forks: 5,
    issues: 34,
    updated: 100
  },
  {
    image:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQoT0S6gQIb-gIuw0w5euprhZIFOcxpSPZxcg&usqp=CAU',
    repositoryName: 'Core',
    link: 'https://github.com/vuejs/core',
    stars: 1,
    forks: 6,
    issues: 30,
    updated: 12
  },
  {
    image:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSXcCM6YLBtecgeb3jK-k-l1yeSsQlB230RVw&usqp=CAU',
    repositoryName: 'Vue-Testing-Library',
    link: 'https://github.com/testing-library/vue-testing-library',
    stars: 2,
    forks: 36,
    issues: 13,
    updated: 34
  },
  {
    image:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRaRWxdTa1CU2PCULIc06X-pzoRPn-WwNeR7Q&usqp=CAU',
    repositoryName: 'Nome 4',
    link: 'https://github.com/pagekit/pagekit',
    stars: 5,
    forks: 61,
    issues: 31,
    updated: 61
  },
  {
    image:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYTNdMaMnbLI8TgXSSB6Xubpwa4b-tGHJtfw&usqp=CAU',
    repositoryName: 'Nome 5',
    link: 'https://github.com/vuejs/vuepress',
    stars: 15,
    forks: 23,
    issues: 38,
    updated: 1
  },
  {
    image:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTM3gIx4azXeLcVkIDnsDRalHYh-3Bv7nNkow&usqp=CAU',
    repositoryName: 'Nome 6',
    link: 'https://github.com/pagekit/pagekit',
    stars: 6,
    forks: 132,
    issues: 31,
    updated: 21
  },
  {
    image:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTCx9C7lXBtSoCVaykT67npgNZJrg6sa56XWA&usqp=CAU',
    repositoryName: 'Nome 7',
    link: 'https://github.com/pagekit/pagekit',
    stars: 7,
    forks: 90,
    issues: 12,
    updated: 71
  },
  {
    image:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQGnfphcZ2DmJT_4Bn7iVuVQsZMSM8ycQOY-g&usqp=CAU',
    repositoryName: 'Nome 8',
    link: 'https://github.com/pagekit/pagekit',
    stars: 20,
    forks: 54,
    issues: 3,
    updated: 292
  },
  {
    image:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSrvPU4l4aim6rcaNCdAlvktJY2fmFjuxRKvg&usqp=CAU',
    repositoryName: 'Nome 9',
    link: 'https://github.com/pagekit/pagekit',
    stars: 9,
    forks: 51
  },
  {
    image:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQd8qKdmXz1wjg6nyuTL1s94Y3D3ukbo3Ubew&usqp=CAU',
    repositoryName: 'Nome 10',
    link: 'https://github.com/pagekit/pagekit',
    stars: 10,
    forks: 14,
    issues: 4,
    updated: 1
  },
  {
    image:
      'https://www.slideteam.net/media/catalog/product/cache/1280x720/e/m/employee_development_plan_to_employee_professional_growth_ppt_background_slide01.jpg',
    repositoryName: 'Nome 11',
    link: 'https://github.com/pagekit/pagekit',
    stars: 11,
    forks: 513
  },
  {
    image:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQN3-avbeaUP0UxtRhrjmZH6PgSB3d_qYA7cA&usqp=CAU',
    repositoryName: 'Nome 2',
    link: 'https://github.com/pagekit/pagekit',
    stars: 12,
    forks: 94
  },
  {
    image:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRmK2OqG6zAD8kOG-ElcMScsSnrxIJyMqxrwg&usqp=CAU',
    repositoryName: 'Nome 2',
    link: 'https://github.com/pagekit/pagekit',
    stars: 13,
    forks: 74
  },
  {
    image:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR5Ca2olKSC2f1qC-CE-cBhdCWaeDA99AKS0y0_XYhhhBM3z9HTsNscD7DaJdSozTjS_hA&usqp=CAU',
    repositoryName: 'Nome 2',
    link: 'https://github.com/pagekit/pagekit',
    stars: 14,
    forks: 2,
    issues: 10,
    updated: 41
  }
]
const slides = [
  {
    title: 'Vue',
    key: 'vue',
    items: repositories
  },
  {
    title: 'Javascript',
    key: 'javascript',
    items: repositories
  },
  {
    title: 'Typescript',
    key: 'typescript',
    items: repositories
  }
]
</script>

<style scoped lang="less">
section {
  margin: @size-spacing-6;
}
</style>
