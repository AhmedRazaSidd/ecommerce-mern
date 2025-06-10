import express from 'express';
import dotenv from 'dotenv/config'
import authRoute from './routes/auth.route.js'
import { connectDB } from './lib/db.js';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json()) // allows you to parse the body of the request

app.use('/api/auth', authRoute)

app.listen(PORT, () => {
    console.log(`Server is running on port:${PORT}`);
    connectDB();
})