import mongoose, { Document, Schema } from 'mongoose';

export interface IComment extends Document {
    user: object | string;
    program: object | string;
    content: string;
    up_votes: string[];
    down_votes: string[];
}

const commentSchema = new Schema<IComment>({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    program: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Program'
    },
    content: {
        type: String,
        default: ""
    },
    up_votes: [{
        type: String,
    }],
    down_votes: [{
        type: String,
    }]
}, { timestamps: true });

const Comment = mongoose.model<IComment>("Comment", commentSchema);

export default Comment;
