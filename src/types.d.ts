import { Optional, Sequelize } from 'sequelize'
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

export interface ITutorial {
  id: string
  name: string
  title: string
  description: string
  published: boolean
  createdAt?: Date
  updatedAt?: Date
  deletedAt?: Date | null
}

// creation attributes
// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface ITutorialCreationAttributes
  extends Optional<ITutorial, 'id'> {}

// instance
export interface ITutorialInstance
  extends Model<ITutorial, ITutorialCreationAttributes>,
    ITutorial {}

/* // eslint-disable-next-line @typescript-eslint/no-empty-interface
interface ITutorialOptional
  extends Optional<ITutorial, 'id' | 'createdAt' | 'updatedAt'> {}

export interface ITutorialInstance
  extends Model<ITutorial, ITutorialOptional>,
    ITutorial {
  createdAt?: Date
  updatedAt?: Date
}

// Need to declare the static model so `findOne` etc. use correct types.

 */
export type ITutorialStatic = typeof Model & {
  new (values?: object, options?: BuildOptions): ITutorial
}
