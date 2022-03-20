import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from 'sequelize'
import { db as sequelize } from '../config/db.config'
import { ITutorial, ITutorialOptional, ITutorialStatic } from '../types.js'

const Tutorial = sequelize.define<ITutorial>('tutorial', {
  id: {
    primaryKey: true,
    type: DataTypes.INTEGER,
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
}) as ITutorialStatic

Tutorial.sync({ force: true })

export default Tutorial

/* class Tutorial extends Model<InferAttributes<Tutorial>, InferCreationAttributes<Tutorial>> {
   declare id: CreationOptional<number>, 
   declare createdAt: CreationOptional<Date>
   declare updatedAt: CreationOptional<Date>
   declare id: CreationOptional<number>, 
   title?: {
    type: DataTypes.STRING
  },
  description?: {
    type: DataTypes.STRING
  },
  published!: {
    type: DataTypes.BOOLEAN
  }, 
}
Tutorial.init({
  id: {
    type: DataTypes.INTEGER.UNSIGNED
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
  updatedAt: DataTypes.DATE
},{sequelize, modelName:'tutorial' }) */
