import pg from "pg";
import dotenv from "dotenv";

dotenv.config();
const { Pool } = pg;

const connection = new Pool({
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
});

export default connection;
