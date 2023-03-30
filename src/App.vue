<template>
  <Header v-if="router.meta.header" />
  <RouterView />
</template>

<script setup lang="ts">
import { useAuthentication } from '@/stores/modules/authentication'
import { RouterView, useRoute } from 'vue-router'
import Header from '@/components/Header/Header.vue'

const router = useRoute()
const store = useAuthentication()
store.verifyIfIsLogged()
</script>
