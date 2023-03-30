<template>
  <component :is="tagHeading">
    <slot />
  </component>
</template>

<script lang="ts" setup>
import { computed } from 'vue'

interface Props {
  level?: number
}

const props = withDefaults(defineProps<Props>(), { level: 1 })

const tagHeading = computed(() => `h${props.level}`)
</script>

<style scoped lang="less">
button {
  transition: all 200ms ease;
  display: block;
  width: 100%;
  border-radius: 5px;
  padding: 10px 3px;
  font-size: 1.2em;
  border: none;
  color: #fff;
  background-color: #db0000;
  cursor: pointer;
  text-transform: capitalize;
  text-align: center;

  &:hover {
    background-color: #ee1515;
  }
}
</style>
