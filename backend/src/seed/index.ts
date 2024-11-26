import mongoose from "mongoose";
import Tag from "../models/Tag";
import Platform from "../models/Platform";
import Lang from "../models/Lang";
import dotenv from "dotenv";
import seed from "./data.json";
dotenv.config();

function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

mongoose
    .connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/homestead', {
        authSource: "admin",
        user: "devman",
        pass: "mari2Ana23sem",
    })
    .then(async () => {
        console.log("=== Seed initializing ===");
        await Tag.deleteMany({});
        await Platform.deleteMany({});
        await Lang.deleteMany({});
        await Tag.insertMany(seed.tags.map(tag => {
            return {
                ...tag,
                color: getRandomColor()
            }
        }));
        await Platform.insertMany(seed.platforms);
        await Lang.insertMany(seed.langs);
        console.log("=== Seed successfully ===");
        process.exit(0);
    })
    .catch(err => {
        console.log(err);
    });
