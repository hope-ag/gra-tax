import { object, number } from 'yup'

export default object({
  net: number().required(),
  allowances: number().default(0)
})
