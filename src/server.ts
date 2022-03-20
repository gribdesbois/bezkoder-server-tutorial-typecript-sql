import express, { Request, Response } from 'express'
import cors, { CorsOptions } from 'cors'
import { create } from './controllers/tutorial.controller'
import { db } from './config/db.config'

const app: express.Application = express()

// ! DB connection
db.authenticate()
  .then(() => {
    console.log('Database connected...')
  })
  .catch((err: Error) => {
    console.log(`Error: ${err}`)
  })

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

// simple route
app.get('/', (req: Request, res: Response) => {
  res.json({ message: 'Welcome to bezkoder application' })
})

app.post('/', create)

const PORT: string = process.env.PORT || '8080'
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
