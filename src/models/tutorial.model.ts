/* eslint-disable import/no-unresolved */
import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from 'sequelize'
import { db as sequelize } from '../config/db.config'
import {
  ITutorial,
  ITutorialInstance,
  ITutorialCreationAttributes,
} from '../types.d'

// class entity
class Tutorial
  extends Model<ITutorial, ITutorialCreationAttributes>
  implements ITutorial
{
  declare id: string

  declare name: string

  declare title: string

  declare description: string

  declare published: boolean

  declare readonly createdAt: Date

  declare readonly updatedAt: Date

  declare readonly deletedAt: Date
}

// init model
Tutorial.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    name: {
      type: DataTypes.STRING,
    },
    title: {
      type: DataTypes.STRING,
    },
    description: {
      type: DataTypes.STRING,
    },
    published: {
      type: DataTypes.BOOLEAN,
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  },
  { sequelize, modelName: 'tutorial' }
)

Tutorial.sync(/* { force: true } */)

export default Tutorial
