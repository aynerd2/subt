import { config } from "dotenv";

config({path: `.env.${process.env.NODE_ENV || 'development'}.local`});
console.log(`Environment: ${process.env.NODE_ENV}`);

export const {
      PORT, 
      NODE_ENV, 
      DB_URI, 
      JWT_SECRET,
      JWT_EXPIRES_IN,
      ARCJET_ENV,
      ARCJET_KEY
} = process.env;