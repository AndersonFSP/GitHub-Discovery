<template>
 <label :for="id">
    <span :class="[spanClasses, state]" data-testid="input-label">
      {{ label }}
    </span>
    <input
      :id="id"
      :class="['input', state]"
      :type="type"
      :value="modelValue"
      autocomplete
      data-testid="input"
      :aria-label="label"
      @focus="focusInput"
      @blur="blurInput"
      @input="onInput($event.target.value)"
    />
    <p v-if="hasError" class="message" data-testid="input-text">
      {{ message }}
    </p>
  </label>
</template>

<script setup lang="ts">
import { computed, onBeforeMount } from 'vue'
import { StatusType } from './types'
import { ref } from 'vue'

interface Props {
  id?: string
  label?: string
  type?: string
  message?: string
  status?: StatusType
  modelValue?: string
}
interface Emits {
  (event: 'update:modelValue', value: string): string
}

const props = withDefaults(defineProps<Props>(), {
  id: '',
  type: 'text',
  label: 'Label text',
  modelValue: '',
  message: '',
  status: StatusType.Default
})
const emit = defineEmits<Emits>()
const active = ref<boolean>(false)

const spanClasses = computed(() => ({ active: active.value }))
const state = computed(() => {
  return {
    [StatusType.Default]: '',
    [StatusType.Error]: 'error'
  }[props.status]
})
const hasError = computed((): boolean => props.status === StatusType.Error)

const focusInput = () => (active.value = true)
const blurInput = () => (active.value = props.modelValue ? true : false)
const onInput = (value: string) => emit('update:modelValue', value)
onBeforeMount(() => {
  if (props.modelValue) active.value = true
})
</script>

<style lang="less" scoped>
label {
  width: 100%;
  display: block;
  margin-bottom: 20px;
  
  .message {
    font-size: 0.8em;
    color: @element-error;
  }

  .active {
    font-size: 0.7em;
    margin: 8px 10px;
  }

  span {
    cursor: text;
    position: absolute;
    font-size: 0.8em;
    text-transform: uppercase;
    color: @text-primary;
    margin: 20px;
    transition: margin 200ms ease;

    &.error {
      color: @element-error;
    }
  }

  input {
    width: 100%;
    background-color: #333;
    border: 2px solid transparent;
    border-radius: 5px;
    outline: none;
    font-size: 0.9em;
    padding: 25px 10px 10px;
    font-weight: 600;
    color: @text-primary;

    &.error {
      border-color: @element-error;
    }

    &:focus {
      background-color: #414141;
    }
  }
}
</style>
