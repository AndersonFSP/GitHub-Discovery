<template>
  <section>
    <FilterList title="Toggle topics to show" :checked="checked" :options="options" @on-change="ola" />
    <!-- <div>Checked names: {{ checkedNames }}</div> -->
  </section>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue';
import FilterList from '@/components/FilterList/FilterList.vue'

const checkedNames = ref([])
const options = [
  { label: 'Vue', value: 'vue' },
  { label: 'Typescript', value: 'typescript' },
  { label: 'Javascript', value: 'javascript' },
  { label: 'Go', value: 'go' },
  { label: 'CSS', value: 'css' },
  { label: 'Node', value: 'node' },
 ]
 const ola = (value: string[]) => {
   checkedNames.value = value
 }
 const checked = computed(() => ['vue', 'javascript'])
</script>

<style scoped lang="less">
  section {
    margin: @size-spacing-6;
  }
</style>