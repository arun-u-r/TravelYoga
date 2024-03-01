import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors'
import cookieParser from 'cookie-parser';
import mongoose from 'mongoose';
import tourRoute from './routes/tour.js';
import userRoute from './routes/user.js';
import authRoute from './routes/auth.js';
import reviewRoute from './routes/review.js';
import bookingRoute from './routes/booking.js';

dotenv.config();
const app = express();
const port = process.env.PORT || 8000 ;

const corsOption = {
    origin: true,
    credential:true
}


//===================================
app.get('/', (req, res) => {
    res.send('Hello World!');
});
// ==================================



//################### DataBase connections ##############
mongoose.set('strictQuery', false);
const connect = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser:true,
            useUnifiedTopology: true
        });
        console.log('Database Connected Sucessfully');
        
    } catch (error) {
        console.log('Database Connection Failed')
    }
} 


//############### Middlewares ############
app.use(express.json());
app.use(cors(corsOption));
app.use(cookieParser());
app.use('/api/v1/tours', tourRoute);
app.use('/api/v1/users', userRoute);
app.use('/api/v1/auth', authRoute);
app.use('/api/v1/review', reviewRoute);
app.use('/api/v1/booking', bookingRoute);




app.listen(port, () => {
    connect();
    console.log(`server is listening on port ${port}`)
});