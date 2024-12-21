import axios from 'axios';
import { parseStringPromise } from 'xml2js';
import config from '../config';

interface RateResponse {
    baseCurrency: string;
    rates: { [key: string]: number };
    lastUpdated: string;
}

export const fetchCurrentRates = async (): Promise<RateResponse> => {
    try {
        // Fetch XML data from ECB
        const response = await axios.get(config.ECB_URL as string);
        const parsedData = await parseStringPromise(response.data);
        // Extract rates and last update time
        const rateEntries =
            parsedData['gesmes:Envelope'].Cube[0].Cube[0].Cube;
        const rates: { [key: string]: number } = {};
        rateEntries.forEach((entry: any) => {
            rates[entry.$.currency] = parseFloat(entry.$.rate);
        });
        const lastUpdated: string = parsedData['gesmes:Envelope'].Cube[0].Cube[0].$.time;
        return {
            baseCurrency: 'EUR',
            rates,
            lastUpdated,
        };
    } catch (error) {
        console.error('Error fetching ECB rates:', error);
        throw new Error('Failed to fetch exchange rates.');
    }
};

