<template>
  <section class="register">
    <FormBox title="Register" @on-submit="validate">
      <InputText
        id="username"
        v-model="form.displayName"
        label="Username"
        message="username is not valid"
        :status="inputStatus.displayName"
      />
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
        message="password should have at least 6 characters"
        :status="inputStatus.password"
      />
      <template #button>
        <Heading v-if="isRegisterError" :level="4" class="register-error">
          An error occurred during register
        </Heading>
        <Button label="Create" :disabled="isLoading" />
      </template>
    </FormBox>
  </section>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import InputText from '@/components/InputText/InputText.vue'
import Button from '@/components/Button/Button.vue'
import FormBox from '@/components/FormBox/FormBox.vue'
import Heading from '@/components/Heading/Heading.vue'
import { useAuthentication } from '@/stores/modules/authentication'
import { useFormErrors } from '@/composables/useFormErrors'
import { registerSchema } from '@/validation'
import { useRouter } from 'vue-router'

const store = useAuthentication()
const router = useRouter()
const { setErrors, inputStatus } = useFormErrors()
const form = reactive({ email: '', displayName: '', password: '' })
const isRegisterError = ref<boolean>(false)
const isLoading = ref<boolean>(false)

const register = async () => {
  isLoading.value = true
  try {
    await store.register(form)
    router.push({ name: 'login' })
  } catch (error) {
    isRegisterError.value = true
    console.error(error)
  } finally {
    isLoading.value = false
  }
}

const validate = async () => {
  isRegisterError.value = false
  try {
    await registerSchema.validate(form, { abortEarly: false })
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

  .register-error {
    color: @element-error;
    margin-bottom: @size-spacing-2;
    position: relative;
    text-align: left;
  }

  .button-container {
    margin-top: 50px;
  }
}
</style>
