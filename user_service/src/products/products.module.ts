import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { v4 as uuidv4 } from 'uuid'
import { KafkaProvider } from './providers/kafka.provider';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { Cart } from 'src/users/entities/cart.entity';
import { CartItem } from 'src/users/entities/cart-item.entity';
import { Wishlist } from 'src/users/entities/wishlist.entity';
import { WishlistItem } from 'src/users/entities/wishlist-item.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Cart, CartItem, Wishlist, WishlistItem]),
    ClientsModule.register([
      {
        name: "PRODUCT_SERVICE",
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: `product-consumer-microservices`,
            brokers: ["localhost:9092"]
          },
          consumer: {
            groupId: "product-consumer"
          }
        }
      }
    ])
  ],
  controllers: [ProductsController],
  providers: [ProductsService, KafkaProvider],
})
export class ProductsModule {}
