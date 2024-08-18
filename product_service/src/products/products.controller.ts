import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { EventPattern, MessagePattern, Payload } from '@nestjs/microservices';

@Controller("products")
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @MessagePattern("create.product")
  public async create(payload: any) {
    let newProd = await this.productsService.create(payload);
    return {
      data: newProd
    }
  }

  @MessagePattern("get.products")
  public async findAll() {
    return this.productsService.findAll();
  }

  @MessagePattern("add.cart")
  public async getCartProduct(payload: any) {
    let prod = await this.productsService.findOne(payload.productId, payload);
    return {
      data: prod
    }
  }

  @EventPattern("remove.cart")
  public async removeCart(@Payload() payload: any) {
    await this.productsService.addQtyFromRemoveCart(payload);
  }

  @MessagePattern("add.wishlist")
  public async getWishlistproduct(payload: any) {
    let prod = await this.productsService.findOne(payload.productId, {});
    return {
      data: prod
    }
  }
}
