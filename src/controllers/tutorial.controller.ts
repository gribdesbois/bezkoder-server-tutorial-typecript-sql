import { Request, Response, NextFunction } from 'express'
import { Op, WhereOptions } from 'sequelize'
import { ITutorial, ITutorialStatic } from '../types.d'
import { db } from '../config/db.config'
import Tutorial from '../models/tutorial.model'

export const create = (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response<any, Record<string, any>> | undefined> | undefined => {
  // Validate request
  if (!req.body.title) {
    res.status(400).send({
      message: 'Content cannot be empty',
    })
    return
  }
  // Create tutorial
  const tutorial: ITutorial = {
    ...req.body,
  }
  // save Tutorial in the database
  const newTutorial: ITutorialStatic = new Tutorial(tutorial)
  newTutorial
    .save()
    .then((data: Response) => res.status(201).json(data))
    .catch((err: Error) =>
      res.status(500).json({
        message:
          err.message || 'Some error occurred while creating the Tutorial',
      })
    )
}

export const findAll = (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response<any, Record<string, any>> | undefined> | undefined => {
  const title = req.query.title as WhereOptions<ITutorial> | undefined
  /* const condition = title ? { title: { [Op.like]: `%${title}%` } } : null */

  Tutorial.findAll({ where: title })
}
