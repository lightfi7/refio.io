import mongoose, { Document, Schema } from 'mongoose';

export interface IApply extends Document {
    user: object|string;
    program: object|string;
}

const applySchema = new Schema<IApply>({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    program: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Program'
    }
});

const Apply = mongoose.model<IApply>("Apply", applySchema);

export default Apply;
