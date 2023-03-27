<template>
  <section class="home">
    <form @submit.prevent="submit">
      <InputText v-model="form.email" label="Email" id="email" />
      <InputText v-model="form.password" label="Password" type="password" id="password" />
      <div class="button-container">
        <Button label="sign n" />
      </div>
    </form>
  </section>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import InputText from '@/components/InputText/InputText.vue'
import Button from '@/components/Button/Button.vue'
import { firebaseAuth } from '@/firebase'
import { createUserWithEmailAndPassword } from 'firebase/auth'

const form = reactive({ email: '', username: '', password: '' })

const submit = () => {
  createUserWithEmailAndPassword(firebaseAuth, form.email, form.password)
}
</script>

<style lang="less" scoped>
  .home {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
  
    form {
      width: 50%;
      padding: 50px;
      background-color: #000000bf;
      border-radius: 4px;
    }

    .button-container {
      margin-top: 50px;
    }
  }
</style>
