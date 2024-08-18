import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CartItem } from 'src/users/entities/cart-item.entity';
import { Cart } from 'src/users/entities/cart.entity';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { KafkaProvider } from './providers/kafka.provider';

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

    public async testOrderService() {
        return this.kafkaProvider.publishResponse("create.order", JSON.stringify({message: "pogchamp"}));
    }
}
