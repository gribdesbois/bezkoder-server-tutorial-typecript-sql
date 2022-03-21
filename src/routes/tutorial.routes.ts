import { Router } from 'express'

import {
  createTutorial,
  findAllTutos,
  findOneTuto,
  findAllPublished,
  updateTuto,
  deleteTuto,
  deleteAllTutos,
} from '../controllers/tutorial.controller'

export const router: Router = Router()

router.post('/', createTutorial)

router.get('/', findAllTutos)

router.get('/published', findAllPublished)

router.get('/:id', findOneTuto)

router.put('/:id', updateTuto)

router.delete('/:id', deleteTuto)

router.delete('/', deleteAllTutos)
