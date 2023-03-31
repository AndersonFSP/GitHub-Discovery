<template>
  <Heading class="filter-title" :level="3">{{ title }}</Heading>
  <div class="filter-container">
    <label
      v-for="option in options"
      :key="option"
      :for="option.value"
      data-testid="filter-list-item"
      :class="['label-filter', checkedNames.includes(option.value) ? 'active' : '']"
    >
      <input
        :id="option.value"
        v-model="checkedNames"
        class="checkbox-input"
        type="checkbox"
        checked
        :value="option.value"
        @change="onChange"
      />
      {{ option.label }}
    </label>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import Heading from '@/components/Heading/Heading.vue'
import { FilterListOption } from './types'

interface Props {
  options: FilterListOption[]
  checked?: string[]
  title: string
}
interface Emits {
  (event: 'on-change', value: string[]): string[]
}

const props = withDefaults(defineProps<Props>(), {
  options: () => [],
  checked: () => []
})
const emit = defineEmits<Emits>()
const checkedNames = ref([])
const onChange = () => {
  emit('on-change', checkedNames.value)
}

onMounted(() => {
  if (props.checked.length) {
    checkedNames.value = props.checked
    emit('on-change', checkedNames.value)
  }
})
</script>

<style scoped lang="less">
.filter-title {
  margin-bottom: @size-spacing-2;
}

.filter-container {
  display: flex;
  gap: @size-spacing-3;
  flex-wrap: wrap;
}

input {
  opacity: 0;
  position: absolute;
  z-index: -1;
}

.label-filter {
  background-color: @base-primary;
  font-weight: bold;
  color: @text-element;
  border-radius: 32px;
  padding: @size-spacing-2 @size-spacing-4;
  cursor: pointer;
  transition: all ease 0.2s;

  &:hover {
    background-color: @base-primary-hover;
  }

  &.active {
    background-color: @button-primary;
    color: @text-primary;

    &:hover {
      background-color: @button-primary-hover;
    }
  }
}
</style>

export { FilterListOption }

export { FilterListOption }
