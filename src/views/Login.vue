<template>
  <section class="login">
    <form @submit.prevent="validate">
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
        message="password is not valid"
        :status="inputStatus.password"
       />

      <div class="button-container">
        <h4 v-if="loginError" class="login-error">An error occurred during login</h4>
        <Button label="sign in" />
          <BaseText class="create-account-link">
            Don't have an account?
          <Link link="/register">Click here to sign up</Link>
         </BaseText>
      </div>
    </form>
  </section>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import InputText from '@/components/InputText/InputText.vue'
import Button from '@/components/Button/Button.vue'
import Link from '@/components/Link/Link.vue'
import BaseText from '@/components/BaseText/BaseText.vue'
import { useAuthentication } from '@/stores/modules/authentication'
import { loginSchema } from '@/validation'
import { useFormErrors } from '@/composables/useFormErrors'
import { useRouter } from 'vue-router'

const store = useAuthentication()
const router = useRouter()
const { setErrors, inputStatus }  = useFormErrors()
const form = reactive({ email: '', username: '', password: '' })
const loginError = ref<boolean>(false)

const login = async () => {
  try {
    await store.login(form)
    router.push({ name: 'discovery' })
  } catch (error) {
    loginError.value = true
    console.error(error)
  }
}

const validate = async () => {
  loginError.value = false
  try {
    await loginSchema.validate(
     form,
      { abortEarly: false }
    )
    login()
  } catch (err) {
    setErrors(err)
  }
}
</script>

<style lang="less" scoped>
  .login {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;

  .login-error {
    color: #e87c03;
    margin-bottom: 5px;
    position: relative;
    text-align: left;
  }

  form {
    width: 50%;
    padding: 50px;
    background-color: #000000bf;
    border-radius: 4px;
  }

  .button-container {
    margin-top: 50px;
  }

  .create-account-link {
    text-align: right;
    margin-top: 15px;
  }
  }
</style>
