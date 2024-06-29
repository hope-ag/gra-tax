import slowDown from 'express-slow-down'

export const appRequestSpeedLimiter = slowDown({
  delayAfter: 150,
  windowMs: 180000,
  delayMs: () => 1000
})
