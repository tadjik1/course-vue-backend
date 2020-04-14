import path from 'path';
import { Logger } from '@nestjs/common';
import { Options } from 'mikro-orm';

const logger = new Logger('MikroORM');

export default {
  entities: [],
  dbName: 'db.sqlite3',
  type: 'sqlite',
  autoFlush: false, // Read more here: https://mikro-orm.io/unit-of-work/
  baseDir: path.join(__dirname, '..'),
  logger: logger.log.bind(logger),
} as Options;
