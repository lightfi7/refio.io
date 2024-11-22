import mongoose, { Document, Schema } from 'mongoose';

export interface ISession extends Document {
    userId: string,
    browser: object,
    os: object,
    ip:string
}

const sessionSchema = new Schema<ISession>({
    userId: {
        type: String,
        default: "",
    },
    browser:{},
    os:{},
    ip:String,
});

const Session = mongoose.model<ISession>("Session", sessionSchema);

export default Session;
