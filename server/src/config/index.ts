import { config } from 'dotenv'
config()

export const MONGO_URL = process.env.MONGO_URL || 'mongodb://db:27017/trpcdb?directConnection=true'; 
export const SERVER_PORT = process.env.SERVER_PORT || 3000; 