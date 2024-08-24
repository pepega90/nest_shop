import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CartItem } from 'src/users/entities/cart-item.entity';
import { Cart } from 'src/users/entities/cart.entity';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { KafkaProvider } from './providers/kafka.provider';
import { CreateOrderDto } from './dto/create-order.dto';

@Injectable()
export class OrdersService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,

        @InjectRepository(Cart)
        private cartRepository: Repository<Cart>,

        @InjectRepository(CartItem)
        private cartItemRepository: Repository<CartItem>,

        private kafkaProvider : KafkaProvider
    ) {}

    public async createOrder(createOrderDto: CreateOrderDto) {
        let user =   undefined;

        try {
            user = await this.userRepository.findOne({where: {id: createOrderDto.userId}, relations: {
                carts: {
                    items: true
                }
            }})
        } catch (error) {
            throw new Error("User not found: " + error)
        }
        
        let result = await this.kafkaProvider.publishResponse("create.order", JSON.stringify(user));
        await this.cartItemRepository.remove(user.carts.items);
        user.carts.items = []
        await this.userRepository.save(user);
        return result;
    }

    public async getUserOrder(id :number) {
        return await this.kafkaProvider.publishResponse("get.user.order", JSON.stringify(id))
    }
}
