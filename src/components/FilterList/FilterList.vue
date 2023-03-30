<template>
  <Heading class="filter-title" :level="3">{{ title }}</Heading>
  <div class="filter-container">
    <label
      v-for="option in options"
      :key="option"
      :for="option.value"
      :class="['label-filter', checkedNames.includes(option.value) ? 'active' : '']"
    >
      <input
        class="checkbox-input"
        type="checkbox"
        checked
        :id="option.value"
        :value="option.value"
        v-model="checkedNames"
        @change="onChange"
      />
      {{ option.label }}
    </label>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import Heading from '@/components/Heading/Heading.vue'

interface Props {
  options: { label: string; value: 'string' }[]
  checked: string[]
  title: string
}
interface Emits {
  (event: 'on-change', value: string[]): string[]
}

const props = withDefaults(defineProps<Props>(), {
  options: () => []
})
const emit = defineEmits<Emits>()
const checkedNames = ref([])
const onChange = () => {
  emit('on-change', checkedNames.value)
}

onMounted(() => {
  checkedNames.value = props.checked
  emit('on-change', checkedNames.value)
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
    background-color: @element-select;
    color: @text-secondary;

    &:hover {
      background-color: @element-select-hover;
    }
  }
}
</style>
