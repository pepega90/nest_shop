import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { Repository } from 'typeorm';
import { HashingProvider } from 'src/auth/providers/hashing.provider';
import { CreateUserDto } from '../dto/create-user.dto';
import { Cart } from '../entities/cart.entity';
import { Wishlist } from '../entities/wishlist.entity';

@Injectable()
export class CreateUserProvider {
    constructor(
        // inject user repo
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        // inject cart repo
        @InjectRepository(Cart)
        private readonly cartRepository: Repository<Cart>,
        // inject wishlist repo
        @InjectRepository(Wishlist)
        private readonly wishlistRepository: Repository<Wishlist>,

        @Inject(forwardRef(() => HashingProvider))
        private readonly hashingProvider: HashingProvider
    ) {}

    public async createUser(createUserDto: CreateUserDto) {
        let newUser = await this.userRepository.create({
        ...createUserDto,
        password: await this.hashingProvider.hashPassword(createUserDto.password)
        });

        let u = await this.userRepository.save(newUser);

        let cart = await this.cartRepository.findOne({where: {user: {id: u.id}}, relations: {items: true}})

        if(!cart) {
            const user = await this.userRepository.findOneBy({id: u.id})
            cart = this.cartRepository.create({user})
            await this.cartRepository.save(cart);
        }

        let wishlist = await this.wishlistRepository.findOne({where: {user: {id:u.id}}});
        if(!wishlist) {
            const user = await this.userRepository.findOneBy({id: u.id})
            wishlist = this.wishlistRepository.create({user})
            await this.wishlistRepository.save(wishlist);
        }
        
        return u;
    }
}
