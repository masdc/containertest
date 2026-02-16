import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export const getRecords = async () => {
  const res = await pool.query('SELECT * FROM records');
  return res.rows;
};

export const addRecord = async (name: string) => {
  const res = await pool.query('INSERT INTO records (name) VALUES ($1) RETURNING *', [name]);
  return res.rows[0];
};

export const initDb = async () => {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS records (
      id SERIAL PRIMARY KEY,
      name TEXT NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `);
};
