import mongoose, { Document, Schema } from 'mongoose';
import bcrypt from 'bcryptjs';

export interface IUser extends Document {
    name: string;
    email: string;
    password: string;
    image: string | null;
    isVerified: boolean;
    verificationCode: string | null;
    resetToken: string | null;
    resetTokenExpiry: Date | null;
    notifications: object;
    browserSessions: [];
    membershipStartDate: Date;
    membershipEndDate: Date;
    isAdmin: boolean;
    isPremium: boolean;
    lastActivedAt: Date;
    isBlocked: number;
    createdAt: Date;
    updatedAt: Date;
    comparePassword(candidatePassword: string): Promise<boolean>;
}

const userSchema = new Schema<IUser>({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    image: { type: String },
    isVerified: { type: Boolean, default: false },
    verificationCode: { type: String },
    resetToken: { type: String },
    resetTokenExpiry: { type: Date },
    notifications: {
        type: {
            new: { type: Boolean, default: false },
            favorite: { type: Boolean, default: false },
            feedback: { type: Boolean, default: false },
        },
        default: {
            new: false,
            favorite: false,
            feedback: false
        }
    },
    membershipStartDate: { type: Date, default: new Date() },
    membershipEndDate: { type: Date, default: new Date() },
    isAdmin: { type: Boolean, default: false },
    isPremium: { type: Boolean, default: false },
    lastActivedAt: { type: Date },
    isBlocked: { type: Number, default: 0 }
}, { timestamps: true });


userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

userSchema.methods.comparePassword = async function (candidatePassword: string): Promise<boolean> {
    return bcrypt.compare(candidatePassword, this.password);
};

export default mongoose.model<IUser>('User', userSchema);