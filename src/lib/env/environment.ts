import { config } from 'dotenv'
import path from 'path'
config()

export const {
  NODE_ENV = 'development',
  PORT = '3000',
  LOGGER_ENABLED = '0'
} = process.env

export const LOG_DIR = path.resolve(process.cwd(), 'logs')
export const ROOT_DIR = path.resolve(process.cwd())
export const LOG_FORMAT = process.env.NODE_ENV === 'production' ? 'combined' : 'dev'
