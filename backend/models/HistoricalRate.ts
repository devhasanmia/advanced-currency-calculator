import { model, Schema } from 'mongoose';
import { IHistoricalRate } from '../interface/HistoricalRate.interface';



const historicalRateSchema = new Schema<IHistoricalRate>(
    {
        date: {
            type: String,
            required: true,
            unique: true
        },
        rates: {
            type: Map,
            of: String,
            required: true
        },
    }, { timestamps: true });

const HistoricalRate = model<IHistoricalRate>('HistoricalRate', historicalRateSchema);

export default HistoricalRate;
