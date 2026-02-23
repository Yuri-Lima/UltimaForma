/**
 * Run after: brew install pgvector && brew services restart postgresql@16
 * Creates vector extension and embeddings table when pgvector is available.
 */
import dataSource from './data-source';

async function main() {
  await dataSource.initialize();
  const qr = dataSource.createQueryRunner();
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
      'Failed. Ensure pgvector is installed and Postgres restarted:',
      err instanceof Error ? err.message : err
    );
  } finally {
    await qr.release();
    await dataSource.destroy();
  }
}

main();
