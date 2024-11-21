import mongoose, { Document, Schema } from 'mongoose';

export interface ITag extends Document {
    id: number;
    slug: string;
    name: string;
}

const tagSchema = new Schema<ITag>({
    id: {
        type: Number,
        default: 0,
    },
    slug: {
        type: String,
        default: "",
    },
    name: {
        type: String,
        default: "",
    },
});

const Tag = mongoose.model<ITag>("Tag", tagSchema);

export default Tag;
