<template>
  <div class="dropdown" data-testid="dropdown-list">
    <Heading :level="2" class="dropdown-toggle" @click="toggleDropdown">
      {{ title }}
      <i data-testid="dropdown-icon" :class="icon"></i>
    </Heading>
    <ul v-show="showDropdown" class="dropdown-menu">
      <li
        v-for="(option, index) in options"
        :key="index"
        :class="selectedIndex === index || selected === option.value ? 'active' : ''"
        data-testid="list-item"
        @click="selectOption(option)"
      >
        {{ option.label }}
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { Heading } from '@/components'
import { ref, computed } from 'vue'
import type { Option } from './types'

interface Props {
  title: string
  options: Option[]
  selected?: string
}
interface Emits {
  (event: 'on-change', value: string): string
}
const props = withDefaults(defineProps<Props>(), { selected: '' })

const emit = defineEmits<Emits>()

const showDropdown = ref<boolean>()
const selectedOption = ref<Option>({ label: '', value: '' })
const selectedIndex = ref<number>()
const icon = computed(() => (showDropdown.value ? 'fa fa-chevron-up' : 'fa fa-chevron-down'))

const toggleDropdown = () => {
  showDropdown.value = !showDropdown.value
}

const selectOption = (option: Option) => {
  selectedIndex.value = props.options.findIndex((item) => item.value === option.value)
  selectedOption.value = option
  showDropdown.value = false
  emit('on-change', option.value)
}
</script>

<style scoped lang="less">
.dropdown {
  position: relative;
  display: inline-block;
}

.dropdown-menu {
  position: absolute;
  top: 100%;
  left: 100%;
  width: 250px;
  background-color: @background-primary;
  border: 1px solid @base-primary;
  list-style: none;
  z-index: 999;
}

.dropdown-menu li {
  cursor: pointer;
  padding: @size-spacing-1 @size-spacing-2;
  margin: 0;
  transition: all ease 0.4s;

  &.active {
    background-color: @button-primary-hover;
  }

  &:hover {
    background-color: @button-primary-hover;
  }
}
</style>
