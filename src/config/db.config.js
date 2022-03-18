import Sequelize from 'sequelize'
import * as dotenv from 'dotenv'

dotenv.config()
const { DIALECT } = process.env
const { PATH_TO_DB } = process.env

const db = new Sequelize({
  dialect: DIALECT,
  storage: PATH_TO_DB,
})
export default db
