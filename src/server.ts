import express, { Request, Response } from 'express'
import cors, { CorsOptions } from 'cors'
import { createTutorial } from './controllers/tutorial.controller'
import { db } from './config/db.config'
import { router as routes } from './routes/tutorial.routes'

const app: express.Application = express()

// ! DB connection
const connect = async () => {
  try {
    await db.authenticate()
    console.log('Database connected...')
  } catch (err: any) {
    console.log(`Error: ${err}`)
  }
}
connect()

const corsOptions: CorsOptions = {
  // todo set origin
  origin: '*',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  preflightContinue: true,
  optionsSuccessStatus: 204,
}

app.use(cors(corsOptions))

app.use(express.json())
// parse requests of content-type - application/json
//! probably lacking this line if your request has no body

app.use(express.urlencoded({ extended: true }))

// routes
app.use('/api/tutorials', routes)

const PORT: string = process.env.PORT || '8080'
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
