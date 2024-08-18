import { Body, Controller, Get, Patch, Post } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { AddToCartDto } from './dto/add-to-cart.dto';
import { AddToWishlistDto } from './dto/add-to-wishlist.dto';
import { RemoveFromWishlistDto } from './dto/remove-from-wishlist.dto';
import { RemoveFromCartDto } from './dto/remove-from-cart';

@Controller('/api/products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  public async getAll() {
    return await this.productsService.getAll("get.products");
  }

  @Post()
  public async createProduct(@Body() createProduct: CreateProductDto) {
    return await this.productsService.create("create.product", createProduct);
  }

  @Post("add-cart")
  public async addToCart(@Body() addToCart: AddToCartDto) {
    return this.productsService.addToCart("add.cart",addToCart);
  }

  @Patch("remove-from-cart")
  public async removeFromCart(@Body() removeFromCartDto: RemoveFromCartDto) {
    return this.productsService.removeFromCart("remove.cart",removeFromCartDto);
  }

  @Post("add-wishlist")
  public async addToWishlist(@Body() addToWishlist: AddToWishlistDto) {
    return this.productsService.addToWishlist("add.wishlist", addToWishlist)
  }

  @Patch("remove-from-wishlist")
  public async removeFromWishlist(@Body() removeFromWishlist: RemoveFromWishlistDto) {
    return this.productsService.removeFromWishlist(removeFromWishlist);
  }
}
