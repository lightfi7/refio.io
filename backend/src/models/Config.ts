import mongoose, { Document, Schema } from 'mongoose';

export interface IConfig extends Document {
    payment: string;
}

const configSchema = new Schema<IConfig>({
    payment: {
        type: String
    }
});

const Config = mongoose.model<IConfig>("Config", configSchema);

export default Config;
