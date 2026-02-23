import { MigrationInterface, QueryRunner } from 'typeorm';

export class PgvectorExtension1730000000001 implements MigrationInterface {
  name = 'PgvectorExtension1730000000001';

  async up(queryRunner: QueryRunner): Promise<void> {
    const rows = await queryRunner.query(
      `SELECT 1 FROM pg_available_extensions WHERE name = 'vector'`
    );
    if (!rows?.length) {
      console.warn(
        'pgvector extension not available – skipping embeddings table. Install with: brew install pgvector (macOS) or pgvector package on your distro.'
      );
      return;
    }
    await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS vector`);
    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS embeddings (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        content TEXT,
        embedding vector(1536),
        metadata JSONB,
        created_at TIMESTAMPTZ DEFAULT now()
      )
    `);
  }

  async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE IF EXISTS embeddings`);
    await queryRunner.query(`DROP EXTENSION IF EXISTS vector`);
  }
}
