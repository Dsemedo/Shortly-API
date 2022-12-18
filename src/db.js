import pg from "pg";
import dotenv from "dotenv";
dotenv.config();

const { Pool } = pg;

export default connectionDb = new Pool(process.env.DATABASE_URL);
