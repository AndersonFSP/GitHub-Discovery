import { ref, computed } from 'vue'
import type { ValidationError } from 'yup'
import { StatusType } from '@/components/InputText/types'

export const useFormErrors = () => {
  const errors = ref<string[]>([])
  const inputStatus = computed<any>(() =>
    errors.value.reduce((accumulator, value) => ({ ...accumulator, [value]: StatusType.Error }), {})
  )
  function setErrors(validationError: ValidationError) {
    errors.value = validationError.inner.map((err) => err.path) as string[]
  }
  function cleanErrors() {
    errors.value = []
  }
  return { errors, setErrors, inputStatus, cleanErrors }
}
