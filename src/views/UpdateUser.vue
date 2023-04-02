<template>
  <section class="update">
    <FormBox title="My Account" @on-submit="validate">
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
      <template #button>
        <Button label="save" :disabled="isLoading" />
      </template>
    </FormBox>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { InputText, FormBox, Button } from '@/components'
import { useAuthentication } from '@/stores/modules/authentication'
import { useFormErrors } from '@/composables/useFormErrors'
import { updateSchema } from '@/validation'
import { useRouter } from 'vue-router'
import type { User } from 'firebase/auth'
import type { ValidationError } from 'yup'

const store = useAuthentication()
const router = useRouter()
const { setErrors, inputStatus } = useFormErrors()
const form = ref({ email: '', displayName: '' })
const isUpdateError = ref<boolean>(false)
const isLoading = ref<boolean>(false)

const update = async () => {
  isLoading.value = true
  try {
    await store.update(form.value)
    router.go(0)
  } catch (error) {
    isUpdateError.value = true
    isLoading.value = false
    console.error(error)
  }
}

const validate = async () => {
  isUpdateError.value = false
  try {
    await updateSchema.validate(form.value, { abortEarly: false })
    update()
  } catch (err) {
    setErrors(err as ValidationError)
  }
}

const { displayName, email } = store.user as User
form.value = { displayName: displayName || '', email: email || '' }
</script>

<style lang="less" scoped>
.update {
  display: flex;
  align-items: center;
  height: 80vh;
  margin: @size-spacing-6 6%;

  @media (max-width: 768px) {
    justify-content: center;
    margin: 0;
  }
}
</style>
