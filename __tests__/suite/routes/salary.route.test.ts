import request from 'supertest'
import { salaryRoute } from '@/routes/salary.route'
import app from '@/app'

describe('Testing Salary Routes', () => {
  const incomeData = [
    {
      input: {
        net: 0,
        allowances: 0
      },
      output: {
        allowances: 0,
        grossIncome: 0,
        basicSalary: 0,
        totalPAYETax: 0,
        employeePension: 0,
        employerPension: 0
      }
    },
    {
      input: {
        net: 1000,
        allowances: 0
      },
      output: {
        allowances: 0,
        basicSalary: 1207.12,
        employeePension: 126.75,
        employerPension: 217.28,
        grossIncome: 1207.12,
        totalPAYETax: 80.36
      }
    },
    {
      input: {
        net: 5000,
        allowances: 2000
      },
      output: {
        allowances: 2000,
        basicSalary: 7830.99,
        employeePension: 1032.25,
        employerPension: 1769.58,
        grossIncome: 9830.99,
        totalPAYETax: 1798.73
      }
    }
  ]

  describe('[POST] /api/v1/salary', () => {
    it('responds with an "unprocessable entity" error if body is empty', async () => {
      const response = await request(app.getServer()).post(`/api/v1/${salaryRoute.path}`)
      expect(response.status).toBe(422)
      expect(response.body).toHaveProperty('success', false)
      expect(response.body).toHaveProperty('message', 'net is a required field')
    })

    it('responds with an "unprocessable entity" error if body is not valid', async () => {
      const response = await request(app.getServer())
        .post(`/api/v1/${salaryRoute.path}`)
        .send({
          net: 0,
          allowances: 'bad_value'
        })
      expect(response.status).toBe(422)
      expect(response.body).toHaveProperty('success', false)
      // should start with 'allowances must be a `number`
      expect(response.body.message).toMatch(/^allowances must be a `number`/)
    })

    for (const item of incomeData) {
      it(`responds with salary breakdown for net income: ${item.input.net} & allowances: ${item.input.allowances}`, async () => {
        const response = await request(app.getServer())
          .post(`/api/v1/${salaryRoute.path}`)
          .send({
            net: item.input.net,
            allowances: item.input.allowances
          })
        expect(response.status).toBe(200)
        expect(response.body).toHaveProperty('success', true)
        expect(response.body.data).toEqual(item.output)
      })
    }
  })
})
