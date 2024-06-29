import type { Router } from 'express'
import type { AppDomain } from './app.interface'

export interface Route {
  path?: string
  domain: AppDomain
  router: Router
}
