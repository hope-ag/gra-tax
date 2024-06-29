import { AppDomain } from '@/types/app.interface'
import { Route } from '@/types/routes.interface'
import { Router } from 'express'
import healthController from '@/controllers/health.controller'

export class AppRoute implements Route {
  public path = ''
  public router = Router()
  public domain: AppDomain = 'app'

  constructor() {
    this.initializeRoutes()
  }

  private initializeRoutes() {
    this.router.get(`${this.path}/`, healthController)
    this.router.get(`${this.path}/health`, healthController)
  }
}

export const appRoute = new AppRoute()
