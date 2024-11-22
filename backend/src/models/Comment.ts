import mongoose, { Document, Schema } from 'mongoose';

export interface IComment extends Document {
    user: object | string;
    program: object | string;
    comment: string;
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
    comment: {
        type: String,
        default: ""
    },
    up_votes: [{
        type: String,
    }],
    down_votes: [{
        type: String,
    }]
});

const Comment = mongoose.model<IComment>("Comment", commentSchema);

export default Comment;
