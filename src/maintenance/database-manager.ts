import * as fs from 'fs';
import path from 'path';
import { EntityManager } from 'mikro-orm';
import { getDataToSeed } from './seed-data';

export class DatabaseManager {
  private dropSchemaPath = path.join(__dirname, '../../data/drop-schema.sql');
  private createSchemaPath = path.join(
    __dirname,
    '../../data/create-schema.sql',
  );

  private readonly dropSchemaQuery;
  private readonly createSchemaQuery;

  constructor() {
    this.dropSchemaQuery = fs.readFileSync(this.dropSchemaPath, 'utf-8');
    this.createSchemaQuery = fs.readFileSync(this.createSchemaPath, 'utf-8');
  }

  private async execute(em: EntityManager, sql: string) {
    const lines = sql.split('\n').filter((i) => i.trim());

    for (const line of lines) {
      await em.getConnection().execute(line);
    }
  }

  dropSchema(em: EntityManager): Promise<void> {
    return this.execute(em, this.dropSchemaQuery);
  }

  seed(em: EntityManager): Promise<void> {
    const meetups = getDataToSeed();
    return em.persistAndFlush(meetups);
  }

  createSchema(em: EntityManager): Promise<void> {
    return this.execute(em, this.createSchemaQuery);
  }

  async refresh(em: EntityManager): Promise<void> {
    // TODO: add transaction here
    // sore some reason, thi.em.transactional fails with sqlite
    await this.dropSchema(em);
    await this.createSchema(em);
    await this.seed(em);
  }
}
