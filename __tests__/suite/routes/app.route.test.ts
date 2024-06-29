import request from 'supertest'
import { appRoute } from '@/routes/app.route'
import app from '@/app'

describe('Testing Base API Routes', () => {
  describe('[GET] /', () => {
    it('response statusCode 200', async () => {
      return await request(app.getServer()).get(`${appRoute.path}`).expect(200)
    })
  })

  describe('[GET] /health', () => {
    it('response statusCode 200 and { success: true }', async () => {
      return await request(app.getServer())
        .get(`${appRoute.path}/health`)
        .expect(200)
        .expect({ success: true, data: 'ok' })
    })
  })
})
