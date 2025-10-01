import express from 'express';
import { PORT } from './config/env.js';
import userRouter from './routes/user.routes.js';
import authRouter from './routes/auth.routes.js';
import subscriptionRouter from './routes/subcription.routes.js';
import connectToDatabase from './database/mongodb.js';
import errorMiddleware from './middlewares/error.middleware.js';    
import cookieParser from 'cookie-parser';
import arcjetMiddleware from './middlewares/arcjet.middleware.js';
import cors from 'cors'




const app = express();  
app.use(express.json());
app.use(errorMiddleware);

app.use(cookieParser())
app.use(express.urlencoded({extended: false}))
app.use(arcjetMiddleware)

app.use(cors({
      origin: "*",
      credentials: false,
      methods: ['GET', 'POST', 'PUT', 'DELETE'],
      allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/subscriptions', subscriptionRouter);



app.listen(PORT, async ()=>{
      console.log(`Server running on port ${PORT}`);
      await connectToDatabase();
      console.log('Connected to MongoDB');
})


export default app;