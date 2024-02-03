import { Router } from 'express';
import matchesControllers from '../controllers/matches.controllers';
import tokenMiddlewares from '../middlewares/tokenMiddlewares';
import matchesMiddlewares from '../middlewares/matchesMiddlewares';

const router = Router();

router.get('/', matchesControllers.getAll);

router.patch(
  '/:id/finish',
  tokenMiddlewares.authMiddleware,
  matchesControllers.updateMatchProgress,
);

router.patch(
  '/:id',
  tokenMiddlewares.authMiddleware,
  matchesMiddlewares.hasRequiredKeys,
  matchesControllers.updateMatchGoals,
);

router.post(
  '/',
  tokenMiddlewares.authMiddleware,
  matchesControllers.addNew,
);

export default router;
