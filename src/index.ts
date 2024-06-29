import { logger } from '@/lib/logger/logger'
import app from '@/app'
import validateEnv from '@/lib/env/validate_env'
import { setDefaultResultOrder } from 'node:dns'

export async function startApp() {
  try {
    validateEnv()
    setDefaultResultOrder('ipv4first')
    app.listen()
  } catch (error) {
    console.error((error as Error).message)
    logger.error(error)
    process.exit(1)
  }
}

startApp()
