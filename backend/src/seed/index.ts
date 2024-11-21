import mongoose from "mongoose";
import Tag from "../models/Tag";
import Platform from "../models/Platform";
import Lang from "../models/Lang";
import dotenv from "dotenv";
import seed from "./data.json";
dotenv.config();

mongoose
    .connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/homestead', {})
    .then(async () => {
        console.log("=== Seed initializing ===");
        await Tag.deleteMany({});
        await Platform.deleteMany({});
        await Lang.deleteMany({});
        await Tag.insertMany(seed.tags);
        await Platform.insertMany(seed.platforms);
        await Lang.insertMany(seed.langs);
        console.log("=== Seed successfully ===");
        process.exit(0);
    })
    .catch(err => {
        console.log(err);
    });
