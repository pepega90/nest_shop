import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './products/entities/product.entity';

@Module({
  imports: [ProductsModule,
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        type: "postgres",
        entities: [Product],
        synchronize: true,
        port: 5432,
        username: "postgres",
        password: "pepega90",
        host: "localhost",
        database: "nest-product"
      })
    })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
