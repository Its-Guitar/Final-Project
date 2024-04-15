import express from 'express';
import * as taController from '../controllers/taController.js';

const router = express.Router();

router.get('/:name', taController.getScore);
router.put('/:name', taController.updateScore);

export default router;