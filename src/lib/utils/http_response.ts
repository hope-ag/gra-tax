/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Response } from 'express'

export const sendSuccessResponse = (res: Response, data: any, status = 200) => {
  const success = true
  res.status(status).json({ data, success })
}
