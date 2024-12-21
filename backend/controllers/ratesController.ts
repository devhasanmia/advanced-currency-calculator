import { NextFunction, RequestHandler } from 'express';
import { fetchCurrentRates } from '../services/ecbService';

export const getCurrentRates: RequestHandler = async (req, res, next: NextFunction) => {
    try {
        const rates = await fetchCurrentRates();
        res.status(200).json(rates);
    } catch (error) {
        next(error);
    }
};
