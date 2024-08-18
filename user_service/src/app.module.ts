import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/entities/user.entity';
import { Cart } from './users/entities/cart.entity';
import { CartItem } from './users/entities/cart-item.entity';
import { Wishlist } from './users/entities/wishlist.entity';
import { WishlistItem } from './users/entities/wishlist-item.entity';
import { AuthModule } from './auth/auth.module';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ProductsModule } from './products/products.module';
import { OrdersModule } from './orders/orders.module';

@Module({
  imports: [
    UsersModule,
    AuthModule,
    // ClientsModule.register([
    //   {
    //     name: "PRODUCT_SERVICE",
    //     transport: Transport.KAFKA,
    //     options: {
    //       client: {
    //         clientId: "product",
    //         brokers: ["localhost:9092"]
    //       },
    //       consumer: {
    //         groupId: "product-consumer",
    //       }
    //     }
    //   }
    // ]),
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        type: "postgres",
        entities: [User, Cart, CartItem, Wishlist, WishlistItem],
        synchronize: true,
        port: 5432,
        username: "postgres",
        password: "pepega90",
        host: "localhost",
        database: "nest-user"
      })
    }),
    ProductsModule,
    OrdersModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
