import express from 'express'
import dotenv from 'dotenv'
import { connectDB } from './db/connectDB.js';
import authRoute from './routes/auth.route.js'
import cookieParser from 'cookie-parser';
import cors from 'cors'

dotenv.config()
const app = express();

app.use(cors({ origin: "http://localhost:5176", credentials: true }));

//Middlewares
app.use(express.json())
app.use(cookieParser()) 

//routes
app.use('/api/auth', authRoute)

app.listen(3000, () => {
    connectDB()
    console.log('server is running on port 3000');
    
})