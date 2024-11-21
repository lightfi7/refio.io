import mongoose, { Document, Schema } from 'mongoose';

export interface IPlatform extends Document {
    id: number;
    name: string;
    url: string;
}

const platformSchema = new Schema<IPlatform>({
    id: {
        type: Number,
        default: 0,
    },
    name: {
        type: String,
        default: "",
    },
    url: {
        type: String,
        default: "",
    },
});

const Platform = mongoose.model<IPlatform>("Platform", platformSchema);

export default Platform;
