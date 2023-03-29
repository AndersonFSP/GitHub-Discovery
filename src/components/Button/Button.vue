<template>
  <button>{{ props.label }}</button>
</template>

<script lang="ts" setup>
interface Props {
  label: string
}

const props = defineProps<Props>()
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

  &:hover {
    background-color: @button-primary-hover;
  }
}
</style>
