import express from 'express';
import { getNumbers } from '../controllers/number.controller.js';

const router = express.Router();

router.get('/:numberid', getNumbers);

export default router;
