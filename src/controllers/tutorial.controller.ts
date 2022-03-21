/* eslint-disable prefer-destructuring */
import { Request, Response, NextFunction } from 'express'
import { Op, WhereOptions } from 'sequelize'
import { IPage, ITutorial, ITutorialStatic } from '../types.d'
import { db } from '../config/db.config'
import Tutorial from '../models/tutorial.model'

const getPagination = (
  page: number,
  size: number
): { limit: number; offset: number } => {
  const limit = size ? +size : 3
  const offset = page ? page * limit : 0

  return { limit, offset }
}
// todo get a better type for data
const getPagingData = (
  data: any,
  page: number,
  limit: number
): {
  totalItems: number
  tutorials: ITutorial
  totalPages: number
  currentPage: number
} => {
  const {
    count: totalItems,
    rows: tutorials,
  }: { count: number; rows: ITutorial } = data
  const currentPage = page ? +page : 0
  const totalPages = Math.ceil(totalItems / limit)

  return { totalItems, tutorials, totalPages, currentPage }
}

export const createTutorial = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
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
  try {
    const dataSaved: Tutorial = await newTutorial.save()
    res.status(201).json(dataSaved)
  } catch (err: any) {
    res.status(500).json({
      message: err.message || 'Some error occurred while creating the Tutorial',
    })
  }
}

export const findAllTutos = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { page, size } = req.query
  const parsedPage = parseInt(page as string, 10)
  const parsedSize = parseInt(size as string, 10)
  const title = req.query.title as WhereOptions<ITutorial> | undefined
  const { limit, offset } = getPagination(parsedPage, parsedSize)

  try {
    const tutorials: Tutorial[] = await Tutorial.findAll({
      where: { title },
      limit,
      offset,
    })
    res.status(200).json(tutorials)
  } catch (err: any) {
    res.status(500).json({
      message:
        err.message || 'Some error occurred while retrieving the Tutorials',
    })
  }
}

export const findOneTuto = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { id } = req.params
  try {
    const data = await Tutorial.findByPk(id)
    if (data) {
      res.status(200).json(data)
    } else {
      res.status(404).json({
        message: `Cannot find Tutorial with id=${id}.`,
      })
    }
  } catch (err) {
    res.status(500).json({
      message: `Error retrieving Tutorial with id=${id}`,
    })
  }
}

export const updateTuto = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const id = req.params.id as unknown as WhereOptions<ITutorial>
  const body = req.body as unknown as Tutorial
  try {
    const tuto = await Tutorial.update(
      {
        ...body,
      },
      { where: { id } }
    )
    if (tuto) {
      res.status(200).json({
        message: 'Tutorial updated successfully',
      })
    } else {
      res.status(500).json({
        message: `Cannot update Tutorial with id=${id}. Maybe Tutorial was not found or req.body is empty`,
      })
    }
  } catch {
    res.status(500).json({
      message: `Error updating Tutorial with id=${id}`,
    })
  }
}

export const deleteTuto = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const id = req.params.id as unknown as WhereOptions<ITutorial> | undefined
  try {
    const num = await Tutorial.destroy({
      where: { id },
    })
    if (num === 1) {
      res.status(200).json({ message: 'Tutorial deleted successfully' })
    } else {
      res.status(500).json({
        message: `Could not delete Tutorial with id=${id}. Maybe Tutorial was not found!`,
      })
    }
  } catch {
    res.status(500).send({
      message: `Could not delete Tutorial with id=${id}`,
    })
  }
}

export const deleteAllTutos = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const nums: number = await Tutorial.destroy({
      where: {},
      truncate: false,
    })
    res.status(200).json({
      message: `${nums} tutorials deleted successfully!`,
    })
  } catch (err: any) {
    res.status(500).json({
      message: err.message || 'Some error occured while removing all tutorials',
    })
  }
}
export const findAllPublished = async (
  req: Request,
  res: Response,
  next: NextFunction
  // eslint-disable-next-line arrow-body-style
): Promise<void> => {
  const { page, size } = req.query
  const parsedPage = parseInt(page as string, 10)
  const parsedSize = parseInt(size as string, 10)
  const { limit, offset } = getPagination(parsedPage, parsedSize)
  try {
    const data /* : ITutorial[] */ = await Tutorial.findAndCountAll({
      where: { published: true },
      limit,
      offset,
    })
    const response = getPagingData(data, parsedPage, limit)
    res.status(200).json(response)
  } catch (err: any) {
    res.status(500).json({
      message: err.message || 'Some error occured while retrieving tutorials',
    })
  }
}
