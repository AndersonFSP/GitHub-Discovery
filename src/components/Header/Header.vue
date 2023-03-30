<template>
  <header>
    <section class="header-container">
      <nav>
        <img
          src="https://swordhealth.pt/wp-content/uploads/2022/01/swordhealth_logo_original.svg"
          alt="Sword health logo"
          height="25"
        />
        <Link link="/discovery">Discovery</Link>
      </nav>

      <nav>
        <Link link="/update-user">{{ userDisplayName }}</Link>
        <BaseText class="logout" @click="logout">Logout</BaseText>
      </nav>
    </section>
  </header>
</template>

<script setup lang="ts">
import Link from '@/components/Link/Link.vue'
import { useAuthentication } from '@/stores/modules/authentication'
import { useRouter } from 'vue-router'
import { computed } from 'vue'
import BaseText from '@/components/BaseText/BaseText.vue'

const store = useAuthentication()
const router = useRouter()

const userDisplayName = computed(() => store.user?.displayName || 'Username')

const logout = () => {
  store.logout()
  router.push({ name: 'login' })
}
</script>

<style lang="less" scoped>
header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background-color: @background-primary;
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.1);
  z-index: 1000;
  nav {
    display: flex;
    align-items: center;
    gap: @size-spacing-4;

    .logout {
      cursor: pointer;
      font-weight: bold;
    }
  }
}

.header-container {
  padding: @size-spacing-4 @size-spacing-5;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
}
</style>
