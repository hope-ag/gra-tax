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
    /**
     * @openapi
     * /api/v1/salary:
     *   post:
     *     summary: Calculate salary
     *     tags: [Salary]
     *     description: Calculates a breakdown of your salary when you provide your expected net income and allowances.
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               net: {type: number, default: 1000 }
     *               allowances: {type: number}
     *             required:
     *               - net
     *               - allowances
     *     responses:
     *       200:
     *         description: The salary
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 grossIncome: {type: number}
     *                 basicSalary: {type: number}
     *                 allowances: {type: number}
     *                 totalPAYETax: {type: number}
     *                 employeePension: {type: number}
     *                 employerPension: {type: number}
     *       422:
     *         description: Validation error
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 message: {type: string}
     *                 success: {type: boolean}
     */
    this.router.post(
      `/${this.path}`,
      validationMiddleware(salaryInfoValidator, 'body'),
      salaryController
    )
  }
}

export const salaryRoute = new SalaryRoute()
