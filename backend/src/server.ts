import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/database';
import initializeRoutes from './routes';
import path from "node:path";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

connectDB();

app.use(cors());
app.use(express.json());
app.use(express.static('uploads/avatars'));

initializeRoutes(app);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});