import axios from 'axios';
import { Request, Response } from 'express';
import { parseStringPromise } from 'xml2js';
import HistoricalRate from '../models/HistoricalRate';
import config from '../config';


export const fetchAndSaveHistoricalRates = async (_req: Request, res: Response): Promise<void> => {
    try {
        // Fetch XML data from ECB
        const { data } = await axios.get(config.HISTORICAL_RATES_URL as string);
        // Parse XML to JSON
        const parsedData = await parseStringPromise(data);
        const ratesArray = parsedData['gesmes:Envelope']['Cube'][0]['Cube'];
        // Process and save rates
        const historicalRates = ratesArray.map((day: any) => {
            const date = day['$'].time;
            const rates = day['Cube'].reduce((acc: Record<string, string>, rate: any) => {
                acc[rate['$'].currency] = rate['$'].rate;
                return acc;
            }, {});
            return { date, rates };
        });
        // Upsert each day's rates
        for (const rate of historicalRates) {
            await HistoricalRate.findOneAndUpdate(
                { date: rate.date },
                { rates: rate.rates },
                { upsert: true }
            );
        }
        res.status(200).json({
            status: true,
            message: 'Historical rates fetched and saved successfully',
        });
    } catch (error) {
        console.error('Error fetching historical rates:', error);
        res.status(500).json({ error: 'Failed to fetch historical rates' });
    }
};

export const getHistoricalRatesByDate = async (req: Request, res: Response): Promise<void> => {
    const { date } = req.params;
    try {
        const rates = await HistoricalRate.findOne({ date });
        if (!rates) {
            res.status(404).json({ message: 'No rates found for the given date' });
            return;
        }
        res.status(200).json(rates);
    } catch (error) {
        console.error('Error retrieving historical rates:', error);
        res.status(500).json({ error: 'Failed to retrieve historical rates' });
    }
};
