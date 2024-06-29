/* eslint-disable @typescript-eslint/no-explicit-any */
import type { RequestHandler } from 'express'
import { UnprocessableEntity } from 'http-errors'
import type { ObjectSchema } from 'yup'

const validationMiddleware = (
  schema: ObjectSchema<any>,
  path: 'body' | 'query' | 'params' | 'headers' = 'body',
  strip = true
): RequestHandler => {
  return async (req, res, next) => {
    try {
      await schema.validate(req[path], { abortEarly: true, stripUnknown: strip })
      next()
    } catch (error) {
      next(new UnprocessableEntity(error.message))
    }
  }
}

export default validationMiddleware
