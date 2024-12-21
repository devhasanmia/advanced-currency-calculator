import express from 'express';
import { getCurrentRates } from '../controllers/ratesController';
const router = express.Router();

router.get('/current', getCurrentRates);

export const ratesRouter = router;
