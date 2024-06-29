import { sendSuccessResponse } from '@/lib/utils/http_response'
import { Request, Response, NextFunction } from 'express'

export default function baseController(req: Request, res: Response, _next: NextFunction) {
  sendSuccessResponse(res, 'Welcome, go to /api-docs for the api documentation')
}
