import type { NextFunction, Response, Request } from 'express'
import type { HttpException } from '@/lib/utils/http_exception'
import { logger } from '@/lib/logger/logger'

const errorMiddleware = (
  error: HttpException,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const status: number = error.status || 500
    const message: string = error.message || 'errorMessages.somethingWentWrong'

    const { query, body } = req
    if (!process.env.JEST_WORKER_ID)
      console.error(JSON.stringify({ body, query, message }, null, 2))
    logger.error(
      `[${req.method}] ${req.path} >> StatusCode:: ${status}, Message:: ${message}`
    )
    res.status(status).json({ message, success: false })
  } catch (error) {
    next(error)
  }
}

export default errorMiddleware
