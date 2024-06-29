import { LOGGER_ENABLED, LOG_FORMAT, NODE_ENV, PORT } from '@/lib/env/environment'
import compression from 'compression'
import express from 'express'
import helmet from 'helmet'
import hpp from 'hpp'
import morgan from 'morgan'
import cookieParser from 'cookie-parser'
import swaggerJSDoc from 'swagger-jsdoc'
import swaggerUi from 'swagger-ui-express'
import type { Route } from '@/types/routes.interface'
import { logger, stream } from '@/lib/logger/logger'
import errorMiddleware from '@/middleware/error.middleware'
import { appRequestSpeedLimiter } from '@/middleware/rate_limit.middleware'
import { appRoute } from './routes/app.route'
import { salaryRoute } from './routes/salary.route'
import { version } from '../package.json'

// const ipAddr = req.headers['x-forwarded-for'] || req.connection.remoteAddress;

class App {
  public app: express.Application
  public env: string
  public port: string | number

  constructor() {
    this.app = express()
    this.env = NODE_ENV || 'development'
    this.port = PORT || 8080
    this.initializeMiddleware()
    this.initializeV1Routes([salaryRoute])
    this.initializeBaseRoute(appRoute)
    this.initializeApiDocs()
    this.initializeErrorHandling()
  }

  public listen() {
    this.app.listen(this.port, () => {
      logger.info(`=================================`)
      logger.info(`======= ENV: ${this.env} =======`)
      logger.info(`🚀 App listening on the port ${this.port}`)
      logger.info(`=================================`)
    })
  }

  public getServer() {
    return this.app
  }

  private initializeMiddleware() {
    this.app.use(appRequestSpeedLimiter)
    if (NODE_ENV === 'development' || !!LOGGER_ENABLED)
      this.app.use(morgan(LOG_FORMAT, { stream }))
    this.app.use(hpp())
    this.app.use(helmet())
    this.app.use(compression())
    this.app.use(express.json())
    this.app.use(express.urlencoded({ extended: true }))
    this.app.use(cookieParser())
  }

  private initializeV1Routes(routes: Route[]) {
    try {
      routes.forEach(route => {
        this.app.use('/api/v1/', route.router)
      })
      // console.log(this.app._router)
    } catch (e) {
      console.error(e)
    }
  }
  private initializeBaseRoute(route: Route) {
    try {
      this.app.use('/', route.router)
    } catch (e) {
      console.error(e)
    }
  }

  private initializeApiDocs() {
    const options = {
      swaggerDefinition: {
        info: {
          title: 'SALARY REST API',
          version: version,
          description:
            'An api that provides a salary breakdown based on the your preferred net income and allowances'
        }
      },
      apis: ['./routes/*.ts']
    }

    const specs = swaggerJSDoc(options)
    this.app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs))
  }

  private initializeErrorHandling() {
    this.app.use(errorMiddleware)
  }
}

export default new App()
