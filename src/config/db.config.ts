/* eslint-disable prefer-destructuring */
import { Sequelize, Dialect } from 'sequelize'
import * as dotenv from 'dotenv'

dotenv.config()
const DIALECT: Dialect = 'sqlite'
const PATH_TO_DB: string | undefined = process.env.PATH_TO_DB

const pool = {
  max: 5,
  min: 0,
  acquire: 30000,
  idle: 10000,
}
const db = new Sequelize({
  dialect: DIALECT,
  storage: PATH_TO_DB,
  pool,
})
export default db
