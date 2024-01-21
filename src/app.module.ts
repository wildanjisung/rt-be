import { Module } from '@nestjs/common';
import { TasksModule } from './tasks/tasks.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { ResidenceModule } from './residence/residence.module';
import { BillModule } from './bill/bill.module';
import { AudienceModule } from './audience/audience.module';

@Module({
  imports: [
    TasksModule,
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: './src/database/database.sqlite',
      // entities: [__dirname + '/../**/*.entity{.ts,.js}'],
      autoLoadEntities: true,
      synchronize: false,
    }),
    AuthModule,
    ResidenceModule,
    BillModule,
    AudienceModule,
  ],
})
export class AppModule {}
