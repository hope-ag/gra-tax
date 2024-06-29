import { sendSuccessResponse } from '@/lib/utils/http_response'
import { Request, Response, NextFunction } from 'express'

export default function healthController(
  req: Request,
  res: Response,
  _next: NextFunction
) {
  sendSuccessResponse(res, 'ok')
}
