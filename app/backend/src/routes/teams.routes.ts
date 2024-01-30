import { Router } from 'express';
import teamsControllers from '../controllers/teams.controllers';

const router = Router();

router.get('/', teamsControllers.getAll);

router.get('/:id', teamsControllers.getById);

export default router;
