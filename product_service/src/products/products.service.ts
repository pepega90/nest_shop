import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';
import { error } from 'console';

@Injectable()
export class ProductsService {
  constructor(
    // inject product repository
    @InjectRepository(Product)
    private readonly productRepository : Repository<Product>
  ) {}
  public async create(createProductDto: CreateProductDto) {
    let newProduct = await this.productRepository.create(createProductDto);
    return await this.productRepository.save(newProduct);
  }

  public async findAll() {
    return await this.productRepository.find();
  }

  public async findOne(id:number, payload: any) {
    let product = undefined;
    try {
      product = await this.productRepository.findOneBy({id});
    } catch (error) {
      throw new InternalServerErrorException("Error get product (product-service): " + error)
    }
    
   if(payload.qty) {
    if(payload.qty > product.stock) throw new BadRequestException("Error: payload.qty is greater than product stock")

      product.stock -= payload.qty;
      await this.productRepository.save(product);
   }

    return product;
  }

  public async addQtyFromRemoveCart(payload: any) {
    let prod = await this.productRepository.findOneBy({id: payload.productId})
    prod.stock += payload.quantity;
    await this.productRepository.save(prod);
  }
}
