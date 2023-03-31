<template>
  <section class="update">
    <FormBox title="My Account" @on-submit="validate">
      <InputText
        id="username"
        v-model="form.displayName"
        label="Username"
        message="username is not valid"
        :status="inputStatus.email"
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
import InputText from '@/components/InputText/InputText.vue'
import FormBox from '@/components/FormBox/FormBox.vue'
import Button from '@/components/Button/Button.vue'
import { useAuthentication } from '@/stores/modules/authentication'
import { useFormErrors } from '@/composables/useFormErrors'
import { updateSchema } from '@/validation'
import { useRouter } from 'vue-router'

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
    router.push({ name: 'login' })
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
    setErrors(err)
  }
}

const { displayName, email } = store.user
form.value = { displayName, email }
</script>

<style lang="less" scoped>
.update {
  display: flex;
  justify-content: left;
  align-items: center;
  height: 80vh;
  margin-left: @size-spacing-5;
}
</style>
