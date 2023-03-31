<template>
  <section class="login">
    <FormBox title="Login" @on-submit="validate">
      <InputText
        id="email"
        v-model="form.email"
        label="Email"
        type="email"
        message="email is not valid"
        :status="inputStatus.email"
      />
      <InputText
        id="password"
        v-model="form.password"
        label="Password"
        type="password"
        message="password is not valid"
        :status="inputStatus.password"
      />

      <template #button>
        <Heading v-if="isloginError" :level="4" class="login-error">
          An error occurred during login
        </Heading>
        <Button label="sign in" :disabled="isLoading" />
        <BaseText class="create-account-link">
          Don't have an account?
          <Link link="/register">Click here to sign up</Link>
        </BaseText>
      </template>
    </FormBox>
  </section>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import InputText from '@/components/InputText/InputText.vue'
import Button from '@/components/Button/Button.vue'
import Link from '@/components/Link/Link.vue'
import BaseText from '@/components/BaseText/BaseText.vue'
import FormBox from '@/components/FormBox/FormBox.vue'
import Heading from '@/components/Heading/Heading.vue'
import { useAuthentication } from '@/stores/modules/authentication'
import { loginSchema } from '@/validation'
import { useFormErrors } from '@/composables/useFormErrors'
import { useRouter } from 'vue-router'

const store = useAuthentication()
const router = useRouter()
const { setErrors, inputStatus } = useFormErrors()
const form = reactive({ email: '', username: '', password: '' })
const isloginError = ref<boolean>(false)
const isLoading = ref<boolean>(false)

const login = async () => {
  isLoading.value = true
  try {
    await store.login(form)
    router.push({ name: 'discovery' })
  } catch (error) {
    isloginError.value = true
    console.error(error)
  } finally {
    isLoading.value = false
  }
}

const validate = async () => {
  isloginError.value = false
  try {
    await loginSchema.validate(form, { abortEarly: false })
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
    color: @element-error;
    margin-bottom: @size-spacing-2;
    position: relative;
    text-align: left;
  }

  .create-account-link {
    text-align: right;
    margin-top: @size-spacing-3;
  }
}
</style>
