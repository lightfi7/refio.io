import mongoose, { Document, Schema } from 'mongoose';

export interface IProgram extends Document {
    uuid: string;
    name: string;
    contact_email: string;
    commission_in_percentage: number;
    commission_in_percentage_formatted: string;
    commission_amount: number;
    commission_amount_formatted: string;
    duration: string;
    cash_limit: string;
    cash_limit_per_referal: string;
    promoted: number;
    is_international: number;
    commission_type: object | null;
    product_type: object | null;
    platform: number | null;
    tags: (number | null)[];
    langs: (number | null)[];
    current_user_apply: [] | undefined;
    current_favorite_user: [] | undefined;
    average_ratings: [] | undefined;
    current_user_review: [] | undefined;
    link_data: object | null;
}

const IProgram = new Schema<IProgram>({
    uuid: {
        type: String,
        default: "",
    },
    name: {
        type: String,
        default: "",
    },
    contact_email: {
        type: String,
        default: "",
    },
    commission_in_percentage: {
        type: Number,
        default: 0.0,
    },
    commission_in_percentage_formatted: {
        type: String,
        default: "",
    },
    commission_amount: {
        type: Number,
        default: 0,
    },
    commission_amount_formatted: {
        type: String,
        default: "",
    },
    duration: {
        type: String,
        default: "",
    },
    cash_limit: {
        type: String,
        default: "",
    },
    cash_limit_per_referal: {
        type: String,
        default: "",
    },
    promoted: {
        type: Number,
        default: 0,
    },
    is_international: {
        type: Number,
        default: 0,
    },
    commission_type: {
        type: Object,
        default: "",
    },
    product_type: {
        type: Object,
        default: null,
    },
    platform: {
        type: Number,
        default: null,
    },
    tags: {
        type: Number,
        default: null,
    },
    langs: {
        type: Number,
        default: null,
    },
    current_user_apply: {
        type: Array,
        default: [],
    },
    current_favorite_user: {
        type: Array,
        default: [],
    },
    average_ratings: {
        type: Array,
        default: [],
    },
    current_user_review: {
        type: Array,
        default: [],
    },
    link_data: {
        type: Object,
        default: null,
    },
}, {timestamps: true});

const Program = mongoose.model<IProgram>("Program", IProgram);

export default Program;
