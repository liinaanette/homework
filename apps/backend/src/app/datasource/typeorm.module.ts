import { DataSource } from 'typeorm';
import { Global, Logger, Module } from '@nestjs/common';
import { Order } from '../../orders/orders.entity';

@Global()
@Module({
  imports: [],
  providers: [
    {
      provide: DataSource,
      inject: [],
      useFactory: async () => {
        try {
          const dataSource = new DataSource({
            type: 'postgres',
            host: 'localhost',
            port: 5432,
            username: 'admin',
            password: 'admin',
            database: 'db',
            synchronize: true,
            entities: [Order],
          });
          await dataSource.initialize();
          Logger.log('Database connected successfully');
          return dataSource;
        } catch (error) {
          console.log('Error connecting to database');
          throw error;
        }
      },
    },
  ],
  exports: [DataSource],
})
export class TypeOrmModule {}
