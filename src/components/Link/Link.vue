<template>
  <router-link exact :to="link" class="link">
    <slot></slot>
  </router-link>
</template>

<script lang="ts" setup>
interface Props {
  link: string
}

defineProps<Props>()
</script>

<style scoped lang="less">
.link {
  text-decoration: none;
  font-weight: bold;
  color: #fff;
  transition: all ease 0.3s;

  &:hover {
    color: #ee1515;
    text-decoration: underline;
  }

}
.router-link-active {
  color: #ee1515;
  text-decoration: underline;
}
</style>
