<template>
  <button :class="buttonClass" :aria-disabled="disabled" :disabled="disabled">
    {{ props.label }}
  </button>
</template>

<script lang="ts" setup>
import { computed } from 'vue'

interface Props {
  label: string
  disabled?: boolean
}

const props = withDefaults(defineProps<Props>(), { disabled: false })
const buttonClass = computed(() => (props.disabled ? 'disabled' : ''))
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
  color: @text-primary;
  background-color: @button-primary;
  cursor: pointer;
  text-transform: capitalize;
  text-align: center;

  &.disabled {
    background-color: #9599a6;
    cursor: not-allowed;
    color: #c9cad4;
    pointer-events: none;
  }

  &:hover:not(.disabled) {
    background-color: @button-primary-hover;
  }
}
</style>
