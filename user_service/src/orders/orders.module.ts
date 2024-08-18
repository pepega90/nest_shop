import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { Cart } from 'src/users/entities/cart.entity';
import { CartItem } from 'src/users/entities/cart-item.entity';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { KafkaProvider } from './providers/kafka.provider';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Cart, CartItem]),
    ClientsModule.register([
      {
        name: "SHOPPING_SERVICE",
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: "shopping-consumer-microservices",
            brokers: ["localhost:9092"]
          },
          consumer: {
            groupId: "shopping-consumer"
          }
        }
      }
  ])],
  controllers: [OrdersController],
  providers: [OrdersService, KafkaProvider],
})
export class OrdersModule {}
