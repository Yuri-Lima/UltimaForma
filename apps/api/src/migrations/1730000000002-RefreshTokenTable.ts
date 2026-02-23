import { MigrationInterface, QueryRunner } from 'typeorm';

export class RefreshTokenTable1730000000002 implements MigrationInterface {
  name = 'RefreshTokenTable1730000000002';

  async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS refresh_token (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        "userId" UUID NOT NULL REFERENCES "user"(id) ON DELETE CASCADE,
        "tokenHash" character varying NOT NULL,
        "expiresAt" TIMESTAMPTZ NOT NULL,
        "revokedAt" TIMESTAMPTZ,
        "createdAt" TIMESTAMPTZ NOT NULL DEFAULT now()
      )
    `);
    await queryRunner.query(
      `CREATE INDEX IF NOT EXISTS "IDX_refresh_token_tokenHash" ON refresh_token ("tokenHash")`
    );
    await queryRunner.query(
      `CREATE INDEX IF NOT EXISTS "IDX_refresh_token_userId" ON refresh_token ("userId")`
    );
  }

  async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE IF EXISTS refresh_token`);
  }
}
