import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { OrdersModule } from './orders/orders.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './orders/entities/order.entity';
import { OrderItem } from './orders/entities/order-item.entity';

@Module({
  imports: [OrdersModule,
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        type: "postgres",
        entities: [Order, OrderItem],
        synchronize: true,
        port: 5432,
        username: "postgres",
        password: "pepega90",
        host: "localhost",
        database: "nest-order",
      })
    })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
