import { Router } from 'express';
import matchesControllers from '../controllers/matches.controllers';
import tokenMiddlewares from '../middlewares/tokenMiddlewares';
import matchesMiddlewares from '../middlewares/matchesMiddlewares';

const router = Router();

router.get('/', matchesControllers.getAll);

router.use(tokenMiddlewares.authMiddleware);

router.patch('/:id/finish', matchesControllers.updateMatchProgress);

router.patch('/:id', matchesMiddlewares.hasRequiredKeys, matchesControllers.updateMatchGoals);

export default router;
