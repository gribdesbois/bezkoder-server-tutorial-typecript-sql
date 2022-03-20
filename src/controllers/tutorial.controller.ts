/* eslint-disable prefer-destructuring */
import { Request, Response, NextFunction } from 'express'
import { Op, WhereOptions } from 'sequelize'
import { ITutorial, ITutorialStatic } from '../types.d'
import { db } from '../config/db.config'
import Tutorial from '../models/tutorial.model'

export const createTutorial = (
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
    .then((data: Tutorial) => res.status(201).json(data))
    .catch((err: Error) =>
      res.status(500).json({
        message:
          err.message || 'Some error occurred while creating the Tutorial',
      })
    )
}

export const findAllTutos = (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response<any, Record<string, any>> | undefined> | undefined => {
  const title = req.query.title as WhereOptions<ITutorial> | undefined

  return Tutorial.findAll({ where: title })

    .then((data: Tutorial[]) => res.status(200).json(data))

    .catch((err: Error) =>
      res.status(500).json({
        message:
          err.message || 'Some error occurred while retrieving the Tutorials',
      })
    )
}

export const findOneTuto = (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { id } = req.params
  return Tutorial.findByPk(id)
    .then((data: Tutorial | null) => {
      if (data) {
        res.status(200).json(data)
      } else {
        res.status(404).json({
          message: `Cannot find Tutorial with id=${id}.`,
        })
      }
    })
    .catch((err: Error) => {
      res.status(500).json({
        message: `Error retrieving Tutorial with id=${id}`,
      })
    })
}

export const updateTuto = (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const id = req.params.id as unknown as WhereOptions<ITutorial>
  return Tutorial.update(req.body, { where: id })
    .then((tuto) => {
      if (tuto) {
        res.status(200).json({
          message: 'Tutorial updated successfully',
        })
      } else {
        res.status(500).json({
          message: `Cannot update Tutorial with id=${id}. Maybe Tutorial was not found or req.body is empty`,
        })
      }
    })
    .catch((): void => {
      res.status(500).json({
        message: `Error updating Tutorial with id=${id}`,
      })
    })
}

export const deleteTuto = (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const id = req.params.id as unknown as WhereOptions<ITutorial> | undefined
  return Tutorial.destroy({
    where: id,
  })
    .then((num: number) => {
      if (num === 1) {
        res.status(200).json({ message: 'Tutorial deleted successfully' })
      } else {
        res.status(500).json({
          message: `Could not delete Tutorial with id=${id}. Maybe Tutorial was not found!`,
        })
      }
    })
    .catch((): void => {
      res.status(500).send({
        message: `Could not delete Tutorial with id=${id}`,
      })
    })
}

export const deleteAllTutos = (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> =>
  Tutorial.destroy({
    where: {},
    truncate: false,
  })
    .then((nums: number) => {
      res.status(200).json({
        message: `${nums} tutorials deleted successfully!`,
      })
    })
    .catch((err: Error) => {
      res.status(500).json({
        message:
          err.message || 'Some error occured while removing all tutorials',
      })
    })

export const findAllPublished = (
  req: Request,
  res: Response,
  next: NextFunction
  // eslint-disable-next-line arrow-body-style
): Promise<void> => {
  return Tutorial.findAll({ where: { published: true } })
    .then((data: Tutorial[]) => {
      res.status(200).json(data)
    })
    .catch((err: Error) => {
      res.status(500).json({
        message: err.message || 'Some error occured while retrieving tutorials',
      })
    })
}
