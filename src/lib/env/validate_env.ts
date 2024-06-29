import { cleanEnv, port, str, num } from 'envalid'

const validateEnv = () => {
  cleanEnv(process.env, {
    NODE_ENV: str(),
    PORT: port(),
    LOGGER_ENABLED: num()
  })
}

export default validateEnv
