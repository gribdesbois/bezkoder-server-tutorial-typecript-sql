import { Sequelize } from 'sequelize'
/* interface IPool {
  max:number
  min:number
  ascquire:number
  idle:number
} */
/* export interface IDb {
  Sequelize: Sequelize
  sequelize: typeof Sequelize
} */

export interface ITutorial extends Model {
  title: string
  description: string
  published: boolean
}
// Need to declare the static model so `findOne` etc. use correct types.
export type ITutorialStatic = typeof Model & {
  new (values?: object, options?: BuildOptions): ITutorial
}
