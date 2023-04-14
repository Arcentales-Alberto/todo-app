import { config } from 'dotenv'
config()

export const MONGO_URL = process.env.MONGO_URL || ''; 
export const SERVER_PORT = process.env.SERVER_PORT || ''; 