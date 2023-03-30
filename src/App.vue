<template>
  <Header v-if="isUserLogged" />
  <RouterView />
</template>

<script setup lang="ts">
import { useAuthentication } from '@/stores/modules/authentication'
import { RouterView } from 'vue-router'
import { computed } from 'vue'
import Header from '@/components/Header/Header.vue'

const store = useAuthentication()
store.verifyIfIsLogged()
const isUserLogged = computed(() => store.isUserLogged)
</script>
