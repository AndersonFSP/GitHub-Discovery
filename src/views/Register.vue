<template>
  <section class="register">
    <form @submit.prevent="validate">
      <InputText 
        v-model="form.displayName" 
        label="Username"  
        message="username is not valid" 
        :status="inputStatus.email"  
        id="username" 
      />
      <InputText 
        v-model="form.email" 
        label="Email" 
        type="email" 
        id="email"
        message="email is not valid"
        :status="inputStatus.email"
      />
      <InputText 
        v-model="form.password" 
        label="Password" 
        type="password" 
        id="password"
        message="password should have at least 6 characters"
        :status="inputStatus.password"
      />

      <div class="button-container">
        <Button label="Register" />
      </div>
    </form>
  </section>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import InputText from '@/components/InputText/InputText.vue'
import Button from '@/components/Button/Button.vue'
import { useAuthentication } from '@/stores/modules/authentication'
import { useFormErrors } from '@/composables/useFormErrors'
import { registerSchema } from '@/validation'
import { useRouter } from 'vue-router'

const store = useAuthentication()
const router = useRouter()
const { setErrors, inputStatus }  = useFormErrors()
const form = reactive({ email: '', displayName: '', password: '' })
const registerError = ref<boolean>(false)

const register = async () => {
  try {
    await store.register(form)
    router.push({ name: 'login' })
  } catch (error) {
    registerError.value = true
    console.error(error)
  }
}

const validate = async () => {
  registerError.value = false
  try {
    await registerSchema.validate(
     form,
      { abortEarly: false }
    )
    register()
  } catch (err) {
    setErrors(err)
  }
}
</script>

<style lang="less" scoped>
  .register {
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
