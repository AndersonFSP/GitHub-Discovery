import * as yup from 'yup'

const commonValidation = {
  email: yup.string().email().required(),
  password: yup.string().required().min(6)
}

export const loginSchema = yup.object().shape({
  ...commonValidation
})

export const registerSchema = yup.object().shape({
  ...commonValidation,
  displayName: yup.string().required()
})