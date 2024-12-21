import { Document } from "mongoose";

export interface IHistoricalRate extends Document {
    date: string;
    rates: Record<string, string>;
}