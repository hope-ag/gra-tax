import { AppDomain } from '@/types/app.interface'
import { Route } from '@/types/routes.interface'
import { Router } from 'express'
import salaryController from '@/controllers/salary.controller'
import validationMiddleware from '@/middleware/validation.middleware'
import salaryInfoValidator from '@/lib/validation/salary_info.validator'

export class SalaryRoute implements Route {
  public path = 'salary'
  public router = Router()
  public domain: AppDomain = 'salary'

  constructor() {
    this.initializeRoutes()
  }

  private initializeRoutes() {
    this.router.post(
      `/${this.path}`,
      validationMiddleware(salaryInfoValidator, 'body'),
      salaryController
    )
  }
}

export const salaryRoute = new SalaryRoute()
