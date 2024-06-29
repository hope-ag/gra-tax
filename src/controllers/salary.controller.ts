import { sendSuccessResponse } from '@/lib/utils/http_response'
import { SalaryCalculatorService } from '@/services/salary_calculator.service'
import type { Request, Response, NextFunction } from 'express'
export default function salaryController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { body } = req
    const { net = 0, allowances = 0 } = body
    const salaryService = new SalaryCalculatorService(net, allowances)
    const breakdown = salaryService.getBreakdown()
    sendSuccessResponse(res, breakdown, 200)
  } catch (e) {
    next(e)
  }
}
