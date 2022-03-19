import {
  DataTypes,
  ModelStatic,
  ModelAttributeColumnOptions,
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
  Attributes,
} from 'sequelize'
import db from '../config/db.config'
import { ITutorial, ITutorialStatic } from '../types.js'

export function getAttributeMetadata<M extends Model>(
  model: ModelStatic<M>,
  attributeName: keyof Attributes<M>
): ModelAttributeColumnOptions {
  const attribute = model.rawAttributes[attributeName]
  if (attribute == null) {
    throw new Error(
      `Attribute ${attributeName} does not exist on model ${model.name}`
    )
  }

  return attribute
}

const Tutorial = db.define<ITutorial>('tutorial', {
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

Tutorial.sync()

export default Tutorial
