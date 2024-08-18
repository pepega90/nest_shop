import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { KafkaProvider } from './providers/kafka.provider';
import { CreateProductDto } from './dto/create-product.dto';
import { AddToCartDto } from './dto/add-to-cart.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Cart } from 'src/users/entities/cart.entity';
import { Repository } from 'typeorm';
import { CartItem } from 'src/users/entities/cart-item.entity';
import { User } from 'src/users/entities/user.entity';
import { AddToWishlistDto } from './dto/add-to-wishlist.dto';
import { Wishlist } from 'src/users/entities/wishlist.entity';
import { WishlistItem } from 'src/users/entities/wishlist-item.entity';
import { RemoveFromWishlistDto } from './dto/remove-from-wishlist.dto';
import { RemoveFromCartDto } from './dto/remove-from-cart';

@Injectable()
export class ProductsService {
    constructor(
        // inject user
        @InjectRepository(User)
        private readonly userRepository : Repository<User>,

        // inject wishlist
        @InjectRepository(Wishlist)
        private readonly wishlistRepository : Repository<Wishlist>,

        // inject wishlist item
        @InjectRepository(WishlistItem)
        private readonly wishlistItemRepository : Repository<WishlistItem>,

        // inject cart
        @InjectRepository(Cart)
        private readonly cartRepository : Repository<Cart>,

        // inject cart item
        @InjectRepository(CartItem)
        private readonly cartItemRepository : Repository<CartItem>,

        // inject kafka provider
        private readonly kafkaProvider : KafkaProvider
    ) {}

    public async getAll(event: string) {
        return await this.kafkaProvider.publishResponse(event, "get.products");
    }

    public async create(event: string, createProductDto: CreateProductDto) {
        try {
            let res = await this.kafkaProvider.publishResponse(event, JSON.stringify(createProductDto));
            return res.data;
        } catch (error) {
            console.log("error consuming = ", error);   
        }
    }

    public async addToCart(event: string, addToCart: AddToCartDto) {
        let cart = await this.cartRepository.findOne({where: {user: {id: addToCart.userId}}, relations: {items: true}})

        let product = undefined;
        let cartItem = undefined;
        try {
            let res = await this.kafkaProvider.publishResponse(event, JSON.stringify(addToCart));
            product = res.data;
        } catch (error) {
            console.log("error consuming = ", error);   
            throw new InternalServerErrorException("Error while consuming data (user-service): " + error)
        }

        if(product) cartItem = cart.items.find(item => item.productId === addToCart.productId)

        if(cartItem) {
            cartItem.quantity += addToCart.qty
        } else {
            cartItem = this.cartItemRepository.create({cart,productId: product.id , quantity: addToCart.qty, productName: product.name, price: product.price})
            cart.items.push(cartItem);
        }

        await this.cartItemRepository.save(cartItem);
        return cartItem;
    }

    public async removeFromCart(event: string, dto: RemoveFromCartDto) {
        let userCart = await this.cartRepository.findOne({where: {user: {id: dto.userId}}, relations: {items: true}})
        let cartItem = userCart.items.find(e => e.id === dto.cartItemId)
        
        await this.kafkaProvider.publish(event, JSON.stringify(cartItem))
        userCart.items = userCart.items.filter(e => e.id !== dto.cartItemId);

        await this.cartItemRepository.delete({id: dto.cartItemId});
        await this.cartRepository.save(userCart);
        return userCart;
    }

    public async addToWishlist(event: string, addToWishlistDto: AddToWishlistDto) {
        let userWishlist = await this.wishlistRepository.findOne({where: {user: {id: addToWishlistDto.userId}}, relations: {items: true}})
        let product = undefined;

        try {
            let res = await this.kafkaProvider.publishResponse(event, JSON.stringify(addToWishlistDto));
             product = res.data;
        } catch (error) {
            throw new InternalServerErrorException("Error while consuming data (user-service): " + error)
        }

        let wishlistItem = userWishlist.items.find(e => e.productId === addToWishlistDto.productId)
        if(wishlistItem) {
            return {
                message: `Product ${product.name} sudah ada di wishlist`
            }
        } else {
            wishlistItem = this.wishlistItemRepository.create({productId: product.id, productName: product.name, price: product.price, wishlist: userWishlist})
            userWishlist.items.push(wishlistItem)
        }

        await this.wishlistItemRepository.save(wishlistItem)
        return userWishlist;
    }

    public async removeFromWishlist(dto: RemoveFromWishlistDto) {
        let userWishlist = await this.wishlistRepository.findOne({where: {user: {id: dto.userId}}, relations: {items:true}})
        
        userWishlist.items = userWishlist.items.filter(e => e.id !== dto.wishlistItemId);
        
        await this.wishlistItemRepository.delete({id: dto.wishlistItemId});
        await this.wishlistRepository.save(userWishlist);

        return {
            message: `Wishlist item dengan id = ${dto.wishlistItemId} sudah di hapus dari wishlist`
        }
    }
}
