/**
 * Creates vector extension and embeddings table on the vector DB.
 * Run after vector-db (pgvector) is up.
 * Uses VECTOR_DB_* env vars; with Docker: VECTOR_DB_HOST=vector-db.
 */
import vectorDataSource from './vector-data-source';

async function main() {
  await vectorDataSource.initialize();
  const qr = vectorDataSource.createQueryRunner();
  await qr.connect();

  try {
    const [existing] = await qr.query(
      `SELECT 1 FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'embeddings'`
    );
    if (existing) {
      console.log('embeddings table already exists');
      return;
    }

    await qr.query(`CREATE EXTENSION IF NOT EXISTS vector`);
    await qr.query(`
      CREATE TABLE embeddings (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        content TEXT,
        embedding vector(1536),
        metadata JSONB,
        created_at TIMESTAMPTZ DEFAULT now()
      )
    `);
    console.log('embeddings table created successfully');
  } catch (err) {
    console.error(
      'Failed. Ensure vector-db (pgvector) is running and VECTOR_DB_* env vars are correct:',
      err instanceof Error ? err.message : err
    );
    process.exit(1);
  } finally {
    await qr.release();
    await vectorDataSource.destroy();
  }
}

main();
