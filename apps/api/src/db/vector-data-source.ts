import 'reflect-metadata';
import { config } from 'dotenv';
import { DataSource } from 'typeorm';

config();

/**
 * DataSource for the vector DB (pgvector). Used only for embeddings.
 * Credentials from VECTOR_DB_* env vars; falls back to DB_* when unset.
 */
export default new DataSource({
  type: 'postgres',
  host: process.env.VECTOR_DB_HOST || process.env.DB_HOST || 'localhost',
  port: +(process.env.VECTOR_DB_PORT || process.env.DB_PORT || 5432),
  username: process.env.VECTOR_DB_USERNAME || process.env.DB_USERNAME || 'postgres',
  password: String(process.env.VECTOR_DB_PASSWORD ?? process.env.DB_PASSWORD ?? ''),
  database: process.env.VECTOR_DB_NAME || `${process.env.DB_NAME || 'ultimaforma'}_vector`,
  synchronize: false,
});
