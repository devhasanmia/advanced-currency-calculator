import express from 'express';
import {
    fetchAndSaveHistoricalRates,
    getHistoricalRatesByDate,
} from '../controllers/historicalRatesController';
const router = express.Router();

router.post('/fetch', fetchAndSaveHistoricalRates);

router.get('/:date', getHistoricalRatesByDate);

export const historicalRatesRoute = router
