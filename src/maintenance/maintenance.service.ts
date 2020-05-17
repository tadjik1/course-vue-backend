import { EntityManager } from 'mikro-orm';
import { Inject, Injectable } from '@nestjs/common';
import { SchedulerRegistry } from '@nestjs/schedule';
import { CronJob } from 'cron';
import { DatabaseManager } from './database-manager';

@Injectable()
export class MaintenanceService {
  constructor(
    private readonly em: EntityManager,
    private schedulerRegistry: SchedulerRegistry,

    @Inject('DATABASE_MANAGER')
    private readonly databaseManager: DatabaseManager,
  ) {
    const dbRefreshJob = new CronJob(`* 15 * * * *`, () => {
      return this.dbRefresh();
    });
    this.schedulerRegistry.addCronJob('db-refresh', dbRefreshJob);
    dbRefreshJob.start();
  }

  ping() {
    return 'pong';
  }

  dbRefresh() {
    return this.databaseManager.refresh(this.em);
  }
}
