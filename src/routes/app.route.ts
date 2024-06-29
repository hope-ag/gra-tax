import { AppDomain } from '@/types/app.interface'
import { Route } from '@/types/routes.interface'
import { Router } from 'express'
import healthController from '@/controllers/health.controller'
import baseController from '@/controllers/base.controller'

export class AppRoute implements Route {
  public path = ''
  public router = Router()
  public domain: AppDomain = 'app'

  constructor() {
    this.initializeRoutes()
  }

  private initializeRoutes() {
    /**
     * @openapi
     * /:
     *   get:
     *     summary: Welcomes and provides docs link
     *     tags: [App]
     *     responses:
     *       200:
     *         description: The server status
     */
    this.router.get(`${this.path}/`, baseController)

    /**
     * @openapi
     * /health:
     *   get:
     *     summary: Get the status of server
     *     tags: [App]
     *     responses:
     *       200:
     *         description: The server status
     */
    this.router.get(`${this.path}/health`, healthController)
  }
}

export const appRoute = new AppRoute()
