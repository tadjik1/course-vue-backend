import { EntityManager } from 'mikro-orm';
import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SchedulerRegistry } from '@nestjs/schedule';
import { CronJob } from 'cron';
import { DatabaseManager } from './database-manager';

@Injectable()
export class MaintenanceService {
  constructor(
    private readonly em: EntityManager,
    private readonly schedulerRegistry: SchedulerRegistry,
    private readonly configService: ConfigService,

    @Inject('DATABASE_MANAGER')
    private readonly databaseManager: DatabaseManager,
  ) {
    const dbRefreshCronPattern = this.configService.get('dbRefreshCron');
    if (dbRefreshCronPattern) {
      const dbRefreshJob = new CronJob(dbRefreshCronPattern, () => {
        return this.dbRefresh();
      });
      this.schedulerRegistry.addCronJob('db-refresh', dbRefreshJob);
      dbRefreshJob.start();
    }
  }

  ping() {
    return 'pong';
  }

  dbRefresh() {
    return this.databaseManager.refresh(this.em);
  }
}
