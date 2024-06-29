/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { logger as LogUtil } from '../../src/lib/logger/logger'

const info = jest.spyOn(LogUtil, 'info')
const debug = jest.spyOn(LogUtil, 'debug')
const error = jest.spyOn(LogUtil, 'error')

beforeAll(() => {
  //@ts-ignore
  info.mockImplementation((_data: any) => {})
  //@ts-ignore
  error.mockImplementation((_data: any) => {})
  //@ts-ignore
  debug.mockImplementation((_data: any) => {})
})
