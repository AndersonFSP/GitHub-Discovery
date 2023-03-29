<template>
  <form class="form-box" @submit.prevent="emit('on-submit')">
    <Heading :level="2">{{ title }}</Heading>
    <div>
      <slot />
    </div>
    <div class="button-container ">
      <slot name="button" />
    </div>
  </form>
</template>

<script lang="ts" setup>
import Heading from '@/components/Heading/Heading.vue'

interface Props {
  title: string
}
interface Emits {
  (event: 'on-submit'): void
}
defineProps<Props>()
const emit = defineEmits<Emits>()
</script>

<style scoped lang="less">
.form-box {
  display: flex;
  flex-direction: column;
  gap: @size-spacing-4;
  width: 50%;
  padding: @size-spacing-5;
  background-color: @background-primary;
  border-radius: 4px;

  .button-container {
    margin-top: @size-spacing-3;
  }
}
</style>