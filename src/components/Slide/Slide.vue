<template>
  <div class="movie-slide">
    <DropdownList :title="title" :options="options" @on-change="updateSortOption" />
    <button class="movie-slide-button movie-slide-prev" @click="scrollLeft">
      <i class="fa fa-chevron-left"></i>
    </button>
    <button class="movie-slide-button movie-slide-next" @click="scrollRight">
      <i class="fa fa-chevron-right"></i>
    </button>
    <div class="movie-slide-list-container">
      <div class="movie-slide-list" ref="movieSlideList" :style="style">
        <div v-for="({ repositoryName, image, link }, index) in sortedItems" :key="index" class="movie-slide-item" @click="openLink(link)">
          <img :src="image" alt="Movie Poster" class="movie-slide-poster">
          <div class="overlay">
            <BaseText>{{ repositoryName }}</BaseText>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import BaseText from '@/components/BaseText/BaseText.vue'
import DropdownList from '@/components/DropdownList/DropdownList.vue'
import { Option } from '@/components/DropdownList/types'

interface Items {
  image: string,
  repositoryName: string
  link: string
  stars: number
  forks: number
  issues: number
  updated: number
}

interface Props {
  title: string
  items: Items[]
}
const props = withDefaults(defineProps<Props>(), {
  items: () => []
})

const scrollx = ref(0)
const options: Option[] = [
  { label: 'Sort by Star', value: 'stars' },
  { label: 'Sort by forks', value: 'forks' },
  { label: 'Sort by help wanted issues', value: 'issues' },
  { label: 'Sort by updated', value: 'updated' },
]
const sortOption = ref<string>('')
const roundedHalfScreenWidth = Math.round(window.innerWidth / 2)

const style = computed(() => ({
  width: `${props.items.length * 260}px`,
  'margin-left': `${scrollx.value}px`
}))

const sortedItems = computed(() => {
  const itemsCopy = props.items
  if(sortOption.value === '')
    return itemsCopy

  itemsCopy.sort((itemA: Items, itemB: Items) => {
    const a = itemA[sortOption.value]
    const b = itemB[sortOption.value]
    if ( a < b) {
      return -1
    }
    else if (a > b) {
      return 1
    } else {
      return 0
    }
  })
  return itemsCopy
})

const updateSortOption = (value: string) => {
  sortOption.value = value
}

const scrollLeft = () => {
  let x = scrollx.value + roundedHalfScreenWidth
  if (x > 0) x= 0
  scrollx.value = x
}

const scrollRight = () => {
  let x = scrollx.value - roundedHalfScreenWidth
  const widthCompleteList = props.items.length * 260
  if ((window.innerWidth - widthCompleteList) > x)
    x = (window.innerWidth - widthCompleteList) - 260
  scrollx.value = x
}

const openLink = (link: string) => {
  window.open(link, '_blank')
}
</script>

<style scoped lang="less">
.movie-slide {
  margin: 20px 0;
  position: relative;

  &:hover .movie-slide-button {
    opacity: 1;
  }

  .movie-slide-list-container {
    overflow-x: hidden;
  }

  .movie-slide-list {
    transition: all ease 0.4s;
  }

  .movie-slide-item {
    display: inline-block;
    position: relative;
    cursor: pointer;
    width: 260px;
    height: 190px;

    &:hover img {
      transform: scale(1);
    }

    &:hover .overlay {
      transform: scale(1);
      opacity: 1;
    }
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transform: scale(0.9);
    transition: transform ease 0.2s;
  }

  .overlay {
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    opacity: 0;
    transition: all 0.2s ease;
    transform: scale(0.9);
  }

  .movie-slide-button {
    position: absolute;
    opacity: 0;
    top: 55%;
    z-index: 10000;
    transform: translateY(-50%);
    width: 30px;
    height: 30px;
    background-color:  rgba(0, 0, 0, 0.8);
    border: none;
    border-radius: 50%;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
    cursor: pointer;
    transition: all 0.3s ease-out;
  }

  .movie-slide-prev {
    left: 0;
    margin-left: -30px;
  }

  .movie-slide-next {
    right: 0;
    margin-right: -30px;
  }
}
</style>