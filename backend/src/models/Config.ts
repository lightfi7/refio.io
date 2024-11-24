import mongoose, { Document, Schema } from 'mongoose';

export interface IConfig extends Document {
    type: string;
    paypal: {
        client_id: string;
        secret_key: string;
    };
    scraper: {
        email: string;
        password: string;
    },
    membership: {
        free: {
            num: number;
        },
        premium: {
            price: number;
        },
    }
}

const ConfigSchema = new Schema<IConfig>({
    type: {
        type: String,
        default: "system",
    },
    paypal: {
        client_id: String,
        secret_key: String,
    },
    scraper: {
        email: String,
        password: String,
    },
    membership: {
        free: {
            num: Number,
            default: 30
        },
        premium: {
            price: Number,
            default: 19
        },
    },
});

const Config = mongoose.model<IConfig>("Config", ConfigSchema);

export default Config;
