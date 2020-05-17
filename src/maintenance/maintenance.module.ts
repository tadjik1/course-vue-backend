import { Module } from '@nestjs/common';
import { DatabaseManager } from './database-manager';
import { MaintenanceController } from './maintenance.controller';

@Module({
  controllers: [MaintenanceController],
  providers: [
    {
      provide: 'DATABASE_MANAGER',
      useValue: new DatabaseManager(),
    },
  ],
})
export class MaintenanceModule {}
