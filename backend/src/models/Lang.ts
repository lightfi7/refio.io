import mongoose, { Document, Schema } from 'mongoose';

export interface ILang extends Document {
    id: number;
    country_code: string;
}

const langSchema = new Schema<ILang>({
    id: {
        type: Number,
        default: 0,
    },
    country_code: {
        type: String,
        default: "",
    },
});

const Lang = mongoose.model<ILang>("Lang", langSchema);

export default Lang;
