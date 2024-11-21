import mongoose, { Document, Schema } from 'mongoose';

export interface ISession extends Document {
    userId: string,
    sessionId: string,
    browserName: string,
    osName: string,
    ip:string
}

const sessionSchema = new Schema<ISession>({
    userId: {
        type: String,
        default: "",
    },
    sessionId: String,
    browserName:String,
    osName:String,
    ip:String,
});

const Session = mongoose.model<ISession>("Session", sessionSchema);

export default Session;
